import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";
import Card from "./components/Card";
import Button from "./components/Button";
import LowerBar from "./components/Lower";

const cardProps1 = {
  title: "Upload",
  button: "Upload",
  content: "Upload your files here.",
  type: "upload",
};

// const cardProps2 = {
//   title: "Practice",
//   button: "Practice",
//   content: "See your practice questions.",
// };

const cardProps3 = {
  title: "Study Plan",
  button: "Study",
  content: "View your study plan here.",
  type: "button",
};
function App() {
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/predict") // Update URL if Flask is running on a different port
      .then((response) => {
        setAccuracy(response.data.accuracy);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <br />
      <br />
      <center>
        <Card {...cardProps1} />
        {/* <Card {...cardProps2} /> */}
        <Card {...cardProps3} />
      </center>

      <br />

      <LowerBar></LowerBar>
      {/* 
      <center>
        <h2>Prediction Accuracy</h2>
        <p>{accuracy !== null ? `Accuracy: ${accuracy}` : "Loading..."}</p>
      </center> */}

      {/* {data && <p>Data from Flask backend: {data}</p>} */}
      
    </div>
  );
}

export default App;
