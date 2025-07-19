import React, { useRef, useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import InformationCard from "../InformationCard";
import BooksCard from "../BooksCard";
import SectionHeader from "./SectionHeader";

import "./CardSlider.css";

const CardSlider = ({
  title,
  cards = [],
  viewMoreLink = "#",
  centerTitle = false,
  backgroundImage = null,
  autoScroll = false,
  autoScrollInterval = 5000,
}) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const autoScrollRef = useRef(null);
  const getScrollAmount = useCallback(() => {
    if (!scrollRef.current) return 0;
    const container = scrollRef.current;
    const containerWidth = container.clientWidth;
    const firstCard = container.children[0];
    if (!firstCard) return containerWidth * 0.8;
    const cardRect = firstCard.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const computedStyle = window.getComputedStyle(container);
    const gap = parseInt(computedStyle.gap) || 20;
    const cardsVisible = Math.floor(containerWidth / (cardWidth + gap));
    const scrollCards = Math.max(1, cardsVisible);

    return scrollCards * (cardWidth + gap);
  }, []);

  const scroll = useCallback(
    (direction) => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;
      const scrollAmount = getScrollAmount();
      const currentScroll = container.scrollLeft;

      let newScrollPosition;
      if (direction === "left") {
        newScrollPosition = Math.max(0, currentScroll - scrollAmount);
      } else {
        const maxScroll = container.scrollWidth - container.clientWidth;
        newScrollPosition = Math.min(maxScroll, currentScroll + scrollAmount);
      }

      container.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    },
    [getScrollAmount]
  );

  const checkScrollPosition = useCallback(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const tolerance = 1;

    setCanScrollLeft(scrollLeft > tolerance);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
  }, []);

  useEffect(() => {
    if (!autoScroll) {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    autoScrollRef.current = setInterval(() => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const tolerance = 1;
      if (scrollLeft >= scrollWidth - clientWidth - tolerance) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, autoScrollInterval);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };
  }, [autoScroll, autoScrollInterval, scroll]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const timeoutId = setTimeout(checkScrollPosition, 100);
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkScrollPosition, 50);
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [checkScrollPosition]);

  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        checkScrollPosition();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [checkScrollPosition]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft" && canScrollLeft) {
        event.preventDefault();
        scroll("left");
      } else if (event.key === "ArrowRight" && canScrollRight) {
        event.preventDefault();
        scroll("right");
      }
    },
    [scroll, canScrollLeft, canScrollRight]
  );

  const handleWheel = useCallback(
    (event) => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;
      const isHorizontalScroll =
        Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const isShiftPressed = event.shiftKey;

      if (isHorizontalScroll || isShiftPressed || container.scrollTop === 0) {
        event.preventDefault();
        const scrollAmount = getScrollAmount() * 0.3;
        const direction =
          (event.deltaX || event.deltaY) > 0 ? scrollAmount : -scrollAmount;

        container.scrollBy({
          left: direction,
          behavior: "smooth",
        });
      }
    },
    [getScrollAmount]
  );

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragScrollStart, setDragScrollStart] = useState(0);

  const handleMouseDown = useCallback((event) => {
    if (event.button !== 0) return;
    setIsDragging(true);
    setDragStartX(event.clientX);
    setDragScrollStart(scrollRef.current?.scrollLeft || 0);
    event.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (!isDragging || !scrollRef.current) return;

      const deltaX = event.clientX - dragStartX;
      const newScrollLeft = dragScrollStart - deltaX;

      scrollRef.current.scrollLeft = newScrollLeft;
    },
    [isDragging, dragStartX, dragScrollStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!cards || cards.length === 0) {
    return null;
  }

  const wrapperStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
      }
    : {};

  const isTitleWhite = !!backgroundImage;

  const renderCard = (card, index) => {
    const key = card.id || index;

    switch (card.type) {
      case "information":
        return <InformationCard key={key} {...card.props} />;
      case "book":
        return <BooksCard key={key} {...card.props} />;
      default:
        console.warn(`Unknown card type: ${card.type}`);
        return null;
    }
  };

  return (
    <section
      className="card-slider-wrapper"
      style={wrapperStyle}
      role="region"
      aria-label={`${title} card slider`}
    >
      <div className="card-slider__content">
        <SectionHeader
          title={title}
          left={!centerTitle}
          whiteText={isTitleWhite}
        />

        <div className="row-component__container">
          <div className="button-container__card">
            <button
              className={`card-slider__arrow card-slider__arrow--left ${
                !canScrollLeft ? "card-slider__arrow--disabled" : ""
              }`}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll to previous cards"
            >
              <FiChevronLeft size={40} />
            </button>
          </div>

          <div className="card-slider__viewport">
            <div
              className="card-slider__container"
              ref={scrollRef}
              onKeyDown={handleKeyDown}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              tabIndex={0}
              role="list"
              aria-label={`${title} cards`}
              style={{
                cursor: isDragging ? "grabbing" : "grab",
                scrollBehavior: isDragging ? "auto" : "smooth",
              }}
            >
              {cards.map((card, index) => (
                <div key={card.id || index} role="listitem">
                  {renderCard(card, index)}
                </div>
              ))}
            </div>
          </div>

          <div className="button-container__card">
            <button
              className={`card-slider__arrow card-slider__arrow--right ${
                !canScrollRight ? "card-slider__arrow--disabled" : ""
              }`}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll to next cards"
            >
              <FiChevronRight size={40} />
            </button>
          </div>
        </div>

        {viewMoreLink && viewMoreLink !== "#" && (
          <button
            className={`card-slider__view-more-button ${
              isTitleWhite ? "card-slider__view-more-button--white" : ""
            }`}
            onClick={() => {
              window.location.href = viewMoreLink;
            }}
            aria-label={`View more ${title.toLowerCase()}`}
          >
            Ver más <FiArrowRight size={20} style={{ marginLeft: "8px" }} />
          </button>
        )}
      </div>
    </section>
  );
};

export default CardSlider;
