import React from "react";
import "../style/card.css";

const Card = ({title,content}) => {
  return (
   <div className="card">
    <h1>{title}</h1>
      <p>{content}</p>
   </div>
  );
};

export default Card;
