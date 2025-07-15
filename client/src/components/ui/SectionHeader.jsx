import React from 'react';
import './SectionHeader.css';

const SectionHeader = ({
  title,
  left,
  extrabold,
  whiteText,
  marginLeft
}) => {
  const containerClasses = [
    'section-header',
    left && 'section-header--left',
    extrabold && 'section-header--extrabold',
    whiteText && 'section-header--text-white'
  ].filter(Boolean).join(' ');

  const customStyle = marginLeft && left ? { marginLeft: `${marginLeft}px` } : {};

  return (
    <div className={containerClasses} style={customStyle}>
      <h2 className="section-header__title">
        {title}
      </h2>
      <div className="section-header__underline"></div>
    </div>
  );
};

export default SectionHeader;