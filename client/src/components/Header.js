import React from "react";
import "../style/header.css";

const Header = () => {
  return (
    <header>
      {/* <h1>{title}</h1> */}
      <nav>
        <h1>home</h1>
        <h1>upload</h1>
        <h1>practice</h1>
        <h1>study plan</h1>
      </nav>
{/* 
      <div className="image-container">
        <img id="header-img" src={"../assets/learning.jpg"} />
        <div className="overlay"></div>
      </div> */}
    </header>
  );
};

export default Header;
