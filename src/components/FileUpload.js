import React, { useState } from "react";
import s3 from "../awsConfig";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = () => {
    if (!file) {
      alert("Selecciona un archivo primero.");
      return;
    }

    const params = {
      Bucket: "agramont-animal-adoption", // Cambia esto por tu bucket
      Key: `uploads/${file.name}`,
      Body: file,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error al subir archivo:", err);
        alert("Error al subir el archivo.");
      } else {
        alert(`Archivo subido: ${data.Location}`);
      }
    });
  };

  return (
    <div>
      <h2>Subir Archivo</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Subir</button>
    </div>
  );
};

export default FileUpload;