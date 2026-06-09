const generateKPIs = () => {
  return {
    inStockRate: { value: 94.2, trend: -1.3, target: 96.0, status: 'warning' },
    ordersAtRisk: { value: 342, trend: 12, target: 200, status: 'critical' },
    lateShipments: { value: 89, trend: -5, target: 50, status: 'warning' },
    inventoryCoverage: { value: 28, trend: -3, target: 30, status: 'warning' },
    openExceptions: { value: 47, trend: 8, target: 30, status: 'critical' },
    onTimeDelivery: { value: 91.5, trend: 2.1, target: 95.0, status: 'good' }
  };
};

const generateExceptions = () => {
  const severities = ['critical', 'high', 'medium', 'low'];
  const categories = ['Inventory', 'Shipment', 'Supplier', 'Quality', 'Demand'];
  const regions = ['Northeast', 'Southeast', 'Midwest', 'West', 'Southwest'];
  const warehouses = ['DC-001', 'DC-002', 'DC-003', 'DC-004', 'DC-005'];
  const statuses = ['open', 'in-progress', 'pending', 'escalated'];
  
  const exceptions = [
    {
      id: 'EXC-001',
      title: 'Critical Stock-Out: Power Tools Category',
      description: 'Multiple SKUs below safety stock in high-demand stores',
      severity: 'critical',
      category: 'Inventory',
      region: 'Northeast',
      warehouse: 'DC-001',
      status: 'escalated',
      assignee: 'Sarah Chen',
      priority: 'P1',
      created: '2026-06-05T08:30:00Z',
      eta: '2026-06-10T17:00:00Z',
      impactedStores: 23,
      impactedOrders: 156
    },
    {
      id: 'EXC-002',
      title: 'Shipment Delay: Appliance Delivery',
      description: 'Carrier capacity constraints causing 2-day delay',
      severity: 'high',
      category: 'Shipment',
      region: 'West',
      warehouse: 'DC-004',
      status: 'in-progress',
      assignee: 'Mike Johnson',
      priority: 'P1',
      created: '2026-06-06T14:15:00Z',
      eta: '2026-06-09T12:00:00Z',
      impactedStores: 12,
      impactedOrders: 89
    },
    {
      id: 'EXC-003',
      title: 'Supplier Quality Issue: Paint Products',
      description: 'Quality inspection failure on incoming shipment',
      severity: 'high',
      category: 'Quality',
      region: 'Southeast',
      warehouse: 'DC-002',
      status: 'open',
      assignee: 'Lisa Park',
      priority: 'P2',
      created: '2026-06-07T09:45:00Z',
      eta: '2026-06-12T17:00:00Z',
      impactedStores: 8,
      impactedOrders: 34
    },
    {
      id: 'EXC-004',
      title: 'Demand Spike: Seasonal Garden Items',
      description: 'Unexpected 40% increase in demand vs forecast',
      severity: 'medium',
      category: 'Demand',
      region: 'Midwest',
      warehouse: 'DC-003',
      status: 'in-progress',
      assignee: 'Tom Wilson',
      priority: 'P2',
      created: '2026-06-07T11:20:00Z',
      eta: '2026-06-11T17:00:00Z',
      impactedStores: 18,
      impactedOrders: 127
    },
    {
      id: 'EXC-005',
      title: 'Inventory Discrepancy: Lumber Department',
      description: 'Physical count mismatch exceeds threshold',
      severity: 'medium',
      category: 'Inventory',
      region: 'Southwest',
      warehouse: 'DC-005',
      status: 'pending',
      assignee: 'Rachel Adams',
      priority: 'P3',
      created: '2026-06-08T07:30:00Z',
      eta: '2026-06-13T17:00:00Z',
      impactedStores: 5,
      impactedOrders: 23
    },
    {
      id: 'EXC-006',
      title: 'Late Supplier Delivery: Lighting Fixtures',
      description: 'Supplier missed committed delivery date',
      severity: 'medium',
      category: 'Supplier',
      region: 'Northeast',
      warehouse: 'DC-001',
      status: 'in-progress',
      assignee: 'David Kim',
      priority: 'P2',
      created: '2026-06-08T10:15:00Z',
      eta: '2026-06-10T17:00:00Z',
      impactedStores: 14,
      impactedOrders: 67
    },
    {
      id: 'EXC-007',
      title: 'Transportation Disruption: Weather Delay',
      description: 'Severe weather impacting interstate routes',
      severity: 'high',
      category: 'Shipment',
      region: 'Midwest',
      warehouse: 'DC-003',
      status: 'open',
      assignee: 'Jennifer Lee',
      priority: 'P1',
      created: '2026-06-08T13:45:00Z',
      eta: '2026-06-09T23:59:00Z',
      impactedStores: 31,
      impactedOrders: 203
    },
    {
      id: 'EXC-008',
      title: 'Low Stock Alert: HVAC Filters',
      description: 'Approaching minimum stock levels',
      severity: 'low',
      category: 'Inventory',
      region: 'West',
      warehouse: 'DC-004',
      status: 'open',
      assignee: 'Chris Martinez',
      priority: 'P3',
      created: '2026-06-08T15:20:00Z',
      eta: '2026-06-14T17:00:00Z',
      impactedStores: 7,
      impactedOrders: 19
    }
  ];
  
  return exceptions;
};

const generateTrends = () => {
  const last30Days = [];
  const baseDate = new Date('2026-06-08');
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    
    last30Days.push({
      date: date.toISOString().split('T')[0],
      inStockRate: 92 + Math.random() * 6,
      fillRate: 88 + Math.random() * 8,
      lateShipments: 60 + Math.floor(Math.random() * 40),
      exceptions: 30 + Math.floor(Math.random() * 25)
    });
  }
  
  return last30Days;
};

const generateShipments = () => {
  const statuses = ['on-time', 'delayed', 'at-risk', 'delivered'];
  const carriers = ['FedEx', 'UPS', 'XPO Logistics', 'J.B. Hunt', 'Schneider'];
  
  const shipments = [];
  for (let i = 1; i <= 20; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    shipments.push({
      id: `SHP-${String(i).padStart(5, '0')}`,
      origin: `DC-00${Math.floor(Math.random() * 5) + 1}`,
      destination: `Store #${1000 + Math.floor(Math.random() * 3000)}`,
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      status: status,
      scheduledDelivery: '2026-06-10',
      estimatedDelivery: status === 'delayed' ? '2026-06-12' : '2026-06-10',
      items: Math.floor(Math.random() * 500) + 50,
      value: Math.floor(Math.random() * 50000) + 10000
    });
  }
  
  return shipments;
};

const generateInventory = () => {
  const categories = ['Power Tools', 'Appliances', 'Lumber', 'Paint', 'Lighting', 'HVAC', 'Plumbing', 'Garden'];
  
  return categories.map(category => ({
    category,
    onHand: Math.floor(Math.random() * 50000) + 10000,
    available: Math.floor(Math.random() * 40000) + 8000,
    reserved: Math.floor(Math.random() * 5000) + 1000,
    inTransit: Math.floor(Math.random() * 10000) + 2000,
    coverageDays: Math.floor(Math.random() * 20) + 15,
    status: Math.random() > 0.3 ? 'healthy' : 'low'
  }));
};

module.exports = {
  generateKPIs,
  generateExceptions,
  generateTrends,
  generateShipments,
  generateInventory
};
