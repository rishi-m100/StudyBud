import React from "react";
import "../style/header.css";

const Header = () => {
  return (
    <header>
      {/* <h1>{title}</h1> */}
      <nav>
        <h1>Home</h1>
        <h1>Upload</h1>
        {/* <h1>Practice</h1> */}
        <h1>Study plan</h1>
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
