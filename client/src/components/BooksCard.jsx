import React from 'react';
import './BooksCard.css';

const BooksCard = ({
    image,
    tittle,
    author,
    fecha
}) => {
    // Validate props to prevent React errors
    if (!image || !tittle || !author || !fecha) {
        console.warn('BooksCard: Missing required props');
        return null;
    }
    const containerClasses = [
        'books-card',
    ].filter(Boolean).join(' ');
    const containerClassestexto = [
        'books-card-texto',
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses}>
            <div className="books-card__yellow-line"></div>
            <img
                src={image}
                className="books-card__image"
            />
            <div className={containerClassestexto}>
                <p className="books-card__tittle">
                {tittle}
                </p>
                <p className="books-card__author">
                    {author}
                </p>
                <p className="books-card__fecha">
                    {fecha}
                </p>
            </div>
        </div>
    );
};

export default BooksCard;