import React from "react";
import "../style/header.css";

const Header = () => {
  return (
    <header>
      {/* <h1>{title}</h1> */}

      <nav>
        <img className="logo" src="assets/logo3-t.png" />
        <a href="#">
          <h1>STUDY_BUD</h1>
        </a>
        {/* <a href="#"><h1>Upload</h1></a>
        {/* <h1>Practice</h1> */}
        {/* <a href="#"><h1>Study Plan</h1></a> */}
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
