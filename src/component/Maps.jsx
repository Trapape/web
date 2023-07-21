import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const Maps = ({ apiKey }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 37.7749, // Latitud del centro del mapa
    lng: -122.4194, // Longitud del centro del mapa
  };

  const locations = [
    {
      lat: 37.7749, // Latitud de la ubicación del marcador
      lng: -122.4194, // Longitud de la ubicación del marcador
      title: "San Francisco", // Título del marcador
      description: "Descripción de San Francisco", // Descripción del marcador
    },
    // Agrega más ubicaciones según sea necesario
  ];

  const [selectedLocation, setSelectedLocation] = React.useState(null);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => setSelectedLocation(location)}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h2>{selectedLocation.title}</h2>
              <p>{selectedLocation.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;