import React from 'react';
import './InfoItem.css';
const InfoItem = ({ icon, title, descriptionLines = [] }) => {
  return (
    <div className="info-item">
      <div className="info-item__icon-wrapper">
        {icon}
      </div>
      <div className="info-item__text-wrapper">
        <strong>{title}</strong>
        {descriptionLines.map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </div>
    </div>
  );
};

export default InfoItem;