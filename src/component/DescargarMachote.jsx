import { useEffect, useState } from "react";
import { downloadStorage } from "../utils/firebaseStorage"; // Asegúrate de importar `storage` correctamente
import { UilFileDownload } from '@iconscout/react-unicons';

const DescargarMachote = () => {
  const [downloadURL, setDownloadURL] = useState("");

  useEffect(() => {
    downloadStorage("machotes/CARGAS MASIVAS TRAPAPE.xlsx")
      .then((url) => {
        setDownloadURL(url);
      })
      .catch((error) => {
        console.error("Error al obtener la URL de descarga:", error);
      });
  }, []);

  return (
    <div className="container mx-3 my-3 py-3 text-right">
      <p className="text-gray-500 capitalize text-base font-bold">
        Descargar machote
      </p>
      <a className="bg-blue-800 font-bold py-2 px-4 rounded-lg inline-flex items-center" href={downloadURL}>
        <UilFileDownload size="20" color="#FFFFFF"></UilFileDownload>
      </a>
    </div>
  );
};

export default DescargarMachote;
