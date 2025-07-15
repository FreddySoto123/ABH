import React from 'react';
import './SectionHeaderLeft.css';

const SectionHeader = ({ 
  title = "Our Institution", 
  underlineColor = "accent",
  textColor = "primary",
  className = ""
}) => {
  const containerClasses = [
    'section-header-left',
    underlineColor !== 'accent' ? `section-header-left--${underlineColor}` : '',
    textColor !== 'primary' ? `section-header-left--text-${textColor}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <h2 className="section-header-left__title">
        {title}
      </h2>
      <div className="section-header-left__underline"></div>
    </div>
  );
};

export default SectionHeader;