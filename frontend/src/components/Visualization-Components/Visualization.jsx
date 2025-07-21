import React, { useState } from "react";
import LocalFrameComponent from "./Local_vars_frame";
import '../../assets/css/visualization.css';
// import { executePythonCode } from "../utils/visualize_util";
// import useStore from "../store";

const VisualizationComponent = ({ code }) => {
  const [data, setData] = useState([]);
  const [currStep, setCurrStep] = useState(null);
  const [currStepNo, setCurrStepNo] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [memeUrl, setMemeUrl] = useState("");

const getSteps = async () => {
  setLoading(true);
  setError("");
  setMemeUrl("");

  try {
    console.log("Sending request to backend...");

    const response = await fetch("http://localhost:5000/api/visualize/getsteps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    console.log("Raw Response:", response);

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    // Try parsing JSON from the response body
    let data = await response.json();

    console.log("Raw parsed response:", data);

    // If data is still a string, try parsing again
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
        console.log("Parsed nested JSON:", data);
      } catch (e) {
        console.error("Failed to parse inner JSON:", e);
        throw new Error("Server returned invalid JSON format.");
      }
    }

    if (Array.isArray(data)) {
      console.log("✅ Successfully fetched steps:", data);
      setData(data);
      setCurrStepNo(0);
      setCurrStep(data[0]);
    } else {
      throw new Error("Response is not a valid array.");
    }
  } catch (err) {
    console.error("❌ Error fetching steps:", err);
    setError(err.message || "Unknown error");
    setData([]);
    setCurrStep(null);
  } finally {
    setLoading(false);
  }
};



  const prev = () => {
    if (currStepNo > 0) {
      const newStepNo = currStepNo - 1;
      setCurrStepNo(newStepNo);
      setCurrStep(data[newStepNo]);
    }
  };

  const next = () => {
    if (currStepNo < data.length - 1) {
      const newStepNo = currStepNo + 1;
      setCurrStepNo(newStepNo);
      setCurrStep(data[newStepNo]);
    }
  };

  return (
    <div className="main-container">
      <div>
        <button
          onClick={getSteps}
          disabled={loading}
          className="bg-gray-800 text-white px-4 py-2 rounded-md m-1 transition hover:bg-gray-600 disabled:bg-gray-400"
        >
          Visualize
        </button>
        <button
          onClick={prev}
          disabled={currStepNo === 0 || data.length === 0}
          className="bg-gray-800 text-white px-4 py-2 rounded-md m-1 transition hover:bg-gray-600 disabled:bg-gray-400"
        >
          Prev
        </button>
        <button
          onClick={next}
          disabled={currStepNo >= data.length - 1 || data.length === 0}
          className="bg-gray-800 text-white px-4 py-2 rounded-md m-1 transition hover:bg-gray-600 disabled:bg-gray-400"
        >
          Next
        </button>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            {memeUrl && <img src={memeUrl} alt="Loading Meme" className="meme-image" />}
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div>
        {currStep && (
          <>
            <p>Current Step: {currStep.line}</p>
            <LocalFrameComponent step={currStep} />
          </>
        )}
      </div>
    </div>
  );
};

export default VisualizationComponent;
