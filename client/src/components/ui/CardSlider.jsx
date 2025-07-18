import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import InformationCard from '../InformationCard';
import BooksCard from '../BooksCard';
import SectionHeader from './SectionHeader';

import './CardSlider.css';

const CardSlider = ({ 
  title, 
  cards, 
  viewMoreLink = "#",
  centerTitle = false,
  backgroundImage = null
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.children[0];
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gapStyle = window.getComputedStyle(scrollRef.current).gap;
      const gap = parseInt(gapStyle) || 16;
      const scrollAmount = cardWidth + gap;

      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!cards || cards.length === 0) {
    return null;
  }
  

  const wrapperStyle = backgroundImage ? { 
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})` 
  } : {};


  const isTitleWhite = !!backgroundImage;

  return (

    <section className="card-slider-wrapper" style={wrapperStyle}>
      <div className="card-slider__content">
        <SectionHeader 
          title={title} 
          left={!centerTitle} 
          whiteText={isTitleWhite} 
        />
        <div className="card-slider__viewport">
          <button className="card-slider__arrow card-slider__arrow--left" onClick={() => scroll('left')}>
            <FiChevronLeft size={40} />
          </button>

          <div className="card-slider__container" ref={scrollRef}>
            {cards.map((card, index) => {
              if (card.type === 'information') {
                return <InformationCard key={index} {...card.props} />;
              }
              if (card.type === 'book') {
                return <BooksCard key={index} {...card.props} />;
              }
              return null;
            })}
          </div>

          <button className="card-slider__arrow card-slider__arrow--right" onClick={() => scroll('right')}>
            <FiChevronRight size={40} />
          </button>
        </div>
        <a 
          href={viewMoreLink} 
          className={`card-slider__view-more ${isTitleWhite ? 'card-slider__view-more--white' : ''}`}
        >
          Ver más 
        </a>
      </div>
    </section>
  );
};

export default CardSlider;