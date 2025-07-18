import React from 'react';
import './GoogleMapEmbed.css';

const GoogleMapEmbed = ({ 
  mapSrc, 
  title = 'Mapa de Ubicación', 
  width = '100%', 
  height = '500' 
}) => {
  if (!mapSrc) {
    console.error("La prop 'mapSrc' es requerida para el componente GoogleMapEmbed.");
    return null;
  }

  return (
    <div className="map-embed-container">
      <iframe
        src={mapSrc}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbed;