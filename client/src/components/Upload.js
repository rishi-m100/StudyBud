import React, { useState } from "react";
import axios from "axios";
import "../style/upload.css";

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
    //   <input type="file" onChange={handleFileChange} />
    <div>
      <label for="file-upload" class="custom-file-upload">
        Upload
      </label>
      <input id="file-upload" type="file" onChange="handleFileChange" />
    </div>
  );
}

export default Upload;
