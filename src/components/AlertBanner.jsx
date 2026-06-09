import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './AlertBanner.css';

function AlertBanner({ alerts, onDismiss }) {
  if (!alerts || alerts.length === 0) return null;
  
  return (
    <div className="alert-banner-container">
      {alerts.map((alert, index) => (
        <div key={index} className={`alert-banner alert-banner--${alert.severity}`}>
          <div className="alert-banner__content">
            <AlertTriangle size={20} className="alert-banner__icon" />
            <div className="alert-banner__text">
              <strong className="alert-banner__title">{alert.title}</strong>
              <span className="alert-banner__message">{alert.message}</span>
            </div>
          </div>
          <button 
            className="alert-banner__dismiss"
            onClick={() => onDismiss(index)}
            aria-label="Dismiss alert"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default AlertBanner;
