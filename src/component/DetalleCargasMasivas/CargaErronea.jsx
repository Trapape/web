import React from "react";
import { Package, ChevronsRight } from "react-feather";

const CargaErronea = ({ data }) => {
  // Verifica si data está vacío
  if (!data || data.length === 0) {
    return <p className="mt-5 text-gray-400">Sin información disponible</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {data.map((item) => {
        if (item.isSucces === true) {
          // Si item.isSucces no es true, omite el registro
          return null;
        }

        return (
          <li key={item.Load.idLoad} className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Package width={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate uppercase">
                  {item.Load.cargaTitulo}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {item.Load.Punto.recoleccion.locality},
                  {item.Load.Punto.recoleccion.administrative_area}{" "}
                  <span className="inline-flex align-middle text-gray-500 px-1">
                    <ChevronsRight width={16} />
                  </span>{" "}
                  {item.Load.Punto.entrega.locality},
                  {item.Load.Punto.entrega.administrative_area}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                <span className="mr-1 text-gray-500 font-normal text-sm">
                  Precio:{" "}
                </span>
                ${item.Load.precioViaje}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CargaErronea;
