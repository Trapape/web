import React, { useEffect } from 'react';
import { AlertTriangle, Droplet, Wind, Archive, Slash } from 'react-feather';

function Recommendations({ selectedTipoCarga, recommendationsState, onRecommendationsChange }) {

  const recommendations = {
    General: ["Carga refrigerada", "Manejar con cuidado", "Mantener seco", "Estibar"],
    Contenerizada: ["Carga refrigerada", "Manejar con cuidado", "Mantener seco", "Estibar"],
    Sobredimensionado: ["Manejar con cuidado", "Mantener seco"],
    "Granel Liquido": ["Carga refrigerada", "Estibar"],
    "Granel Sólido": ["Manejar con cuidado", "Mantener seco"],
    Plataforma: ["Manejar con cuidado", "Mantener seco", "Estibar"]
  };

  // Mapeo de iconos a recomendaciones
  const iconMapping = {
    "Carga refrigerada": <Wind className='text-' />,
    "Manejar con cuidado": <AlertTriangle className='text-red-700' />,
    "Mantener seco": (
      <span className="relative">
        <Droplet className="text-blue-700 w-5 h-5" />
        <Slash style={{ position: 'absolute', top: '-0.1rem', right: '-0.12rem', zIndex: '10' }} />
      </span>
    ),
    "Estibar": <Archive />
  };

  const handleCheckboxChange = (recommendation) => {
    // Handle checkbox change here
  };

  return (
    <div>
      {recommendations[selectedTipoCarga] && recommendations[selectedTipoCarga].map((recommendation, index) => (
        <div key={index} className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              value={recommendation}
              onChange={() => handleCheckboxChange(recommendation)}
              className="mr-2"
            />
            <span>{recommendation}</span>
            {iconMapping[recommendation] && (
              <span className="ml-2">{iconMapping[recommendation]}</span>
            )}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Recommendations;