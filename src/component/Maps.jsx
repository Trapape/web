import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsService } from "@react-google-maps/api";
import { listenToItem } from "../utils/firebaseService";
import { getSession, isLoggedIn } from "../utils/session";
import { useNavigate } from "react-router-dom";


const Maps = React.memo(({ cargas }) => {
  let navigate = useNavigate();
  const [id, setUid] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBs-iRGy4GQdnqmLrDqMSV8sIcraM9kXl4",
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null); // Estado para almacenar la ubicación del conductor

  // Ejemplo de matriz de objetos de marcadores
  const markers = [
    {
      position: { lat: cargas.Punto.recoleccion.location.latitude, lng: cargas.Punto.recoleccion.location.longitude },
      image: "url_de_la_imagen1.png",
      title: "Marcador 1",
      description: "Descripción del marcador 1",
    },
    {
      position: { lat: cargas.Punto.entrega.location.latitude, lng: cargas.Punto.entrega.location.longitude },
      image: "url_de_la_imagen2.png",
      title: "Marcador 2",
      description: "Descripción del marcador 2",
    },
    // Puedes agregar más objetos de marcadores aquí
  ];

  // Simulación de obtener la ubicación del conductor en useEffect
  useEffect(() => {
    // Aquí podrías obtener la ubicación del conductor desde Firebase o cualquier otra fuente de datos en tiempo real
    // Por simplicidad, aquí solo establecemos una ubicación de ejemplo
    let session = getSession();
    console.log(session);
    const userId = session?.user?.uid?.toString();

    if (!isLoggedIn()) {
      navigate("/login");
    }

    if (userId) {
      setUid(userId);

      listenToItem(
        "/projects/proj_meqjHnqVDFjzhizHdj6Fjq/geoFireGroups/ServiceTracking",
        cargas.IdLoad,
        (data) => {
          
          console.log(data);
          if (data === null) {
            
          } else {
            const driverLocationArray = Object.values(data);
            console.log(driverLocationArray);
            const exampleDriverLocation = { lat: data.l[0], lng: data.l[1] }; // Ubicación de ejemplo (Chicago, IL)
            setDriverLocation(exampleDriverLocation);

          }
        }
      );
    } else {
      console.error("No se pudo obtener el ID de usuario");
    }
  }, [cargas.IdLoad, navigate]);

  // Manejar clic en un marcador
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  // Cerrar el InfoWindow
  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={markers[0].position} zoom={10} onLoad={setMap}>
      {/* Renderizar los marcadores aquí */}
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          onClick={() => handleMarkerClick(marker)}
        />
      ))}

      {/* Renderizar el marcador de la ubicación del conductor si driverLocation es válida */}
      {
        driverLocation && (
        <Marker
          position={driverLocation}
          onClick={() => handleMarkerClick({ position: driverLocation, driverMarker: true })}
        />
      )}

      {/* Renderizar el InfoWindow cuando se hace clic en un marcador */}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={handleInfoWindowClose}
        >
          {/* Mostrar información del marcador seleccionado */}
          {selectedMarker.driverMarker ? (
            <div>
              <p>Ubicación del conductor</p>
              {/* Puedes agregar más información sobre la ubicación del conductor aquí */}
            </div>
          ) : (
            <div>
              <img src={selectedMarker.image} alt="Marcador" />
              <h3>{selectedMarker.title}</h3>
              <p>{selectedMarker.description}</p>
              {/* Mostrar más información del marcador según sea necesario */}
            </div>
          )}
        </InfoWindow>
      )}

      {/* Calcular y mostrar las direcciones entre marcadores si hay más de un marcador */}
      {markers.length > 1 && (
        <DirectionsService
          options={{
            destination: markers[markers.length - 1].position,
            origin: markers[0].position,
            waypoints: markers.slice(1, -1).map(marker => ({ location: marker.position })),
            travelMode: "DRIVING",
          }}
          callback={(result) => {
            if (result) {
              // Mostrar las direcciones en el mapa
              const directionsRenderer = new window.google.maps.DirectionsRenderer();
              directionsRenderer.setDirections(result);
              directionsRenderer.setMap(map);
            }
          }}
        />
      )}
    </GoogleMap>
  ) : <></>;
});

export default Maps;
