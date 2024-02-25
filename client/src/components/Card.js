import React from "react";
import "../style/card.css";
import Button from "./Button";
import Upload from "./Upload";

const Card = ({title,button,content,type}) => {
  return (
   <div className="card">
    <h1>{title}</h1>
    <center>
    {type === "button" ? (
          <Button text={button} />
        ) : type === "upload" ? (
          <Upload />
        ) : null}
    </center>
      <p>{content}</p>
   </div>
  );
};

export default Card;
