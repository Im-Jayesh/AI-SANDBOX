// Run this in your Node.js app or MongoDB shell
const mongoose = require("mongoose");
const { CodingProblem, TestCase } = require('../models/coding_problems.model'); // Adjust the path

const createProblem = async () => {
  try {
    // Insert the problem
    await mongoose.connect("mongodb://localhost:27017/mern-auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

await CodingProblem.create({
  problem_no: 2,
  problem_statement: `You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.

Return the merged string.

### Example:
- Input: word1 = "abc", word2 = "pqr"
  Output: "apbqcr"

- Input: word1 = "ab", word2 = "pqrs"
  Output: "apbqrs"

- Input: word1 = "abcd", word2 = "pq"
  Output: "apbqcd"`,
  boiler_code: `def merge_alternately(word1, word2):
    # Write your code here
    pass`,
  output: "string",
  difficulty_level: "easy",
  related_to: "String Manipulation"
});


// Insert the test cases
await TestCase.insertMany([
  {
    problem_no: 2,
    input: `word1 = "abc"\nword2 = "pqr"\nobj = Sol()\nprint(obj.merge_alternately(word1, word2))`,
    expected_output: "apbqcr"
  },
  {
    problem_no: 2,
    input: `word1 = "ab"\nword2 = "pqrs"\nobj = Sol()\nprint(obj.merge_alternately(word1, word2))`,
    expected_output: "apbqrs"
  },
  {
    problem_no: 2,
    input: `word1 = "abcd"\nword2 = "pq"\nobj = Sol()\nprint(obj.merge_alternately(word1, word2))`,
    expected_output: "apbqcd"
  },
  {
    problem_no: 2,
    input: `word1 = "a"\nword2 = "b"\nobj = Sol()\nprint(obj.merge_alternately(word1, word2))`,
    expected_output: "ab"
  },
  {
    problem_no: 2,
    input: `word1 = "a"\nword2 = "bcd"\nobj = Sol()\nprint(obj.merge_alternately(word1, word2))`,
    expected_output: "abcd"
  },
  {
    problem_no: 2,
    input: `word1 = "abc"\nword2 = "d"\nobj = Sol()\nprint(obj.merge_alternately(word1, word2))`,
    expected_output: "adbc"
  },
  {
    problem_no: 2,
    input: `word1 = "x"\nword2 = "y"\nobj = Sol()\nprint(obj.merge_alternately(word1, word2))`,
    expected_output: "xy"
  },
  {
    problem_no: 2,
    input: `word1 = "longstring"\nword2 = "sml"\nobj = Sol()\nprint(obj.merge_alternately(word1, word2))`,
    expected_output: "lsomnlgstring"
  },
  {
    problem_no: 2,
    input: `word1 = ""\nword2 = "abc"\nobj = Sol()\nprint(obj.merge_alternately(word1, word2))`,
    expected_output: "abc"
  },
  {
    problem_no: 2,
    input: `word1 = "xyz"\nword2 = ""\nobj = Sol()\nprint(obj.merge_alternately(word1, word2))`,
    expected_output: "xyz"
  }
]);
mongoose.disconnect(); 
  } catch (error) {
    console.error("Error creating problem:", error);
  }
}

createProblem()