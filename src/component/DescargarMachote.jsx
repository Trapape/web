import { useEffect, useState } from "react";
import { Grid, Paper, Typography, Link } from "@mui/material";
import { downloadStorage } from "../utils/firebaseStorage"; // Asegúrate de importar `storage` correctamente

const DescargarMachote = () => {
  const [downloadURL, setDownloadURL] = useState("");

  useEffect(() => {
    downloadStorage("machotes/CARGAS MASIVAS TRAPAPE.xlsx")
      .then((url) => {
        setDownloadURL(url);
      })
      .catch((error) => {
        console.error("Error al obtener la URL de descarga:", error);
      });
  }, []);

  return (
    <Grid item xs={12}>
      <Paper>
        <Typography variant="h6" gutterBottom>
          Descargar Machote
        </Typography>
        <Link href={downloadURL} download>
          Descargar archivo
        </Link>
      </Paper>
    </Grid>
  );
};

export default DescargarMachote;
