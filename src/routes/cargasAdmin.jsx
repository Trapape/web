import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { filterItemsByField } from "../utils/firebaseService";
import { getSession, isLoggedIn } from "../utils/session";
import { Package, MapPin, ChevronsRight, Filter } from "react-feather";
import FiltroEstatusCarga from "../component/FiltroEstatusCarga";

const CargasAdmin = () => {
  let navigate = useNavigate();
  const [cargas, setCargas] = useState([]);
  const [id, setUid] = useState("");
  const [cargasDisponibles, setCargasDisponibles] = useState(true);
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    let session = getSession();
    const userId = session?.user?.uid?.toString();

    if (!isLoggedIn()) {
      navigate("/login");
    }

    if (userId) {
      setUid(userId);

      filterItemsByField(
        "projects/proj_meqjHnqVDFjzhizHdj6Fjq/data/Loads",
        "userConsig",
        userId,
        (data) => {
          setItemData(data);
          console.log(data);
          if (data === null) {
            setCargasDisponibles(false);
          } else {
            const cargasArray = Object.values(data);
            setCargas(cargasArray);
            setCargasDisponibles(true);
          }
        }
      );
      /*
      readDataField(
        "projects/proj_meqjHnqVDFjzhizHdj6Fjq/data/Loads",
        "userConsig",
        userId
      )
        .then((data) => {
          if (data === null) {
            setCargasDisponibles(false);
          } else {
            const cargasArray = Object.values(data);
            setCargas(cargasArray);
            setCargasDisponibles(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });*/
    } else {
      console.error("No se pudo obtener el ID de usuario");
    }
  }, [navigate]);

  const cargaStatuses = [
    "Publicada",
    "En recoleccion",
    "En tránsito",
    "En entrega",
    "Finalizada",
  ];

  const renderCargasByStatus = (status) => {
    const cargasByStatus = cargas.filter(
      (carga) => carga.config.config.estatusCarga === status
    );

    if (!cargasDisponibles) {
      return (
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            Sin cargas por el momento
          </Typography>
        </Grid>
      );
    }

    const handleClick = (carga) => {
      navigate("/detalleCarga", { state: carga });
    };

    const mostrarFechaCarga = (detalleCarga) => {
      switch (detalleCarga.config.config.estatusCarga) {
        case 'Publicada':
          return <p className="text-justify break-all text-xs text-gray-500 py-2">
            Fecha Recolecci&oacute;n: {detalleCarga.Punto.recoleccion.fecha}
          </p>;
        case 'Finalizada':
          return (<>
            <p className="text-justify break-all text-xs text-gray-500 mt-3">
              Fecha Recolecci&oacute;n: {detalleCarga.Punto.recoleccion.fecha}
            </p>
            <p className="text-justify break-all text-xs text-gray-500">
              Fecha Entrega: {detalleCarga.Punto.entrega.fecha}
            </p>
          </>
          );

        default:
          return <p className="text-justify break-all text-xs text-gray-500 py-2">
            Fecha Entrega: {detalleCarga.Punto.entrega.fecha}
          </p>
      }
    };

    const mostrarColorCarga = (estatusCarga) => {
      switch (estatusCarga) {
        case 'Publicada':
          return <div class="rounded-bl-lg rounded-br-lg bg-gradient-to-r from-slate-200 to-slate-500 h-2"></div>;
        case 'Finalizada':
          return <div class="rounded-bl-lg rounded-br-lg bg-gradient-to-r from-green-200 to-green-500 h-2"></div>;
        case 'En recoleccion':
          return <div class="rounded-bl-lg rounded-br-lg bg-gradient-to-r from-orange-200 to-orange-500 h-2"></div>;
        case 'En tránsito':
          return <div class="rounded-bl-lg rounded-br-lg bg-gradient-to-r from-sky-200 to-sky-500 h-2"></div>;
        case 'En entrega':
          return <div class="rounded-bl-lg rounded-br-lg bg-gradient-to-r from-violet-200 to-violet-500 h-2"></div>;
        default:
          return;
      }
    };

    return cargasByStatus.length > 0 ? cargasByStatus.map((carga) => (
      <div key={carga.IdLoad} className="rounded-lg shadow-lg" onClick={() => handleClick(carga)}>
        <div className="p-4 mt-2 bg-white">
          <div className="mb-2">
            <h3 className="text-left text-lg">
              {carga.cargaTitulo}
            </h3>
            <span className="text-ys text-gray-500">ID: {carga.IdLoad}</span>
          </div>
          <div className="mb-2">
            <p className="line-clamp-4">
              {carga.Punto.recoleccion.locality}, {carga.Punto.recoleccion.area_administrative_1}
              <span className="inline-flex align-middle text-gray-500 px-1">
                <ChevronsRight width={16} />
              </span>
              {carga.Punto.entrega.locality}, {carga.Punto.entrega.area_administrative_1}
            </p>
          </div>
          <div className="mb-1">
            {mostrarFechaCarga(carga)}
          </div>
        </div>
        {mostrarColorCarga(carga.config.config.estatusCarga)}
      </div>
    ))
      :
      <p className="text-center text-gray-400 text-sm">Sin datos disponibles</p>
  };

  return (
    <>
      <div className="w-full p-3">
        <div className="flex flex-row flex-nowrap">
          {cargaStatuses.map((status) => (
            <>
              <div className="flex-initial w-96 mx-1 py-3">
                <div className="flex items-center bg-slate-100 rounded-lg py-[4px]">
                  <div className="grow w-full">
                    <h6 className="text-center uppercase text-gray-700 text-sm">
                      {status}
                    </h6>
                  </div>
                  <div className="grow-0 w-12">
                    <FiltroEstatusCarga />
                  </div>
                </div>
                <div className="flex flex-col mt-3 p-2 h-screen overflow-y-scroll">
                  {renderCargasByStatus(status)}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default CargasAdmin;
