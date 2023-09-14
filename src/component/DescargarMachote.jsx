import { useEffect, useState } from "react";
import { downloadStorage } from "../utils/firebaseStorage"; // Asegúrate de importar `storage` correctamente
import { Download } from "react-feather";

const DescargarMachote = () => {
  const [downloadURL, setDownloadURL] = useState("");

  useEffect(() => {
    downloadStorage("machotes/CARGAS_MASIVAS_TRAPAPE.xlsx")
      .then((url) => {
        setDownloadURL(url);
      })
      .catch((error) => {
        console.error("Error al obtener la URL de descarga:", error);
      });
  }, []);

  return (
    <div className="pt-3">
      <p className="text-sm break-normal leading-relaxed">
        Tambi&eacute;n puede descargar nuestra platilla e ingresar la informaci&oacute;n correspondiente y posteriormente subirlo a la aplicaci&oacute;n de nuevo para crear las cargas.
      </p>
      <a className="flex items-center justify-center w-52 font-medium text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 rounded-lg text-sm px-5 py-2.5 text-center mt-2" href={downloadURL}>
        <span className="mr-1">
          <Download width={16} />
        </span>
        Descargar plantilla
      </a>
    </div>
  );
};

export default DescargarMachote;
