import React from "react";
import { useLocation } from "react-router-dom";

import InfoCarga from "../component/infoCarga";
import SideNavTrapape from "../component/SideNavTrapape";

import { deleteData } from "../utils/firebaseService";
import { useNavigate } from "react-router-dom";

const DetalleCarga = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const carga = location?.state;

    // Función para manejar la eliminación de la carga
    const handleEliminarCarga = () => {
      const pathToDelete = `projects/proj_meqjHnqVDFjzhizHdj6Fjq/data/Loads/${carga.IdLoad}`; // Reemplaza con la ruta correcta
      deleteData(pathToDelete)
        .then(() => {
          // La carga se eliminó exitosamente, puedes redirigir a una página diferente o hacer algo más
          navigate("/cargas");
        })
        .catch((error) => {
          console.error("Error al eliminar la carga:", error);
          // Maneja el error de eliminación aquí
        });
    };
  

  return (
    <>
      <SideNavTrapape />
      <div className="p-4 sm:ml-64  bg-gray-100">
        <div className="mt-14 flex flex-row flex-wrap m-4">
          <div className="w-full p-4">
            <h1 className="text-left text-blue-800 uppercase text-xl">Detalle de la Carga: {carga.IdLoad}</h1>
            <button
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={handleEliminarCarga}
              >
                Eliminar
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
          </div>
          <InfoCarga carga={carga} />
        </div>
      </div>
    </>
  );
};

export default DetalleCarga;
