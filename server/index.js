
console.log('Booting server...');
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});


try{
const express = require('express');
const cors = require('cors');
const path = require('path');
const { generateKPIs, generateExceptions, generateTrends, generateShipments, generateInventory } = require('./data/mockData');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
const distPath = path.join(__dirname, '../dist');
console.log('Serving static files from:', distPath);
app.use(express.static(distPath));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/kpis', (req, res) => {
  const kpis = generateKPIs();
  res.json(kpis);
});

app.get('/api/exceptions', (req, res) => {
  const { region, warehouse, severity, category } = req.query;
  let exceptions = generateExceptions();
  
  if (region && region !== 'all') {
    exceptions = exceptions.filter(e => e.region === region);
  }
  if (warehouse && warehouse !== 'all') {
    exceptions = exceptions.filter(e => e.warehouse === warehouse);
  }
  if (severity && severity !== 'all') {
    exceptions = exceptions.filter(e => e.severity === severity);
  }
  if (category && category !== 'all') {
    exceptions = exceptions.filter(e => e.category === category);
  }
  
  res.json(exceptions);
});

app.get('/api/exceptions/:id', (req, res) => {
  const exceptions = generateExceptions();
  const exception = exceptions.find(e => e.id === req.params.id);
  
  if (exception) {
    res.json({
      ...exception,
      rootCause: 'Supplier production delay due to raw material shortage',
      impactedStores: ['Store #1234', 'Store #1567', 'Store #1890', 'Store #2341'],
      impactedOrders: 156,
      timeline: [
        { date: '2026-06-05', event: 'Issue detected', user: 'System Alert' },
        { date: '2026-06-06', event: 'Assigned to logistics team', user: 'Sarah Chen' },
        { date: '2026-06-07', event: 'Supplier contacted', user: 'Mike Johnson' },
        { date: '2026-06-08', event: 'Alternative sourcing initiated', user: 'Sarah Chen' }
      ],
      notes: 'Working with backup supplier. Expected resolution by June 10.',
      recommendedAction: 'Expedite shipment from alternative DC to cover shortfall'
    });
  } else {
    res.status(404).json({ error: 'Exception not found' });
  }
});

app.get('/api/trends', (req, res) => {
  const trends = generateTrends();
  res.json(trends);
});

app.get('/api/shipments', (req, res) => {
  const shipments = generateShipments();
  res.json(shipments);
});

app.get('/api/inventory', (req, res) => {
  const inventory = generateInventory();
  res.json(inventory);
});

app.post('/api/exceptions/:id/action', (req, res) => {
  const { action, assignee, notes } = req.body;
  res.json({
    success: true,
    message: `Action "${action}" recorded successfully`,
    timestamp: new Date().toISOString()
  });
});

// Serve index.html for all non-API routes (for client-side routing)
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Supply Chain Control Tower API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Serving static files from: ${path.join(__dirname, '../dist')}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});
}
catch (error)
{
  console.error('Startup failure:', error);
  process.exit(1);
}
