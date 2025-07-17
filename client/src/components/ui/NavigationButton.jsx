import { FiChevronRight } from "react-icons/fi";
import React from 'react'
import "./NavigationButton.css"

const NavigationButton = ({
    title,
    link,
    onLinkClick,
    buttonColor = 'transparent',
    borderColor = 'transparent',
    textColor = '#333333',
    borderRadius = '0px',
    hasIcon = false,
    className = '',
    ...props
}) => {
  
  const handleClick = (e) => {
    e.preventDefault();
    
    if (onLinkClick) {
      onLinkClick(link);
    } else if (link) {
      window.location.href = link;
    }
  };

  const buttonStyle = {
    backgroundColor: buttonColor,
    borderColor: borderColor,
    color: textColor,
    borderRadius: borderRadius,
  };

  return (
    <button 
      className={`navigation-button ${hasIcon ? 'navigation-button--with-icon' : ''} ${className}`}
      style={buttonStyle}
      onClick={handleClick}
      {...props}
    >
      <span className="navigation-button__text">{title}</span>
      {hasIcon && (
        <span className="navigation-button__icon">
          <FiChevronRight />
        </span>
      )}
    </button>
  )
}

export default NavigationButton
