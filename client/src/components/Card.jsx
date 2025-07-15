import './Card.css';

const Card = ({ title, description, date, imageUrl }) => {
  const hasImage = Boolean(imageUrl);
  const hasDate = Boolean(date);

  return (
    <div
      className={`card-custom ${hasImage ? 'card-custom--with-image' : 'card-custom--no-image'}`}
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
