import React from "react";
import "../style/button.css";

const Button = ({ text }) => {
  return (
    <div>
      <button className="dynamic-button" type="button">
        {" "}
        {text}{" "}
      </button>
    </div>
  );
};

export default Button;
