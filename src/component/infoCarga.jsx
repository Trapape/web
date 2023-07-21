import React from "react";

const infoCarga = ({ carga }) => {
  return (
    <div>
      <h1>Componente Hijo</h1>
      <p>ID de carga: {carga.IdLoad}</p>
      <p>Tipo de carga: {carga.tipoCarga}</p>
      {/* Mostrar más información del objeto carga según sea necesario */}
    </div>
  );
};

export default infoCarga;