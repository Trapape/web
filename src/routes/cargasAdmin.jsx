import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { filterItemsByField } from "../utils/firebaseService";
import { getSession, isLoggedIn } from "../utils/session";
import SubirCargasMasivas from "../component/SubirCargasMasivas";
import DescargarMachote from "../component/DescargarMachote";
import { Package, MapPin } from "react-feather";

const CargasAdmin = () => {
  let navigate = useNavigate();
  const [cargas, setCargas] = useState([]);
  const [id, setUid] = useState("");
  const [cargasDisponibles, setCargasDisponibles] = useState(true);
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    let session = getSession();
    console.log(session);
    const userId = session?.user?.uid?.toString(); // Asegurar que las propiedades existan antes de convertir el ID a string

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

    return cargasByStatus.length > 0 ? cargasByStatus.map((carga) => (
      <div key={carga.IdLoad} className="p-4 mt-2 bg-white rounded-lg shadow-lg" onClick={() => handleClick(carga)}>
        <div className="flex mb-2">
          <h3 className="text-left text-lg text-gray-700">
            {carga.cargaTitulo}
          </h3>
        </div>
        <div className="flex flex-col align-middle mb-2">
          <div className="flex items-center">
            <span class="inline-flex items-center rounded-md bg-blue-50 px-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <Package width={14} />
              <span className="text-xs text-blue-700 px-1">Entrega</span>
            </span>
          </div>
          <p className="text-justify break-all text-gray-700 py-2">
            {carga.Punto.entrega.postal_code} -{" "}
            {carga.Punto.entrega.sublocality} - {carga.Punto.entrega.locality}
          </p>
        </div>
        <div className="flex flex-col align-middle">
          <div className="flex items-center">
            <span class="inline-flex items-center rounded-md bg-blue-50 px-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <MapPin width={14} />
              <span className="text-xs text-blue-700 px-1">
                Recolecci&oacute;n
              </span>
            </span>
          </div>
          <p className="text-justify break-all text-gray-700 py-2">
            {carga.Punto.recoleccion.postal_code} - {" "}
            {carga.Punto.recoleccion.sublocality} - {" "}
            {carga.Punto.recoleccion.locality}
          </p>
        </div>
        <div className="">
          <span className="text-ys text-gray-500">ID: {carga.IdLoad}</span>
        </div>
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
                <h6 className="text-center uppercase bg-slate-100 rounded-lg text-gray-700 py-2 text-sm">
                  {status}
                </h6>
                <div className="flex flex-col mt-3">
                  {renderCargasByStatus(status)}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <DescargarMachote />
      <SubirCargasMasivas />
    </>
  );
};

export default CargasAdmin;
