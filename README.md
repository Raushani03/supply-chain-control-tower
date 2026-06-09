# Supply Chain Control Tower

A modern, production-quality control tower UI for retail supply chain operations. Built with React, Node.js, and focused on exceptional UX for operational decision-making.

## Features

- **Real-time KPI Monitoring**: Track in-stock rate, orders at risk, late shipments, and inventory coverage
- **Exception Management**: Visual hierarchy for supply chain issues with severity-based alerts
- **Advanced Filtering**: Multi-dimensional filtering by region, warehouse, supplier, category, and date range
- **Drill-down Details**: Contextual detail panels with root cause analysis and action workflows
- **Responsive Design**: Optimized for large screens and tablets with accessibility built-in
- **Operational Focus**: Surfaces exceptions first, supports fast decision-making

## Quick Start

```bash
# Install dependencies
npm install

# Start both frontend and backend
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Architecture

- **Frontend**: React 18 with functional components and hooks
- **Backend**: Node.js Express API with realistic mock data
- **Styling**: Modern CSS with component-based architecture
- **State Management**: React hooks for filters, selections, and alerts
- **Charts**: Recharts for data visualization

## Project Structure

```
supply-chain-control-tower/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Main dashboard page
│   ├── services/        # API integration
│   ├── utils/           # Helper functions
│   └── styles/          # Global styles
├── server/
│   ├── index.js         # Express server
│   └── data/            # Mock data generators
└── public/              # Static assets
```

## Key Components

- **KPICard**: Summary metrics with trend indicators
- **FilterBar**: Global filtering system
- **ExceptionCard**: Issue cards with severity visualization
- **DetailPanel**: Drill-down view with action workflows
- **AlertBanner**: Urgent notifications
- **TrendChart**: Time-series visualization

## Design Philosophy

This control tower prioritizes:
1. **Scanability**: Users can assess system health in seconds
2. **Exception-First**: Problems are visually dominant
3. **Action-Oriented**: Clear paths from issue to resolution
4. **Enterprise Polish**: Clean, professional retail business tool aesthetic
5. **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation

## Sample Data

The system includes realistic mock data for:
- Inventory levels and coverage
- Shipment delays and tracking
- Supplier performance metrics
- Store-level exceptions
- Order fulfillment status
- Distribution center operations

## Technology Decisions

- **React**: Component reusability and maintainability
- **Vite**: Fast development experience
- **Express**: Lightweight API layer
- **Recharts**: Declarative charts with good accessibility
- **Lucide Icons**: Clean, consistent iconography
- **CSS Variables**: Themeable design system

Built to showcase strong frontend engineering and UX judgment for operational business tools.
