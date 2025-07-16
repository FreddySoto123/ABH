import React from 'react';
import './Tour.css';

const Tour = ({ title, image, description, onPlay }) => {
  // Validate props to prevent React errors
  if (!title || !image || !description) {
    console.warn('Tour: Missing required props (title, image, description)');
    return null;
  }

  return (
    <div className="tour-card">
      <div 
        className="tour-card__background"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="tour-card__overlay">
          <div className="tour-card__content">
            <h2 className="tour-card__title">{title}</h2>
            
            <button 
              className="tour-card__play-button"
              onClick={onPlay}
              aria-label="Reproducir tour"
            >
              <svg 
                className="tour-card__play-icon" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            
            <p className="tour-card__description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
