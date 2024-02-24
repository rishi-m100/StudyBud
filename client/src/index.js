import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";
import Card from "./components/Card";
import Button from "./components/Button";

const root = ReactDOM.createRoot(document.getElementById("root"));

const cardProps1 = {
  title: "Upload",
  content: "Upload your files here.",
};

const cardProps2 = {
  title: "Practice",
  content: "See your practice questions.",
};

const cardProps3 = {
  title: "Study Plan",
  content: "View your study plan here.",
};

root.render(
  // <React.StrictMode>
  <div>
    <Header />
    <center>
      <Card {...cardProps1} />
      <Card {...cardProps2} />
      <Card {...cardProps3} />
    </center>

    <br />
    <Button text="yippee" />
  </div>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
