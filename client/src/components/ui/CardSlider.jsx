import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import InformationCard from '../InformationCard';
import BooksCard from '../BooksCard';
import SectionHeader from './SectionHeader';

import './CardSlider.css';

const CardSlider = ({ title, cards, viewMoreLink = "#" }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300 + 16; 
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <section className="card-slider-wrapper">
      <SectionHeader title={title} />
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
      <a href={viewMoreLink} className="card-slider__view-more">
      </a>
    </section>
  );
};

export default CardSlider;