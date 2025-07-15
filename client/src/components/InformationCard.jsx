import './InformationCard.css';import './InformationCard.css';

const Card = ({ title, description, date, imageUrl, cardMode }) => {
  const hasImage = Boolean(imageUrl);
  const hasDate = Boolean(date);
  const cardClasses = [
    'card-custom',
    hasImage ? 'card-custom--with-image' : 'card-custom--no-image',
    cardMode && 'card-custom--card-mode' 
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      style={hasImage ? { backgroundImage: `url(${imageUrl})` } : {}}
    >
      <div className="card-custom__content">
        <h3 className="card-custom__title">{title}</h3>
        <p className="card-custom__description">{description}</p>
        {hasDate && <p className="card-custom__date">{date}</p>}
      </div>
    </div>
  );
};


export default Card;