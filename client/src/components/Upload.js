import React, { useState } from "react";
import axios from "axios";
import "../style/upload.css";

function Upload() {
  const [fileContent, setFileContent] = useState(null);

  const handleUpload = (event) => {
    const formData = new FormData();
    const file = event.target.files[0]; // Get the selected file

    formData.append("file", file); // Append the file to FormData

    axios
      .post("http://127.0.0.1:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Assuming the response contains the content of the file
        console.log("File content:", response.data);
        // Set the file content to state to display it
        setFileContent(response.data); // Assuming message is the property containing the content
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div>
      <label htmlFor="file-upload" className="custom-file-upload">
        Upload
      </label>
      <input id="file-upload" type="file" onChange={handleUpload} />

    </div>
  );
}

export default Upload;
