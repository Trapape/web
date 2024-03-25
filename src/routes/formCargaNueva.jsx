import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Alert } from '@mui/material';
import { getSession, isLoggedIn } from "../utils/session";
import Recommendations from "../component/formComponents/Recommendations";

const FormCargaNueva = () => {
  let navigate = useNavigate();
  const [cargaContenido, setCargaContenido] = useState('');
  const [cargaDetalles, setCargaDetalles] = useState('');
  const [selectedTipoCarga, setSelectedTipoCarga] = useState('');
  const [showQuestions, setShowQuestions] = useState({
    General: false,
    Contenerizada: false,
    Sobredimensionado: false,
    "Granel Liquido": false,
    "Granel Solido": false,
    Plataforma: false
  });

  const [unidadSeleccionada, setUnidadSeleccionada] = useState('');
  const [remolqueSeleccionado, setRemolqueSeleccionado] = useState('');
  //Aqui empieza la posibilidad de los 2 remolques
  const [numeroPiezas, setNumeroPiezas] = useState('');
  const [embalajeSeleccionado, setEmbalajeSeleccionado] = useState('');
  const [alto, setAlto] = useState('');
  const [ancho, setAncho] = useState('');
  const [largo, setLargo] = useState('');
  const [peso, setPeso] = useState('');
  //State variables para 2do remolque
  const [numeroPiezas2, setNumeroPiezas2] = useState('');
  const [embalajeSeleccionado2, setEmbalajeSeleccionado2] = useState('');
  const [alto2, setAlto2] = useState('');
  const [ancho2, setAncho2] = useState('');
  const [largo2, setLargo2] = useState('');
  const [peso2, setPeso2] = useState('');
  //Contenerizada
  const [tamano, setTamano] = useState('');
  const [tipoContenedor,setTipoContenedor] = useState('');
  const [tamano2, setTamano2] = useState('');
  const [tipoContenedor2,setTipoContenedor2] = useState('');
  //Sobredimensionado
  const [sobreDimensionado, setSobreDimensionado] = useState('');
  //Granel Solido & Liquido
  const [granel,setGranel] = useState('');
  const [volumen, setVolumen] = useState('');
  //Plataforma
const [plataforma,setPlataforma] = useState('');
//Recomendaciones
const [recommendationsState, setRecommendationsState] = useState({
  "Carga refrigerada": false,
  "Manejar con cuidado": false,
  "Mantener seco": false,
  "Estibar": false,
});

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTipoCarga === '') {
      alert('Por favor selecciona un tipo de carga');
    } else {

    }

  };

  const handleTipoCargaChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedTipoCarga(selectedValue);

    // Mostrara diferentes preguntas segun tipoCarga
    const updatedShowQuestions = {
      General: selectedValue === 'General',
      Contenerizada: selectedValue === 'Contenerizada',
      Sobredimensionado: selectedValue === 'Sobredimensionado',
      "Granel Liquido": selectedValue === 'Granel Liquido',
      "Granel Solido": selectedValue === 'Granel Sólido',
      Plataforma: selectedValue === 'Plataforma'
    };

    setShowQuestions(updatedShowQuestions);
  };

  const handleChange = (e, setValue) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
  };
  //funcion regex para verifciar enteros
  const handleInputChange = (e, setValue) => {
    const inputValue = e.target.value;

    if (inputValue === '' || /^\d+$/.test(inputValue)){
      setValue(inputValue);
    }

  }

  useEffect(() => {
    if (recommendationsState) {
      console.log('Recommendations state updated:', recommendationsState);
      //Esto estaba generando un bucle infinito
    }
  }, [recommendationsState]);

  const handleRecommendationsChange = (updatedRecommendationsState) => {
    setRecommendationsState(updatedRecommendationsState);
  };
  

  return (
    <div className="mx-auto max-w-3xl p-4">
      <form onSubmit={handleSubmit}>
        <TextField
          label="¿Qué es lo que contiene su carga?"
          value={cargaContenido}
          onChange={(e) => setCargaContenido(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          className="mb-4"
          required
        />
        <TextField
          label="ID o nombre corto de tu carga (Opcional)"
          value={cargaDetalles}
          onChange={(e) => setCargaDetalles(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          className="mb-4"
        />
        <TextField
          label="Proporcione cualquier detalle acerca del contenido de su carga (Opcional)"
          value={cargaDetalles}
          onChange={(e) => setCargaDetalles(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          className="mb-4"
        />
        <RadioGroup
          aria-label="Tipo de carga"
          name="tipoCarga"
          value={selectedTipoCarga}
          onChange={handleTipoCargaChange}
          className="mb-4"
          required
        >
          <FormControlLabel value="General" control={<Radio />} label="General" />
          <FormControlLabel value="Contenerizada" control={<Radio />} label="Contenerizada" />
          <FormControlLabel value="Sobredimensionado" control={<Radio />} label="Sobredimensionado" />
          <FormControlLabel value="Granel Liquido" control={<Radio />} label="Granel Liquido" />
          <FormControlLabel value="Granel Sólido" control={<Radio />} label="Granel Sólido" />
          <FormControlLabel value="Plataforma" control={<Radio />} label="Plataforma" />
          
        </RadioGroup>

        {showQuestions['General'] && (
          <>
            <Select
              value={unidadSeleccionada}
              onChange={(e) => {
                handleChange(e,setUnidadSeleccionada);
                if (e.target.value !== '40') {
                  setRemolqueSeleccionado('Sencillo');
                  alert('Solo la caja de 40" puede ser Full');
                }
              }}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
            >
              
              <MenuItem value="" disabled>Seleccione tipo de unidad</MenuItem>
              <MenuItem value="caja1t">Caja 1 tonelada</MenuItem>
              <MenuItem value="caja3t">Caja 3 1/2 tonelada</MenuItem>
              <MenuItem value="rabon">Caja 1 rab&oacute;n</MenuItem>
              <MenuItem value="torton">Caja torton</MenuItem>
              <MenuItem value="40">Caja 40"</MenuItem>
              <MenuItem value="48">Caja 48"</MenuItem>
              <MenuItem value="53">Caja 53"</MenuItem>
          
            </Select>
            {unidadSeleccionada === '40' && (
            <Select
              value={remolqueSeleccionado}
              onChange={(e) => handleChange(e, setRemolqueSeleccionado)}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
            >
              
              <MenuItem value="" disabled>Seleccione número de remolque</MenuItem>
              <MenuItem value="Sencillo">Sencillo (1 remolque)</MenuItem>
              <MenuItem value="Full">Full (2 remolques)</MenuItem>
              
            </Select>
            )}
            {remolqueSeleccionado === 'Full' && (
              <p>Informaci&oacute;n del primer remolque:</p>
            )}
            <TextField
              label="No. de piezas"
              value={numeroPiezas}
              onChange={(e) => handleInputChange(e, setNumeroPiezas)}
              fullWidth
              type="number"
              margin="normal"
              variant="outlined"
              className="mb-4"
              inputProps={{min:1}}
            />
            <Select
              value={embalajeSeleccionado}
              onChange={(e) => handleChange(e, setEmbalajeSeleccionado)}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"

            >
              
              <MenuItem value="" disabled>Seleccione tipo de embalaje</MenuItem>
              
              <MenuItem value="Cajas">Cajas</MenuItem>
              <MenuItem value="Carton">Cart&oacute;n</MenuItem>
              <MenuItem value="Pallets">Pallets</MenuItem>
              <MenuItem value="Madera">Jaulas de madera</MenuItem>
              <MenuItem value="Vidrio">Envases de vidrio</MenuItem>
              <MenuItem value="Plastico">Envases de plastico</MenuItem>
              <MenuItem value="Bolsas">Sacos o bolsas</MenuItem>
              <MenuItem value="Atados">Atados</MenuItem>
              <MenuItem value="Na">No aplica</MenuItem>
              
            </Select>
            <div className="gap-x-2">
              <p>Cual es la dimensi&oacute;n total de su carga:</p>
              <TextField
                label="Alto (cm)"
                value={alto}
                onChange={(e) => handleInputChange(e, setAlto)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
              <TextField
                label="Ancho (cm)"
                value={ancho}
                onChange={(e) => handleInputChange(e, setAncho)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
                required
              />
              <TextField
                label="Largo (cm)"
                value={largo}
                onChange={(e) => handleInputChange(e, setLargo)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
            <div className="mb-8">
              <p>Cual es el peso total de su carga:</p>
              <TextField
                label ="Peso (kg)"
                value ={peso}
                onChange={(e) => handleInputChange(e, setPeso)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
            {/*Aqui empieza el segundo remolque */}
            {remolqueSeleccionado === 'Full' && (
              <>
              <p>Informaci&oacute;n del segundo remolque</p>
              <TextField
                label="No. de piezas"
                value={numeroPiezas2}
                onChange={(e) => handleInputChange(e, setNumeroPiezas2)}
                fullWidth
                type="number"
                margin="normal"
                variant="outlined"
                className="mb-4"
                inputProps={{min:1}}
              />
              <Select
                value={embalajeSeleccionado2}
                onChange={(e) => {
                  handleChange(e, setEmbalajeSeleccionado2);
                }}
                fullWidth
                displayEmpty
                variant="outlined"
                margin="normal"
                className="mb-4"
              >
                
                <MenuItem value="" disabled>Seleccione tipo de embalaje</MenuItem>
                
                <MenuItem value="Cajas">Cajas</MenuItem>
                <MenuItem value="Carton">Cart&oacute;n</MenuItem>
                <MenuItem value="Pallets">Pallets</MenuItem>
                <MenuItem value="Jaulas">Jaulas de madera</MenuItem>
                <MenuItem value="Vidrio">Envases de vidrio</MenuItem>
                <MenuItem value="Plastico">Envases de plastico</MenuItem>
                <MenuItem value="Bolsas">Sacos o bolsas</MenuItem>
                <MenuItem value="Atados">Atados</MenuItem>
                <MenuItem value="Na">No aplica</MenuItem>
                
              </Select>
              <div>
                <p>Cual es la dimensión total de su carga:</p>
                <TextField
                  label="Alto (cm)"
                  value={alto2}
                  onChange={(e) => handleInputChange(e, setAlto2)}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  inputProps={{min:1}}
                />
                <TextField
                  label="Ancho (cm)"
                  value={ancho2}
                  onChange={(e) => handleInputChange(e, setAncho2)}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  inputProps={{min:1}}
                />
                <TextField
                  label="Largo (cm)"
                  value={largo2}
                  onChange={(e) => handleInputChange(e, setLargo2)}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  inputProps={{min:1}}
                />
              </div>
              <div>
                <p>Cual es el peso total de su carga:</p>
                <TextField
                  label ="Peso (kg)"
                  value ={peso2}
                  onChange={(e) => handleInputChange(e, setPeso2)}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  inputProps={{min:1}}
                />
              </div>
              </>
            )}
          </>
        )}

        {showQuestions['Contenerizada'] && (
         <>
         <Select
              value={remolqueSeleccionado}
              onChange={(e) => handleChange(e, setRemolqueSeleccionado)}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
            >
              
              <MenuItem value="" disabled>Seleccione número de remolque</MenuItem>
              <MenuItem value="Sencillo">Sencillo (1 remolque)</MenuItem>
              <MenuItem value="Full">Full (2 remolques)</MenuItem>
              
            </Select>

            {remolqueSeleccionado === 'Full' && (
              <p>Informaci&oacute;n del primer remolque:</p>
            )}

            <Select
              value={tamano}
              onChange={(e) => handleChange(e, setTamano)}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
              disabled={tipoContenedor === "ISO" ? true : false}
            >
             
              <MenuItem value="" disabled>Seleciona el Tamaño</MenuItem>
              <MenuItem value="veinte">20"</MenuItem>
              <MenuItem value="cuarenta">40"</MenuItem>
            </Select>
            <Select
              value={tipoContenedor}
              onChange={(e) => {
                handleChange(e, setTipoContenedor);
                if (e.target.value === "ISO") {
                  setTamano("veinte"); // Pone veinte bloqueando el selector cuando se selecciona ISO
                }
              }}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
            >

              <MenuItem value="" disabled>Seleccione tipo de Contenedor</MenuItem>
              <MenuItem value="flatRack">Contenedor Flat Rack</MenuItem>
              <MenuItem value="highCube">Contenedor High Cube Dry</MenuItem>
              <MenuItem value="openTop">Contenedor Open Top</MenuItem>
              <MenuItem value="plataforma">Contenedor Plataforma</MenuItem>
              <MenuItem value="reefer">Contenedor Frigor&iacute;fico o Reefer</MenuItem>
              <MenuItem value="iso">ISO Tanque solo 20"</MenuItem>
              <MenuItem value="dry">Dry Containers (DC)</MenuItem>
              
            </Select>  

            <div className="mb-8">
              <p>Cual es el peso total de su carga:</p>
              <TextField
                label ="Peso (kg)"
                value ={peso}
                onChange={(e) => handleInputChange(e, setPeso)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
            
            {/*Aqui empieza el segundo contenedor */}

            {remolqueSeleccionado === 'Full' && (
              <>
              <p>Informaci&oacute;n del segundo remolque</p>
              <Select
              value={tamano2}
              onChange={(e) => handleChange(e, setTamano2)}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
              disabled={tipoContenedor2 === "ISO" ? true : false}
            >
             
              <MenuItem value="" disabled>Seleciona el Tamaño</MenuItem>
              <MenuItem value="veinte">20"</MenuItem>
              <MenuItem value="cuarenta">40"</MenuItem>
            </Select>
            <Select
              value={tipoContenedor2}
              onChange={(e) => {
                handleChange(e, setTipoContenedor2);
                if (e.target.value === "ISO") {
                  setTamano2("veinte"); // Pone veinte bloqueando el selector cuando se selecciona ISO
                }
              }}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
            >

              <MenuItem value="" disabled>Seleccione tipo de Contenedor</MenuItem>
              <MenuItem value="flatRack">Contenedor Flat Rack</MenuItem>
              <MenuItem value="highCube">Contenedor High Cube Dry</MenuItem>
              <MenuItem value="openTop">Contenedor Open Top</MenuItem>
              <MenuItem value="plataforma">Contenedor Plataforma</MenuItem>
              <MenuItem value="reefer">Contenedor Frigor&iacute;fico o Reefer</MenuItem>
              <MenuItem value="iso">ISO Tanque solo 20"</MenuItem>
              <MenuItem value="dry">Dry Containers (DC)</MenuItem>
              
            </Select>  

            <div className="mb-8">
              <p>Cual es el peso total de su carga:</p>
              <TextField
                label ="Peso (kg)"
                value ={peso2}
                onChange={(e) => handleInputChange(e, setPeso2)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
              </>
              
            )}
         </>
        )}

        {showQuestions['Sobredimensionado'] && (
          <>
            <Select
              value={sobreDimensionado}
              onChange={(e) => handleChange(e, setSobreDimensionado)}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
            >

              <MenuItem value="" disabled>Seleccione tipo de Plataforma</MenuItem>
              <MenuItem value="1t">Plataforma 1 tonelada</MenuItem>
              <MenuItem value="3t">Plataforma 3 1/2 toneladas</MenuItem>
              <MenuItem value="rabon">Plataforma rab&oacute;n</MenuItem>
              <MenuItem value="torton">Plataforma torton</MenuItem>
              <MenuItem value="48">Plataforma 48"</MenuItem>
              <MenuItem value="53">Plataforma 53"</MenuItem>
              <MenuItem value="lowBoy">Low Boy</MenuItem>
              
            </Select> 

            <div>
              <p>Cual es la dimensi&oacute;n total de su carga:</p>
              <TextField
                label="Alto (cm)"
                value={alto}
                onChange={(e) => handleInputChange(e, setAlto)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
              <TextField
                label="Ancho (cm)"
                value={ancho}
                onChange={(e) => handleInputChange(e, setAncho)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
              <TextField
                label="Largo (cm)"
                value={largo}
                onChange={(e) => handleInputChange(e, setLargo)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
            <div className="mb-8">
              <p>Cual es el peso total de su carga:</p>
              <TextField
                label ="Peso (kg)"
                value ={peso}
                onChange={(e) => handleInputChange(e, setPeso)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
          </>
        )}

        {showQuestions['Granel Liquido'] && (
          <>
            <Select
              value={granel}
              onChange={(e) => handleChange(e, setGranel)}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
            >

              <MenuItem value="" disabled>Seleccione tipo de Plataforma</MenuItem>
              <MenuItem value="camion">Cami&oacute;n tanque</MenuItem>
              <MenuItem value="trailer">Tr&aacute;iler tanque</MenuItem>
              <MenuItem value="contenedor">Contenedor ISO tanque</MenuItem>
              
              
            </Select> 
            <div className="mb-4">
              <p>Cual es el peso total de su carga:</p>
              <TextField
                label ="Peso (kg)"
                value ={peso}
                onChange={(e) => handleInputChange(e, setPeso)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
            <div className="mb-8">
              <p>Cual es el volumen total de su carga:</p>
              <TextField
                label ="Volumen (m3)"
                value ={volumen}
                onChange={(e) => handleInputChange(e, setVolumen)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
          </>
        )}
        
        {showQuestions['Granel Solido'] && (
          <>
            <Select
              value={granel}
              onChange={(e) => handleChange(e, setGranel)}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
            >

              <MenuItem value="" disabled>Seleccione tipo de Plataforma</MenuItem>
              <MenuItem value="volteo">Remolque de volteo</MenuItem>
              <MenuItem value="acero">Contenedores de acero</MenuItem>
              <MenuItem value="seca">Remolque caja seca</MenuItem>
              <MenuItem value="contenedor">Remolque de contenedor</MenuItem>
              
              
            </Select> 
            <div className="mb-4">
              <p>Cual es el peso total de su carga:</p>
              <TextField
                label ="Peso (kg)"
                value ={peso}
                onChange={(e) => handleInputChange(e, setPeso)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
            <div className="mb-8">
              <p>Cual es el volumen total de su carga:</p>
              <TextField
                label ="Volumen (m3)"
                value ={volumen}
                onChange={(e) => handleInputChange(e, setVolumen)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
          </>
        )}

        {showQuestions['Plataforma'] && (
          <>
            <Select
              value={plataforma}
              onChange={(e) => {
                handleChange(e,setPlataforma);
                if (e.target.value !== 'p40' && e.target.value !=='20') {
                  setRemolqueSeleccionado('Sencillo');
                  alert('Solo las plataformas de 20" y 40" pueden ser Full');
                }
              }}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
            >
              
              <MenuItem value="" disabled>Seleccione tipo de unidad</MenuItem>
              <MenuItem value="pcamion">Cami&oacute;n con plataforma</MenuItem>
              <MenuItem value="p20">Plataforma 20"</MenuItem>
              <MenuItem value="p40">Plataforma 40"</MenuItem>
              <MenuItem value="p45">Plataforma 45"</MenuItem>

            </Select>
            {(plataforma === 'p40' || plataforma === 'p20') && (
            <Select
              value={remolqueSeleccionado}
              onChange={(e) => handleChange(e, setRemolqueSeleccionado)}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"
            >
              
              <MenuItem value="" disabled>Seleccione número de remolque</MenuItem>
              <MenuItem value="Sencillo">Sencillo (1 remolque)</MenuItem>
              <MenuItem value="Full">Full (2 remolques)</MenuItem>
              
            </Select>
            )}
            {remolqueSeleccionado === 'Full' && (
              <p>Informaci&oacute;n del primer remolque:</p>
            )}
            <TextField
              label="No. de piezas"
              value={numeroPiezas}
              onChange={(e) => handleInputChange(e, setNumeroPiezas)}
              fullWidth
              type="number"
              margin="normal"
              variant="outlined"
              className="mb-4"
              inputProps={{min:1}}
            />
            <Select
              value={embalajeSeleccionado}
              onChange={(e) => handleChange(e, setEmbalajeSeleccionado)}
              fullWidth
              displayEmpty
              variant="outlined"
              margin="normal"
              className="mb-4"

            >
              
              <MenuItem value="" disabled>Seleccione tipo de embalaje</MenuItem>
              
              <MenuItem value="Cajas">Cajas</MenuItem>
              <MenuItem value="Carton">Cart&oacute;n</MenuItem>
              <MenuItem value="Pallets">Pallets</MenuItem>
              <MenuItem value="Madera">Jaulas de madera</MenuItem>
              <MenuItem value="Vidrio">Envases de vidrio</MenuItem>
              <MenuItem value="Plastico">Envases de plastico</MenuItem>
              <MenuItem value="Bolsas">Sacos o bolsas</MenuItem>
              <MenuItem value="Atados">Atados</MenuItem>
              <MenuItem value="Na">No aplica</MenuItem>
              
            </Select>
            <div>
              <p>Cual es la dimensi&oacute;n total de su carga:</p>
              <TextField
                label="Alto (cm)"
                value={alto}
                onChange={(e) => handleInputChange(e, setAlto)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
              <TextField
                label="Ancho (cm)"
                value={ancho}
                onChange={(e) => handleInputChange(e, setAncho)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
                required
              />
              <TextField
                label="Largo (cm)"
                value={largo}
                onChange={(e) => handleInputChange(e, setLargo)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
            <div className="mb-8">
              <p>Cual es el peso total de su carga:</p>
              <TextField
                label ="Peso (kg)"
                value ={peso}
                onChange={(e) => handleInputChange(e, setPeso)}
                type="number"
                margin="normal"
                variant="outlined"
                inputProps={{min:1}}
              />
            </div>
            {remolqueSeleccionado === 'Full' && (
              <>
              <p>Informaci&oacute;n del segundo remolque</p>
              <TextField
                label="No. de piezas"
                value={numeroPiezas2}
                onChange={(e) => handleInputChange(e, setNumeroPiezas2)}
                fullWidth
                type="number"
                margin="normal"
                variant="outlined"
                className="mb-4"
                inputProps={{min:1}}
              />
              <Select
                value={embalajeSeleccionado2}
                onChange={(e) => {
                  handleChange(e, setEmbalajeSeleccionado2);
                }}
                fullWidth
                displayEmpty
                variant="outlined"
                margin="normal"
                className="mb-4"
              >
                
                <MenuItem value="" disabled>Seleccione tipo de embalaje</MenuItem>
                
                <MenuItem value="Cajas">Cajas</MenuItem>
                <MenuItem value="Carton">Cart&oacute;n</MenuItem>
                <MenuItem value="Pallets">Pallets</MenuItem>
                <MenuItem value="Jaulas">Jaulas de madera</MenuItem>
                <MenuItem value="Vidrio">Envases de vidrio</MenuItem>
                <MenuItem value="Plastico">Envases de plastico</MenuItem>
                <MenuItem value="Bolsas">Sacos o bolsas</MenuItem>
                <MenuItem value="Atados">Atados</MenuItem>
                <MenuItem value="Na">No aplica</MenuItem>
                
              </Select>
              <div>
                <p>Cual es la dimensión total de su carga:</p>
                <TextField
                  label="Alto (cm)"
                  value={alto2}
                  onChange={(e) => handleInputChange(e, setAlto2)}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  inputProps={{min:1}}
                />
                <TextField
                  label="Ancho (cm)"
                  value={ancho2}
                  onChange={(e) => handleInputChange(e, setAncho2)}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  inputProps={{min:1}}
                />
                <TextField
                  label="Largo (cm)"
                  value={largo2}
                  onChange={(e) => handleInputChange(e, setLargo2)}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  inputProps={{min:1}}
                />
              </div>
              <div>
                <p>Cual es el peso total de su carga:</p>
                <TextField
                  label ="Peso (kg)"
                  value ={peso2}
                  onChange={(e) => handleInputChange(e, setPeso2)}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  inputProps={{min:1}}
                />
              </div>
              </>
            )}
          </>
        )}
{selectedTipoCarga && (
          <Recommendations
            selectedTipoCarga={selectedTipoCarga}
            recommendationsState={recommendationsState}
            onRecommendationsChange={handleRecommendationsChange}
          />
        )}        
        <Button type="submit" variant="contained" color="primary">
          Generar Nueva Carga
        </Button>
      </form>
    </div>
  );
};

export default FormCargaNueva;
