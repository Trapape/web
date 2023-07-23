import React from "react";
import { useLocation } from "react-router-dom";

import InfoCarga from "../component/infoCarga";
import SideNavTrapape from "../component/SideNavTrapape";

const DetalleCarga = () => {
  const location = useLocation();
  const carga = location?.state;

  return (
    <>
      <SideNavTrapape />
      <div className="p-4 sm:ml-64  bg-gray-100">
        <div className="mt-14 flex flex-row flex-wrap m-4">
          <div className="w-full p-4">
            <h1 className="text-left text-blue-800 uppercase text-xl">Detalle de la Carga: {carga.IdLoad}</h1>
          </div>
          <InfoCarga carga={carga} />
        </div>
      </div>
    </>
  );
};

export default DetalleCarga;
