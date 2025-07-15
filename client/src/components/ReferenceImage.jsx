import React, { useState } from 'react';
import './ReferenceImage.css';

const ReferenceImage = ({
    image,
    autor,
    titulo,
    año,
    tipoMaterial = "Fotografía",
    fuente = "Archivo visual de la Academia Boliviana de Historia Militar",
    url = "https://abhm.bo/imagenes/",
    width = 350,
    height = 350
}) => {
    const [showReference, setShowReference] = useState(false);

    if (!image || !autor || !titulo || !año) {
        return null;
    }

    const generateAPA7Reference = () => {
        return `${autor}. (${año}). ${titulo} [${tipoMaterial}]. ${fuente}. ${url}`;
    };

    const handleMouseEnter = () => {
        setShowReference(true);
    };

    const handleMouseLeave = () => {
        setShowReference(false);
    };

    const handleTouchStart = () => {
        setShowReference(!showReference);
    };

    const containerStyle = {
        width: `${width}px`,
        height: `${height}px`
    };

    const overlayClasses = [
        'reference-image__overlay',
        showReference && 'reference-image__overlay--visible'
    ].filter(Boolean).join(' ');

    return (
        <div
            className="reference-image"
            style={containerStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
        >
            <img
                src={image}
                alt={`${titulo} - ${autor}`}
                className="reference-image__img"
            />
            <div className={overlayClasses}>
                <p className="reference-image__text">
                    {generateAPA7Reference()}
                </p>
            </div>
        </div>
    );
};

export default ReferenceImage;