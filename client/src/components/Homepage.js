import React from 'react';
import '../style/homepage.css'; 

function Homepage() {
  return (
    <div className="homepage">
      {/* <div className="background-image"></div> */}
      <div className="sidebar">
        <p className="description">Our website is dedicated to helping students practice, memorize, and study for exams based on their past notes that they can easily upload to our site.</p>
      </div>
      <div className="overlay">
        <h1 className="title">StudyBud</h1>
      </div>
    </div>
  );
}

export default Homepage;
