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

  const runCode = async () => {
    setError(""); // Clear any previous errors
    setOutput("Running..."); // Display running status
    try {
      const response = await axios.post("http://localhost:5000/api/compiler/run", { code });
      setOutput(response.data.output || "Code executed successfully with no output.");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while running the code.");
      setOutput("");
    }
  };

  const analyzeCode = async () => {
    setComplexity({ timeComplexity: "Analyzing...", spaceComplexity: "Analyzing..." }); // Indicate analyzing status
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

  const clearEditor = () => {
    setCode("");
    setOutput("");
    setError("");
    setComplexity({ timeComplexity: "", spaceComplexity: "" });
  };

  return (
    <div className="compiler-container">
      <h1>Python Online Compiler</h1>
      <div className="editor-container">
        <AceEditor
          mode="python"
          theme="monokai"
          name="python-editor"
          value={code}
          onChange={newCode => setCode(newCode)}
          fontSize={14}
          showPrintMargin={false}
          setOptions={{
            useWorker: false,
          }}
          style={{ width: "100%", height: "400px" }}
        />
        <div className="button-group">
          <button onClick={runCode} className="run-btn">Run Code</button>
          <button onClick={analyzeCode} className="analyze-btn">Analyze Code</button>
          <button onClick={clearEditor} className="clear-btn">Clear Editor</button>
        </div>
      </div>
      <div className="output-container">
        <h3>Output</h3>
        <pre id="output">{output}</pre>
        {error && <pre id="error" style={{ color: "red" }}>{error}</pre>}
      </div>
      <div className="complexity-container">
        <h3>Complexity Analysis</h3>
        <p>Time Complexity: {complexity.timeComplexity}</p>
        <p>Space Complexity: {complexity.spaceComplexity}</p>
      </div>
    </div>
  );
};

export default Compiler;
