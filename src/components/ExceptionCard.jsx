import React from 'react';
import { AlertCircle, Clock, MapPin, Package, User } from 'lucide-react';
import './ExceptionCard.css';

function ExceptionCard({ exception, onClick }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'var(--color-critical)';
      case 'high': return 'var(--color-high)';
      case 'medium': return 'var(--color-medium)';
      case 'low': return 'var(--color-low)';
      default: return 'var(--color-text-secondary)';
    }
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'open': return 'Open';
      case 'in-progress': return 'In Progress';
      case 'pending': return 'Pending';
      case 'escalated': return 'Escalated';
      default: return status;
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div 
      className={`exception-card exception-card--${exception.severity}`}
      onClick={() => onClick(exception)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(exception)}
    >
      <div className="exception-card__header">
        <div className="exception-card__severity">
          <AlertCircle 
            size={20} 
            style={{ color: getSeverityColor(exception.severity) }}
            aria-label={`Severity: ${exception.severity}`}
          />
          <span className="exception-card__severity-label">
            {exception.severity.toUpperCase()}
          </span>
        </div>
        <div className={`exception-card__status exception-card__status--${exception.status}`}>
          {getStatusLabel(exception.status)}
        </div>
      </div>
      
      <h3 className="exception-card__title">{exception.title}</h3>
      <p className="exception-card__description">{exception.description}</p>
      
      <div className="exception-card__metadata">
        <div className="exception-card__meta-item">
          <Package size={14} />
          <span>{exception.category}</span>
        </div>
        <div className="exception-card__meta-item">
          <MapPin size={14} />
          <span>{exception.region}</span>
        </div>
        <div className="exception-card__meta-item">
          <User size={14} />
          <span>{exception.assignee}</span>
        </div>
        <div className="exception-card__meta-item">
          <Clock size={14} />
          <span>ETA: {formatDate(exception.eta)}</span>
        </div>
      </div>
      
      <div className="exception-card__footer">
        <div className="exception-card__impact">
          <span className="exception-card__impact-label">Impact:</span>
          <span className="exception-card__impact-value">
            {exception.impactedStores} stores • {exception.impactedOrders} orders
          </span>
        </div>
        <div className="exception-card__priority">
          {exception.priority}
        </div>
      </div>
    </div>
  );
}

export default ExceptionCard;
