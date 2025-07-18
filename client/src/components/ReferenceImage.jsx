import React, { useState, useCallback, useMemo } from "react";
import "./ReferenceImage.css";

const ReferenceImage = ({
  image,
  autor,
  title,
  year,
  materiaType = "Fotografía",
  font = "Archivo visual de la Academia Boliviana de Historia Militar",
  url = "https://abhm.bo/imagenes/",
  className = "",
  aspectRatio = "1/1", // "16/9", "4/3", "1/1", "3/4", etc.
  size = "medium", // "small", "medium", "large", "full", "auto"
  style = {},
}) => {
  const [showReference, setShowReference] = useState(false);

  const hasReferenceData = useMemo(() => {
    return autor || title || year;
  }, [autor, title, year]);

  const getValueOrDefault = useCallback(
    (value, defaultValue = "Desconocido") => {
      return value && value.trim() !== "" ? value : defaultValue;
    },
    []
  );

  const apa7Reference = useMemo(() => {
    if (!hasReferenceData) {
      return "No hay información disponible sobre la procedencia de esta imagen";
    }

    const authorValue = getValueOrDefault(autor);
    const yearValue = getValueOrDefault(year);
    const titleValue = getValueOrDefault(title);

    return `${authorValue}. (${yearValue}). ${titleValue} [${materiaType}]. ${font}. ${url}`;
  }, [
    autor,
    year,
    title,
    materiaType,
    font,
    url,
    hasReferenceData,
    getValueOrDefault,
  ]);

  const containerStyle = useMemo(
    () => ({
      "--aspect-ratio": aspectRatio,
      ...style,
    }),
    [aspectRatio, style]
  );

  const altText = useMemo(() => {
    if (!hasReferenceData) {
      return "Imagen sin información de procedencia";
    }
    const titleValue = getValueOrDefault(title, "Imagen");
    const authorValue = getValueOrDefault(autor, "Autor desconocido");
    return `${titleValue} - ${authorValue}`;
  }, [title, autor, hasReferenceData, getValueOrDefault]);

  const handleMouseEnter = useCallback(() => {
    setShowReference(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowReference(false);
  }, []);

  const handleClick = useCallback(() => {
    setShowReference((prev) => !prev);
  }, []);

  if (!image) {
    return null;
  }

  const overlayClasses = `reference-image__overlay ${
    showReference ? "reference-image__overlay--visible" : ""
  }`.trim();

  const containerClasses =
    `reference-image reference-image--${size} ${className}`.trim();

  return (
    <div
      className={containerClasses}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img src={image} alt={altText} className="reference-image__img" />
      <div className={overlayClasses}>
        <p
          className={`reference-image__text ${
            !hasReferenceData ? "reference-image__text--no-data" : ""
          }`}
        >
          {apa7Reference}
        </p>
      </div>
    </div>
  );
};

export default ReferenceImage;
