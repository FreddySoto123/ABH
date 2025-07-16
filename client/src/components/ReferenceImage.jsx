import React, { useState, useCallback, useMemo } from 'react';
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

    const apa7Reference = useMemo(() => {
        return `${autor}. (${año}). ${titulo} [${tipoMaterial}]. ${fuente}. ${url}`;
    }, [autor, año, titulo, tipoMaterial, fuente, url]);

    const containerStyle = useMemo(() => ({
        width: `${width}px`,
        height: `${height}px`
    }), [width, height]);

    const altText = useMemo(() => `${titulo} - ${autor}`, [titulo, autor]);

    const handleMouseEnter = useCallback(() => {
        setShowReference(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setShowReference(false);
    }, []);

    const handleClick = useCallback(() => {
        setShowReference(prev => !prev);
    }, []);

    if (!image || !autor || !titulo || !año) {
        return null;
    }

    const overlayClasses = `reference-image__overlay ${showReference ? 'reference-image__overlay--visible' : ''}`.trim();

    return (
        <div
            className="reference-image"
            style={containerStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <img
                src={image}
                alt={altText}
                className="reference-image__img"
            />
            <div className={overlayClasses}>
                <p className="reference-image__text">
                    {apa7Reference}
                </p>
            </div>
        </div>
    );
};

export default ReferenceImage;