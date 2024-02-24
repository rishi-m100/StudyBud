import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";
import Card from "./components/Card";

const root = ReactDOM.createRoot(document.getElementById("root"));

const cardProps = {
  title: "Welcome to My App",
  content: "This is the content of the card.",
};

const cardProps2 = {
  title: "hi",
  content: "ronitplayz",
};

root.render(
  // <React.StrictMode>
  <div>
    <Header />
    <Card {...cardProps} />
    <Card {...cardProps} />
    <Card {...cardProps} />
    <Card {...cardProps2} />
  </div>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
