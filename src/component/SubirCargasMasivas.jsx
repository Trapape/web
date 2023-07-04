import React, { useState } from "react";
import { ClipLoader } from 'react-spinners';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);
  const [apiResponse, setAPIResponse] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleFileUpload = async () => {
    if (file) {
      setLoading(true); // Activar el spinner de carga

      const storage = getStorage();
      const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;
      const storageRef = ref(
        storage,
        `media/proj_meqjHnqVDFjzhizHdj6Fjq/app_vjubyyTnE5REBNbo1HHscW/dataApplications/${fileName}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Puedes mostrar el progreso de carga aquí si deseas
        },
        (error) => {
          // Maneja los errores de carga aquí
          console.error(error);
          setLoading(false); // Desactivar el spinner de carga
        },
        async () => {
          // La carga se ha completado exitosamente
          console.log("Archivo subido con éxito");

          // Obtener la URL de descarga del archivo
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(url);

            const fetch = require("node-fetch");

            const urlAPI = "https://api-trapape.azurewebsites.net/api/DownloadExcel";
            const params = new URLSearchParams({
              URLExcel: url,
              userConsig: "4V1okNHGntWVAdGzIGo2MdCeukI2",
            });

            const requestUrl = `${urlAPI}?${params.toString()}`;
            console.log(requestUrl);

            try {
              const response = await fetch(requestUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              const data = await response.json();
              setDownloadURL(data);
              setLoading(false); // Desactivar el spinner de carga
            } catch (error) {
              console.log(error);
              setLoading(false); // Desactivar el spinner de carga
            }
          } catch (error) {
            console.error(error);
            setLoading(false); // Desactivar el spinner de carga
          }
        }
      );
    }
  };

  const handleDrop = (acceptedFiles) => {
    // Establecer el archivo seleccionado en el estado
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta el archivo aquí...</p>
        ) : (
          <p>
            Arrastra y suelta un archivo aquí, o haz clic para seleccionar un
            archivo
          </p>
        )}
      </div>
      {file && <p>Archivo seleccionado: {file.name}</p>}
      <Button variant="contained" onClick={handleFileUpload} disabled={!file}>
        Subir archivo
      </Button>
      {loading && (
        <div className="spinner">
          <ClipLoader color="#ffffff" size={35} />
        </div>
      )}
      {downloadURL && (
        <p>
          URL de descarga:{" "}
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            {downloadURL}
          </a>
        </p>
      )}
      {apiResponse && <p>Respuesta de la API: {JSON.stringify(apiResponse)}</p>}
    </div>
  );
};

export default FileUploader;
