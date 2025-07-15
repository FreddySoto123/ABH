import React, { useState } from "react";
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

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleMainLinkClick = (e) => {
    if (onLinkClick) {
      onLinkClick(e);
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
      className={`dropdown-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <a
        href={href}
        className="dropdown-main-link"
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
        <ul className="dropdown-menu">
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