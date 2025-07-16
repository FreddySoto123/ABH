import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  // Validate children to prevent React #130 error
  if (typeof children === 'object' && children !== null && !React.isValidElement(children)) {
    console.warn('Button: Invalid children prop, expected string or React element');
    return null;
  }
  const buttonClass = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled && 'btn--disabled',
    loading && 'btn--loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn__spinner"></span>}
      <span className={loading ? 'btn__text--loading' : 'btn__text'}>
        {children}
      </span>
    </button>
  );
};

export default Button;
