// controller/quiz.controller.js
const { GoogleGenAI, Type } = require('@google/genai');
const courseData = require('./course.json');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generateQuiz = async (req, res) => {
  try {
    const lessonId = Number(req.params.lessonId);

    // Get last 3 lessons before the current one
    const contextLessons = courseData.lessons
      .filter(lesson => lesson.lesson_no < lessonId)
      .slice(-3);

    const combinedText = contextLessons.flatMap(lesson =>
      (lesson.pages || []).flatMap(p => p.content || [])
    ).join('\n');

    const systemPrompt = `
You are an AI quiz generator. Based on the provided lesson content, generate a quiz in **JSON** format with the following **strict schema**:

{
  "title": "string",
  "description": "string",
  "difficulty": "easy",
  "tags": ["python", "DSA"],
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string"],
      "answer": 0
    }
  ]
}

✅ Rules:
- Exactly 3 options per question
- 'answer' must be the 0-based index of the correct option
- Minimum 7, maximum 10 questions
- Only include quiz content — no explanations or extra commentary
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemPrompt}\n\nCONTENT:\n${combinedText}`
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['title', 'description', 'difficulty', 'tags', 'questions'],
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ['question', 'options', 'answer'],
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    minItems: 3,
                    maxItems: 3
                  },
                  answer: { type: Type.INTEGER }
                }
              }
            }
          }
        }
      }
    });

    console.log("✅ Quiz response:", response.text);
    res.json(JSON.parse(response.text));

  } catch (err) {
    console.error("❌ Error generating quiz:", err);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
};
