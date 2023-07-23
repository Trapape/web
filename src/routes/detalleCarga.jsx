import React from "react";
import { useLocation } from "react-router-dom";

import InfoCarga from "../component/infoCarga";
/*import Componente3 from './Componente3';
import Componente4 from './Componente4';*/

const DetalleCarga = () => {
  const location = useLocation();
  const carga = location?.state;

  return (
    <div className="flex flex-row flex-wrap m-4 bg-gray-100">
      <InfoCarga carga={carga} />
    </div>
  );
};

export default DetalleCarga;
