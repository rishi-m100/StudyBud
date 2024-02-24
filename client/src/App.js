import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";
import Card from "./components/Card";
import Button from "./components/Button";

const cardProps1 = {
  title: "Upload",
  button: "Upload",
  content: "Upload your files here.",
};

const cardProps2 = {
  title: "Practice",
  button: "Practice",
  content: "See your practice questions.",
};

const cardProps3 = {
  title: "Study Plan",
  button: "Study",
  content: "View your study plan here.",
};

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <center>
        <Card {...cardProps1} />
        <Card {...cardProps2} />
        <Card {...cardProps3} />
      </center>

      <br />
      {data && <p>Data from Flask backend: {data}</p>}
    </div>
  );
}

export default App;
