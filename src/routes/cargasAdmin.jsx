import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { filterItemsByField } from "../utils/firebaseService";
import { getSession, isLoggedIn } from "../utils/session";
import { Package, MapPin, ChevronsRight, Filter } from "react-feather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const CargasAdmin = () => {
  let navigate = useNavigate();
  const [cargas, setCargas] = useState([]);
  const [id, setUid] = useState("");
  const [cargasDisponibles, setCargasDisponibles] = useState(true);
  const [itemData, setItemData] = useState(null);
  //filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchByDateOption, setSearchByDateOption] = useState(""); // Puedes establecer "entrega" o "ambas"
  const [dateOption, setDateOption] = useState("exacta"); // Puedes establecer "rango"
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchByTypeLoadOption, setSearchByTypeLoadOption] = useState("");

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
    } else {
      console.error("No se pudo obtener el ID de usuario");
    }
  }, [navigate]);

  const cargaStatuses = [
    "Publicada",
    "Aceptada",
    "En recoleccion",
    "En tránsito",
    "En entrega",
    "Finalizada",
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleSearchByDateOptionChange = (event) => {
    setSearchByDateOption(event.target.value);
  };

  const handleDateOptionChange = (event) => {
    setDateOption(event.target.value);
  };

  const handleSearchByTypeLoadOptionChange = (event) => {
    setSearchByTypeLoadOption(event.target.value);
  };

  const renderCargasByStatus = (status) => {
    const cargasByStatus = filteredCargas.filter(
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
        case "Publicada":
          return (
            <p className="text-justify break-all text-xs text-gray-500 py-2">
              Fecha Recolecci&oacute;n: {detalleCarga.Punto.recoleccion.fecha}
            </p>
          );
        case "Finalizada":
          return (
            <>
              <p className="text-justify break-all text-xs text-gray-500 mt-3">
                Fecha Recolecci&oacute;n: {detalleCarga.Punto.recoleccion.fecha}
              </p>
              <p className="text-justify break-all text-xs text-gray-500">
                Fecha Entrega: {detalleCarga.Punto.entrega.fecha}
              </p>
            </>
          );

        default:
          return (
            <p className="text-justify break-all text-xs text-gray-500 py-2">
              Fecha Entrega: {detalleCarga.Punto.entrega.fecha}
            </p>
          );
      }
    };

    const mostrarColorCarga = (estatusCarga) => {
      switch (estatusCarga) {
        case "Publicada":
          return (
            <div className="rounded-bl-lg rounded-br-lg bg-gradient-to-r from-slate-200 to-slate-500 h-2"></div>
          );
        case "Finalizada":
          return (
            <div className="rounded-bl-lg rounded-br-lg bg-gradient-to-r from-green-200 to-green-500 h-2"></div>
          );
        case "En recoleccion":
          return (
            <div className="rounded-bl-lg rounded-br-lg bg-gradient-to-r from-orange-200 to-orange-500 h-2"></div>
          );
        case "En tránsito":
          return (
            <div className="rounded-bl-lg rounded-br-lg bg-gradient-to-r from-sky-200 to-sky-500 h-2"></div>
          );
        case "En entrega":
          return (
            <div className="rounded-bl-lg rounded-br-lg bg-gradient-to-r from-violet-200 to-violet-500 h-2"></div>
          );
        default:
          return;
      }
    };

    return cargasByStatus.length > 0 ? (
      cargasByStatus.map((carga) => (
        <div
          key={carga.IdLoad}
          className="rounded-lg shadow-lg"
          onClick={() => handleClick(carga)}
        >
          <div className="p-4 mt-2 bg-white">
            <div className="mb-2">
              <h3 className="text-left text-lg">{carga.cargaTitulo}</h3>
              <span className="text-ys text-gray-500">ID: {carga.IdLoad}</span>
            </div>
            <div className="mb-2">
              <p className="line-clamp-4">
                {carga.Punto.recoleccion.locality},{" "}
                {carga.Punto.recoleccion.area_administrative_1}
                <span className="inline-flex align-middle text-gray-500 px-1">
                  <ChevronsRight width={16} />
                </span>
                {carga.Punto.entrega.locality},{" "}
                {carga.Punto.entrega.area_administrative_1}
              </p>
            </div>
            <div className="mb-1">{mostrarFechaCarga(carga)}</div>
          </div>
          {mostrarColorCarga(carga.config.config.estatusCarga)}
        </div>
      ))
    ) : (
      <p className="text-center text-gray-400 text-sm">Sin datos disponibles</p>
    );
  };

  function convertToDate(dateString) {
    const [day, month, year] = dateString.split("-");
    return new Date(`${month}-${day}-${year}`);
  }
  // Aplica los filtros a las cargas según los estados seleccionados
  const filteredCargas = cargas.filter((carga) => {
    let searchTermMatches = true;
    let dateMatches = true;
    let typeLoadMatches = true;

    try {
      const cargaRecoleccionDate = convertToDate(carga.Punto.recoleccion.fecha);
      const cargaEntregaDate = convertToDate(carga.Punto.entrega.fecha);

      if (
        carga.config.config.estatusCarga === selectedFilter ||
        selectedFilter === ""
      ) {
        // Aplica filtro por palabra clave
        searchTermMatches = carga.cargaTitulo
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        // Aplica filtro por tipo de carga
        if(searchByTypeLoadOption !== ""){
          typeLoadMatches = carga.tipoCarga === searchByTypeLoadOption;
        }
        

        // Aplica filtro por fecha de recolección, entrega o ambas
        if (searchByDateOption !== "") {
          if (searchByDateOption === "recoleccion") {
            if (dateOption === "exacta") {
              dateMatches = cargaRecoleccionDate.toDateString() === startDate.toDateString();
            } else if (dateOption === "rango") {
              dateMatches =
                cargaRecoleccionDate >= startDate &&
                cargaRecoleccionDate <= endDate;
            }
          } else if (searchByDateOption === "entrega") {
            if (dateOption === "exacta") {
              dateMatches = cargaEntregaDate.toDateString() === startDate.toDateString();
            } else if (dateOption === "rango") {
              dateMatches =
                cargaEntregaDate >= startDate && cargaEntregaDate <= endDate;
            }
          } else if (searchByDateOption === "ambas") {
            if (dateOption === "exacta") {
              dateMatches =
                cargaRecoleccionDate.toDateString() === startDate.toDateString() ||
                cargaEntregaDate.toDateString() === startDate.toDateString();
            } else if (dateOption === "rango") {
              dateMatches =
                (cargaRecoleccionDate >= startDate &&
                  cargaRecoleccionDate <= endDate) ||
                (cargaEntregaDate >= startDate && cargaEntregaDate <= endDate);
            }
          }
        }
      }
    } catch (error) {
      searchTermMatches = false;
      dateMatches = false;
    }

    return searchTermMatches && dateMatches && typeLoadMatches;
  });

  return (
    <>
      <div className="w-full p-3">
        <div className="flex flex-row flex-nowrap">
          <TextField
            label="Buscar"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mr-2"
          />
          <Select
            value={selectedFilter}
            onChange={handleFilterChange}
            variant="outlined"
            className="mr-2"
          >
            <MenuItem value="">Todos los estatus</MenuItem>
            {cargaStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          <div className="mr-2">
            <select
              value={searchByTypeLoadOption}
              onChange={handleSearchByTypeLoadOptionChange}
              className="p-2 border rounded-lg"
            >
              <option value="">Filtro por tipo de carga</option>
              <option value="General">General</option>
              <option value="Contenerizada">Contenerizada</option>
              <option value="Plataforma">Plataforma</option>
              <option value="Granel sólido">Granel sólido</option>
              <option value="Granel líquido">Granel líquido</option>
              <option value="Sobredimensionado">Sobredimensionado</option>
            </select>
          </div>
          <div className="mr-2">
            <select
              value={searchByDateOption}
              onChange={handleSearchByDateOptionChange}
              className="p-2 border rounded-lg"
            >
              <option value="">Filtro por fechas</option>
              <option value="recoleccion">Fecha de Recolección</option>
              <option value="entrega">Fecha de Entrega</option>
              <option value="ambas">Ambas Fechas</option>
            </select>
            {searchByDateOption === "" ? (
              <div></div>
            ) : (
              <>
                <div className="mr-2">
                  <select
                    value={dateOption}
                    onChange={handleDateOptionChange}
                    className="p-2 border rounded-lg"
                  >
                    <option value="exacta">Fecha Exacta</option>
                    <option value="rango">Rango de Fechas</option>
                  </select>
                </div>
                <div className="mr-2">
                  {dateOption === "exacta" ? (
                    <DatePicker
                      selected={startDate}
                      onChange={setStartDate}
                      placeholderText="Fecha"
                      className="p-2 border rounded-lg"
                    />
                  ) : (
                    <>
                      <DatePicker
                        selected={startDate}
                        onChange={setStartDate}
                        placeholderText="Fecha de Inicio"
                        className="p-2 border rounded-lg"
                      />
                      <DatePicker
                        selected={endDate}
                        onChange={setEndDate}
                        placeholderText="Fecha de Fin"
                        className="p-2 border rounded-lg"
                      />
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
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
                    <button className=" text-white w-auto h-auto bg-blue-700 hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm mx-3 px-2">
                      <span>
                        <Filter width={12} />
                      </span>
                    </button>
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
