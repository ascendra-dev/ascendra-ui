import type { DashboardMeta } from './types';

export const dashboardsConfig: DashboardMeta[] = [
  {
    slug: 'saas-revenue',
    name: 'SaaS Revenue & Growth',
    domain: 'SaaS / Startup',
    description:
      'Monthly recurring revenue, plan-tier breakdown, churn, and net revenue retention — the core metrics for a SaaS growth review.',
    chartTypes: ['composed', 'pie', 'area', 'radial', 'bar'],
    kpis: ['Monthly Recurring Revenue', 'Annual Run Rate', 'Churn Rate', 'Net Revenue Retention'],
    layout: [
      [{ type: 'chart', cols: 8, title: 'MRR & Growth Rate' }, { type: 'chart', cols: 4, title: 'Plan Mix' }],
      [{ type: 'chart', cols: 8, title: 'Revenue by Tier' },   { type: 'chart', cols: 4, title: 'NRR Gauge' }],
      [{ type: 'table', cols: 7, title: 'Top Accounts' },      { type: 'chart', cols: 5, title: 'Churn by Cohort' }],
    ],
  },
  {
    slug: 'ecommerce-ops',
    name: 'E-commerce Operations',
    domain: 'Retail / E-commerce',
    description:
      'Order volume, GMV, category performance, and return rates — the ops view for a mid-size online retailer.',
    chartTypes: ['line', 'bar', 'treemap', 'histogram'],
    kpis: ['Gross Merchandise Value', 'Orders Placed', 'Avg. Order Value', 'Return Rate'],
    layout: [
      [{ type: 'chart', cols: 12, title: 'Daily Orders' }],
      [{ type: 'chart', cols: 6, title: 'Orders by Category' }, { type: 'chart', cols: 6, title: 'GMV by Category' }],
      [{ type: 'chart', cols: 5, title: 'Order Value Distribution' }, { type: 'table', cols: 7, title: 'Top Products' }],
    ],
  },
  {
    slug: 'marketing',
    name: 'Marketing Performance',
    domain: 'Marketing / Growth',
    description:
      'Channel ROAS, traffic mix, and spend efficiency — the CMO view for a performance-marketing team running multi-channel campaigns.',
    chartTypes: ['bar', 'radar', 'area', 'pie', 'composed'],
    kpis: ['Attributed Revenue', 'Blended ROAS', 'Customer Acq. Cost', 'Avg. CTR'],
    layout: [
      [{ type: 'chart', cols: 5, title: 'Channel ROAS' },      { type: 'chart', cols: 7, title: 'Channel Scorecard' }],
      [{ type: 'chart', cols: 8, title: 'Traffic by Source' }, { type: 'chart', cols: 4, title: 'Spend Allocation' }],
      [{ type: 'chart', cols: 8, title: 'Spend vs Revenue' },  { type: 'chart', cols: 4, title: 'Status Summary' }],
      [{ type: 'table', cols: 12, title: 'Active Campaigns' }],
    ],
  },
  {
    slug: 'financial-pnl',
    name: 'Financial P&L',
    domain: 'Finance / CFO',
    description:
      'Revenue, cost breakdown, EBITDA margin trajectory, and budget attainment — the board-ready financial view for a growth-stage company.',
    chartTypes: ['composed', 'radial', 'area', 'bar'],
    kpis: ['Total Revenue', 'EBITDA', 'Monthly Burn Rate', 'Cash Runway'],
    layout: [
      [{ type: 'chart', cols: 7, title: 'Costs & EBITDA Margin' }, { type: 'chart', cols: 5, title: 'Budget Attainment' }],
      [{ type: 'chart', cols: 12, title: 'Revenue vs Expenses' }],
      [{ type: 'chart', cols: 6, title: 'Cash Flow Waterfall' },   { type: 'table', cols: 6, title: 'P&L Summary' }],
    ],
  },
  {
    slug: 'trading-portfolio',
    name: 'Trading & Portfolio',
    domain: 'Finance / Trading',
    description:
      'Price action, volume, return distribution, and risk/return positioning — a complete view for an equity portfolio manager.',
    chartTypes: ['candlestick', 'histogram', 'scatter', 'composed'],
    kpis: ['Portfolio Value', 'Day P&L', 'Beta', 'Sharpe Ratio'],
    layout: [
      [{ type: 'chart', cols: 12, title: 'Price Action', height: 'xl' }],
      [
        { type: 'chart', cols: 4, title: 'Return Distribution' },
        { type: 'chart', cols: 4, title: 'Risk vs Return' },
        { type: 'chart', cols: 4, title: 'Price + Volume' },
      ],
      [{ type: 'table', cols: 12, title: 'Positions' }],
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare Analytics',
    domain: 'Healthcare / Clinical',
    description:
      "Patient flow, bed occupancy, department performance, and outcome rates — the clinical director's operational view of a hospital.",
    chartTypes: ['line', 'radial', 'bar', 'radar', 'histogram'],
    kpis: ['Active Patients', 'Avg. Wait Time', 'Bed Occupancy', 'Recovery Rate'],
    layout: [
      [{ type: 'chart', cols: 8, title: 'Admissions Trend' },         { type: 'chart', cols: 4, title: 'Bed Occupancy' }],
      [{ type: 'chart', cols: 6, title: 'Conditions by Department' }, { type: 'chart', cols: 6, title: 'Department Scorecard' }],
      [{ type: 'chart', cols: 5, title: 'Patient Age Distribution' }, { type: 'table', cols: 7, title: 'Recent Cases' }],
    ],
  },
  {
    slug: 'hr-people',
    name: 'HR & People Analytics',
    domain: 'People Operations',
    description:
      "Headcount movement, attrition drivers, salary distribution, and performance spread — the CHRO's workforce view.",
    chartTypes: ['line', 'pie', 'bar', 'scatter'],
    kpis: ['Total Headcount', 'Attrition Rate', 'Avg. Time to Hire', 'eNPS Score'],
    layout: [
      [{ type: 'chart', cols: 7, title: 'Hiring vs Attrition' },    { type: 'chart', cols: 5, title: 'Seniority Mix' }],
      [{ type: 'chart', cols: 12, title: 'Headcount by Department' }],
      [{ type: 'chart', cols: 6, title: 'Tenure vs Performance' },  { type: 'table', cols: 6, title: 'Recent Hires' }],
    ],
  },
  {
    slug: 'devops',
    name: 'DevOps Monitoring',
    domain: 'Engineering / SRE',
    description:
      "Latency, throughput, error rates by service, and deployment frequency — the reliability dashboard for an engineering team.",
    chartTypes: ['area', 'line', 'bar', 'composed', 'radial'],
    kpis: ['Uptime (30d)', 'P99 Latency', 'Error Rate', 'Deploy Frequency'],
    layout: [
      [{ type: 'chart', cols: 12, title: 'Request Volume' }],
      [{ type: 'chart', cols: 6, title: 'P99 Latency' },            { type: 'chart', cols: 6, title: 'Errors by Service' }],
      [{ type: 'chart', cols: 8, title: 'Error Rate & Throughput' }, { type: 'chart', cols: 4, title: 'SLA Uptime' }],
    ],
  },
  {
    slug: 'supply-chain',
    name: 'Supply Chain',
    domain: 'Operations / Logistics',
    description:
      "Inventory flow, supplier concentration, regional shipments, and delivery performance — the operations director's supply view.",
    chartTypes: ['composed', 'bar', 'treemap', 'radar'],
    kpis: ['On-time Delivery', 'Inventory Fill Rate', 'Inventory Turns', 'Avg. Lead Time'],
    layout: [
      [{ type: 'chart', cols: 7, title: 'Inventory Flow' },        { type: 'chart', cols: 5, title: 'Shipments by Region' }],
      [{ type: 'chart', cols: 12, title: 'Supplier Spend Share' }],
      [{ type: 'chart', cols: 5, title: 'Supplier Scorecard' },    { type: 'table', cols: 7, title: 'Open Orders' }],
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate Portfolio',
    domain: 'Property Investment',
    description:
      "Portfolio valuation, yield analysis, occupancy, and individual property performance — the asset manager's property view.",
    chartTypes: ['treemap', 'pie', 'composed', 'bar', 'scatter'],
    kpis: ['Portfolio Value', 'Avg. Gross Yield', 'Occupancy Rate', 'Monthly Income'],
    layout: [
      [{ type: 'chart', cols: 7, title: 'Portfolio by Type' },       { type: 'chart', cols: 5, title: 'Geographic Allocation' }],
      [{ type: 'chart', cols: 8, title: 'Rental Income & Yield' },   { type: 'chart', cols: 4, title: 'Properties by Value' }],
      [{ type: 'chart', cols: 5, title: 'Price vs Area' },           { type: 'table', cols: 7, title: 'Properties' }],
    ],
  },
];
