import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-toggle">
      <input
        type="checkbox"
        id="toggle"
        className="toggle-checkbox"
        onChange={toggleTheme}
      />
      <label htmlFor="toggle" className="toggle-label">
        <span className="toggle-button" />
        <img
          src={theme === 'dark' ? 'media/images/topup/revBridge/toggle_sun.png' : 'media/images/topup/revBridge/toggle_moon.png'}
          alt={theme ? 'Sun' : 'Moon'}
          className="theme-icon"
        />
      </label>
    </div>
  );
};

export default ThemeToggle;
