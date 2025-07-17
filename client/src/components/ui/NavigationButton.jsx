import React from 'react'
import "./NavigationButton.css"

const NavigationButton = ({
    title,
    link,
    onLinkClick,
    buttonColor = 'transparent',
    borderColor = 'transparent',
    textColor = '#333333',
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
  };

  return (
    <button 
      className={`navigation-button ${className}`}
      style={buttonStyle}
      onClick={handleClick}
      {...props}
    >
      {title}
    </button>
  )
}

export default NavigationButton
