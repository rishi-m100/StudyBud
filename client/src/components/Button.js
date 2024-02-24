import React from "react";
import "../style/button.css";

const Button = ({text}) => {
    return (
     <button type = "button"> {text} </button>
    );
  };
  
  export default Button;