import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './TrendChart.css';

function TrendChart({ data, title }) {
  return (
    <div className="trend-chart">
      <h3 className="trend-chart__title">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
          <XAxis 
            dataKey="date" 
            stroke="var(--color-text-tertiary)"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="var(--color-text-tertiary)"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--border-radius-sm)',
              fontSize: '14px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
          />
          <Line 
            type="monotone" 
            dataKey="inStockRate" 
            stroke="var(--color-success)" 
            strokeWidth={2}
            name="In-Stock Rate %"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="fillRate" 
            stroke="var(--color-primary)" 
            strokeWidth={2}
            name="Fill Rate %"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="lateShipments" 
            stroke="var(--color-warning)" 
            strokeWidth={2}
            name="Late Shipments"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;
