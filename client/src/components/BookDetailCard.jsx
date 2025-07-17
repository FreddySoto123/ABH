import React from 'react';
import './BookDetailCard.css';

const BookDetailCard = ({
  coverImage,
  mainTitle,
  author,
  code,
  status,
  shelf,
  publicationYear,
  isbn,
  legalDeposit,
}) => {
  return (
    <div className="book-detail-card">
      <div className="book-detail-card__cover">
        <img src={coverImage} alt={`Portada del libro ${mainTitle}`} />
      </div>
      <div className="book-detail-card__info">
        <h2 className="book-detail-card__title">{mainTitle}</h2>
        <div className="book-detail-card__accent-line"></div>
    
        <div className="book-detail-card__details-grid">
          <span className="book-detail-card__label">Autor:</span>
          <span className="book-detail-card__value">{author}</span>

          <span className="book-detail-card__label">Código:</span>
          <span className="book-detail-card__value">{code}</span>

          <span className="book-detail-card__label">Estado:</span>
          <span className="book-detail-card__value">{status}</span>

          <span className="book-detail-card__label">Estante:</span>
          <span className="book-detail-card__value">{shelf}</span>

          <span className="book-detail-card__label">Año de publicación:</span>
          <span className="book-detail-card__value">{publicationYear}</span>

          <span className="book-detail-card__label">ISBN:</span>
          <span className="book-detail-card__value">{isbn}</span>

          <span className="book-detail-card__label">Depósito legal:</span>
          <span className="book-detail-card__value">{legalDeposit}</span>
        </div>
      </div>
    </div>
  );
};

export default BookDetailCard;