import React, { useState, useEffect, useMemo } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-python";
import "../assets/css/cp_compiler.css";

const Compiler = () => {
  const { problem_no } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [complexity, setComplexity] = useState({
    timeComplexity: "",
    spaceComplexity: "",
  });
  const [confettiActive, setConfettiActive] = useState(false);
  const audioFinish = useMemo(() => new Audio("/sounds/completed.mp3"), []);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const r = await axios.get(`http://localhost:5000/api/problems/${problem_no}`);
        if (r.data.success) {
          const p = r.data.problem[0];
          setProblem(p);
          const saved = localStorage.getItem(`problem_code_${problem_no}`);
          setCode(saved || p.boiler_code);
        } else setError("Failed to load problem details.");
      } catch (e) {
        console.error(e);
        setError("Error loading problem details.");
      }
    };
    fetchProblem();
  }, [problem_no]);

  const handleCodeChange = (c) => {
    setCode(c);
    localStorage.setItem(`problem_code_${problem_no}`, c);
  };

  const runCode = async () => {
    setError(""); setOutput("Running...");
    try {
      const r = await axios.post(`http://localhost:5000/api/compiler/run`, { code });
      setOutput(r.data.output || "No output.");
    } catch (e) {
      setError(e.response?.data?.error || "Run error");
      setOutput("");
    }
  };

  const runTests = async () => {
    setError("");
    try {
      const r = await axios.post(`http://localhost:5000/api/runtests/${problem_no}`, { code });
      if (r.data.success) {
        const totalTime = r.data.result.pop();
        const avg = totalTime / r.data.result.length;
        const failed = r.data.result.filter(x => !x.passed);
        if (failed.length) {
          setTestResults([failed[0]]);
        } else {
          setTestResults([{ input: "All tests passed", passed: true, total_average_execution_time: avg }]);
        }
      } else setError("Error running tests: " + r.data.error);
    } catch (e) {
      console.error(e);
      setError("Test execution error.");
    }
  };

  const analyzeComplexity = async () => {
    setComplexity({ timeComplexity: "Analyzing...", spaceComplexity: "Analyzing..." });
    try {
      const r = await axios.post(`http://localhost:5000/api/complexity/analyze`, { code });
      setComplexity({
        timeComplexity: r.data.timeComplexity || "N/A",
        spaceComplexity: r.data.spaceComplexity || "N/A",
      });
    } catch (e) {
      console.error(e);
      setComplexity({ timeComplexity: "Error", spaceComplexity: "Error" });
    }
  };

  const clearEditor = () => {
    setCode(""); setOutput(""); setError("");
    setTestResults([]);
    setComplexity({ timeComplexity: "", spaceComplexity: "" });
    localStorage.removeItem(`problem_code_${problem_no}`);
  };

  useEffect(() => {
    if (
      testResults.length === 1 &&
      testResults[0].passed &&
      testResults[0].input === "All tests passed"
    ) {
      audioFinish.play().catch(console.warn);
      setConfettiActive(true);
      const timer = setTimeout(() => setConfettiActive(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [testResults, audioFinish]);

  return (
    <div className="cp-compiler-container">
      {confettiActive && <Confetti />}
      {problem && (
        <div className="problem-statement">
          <h1>Problem {problem_no}</h1>
          <p>{problem.problem_statement}</p>
        </div>
      )}
      <div className="cp-editor-output">
        <div className="cp-editor-container">
          <AceEditor
            mode="python"
            theme="monokai"
            name="python-editor"
            value={code}
            onChange={handleCodeChange}
            fontSize={14}
            showPrintMargin={false}
            setOptions={{ useWorker: false }}
            style={{ width: "100%", height: "100%" }}
          />
          <div className="button-group">
            <button onClick={()=>{runCode(); analyzeComplexity();}}>Run Code</button>
            <button onClick={runTests}>Run Tests</button>
            <button onClick={clearEditor}>Clear</button>
          </div>
        </div>
        <div className="cp-output-container">
          <h3>Output</h3>
          <pre>{output}</pre>
          {error && <pre style={{ color: "red" }}>{error}</pre>}

          <h3>Test Results</h3>
          {testResults.length === 1 && testResults[0].passed && (
            <div className="success-card">
              <h2 className="relative top-0">🎉 Congratulations!</h2>
              <p>All Test Cases Passed Successfully ✅</p>
              <p>Avg Execution Time: {testResults[0].total_average_execution_time} ms</p>
              <p>Time Complexity: {complexity.timeComplexity}</p>
              <p>Space Complexity: {complexity.spaceComplexity}</p>
            </div>
          )}

          {testResults.length > 0 && testResults[0].input !== "All tests passed" && (
            testResults.map((r, i) => (
              <div key={i}>
                <p>Input: {JSON.stringify(r.input)}</p>
                <p>Expected: {r.expected_output}</p>
                <p>User Output: {r.user_output}</p>
                <p style={{color: r.passed?'green':'red'}}>{r.passed?'Passed':'Failed'}</p>
                <p style={{color: r.passed?'green':'red'}}>{r.passed?r.execution_time:r.error}</p>
                <hr/>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Compiler;
