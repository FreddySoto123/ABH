import './InformationCard.css';
import { useMemo } from 'react';

const InformationCard = ({
  title,
  description,
  date,
  imageUrl,
  cardMode,
  className = '',
  onClick,
  ariaLabel,
  loading = false
}) => {
  // Memoize computed values for performance
  const cardData = useMemo(() => {
    const hasImage = Boolean(imageUrl);
    const hasDate = Boolean(date);
    
    const cardClasses = [
      'card-custom',
      hasImage ? 'card-custom--with-image' : 'card-custom--no-image',
      cardMode && 'card-custom--card-mode',
      loading && 'card-custom--loading',
      className
    ].filter(Boolean).join(' ');

    return {
      hasImage,
      hasDate,
      cardClasses,
      backgroundStyle: hasImage ? { backgroundImage: `url(${imageUrl})` } : {}
    };
  }, [imageUrl, cardMode, className, loading, date]);

  // Validate props after hooks are called
  if (!title || !description) {
    console.warn('InformationCard: Missing required props (title, description)');
    return null; // Return null if essential props are missing
  }

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event);
    }
  };

  // Determine if card should be interactive
  const isInteractive = Boolean(onClick);

  return (
    <div
      className={cardData.cardClasses}
      style={cardData.backgroundStyle}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? 'button' : 'article'}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel || `${title}: ${description}`}
      aria-busy={loading}
    >
      {loading && (
        <div className="card-custom__loading" aria-hidden="true">
          <div className="card-custom__spinner"></div>
        </div>
      )}
      
      <div className="card-custom__content">
        <h3 className="card-custom__title">
          {title}
        </h3>
        
        <p className="card-custom__description">
          {description}
        </p>
        
        {cardData.hasDate && (
          <time 
            className="card-custom__date"
            dateTime={date}
          >
            {date}
          </time>
        )}
      </div>
    </div>
  );
};

export default InformationCard;