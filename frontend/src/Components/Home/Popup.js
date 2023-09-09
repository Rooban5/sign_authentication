import React from 'react';
import './Popup.css';

const Popup = ({ title, onClose, children }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            &#10005;
          </button>
        </div>
        <div className="popup-body">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
