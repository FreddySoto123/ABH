import React, { useMemo } from 'react';
import './PersonCard.css';

const PersonCard = ({
    title,
    name,
    image,
    cardMode
}) => {
    const containerClasses = useMemo(() => {
        const classes = ['person-card'];

        if (cardMode) {
            classes.push('person-card--card-mode');
        }

        if (!title) {
            classes.push('person-card--no-title');
        }

        return classes.join(' ');
    }, [cardMode, title]);

    const altText = useMemo(() =>
        title ? `${title} - ${name}` : name,
        [title, name]
    );

    if (!name || !image) {
        console.warn('PersonCard: Missing required props - name and image are required');
        return null;
    }

    return (
        <div className={containerClasses}>
            <div className="person-card__blue-line" />
            {title && (
                <h3 className="person-card__title">
                    {title}
                </h3>
            )}
            <img
                src={image}
                alt={altText}
                className="person-card__image"
            />
            <p className="person-card__name">
                {name}
            </p>
        </div>
    );
};

export default PersonCard;