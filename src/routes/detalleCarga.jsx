import React from "react";
import { useLocation } from "react-router-dom";

import InfoCarga from "../component/infoCarga";
import Maps from '../component/Maps';
/*import Componente3 from './Componente3';
import Componente4 from './Componente4';*/

const DetalleCarga = () => {
  const location = useLocation();
  const carga = location?.state;
  console.log(carga);

  return (
    <div className="flex">
      <div className="w-1/2">
        <div className="border p-4 mb-4">
          <InfoCarga carga={carga} />
        </div>
        <div className="border p-4">
            <Maps apiKey={"AIzaSyBs-iRGy4GQdnqmLrDqMSV8sIcraM9kXl4"} />
        </div>
      </div>
      <div className="w-1/2">
        {/* Componente3 */}
        <div className="border p-4 mb-4">{/*<Componente1 />*/}</div>
        {/* Componente4 */}
        <div className="border p-4">{/*<Componente1 />*/}</div>
      </div>
    </div>
  );
};

export default DetalleCarga;
