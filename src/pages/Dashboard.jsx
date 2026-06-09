import React, { useState, useEffect } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import KPICard from '../components/KPICard';
import FilterBar from '../components/FilterBar';
import ExceptionCard from '../components/ExceptionCard';
import DetailPanel from '../components/DetailPanel';
import TrendChart from '../components/TrendChart';
import AlertBanner from '../components/AlertBanner';
import { fetchKPIs, fetchExceptions, fetchTrends } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [exceptions, setExceptions] = useState([]);
  const [trends, setTrends] = useState([]);
  const [filters, setFilters] = useState({
    region: 'all',
    warehouse: 'all',
    category: 'all',
    severity: 'all'
  });
  const [selectedExceptionId, setSelectedExceptionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([
    {
      severity: 'critical',
      title: 'Critical Stock-Out Alert',
      message: '23 stores affected in Northeast region - immediate action required'
    },
    {
      severity: 'high',
      title: 'Weather Disruption',
      message: 'Severe weather impacting Midwest shipments - 31 stores delayed'
    }
  ]);
  
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  useEffect(() => {
    loadExceptions();
  }, [filters]);
  
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [kpisData, exceptionsData, trendsData] = await Promise.all([
        fetchKPIs(),
        fetchExceptions(filters),
        fetchTrends()
      ]);
      setKpis(kpisData);
      setExceptions(exceptionsData);
      setTrends(trendsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const loadExceptions = async () => {
    try {
      const data = await fetchExceptions(filters);
      setExceptions(data);
    } catch (error) {
      console.error('Failed to load exceptions:', error);
    }
  };
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleClearFilters = () => {
    setFilters({
      region: 'all',
      warehouse: 'all',
      category: 'all',
      severity: 'all'
    });
  };
  
  const handleExceptionClick = (exception) => {
    setSelectedExceptionId(exception.id);
  };
  
  const handleCloseDetail = () => {
    setSelectedExceptionId(null);
  };
  
  const handleDismissAlert = (index) => {
    setAlerts(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleRefresh = () => {
    loadDashboardData();
  };
  
  const criticalExceptions = exceptions.filter(e => e.severity === 'critical');
  const highExceptions = exceptions.filter(e => e.severity === 'high');
  const otherExceptions = exceptions.filter(e => !['critical', 'high'].includes(e.severity));
  
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__header-content">
          <div className="dashboard__branding">
            <Activity size={32} className="dashboard__logo" />
            <div>
              <h1 className="dashboard__title">Supply Chain Control Tower</h1>
              <p className="dashboard__subtitle">Real-time operational visibility and exception management</p>
            </div>
          </div>
          <button 
            className="dashboard__refresh"
            onClick={handleRefresh}
            disabled={loading}
            aria-label="Refresh dashboard"
          >
            <RefreshCw size={20} className={loading ? 'dashboard__refresh-icon--spinning' : ''} />
            Refresh
          </button>
        </div>
      </header>
      
      <main className="dashboard__main">
        <AlertBanner alerts={alerts} onDismiss={handleDismissAlert} />
        
        {loading && !kpis ? (
          <div className="dashboard__loading">
            <div className="dashboard__spinner" />
            <p>Loading dashboard data...</p>
          </div>
        ) : (
          <>
            <section className="dashboard__section">
              <h2 className="dashboard__section-title">Key Performance Indicators</h2>
              <div className="dashboard__kpi-grid">
                {kpis && (
                  <>
                    <KPICard
                      title="In-Stock Rate"
                      value={kpis.inStockRate.value}
                      unit="%"
                      trend={kpis.inStockRate.trend}
                      target={kpis.inStockRate.target}
                      status={kpis.inStockRate.status}
                    />
                    <KPICard
                      title="Orders At Risk"
                      value={kpis.ordersAtRisk.value}
                      unit=""
                      trend={kpis.ordersAtRisk.trend}
                      target={kpis.ordersAtRisk.target}
                      status={kpis.ordersAtRisk.status}
                    />
                    <KPICard
                      title="Late Shipments"
                      value={kpis.lateShipments.value}
                      unit=""
                      trend={kpis.lateShipments.trend}
                      target={kpis.lateShipments.target}
                      status={kpis.lateShipments.status}
                    />
                    <KPICard
                      title="Inventory Coverage"
                      value={kpis.inventoryCoverage.value}
                      unit=" days"
                      trend={kpis.inventoryCoverage.trend}
                      target={kpis.inventoryCoverage.target}
                      status={kpis.inventoryCoverage.status}
                    />
                    <KPICard
                      title="Open Exceptions"
                      value={kpis.openExceptions.value}
                      unit=""
                      trend={kpis.openExceptions.trend}
                      target={kpis.openExceptions.target}
                      status={kpis.openExceptions.status}
                    />
                    <KPICard
                      title="On-Time Delivery"
                      value={kpis.onTimeDelivery.value}
                      unit="%"
                      trend={kpis.onTimeDelivery.trend}
                      target={kpis.onTimeDelivery.target}
                      status={kpis.onTimeDelivery.status}
                    />
                  </>
                )}
              </div>
            </section>
            
            <section className="dashboard__section">
              <FilterBar 
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </section>
            
            <section className="dashboard__section">
              <h2 className="dashboard__section-title">Performance Trends (Last 30 Days)</h2>
              <TrendChart data={trends} title="Supply Chain Health Metrics" />
            </section>
            
            <section className="dashboard__section">
              <div className="dashboard__exceptions-header">
                <h2 className="dashboard__section-title">Active Exceptions</h2>
                <div className="dashboard__exception-summary">
                  <span className="dashboard__exception-count dashboard__exception-count--critical">
                    {criticalExceptions.length} Critical
                  </span>
                  <span className="dashboard__exception-count dashboard__exception-count--high">
                    {highExceptions.length} High
                  </span>
                  <span className="dashboard__exception-count dashboard__exception-count--other">
                    {otherExceptions.length} Other
                  </span>
                </div>
              </div>
              
              {exceptions.length === 0 ? (
                <div className="dashboard__empty-state">
                  <Activity size={48} className="dashboard__empty-icon" />
                  <h3 className="dashboard__empty-title">No Exceptions Found</h3>
                  <p className="dashboard__empty-message">
                    {Object.values(filters).some(v => v !== 'all')
                      ? 'Try adjusting your filters to see more results'
                      : 'All systems operating normally'}
                  </p>
                </div>
              ) : (
                <>
                  {criticalExceptions.length > 0 && (
                    <div className="dashboard__exception-group">
                      <h3 className="dashboard__exception-group-title">
                        Critical Priority
                      </h3>
                      <div className="dashboard__exception-grid">
                        {criticalExceptions.map(exception => (
                          <ExceptionCard
                            key={exception.id}
                            exception={exception}
                            onClick={handleExceptionClick}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {highExceptions.length > 0 && (
                    <div className="dashboard__exception-group">
                      <h3 className="dashboard__exception-group-title">
                        High Priority
                      </h3>
                      <div className="dashboard__exception-grid">
                        {highExceptions.map(exception => (
                          <ExceptionCard
                            key={exception.id}
                            exception={exception}
                            onClick={handleExceptionClick}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {otherExceptions.length > 0 && (
                    <div className="dashboard__exception-group">
                      <h3 className="dashboard__exception-group-title">
                        Medium & Low Priority
                      </h3>
                      <div className="dashboard__exception-grid">
                        {otherExceptions.map(exception => (
                          <ExceptionCard
                            key={exception.id}
                            exception={exception}
                            onClick={handleExceptionClick}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </main>
      
      {selectedExceptionId && (
        <DetailPanel
          exceptionId={selectedExceptionId}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default Dashboard;
