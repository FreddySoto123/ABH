import React, { useState, useEffect } from "react";
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

  // Detectar si estamos en vista móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      // En móvil, si tiene dropdown, prevenir navegación y toggle el dropdown
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      // En desktop o si no tiene dropdown, navegar normalmente
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

  return (
    <li 
      className={`dropdown-container ${className} ${isMobile ? 'dropdown-container--mobile' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <a
        href={href}
        className={`dropdown-main-link ${isMobile && dropdownItems.length > 0 ? 'dropdown-main-link--mobile-toggle' : ''}`}
        onClick={handleMainLinkClick}
      >
        {label}
        {showArrow && dropdownItems.length > 0 && (
          <span className="dropdown-arrow">
            {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </span>
        )}
      </a>
      
      {dropdownItems.length > 0 && isOpen && (
        <ul className={`dropdown-menu ${isMobile ? 'dropdown-menu--mobile' : ''}`}>
          {dropdownItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="dropdown-link"
                onClick={handleDropdownLinkClick}
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