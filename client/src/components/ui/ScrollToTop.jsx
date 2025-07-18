import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar el botón cuando el usuario haga scroll hacia abajo
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Volver arriba"
        >
          <FaChevronUp />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;