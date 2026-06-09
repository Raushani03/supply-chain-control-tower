import React from 'react';
import { Filter, X } from 'lucide-react';
import './FilterBar.css';

function FilterBar({ filters, onFilterChange, onClearFilters }) {
  const hasActiveFilters = Object.values(filters).some(v => v && v !== 'all');
  
  return (
    <div className="filter-bar">
      <div className="filter-bar__header">
        <div className="filter-bar__title">
          <Filter size={20} />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button 
            className="filter-bar__clear"
            onClick={onClearFilters}
            aria-label="Clear all filters"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>
      
      <div className="filter-bar__controls">
        <div className="filter-bar__group">
          <label htmlFor="filter-region" className="filter-bar__label">
            Region
          </label>
          <select
            id="filter-region"
            className="filter-bar__select"
            value={filters.region || 'all'}
            onChange={(e) => onFilterChange('region', e.target.value)}
          >
            <option value="all">All Regions</option>
            <option value="Northeast">Northeast</option>
            <option value="Southeast">Southeast</option>
            <option value="Midwest">Midwest</option>
            <option value="West">West</option>
            <option value="Southwest">Southwest</option>
          </select>
        </div>
        
        <div className="filter-bar__group">
          <label htmlFor="filter-warehouse" className="filter-bar__label">
            Distribution Center
          </label>
          <select
            id="filter-warehouse"
            className="filter-bar__select"
            value={filters.warehouse || 'all'}
            onChange={(e) => onFilterChange('warehouse', e.target.value)}
          >
            <option value="all">All DCs</option>
            <option value="DC-001">DC-001</option>
            <option value="DC-002">DC-002</option>
            <option value="DC-003">DC-003</option>
            <option value="DC-004">DC-004</option>
            <option value="DC-005">DC-005</option>
          </select>
        </div>
        
        <div className="filter-bar__group">
          <label htmlFor="filter-category" className="filter-bar__label">
            Category
          </label>
          <select
            id="filter-category"
            className="filter-bar__select"
            value={filters.category || 'all'}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Inventory">Inventory</option>
            <option value="Shipment">Shipment</option>
            <option value="Supplier">Supplier</option>
            <option value="Quality">Quality</option>
            <option value="Demand">Demand</option>
          </select>
        </div>
        
        <div className="filter-bar__group">
          <label htmlFor="filter-severity" className="filter-bar__label">
            Severity
          </label>
          <select
            id="filter-severity"
            className="filter-bar__select"
            value={filters.severity || 'all'}
            onChange={(e) => onFilterChange('severity', e.target.value)}
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
