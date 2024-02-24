import React from "react";
import "../style/card.css";
import Button from "./Button";

const Card = ({title,content}) => {
  return (
   <div className="card">
    <h1>{title}</h1>
    <center>
      <Button text="Upload" />
    </center>
      <p>{content}</p>
   </div>
  );
};

export default Card;
