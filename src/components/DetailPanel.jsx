import React, { useState, useEffect } from 'react';
import { X, AlertCircle, MapPin, Package, Clock, User, FileText, CheckCircle } from 'lucide-react';
import { fetchExceptionDetails, submitExceptionAction } from '../services/api';
import './DetailPanel.css';

function DetailPanel({ exceptionId, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionNotes, setActionNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    if (exceptionId) {
      loadDetails();
    }
  }, [exceptionId]);
  
  const loadDetails = async () => {
    setLoading(true);
    try {
      const data = await fetchExceptionDetails(exceptionId);
      setDetails(data);
    } catch (error) {
      console.error('Failed to load exception details:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAction = async (action) => {
    setSubmitting(true);
    try {
      await submitExceptionAction(exceptionId, action, details.assignee, actionNotes);
      setActionNotes('');
      alert(`Action "${action}" submitted successfully`);
    } catch (error) {
      console.error('Failed to submit action:', error);
      alert('Failed to submit action');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (!exceptionId) return null;
  
  return (
    <div className="detail-panel-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="detail-panel__header">
          <h2 className="detail-panel__title">Exception Details</h2>
          <button 
            className="detail-panel__close"
            onClick={onClose}
            aria-label="Close detail panel"
          >
            <X size={24} />
          </button>
        </div>
        
        {loading ? (
          <div className="detail-panel__loading">Loading details...</div>
        ) : details ? (
          <div className="detail-panel__content">
            <div className="detail-panel__section">
              <div className="detail-panel__badge-group">
                <span className={`detail-panel__badge detail-panel__badge--${details.severity}`}>
                  <AlertCircle size={16} />
                  {details.severity.toUpperCase()}
                </span>
                <span className={`detail-panel__badge detail-panel__badge--status-${details.status}`}>
                  {details.status}
                </span>
                <span className="detail-panel__badge detail-panel__badge--priority">
                  {details.priority}
                </span>
              </div>
              
              <h3 className="detail-panel__exception-title">{details.title}</h3>
              <p className="detail-panel__description">{details.description}</p>
            </div>
            
            <div className="detail-panel__section">
              <h4 className="detail-panel__section-title">
                <FileText size={18} />
                Root Cause
              </h4>
              <p className="detail-panel__text">{details.rootCause}</p>
            </div>
            
            <div className="detail-panel__section">
              <h4 className="detail-panel__section-title">
                <Package size={18} />
                Impact Analysis
              </h4>
              <div className="detail-panel__impact-grid">
                <div className="detail-panel__impact-item">
                  <span className="detail-panel__impact-label">Impacted Stores</span>
                  <span className="detail-panel__impact-value">{details.impactedStores}</span>
                </div>
                <div className="detail-panel__impact-item">
                  <span className="detail-panel__impact-label">Impacted Orders</span>
                  <span className="detail-panel__impact-value">{details.impactedOrders}</span>
                </div>
                <div className="detail-panel__impact-item">
                  <span className="detail-panel__impact-label">Region</span>
                  <span className="detail-panel__impact-value">{details.region}</span>
                </div>
                <div className="detail-panel__impact-item">
                  <span className="detail-panel__impact-label">Warehouse</span>
                  <span className="detail-panel__impact-value">{details.warehouse}</span>
                </div>
              </div>
              
              {details.impactedStores && Array.isArray(details.impactedStores) && (
                <div className="detail-panel__store-list">
                  <p className="detail-panel__store-list-title">Affected Stores:</p>
                  <div className="detail-panel__store-chips">
                    {details.impactedStores.map((store, idx) => (
                      <span key={idx} className="detail-panel__chip">{store}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="detail-panel__section">
              <h4 className="detail-panel__section-title">
                <Clock size={18} />
                Timeline
              </h4>
              <div className="detail-panel__timeline">
                {details.timeline.map((event, idx) => (
                  <div key={idx} className="detail-panel__timeline-item">
                    <div className="detail-panel__timeline-marker" />
                    <div className="detail-panel__timeline-content">
                      <div className="detail-panel__timeline-date">{event.date}</div>
                      <div className="detail-panel__timeline-event">{event.event}</div>
                      <div className="detail-panel__timeline-user">
                        <User size={12} />
                        {event.user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="detail-panel__section">
              <h4 className="detail-panel__section-title">
                <CheckCircle size={18} />
                Recommended Action
              </h4>
              <div className="detail-panel__recommendation">
                {details.recommendedAction}
              </div>
            </div>
            
            <div className="detail-panel__section">
              <h4 className="detail-panel__section-title">Notes</h4>
              <p className="detail-panel__text">{details.notes}</p>
            </div>
            
            <div className="detail-panel__section">
              <h4 className="detail-panel__section-title">Add Action Notes</h4>
              <textarea
                className="detail-panel__textarea"
                placeholder="Enter notes about actions taken..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="detail-panel__actions">
              <button 
                className="detail-panel__action-btn detail-panel__action-btn--primary"
                onClick={() => handleAction('acknowledge')}
                disabled={submitting}
              >
                Acknowledge
              </button>
              <button 
                className="detail-panel__action-btn detail-panel__action-btn--secondary"
                onClick={() => handleAction('assign')}
                disabled={submitting}
              >
                Reassign
              </button>
              <button 
                className="detail-panel__action-btn detail-panel__action-btn--warning"
                onClick={() => handleAction('escalate')}
                disabled={submitting}
              >
                Escalate
              </button>
              <button 
                className="detail-panel__action-btn detail-panel__action-btn--success"
                onClick={() => handleAction('resolve')}
                disabled={submitting}
              >
                Mark Resolved
              </button>
            </div>
          </div>
        ) : (
          <div className="detail-panel__error">Failed to load details</div>
        )}
      </div>
    </div>
  );
}

export default DetailPanel;
