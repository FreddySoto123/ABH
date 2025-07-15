import React from 'react';
import './PersonCard.css';

const PersonCard = ({
    title,
    name,
    image,
    cardMode
}) => {
    const containerClasses = [
        'person-card',
        cardMode && 'person-card--card-mode',
        !title && 'person-card--no-title'
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses}>
            <div className="person-card__blue-line"></div>
            {title && (
                <h3 className="person-card__title">
                    {title}
                </h3>
            )}
            <img
                src={image}
                alt={name}
                className="person-card__image"
            />
            <p className="person-card__name">
                {name}
            </p>
        </div>
    );
};

export default PersonCard;