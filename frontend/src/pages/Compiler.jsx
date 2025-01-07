import React, { useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import "../assets/css/compiler.css";

// Import ACE themes and modes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-python";

const Compiler = () => {
  const [code, setCode] = useState(`# Write your Python code here\nprint("Hello, World!")`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [complexity, setComplexity] = useState({ timeComplexity: "", spaceComplexity: "" });
  const [steps, setSteps] = useState([]); // For visualization steps
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // Current step index for visualization

  const runCode = async () => {
    setError("");
    setOutput("Running...");
    try {
      const response = await axios.post("http://localhost:5000/api/compiler/run", { code });
      setOutput(response.data.output || "Code executed successfully with no output.");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while running the code.");
      setOutput("");
    }
  };

  const analyzeCode = async () => {
    setComplexity({ timeComplexity: "Analyzing...", spaceComplexity: "Analyzing..." });
    try {
      const response = await axios.post("http://localhost:5000/api/complexity/analyze", { code });
      setComplexity({
        timeComplexity: response.data.timeComplexity || "N/A",
        spaceComplexity: response.data.spaceComplexity || "N/A",
      });
    } catch (err) {
      setComplexity({ timeComplexity: "Error", spaceComplexity: "Error" });
      console.error(err);
    }
  };

  const visualizeCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/visualize/getsteps", { code });
      console.log("API Response:", response.data); // Log the response for debugging
      
      // Ensure the response is in the expected format (array of steps)
      const fetchedSteps = Array.isArray(response.data) ? response.data : [];
      
      if (fetchedSteps.length > 0) {
        setSteps(fetchedSteps);
        setCurrentStepIndex(0); // Reset to the first step
        setError(""); // Clear any error
      } else {
        setError("No steps returned from the API.");
        setSteps([]);
      }
    } catch (err) {
      setError("Failed to fetch steps for visualization.");
      console.error(err);
      setSteps([]);
    }
  };

  const clearEditor = () => {
    setCode("");
    setOutput("");
    setError("");
    setComplexity({ timeComplexity: "", spaceComplexity: "" });
    setSteps([]);
    setCurrentStepIndex(0);
  };

  const showNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const showPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="compiler-container">
      <h1>Python Online Compiler</h1>
      <div className="editor-output-container">
        <div className="editor-container">
          <AceEditor
            mode="python"
            theme="monokai"
            name="python-editor"
            value={code}
            onChange={(newCode) => setCode(newCode)}
            fontSize={14}
            showPrintMargin={false}
            setOptions={{ useWorker: false }}
            style={{ width: "100%", height: "400px" }}
          />
          <div className="button-group">
            <button onClick={runCode} className="run-btn">Run Code</button>
            <button onClick={analyzeCode} className="analyze-btn">Analyze Code</button>
            <button onClick={visualizeCode} className="visualize-btn">Visualize</button>
            <button onClick={clearEditor} className="clear-btn">Clear Editor</button>
          </div>
        </div>

        <div className="output-container">
          <h3>Output</h3>
          <pre id="output">{output}</pre>
          {error && <pre id="error" style={{ color: "red" }}>{error}</pre>}
        </div>
      </div>

      <div className="complexity-container">
        <h3>Complexity Analysis</h3>
        <p>Time Complexity: {complexity.timeComplexity}</p>
        <p>Space Complexity: {complexity.spaceComplexity}</p>
      </div>

      {/* Visualization Section */}
      {steps.length > 0 && (
        <div className="visualization-container">
          <h3>Visualization Steps</h3>
          <p>
            <strong>Step {steps[currentStepIndex]?.stepNumber}:</strong>{" "}
            {steps[currentStepIndex]?.description}
          </p>
          {/* Display additional information */}
          {steps[currentStepIndex]?.local_vars && (
            <div>
              <strong>Local Variables:</strong>
              <pre>{JSON.stringify(steps[currentStepIndex].local_vars, null, 2)}</pre>
            </div>
          )}
          {steps[currentStepIndex]?.line && (
            <div>
              <strong>Line Number:</strong> {steps[currentStepIndex].line}
            </div>
          )}
          {steps[currentStepIndex]?.value && (
            <div>
              <strong>Current Value:</strong> {steps[currentStepIndex].value}
            </div>
          )}

          <div className="button-group">
            <button onClick={showPreviousStep} disabled={currentStepIndex === 0}>Previous</button>
            <button onClick={showNextStep} disabled={currentStepIndex === steps.length - 1}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compiler;
