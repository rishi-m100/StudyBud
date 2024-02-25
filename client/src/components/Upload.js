import React, { useState } from "react";
import axios from "axios";
import "../style/button.css";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("File uploaded successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className="dynamic-button-container">
      <input
        className="dynamic-button"
        type="file"
        onChange={handleFileChange}
      />
      {/* <button onClick={handleUpload}>Upload</button> */}
    </div>
  );
}

export default Upload;
