import { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { readDataField, listenToItem } from "../utils/firebaseService";
import { getSession, isLoggedIn } from "../utils/session";
import SubirCargasMasivas from "../component/SubirCargasMasivas";
import DescargarMachote from "../component/DescargarMachote";
import { UilParcel } from '@iconscout/react-unicons';
import { UilTruckLoading } from '@iconscout/react-unicons'
import { UilCalender } from '@iconscout/react-unicons'

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

    listenToItem("projects/proj_meqjHnqVDFjzhizHdj6Fjq/data/Loads", "921d993e-d25c-453d-98b3-eb269e38055f", (data) => {
      setItemData(data);
      console.log(data);
    });

    if (!isLoggedIn()) {
      navigate("/login");
    }

    
    if (userId) {
      setUid(userId);
      
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
        });
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

    return cargasByStatus.map((carga) => (
      <article key={carga.IdLoad} className="m-2 p-3 bg-white rounded-md shadow-lg w">
        <div className="flex mb-2">
          <h3 className="text-center text-xl text-zinc-700">{carga.cargaTitulo}</h3>
        </div>
        <div className="flex flex-wrap align-middle mb-2">
          <UilParcel size="14" color="#7F8487"></UilParcel>
          <span className="text-xs text-gray-500 px-1">Entrega: </span>
          <p className="text-justify break-all text-zinc-700 py-2">
            {carga.Punto.entrega.postal_code} - {carga.Punto.entrega.sublocality} - {carga.Punto.entrega.locality}
          </p>
        </div>
        <div className="flex flex-wrap align-middle">
          <UilTruckLoading size="14" color="#7F8487"></UilTruckLoading>
          <span className="text-xs text-gray-500 px-1">Recolecci&oacute;n: </span>
          <p className="text-justify break-all text-zinc-700 py-2">
            {carga.Punto.recoleccion.postal_code} - {carga.Punto.recoleccion.sublocality} - {carga.Punto.recoleccion.locality}
          </p>
        </div>
        
        <div className="">
          <span className="text-ys text-gray-500">ID: {carga.IdLoad}</span>
        </div>
      </article>
    ));
  };

  return (
    <>
      <div className="container mx-3 my-3 py-3">
        <div className="flex flex-row flex-nowrap">
        {cargaStatuses.map((status) => (
            <>
              <div className="flex-initial w-96 bg-slate-100 rounded-lg mx-1 py-3">
                <h6 className="text-left uppercase text-zinc-700 px-5">
                  {status}
                </h6>
                <div className="flex flex-col">
                  {renderCargasByStatus(status)}
                </div>
              </div>
            </>
        ))}
        </div>
      </div>
      <DescargarMachote />
      <SubirCargasMasivas />

      <div>
      {itemData ? (
        <div>Valor del item: {itemData.config.config.estatusCarga}</div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
      
    </>
  );
};

export default CargasAdmin;