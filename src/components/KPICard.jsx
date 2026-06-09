import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './KPICard.css';

function KPICard({ title, value, unit, trend, target, status }) {
  const trendDirection = trend >= 0 ? 'up' : 'down';
  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
  
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'var(--color-critical)';
      case 'warning': return 'var(--color-warning)';
      case 'good': return 'var(--color-success)';
      default: return 'var(--color-text-secondary)';
    }
  };
  
  return (
    <div className={`kpi-card kpi-card--${status}`}>
      <div className="kpi-card__header">
        <h3 className="kpi-card__title">{title}</h3>
        <div className={`kpi-card__trend kpi-card__trend--${trendDirection}`}>
          <TrendIcon size={16} />
          <span>{Math.abs(trend)}{unit === '%' ? 'pp' : unit}</span>
        </div>
      </div>
      
      <div className="kpi-card__body">
        <div className="kpi-card__value">
          {value.toLocaleString()}{unit}
        </div>
        <div className="kpi-card__target">
          Target: {target.toLocaleString()}{unit}
        </div>
      </div>
      
      <div className="kpi-card__status">
        <div 
          className="kpi-card__status-indicator"
          style={{ backgroundColor: getStatusColor() }}
          aria-label={`Status: ${status}`}
        />
      </div>
    </div>
  );
}

export default KPICard;
