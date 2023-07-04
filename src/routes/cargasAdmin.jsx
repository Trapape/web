import { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { readDataField } from "../utils/firebaseService";
import { getSession, isLoggedIn } from "../utils/session";
import SubirCargasMasivas from "../component/SubirCargasMasivas";
import DescargarMachote from "../component/DescargarMachote";

const CargasAdmin = () => {
  let navigate = useNavigate();
  const [cargas, setCargas] = useState([]);
  const [id, setUid] = useState("");
  const [cargasDisponibles, setCargasDisponibles] = useState(true);


  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }

    let session = getSession();
    console.log(session);
    const userId = session?.user?.uid?.toString(); // Asegurar que las propiedades existan antes de convertir el ID a string
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
      <Grid item xs={12} sm={6} md={4} lg={3} key={carga.IdLoad}>
  <Paper style={{ textAlign: 'center' }}>
    {/*<Typography>{carga.IdLoad}</Typography>*/}
    <Typography>{carga.cargaTitulo}</Typography>
    <Typography style={{ fontWeight: 'bold' }}>${carga.precioViaje}</Typography>
    <Typography style={{ fontWeight: 'bold' }}>Origen</Typography>
    <Typography>{carga.Punto.recoleccion.address}</Typography>
    <Typography style={{ fontWeight: 'bold' }}>Destino</Typography>
    <Typography>{carga.Punto.entrega.address}</Typography>
    {/* Otros detalles de la carga */}
  </Paper>
</Grid>
    ));
  };

  return (
    <>
      <Grid container spacing={2}>
        {cargaStatuses.map((status) => (
          <Grid item xs={12} key={status}>
            <Typography variant="h6" gutterBottom>
              {status}
            </Typography>
            <Grid container spacing={2}>
              {renderCargasByStatus(status)}
            </Grid>
          </Grid>
        ))}
      </Grid>

      <DescargarMachote />
      <SubirCargasMasivas />
      
    </>
  );
};

export default CargasAdmin;