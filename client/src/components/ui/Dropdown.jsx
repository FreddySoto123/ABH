import React, { useState, useEffect, useRef } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import "./Dropdown.css";

function Dropdown({
  label,
  href,
  dropdownItems = [],
  onLinkClick,
  className = "",
  showArrow = true,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  // Detectar si estamos en vista móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false);
    }
  };

  const handleMainLinkClick = (e) => {
    if (isMobile && dropdownItems.length > 0) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      if (onLinkClick) {
        onLinkClick(e);
      }
    }
  };

  const handleDropdownLinkClick = (e) => {
    setIsOpen(false);
    if (onLinkClick) {
      onLinkClick(e);
    }
  };

  // Manejo de teclado para accesibilidad
  const handleKeyDown = (e) => {
    if (dropdownItems.length === 0) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        if (isMobile) {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        if (!isOpen) {
          e.preventDefault();
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <li
      ref={dropdownRef}
      className={`dropdown-container ${className} ${isMobile ? 'dropdown-container--mobile' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <a
        href={href}
        className={`dropdown-main-link ${isMobile && dropdownItems.length > 0 ? 'dropdown-main-link--mobile-toggle' : ''}`}
        onClick={handleMainLinkClick}
        onKeyDown={handleKeyDown}
        role={dropdownItems.length > 0 ? "button" : "link"}
        aria-expanded={dropdownItems.length > 0 ? isOpen : undefined}
        aria-haspopup={dropdownItems.length > 0 ? "menu" : undefined}
        tabIndex="0"
      >
        {label}
        {showArrow && dropdownItems.length > 0 && (
          <span
            className={`dropdown-arrow ${isOpen ? 'dropdown-arrow--open' : ''}`}
            aria-hidden="true"
          >
            {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </span>
        )}
      </a>

      {dropdownItems.length > 0 && isOpen && (
        <ul
          className={`dropdown-menu ${isMobile ? 'dropdown-menu--mobile' : ''}`}
          role="menu"
          aria-label={`Submenú de ${label}`}
        >
          {dropdownItems.map((item, index) => (
            <li key={index} role="none">
              <a
                href={item.href}
                className="dropdown-link"
                onClick={handleDropdownLinkClick}
                role="menuitem"
                tabIndex="0"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default Dropdown;