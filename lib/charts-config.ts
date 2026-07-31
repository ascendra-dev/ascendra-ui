export type ChartMeta = {
  slug: string;
  name: string;
  category: string;
  description: string;
  variants: number;
  primitives: string[];
  badge?: string;
};

export const chartsConfig: ChartMeta[] = [
  {
    slug: 'line',
    name: 'Line Charts',
    category: 'Temporal / Trend',
    description: 'Connects data points over time to show progression, momentum, and trend direction. Add reference bands to highlight target zones.',
    variants: 5,
    primitives: ['LineChart', 'Line', 'AreaChart', 'ReferenceLine', 'ReferenceArea'],
  },
  {
    slug: 'area',
    name: 'Area Charts',
    category: 'Temporal / Trend',
    description: 'Line charts with filled areas that emphasise volume and composition. Stacking shows individual contribution and total simultaneously.',
    variants: 5,
    primitives: ['AreaChart', 'Area'],
  },
  {
    slug: 'bar',
    name: 'Bar Charts',
    category: 'Comparison',
    description: 'Categorical comparisons at a glance. Grouped, stacked, horizontal, waterfall, and diverging variants cover most business needs.',
    variants: 6,
    primitives: ['BarChart', 'Bar', 'LabelList', 'Cell'],
  },
  {
    slug: 'pie',
    name: 'Pie & Donut',
    category: 'Composition',
    description: 'Part-to-whole relationships. Donuts surface a key stat in the centre hole; semi-circle variants save vertical space in dashboard cards.',
    variants: 5,
    primitives: ['PieChart', 'Pie', 'Cell', 'Sector'],
  },
  {
    slug: 'radial',
    name: 'Radial & Gauge',
    category: 'Composition',
    description: 'Progress rings and speedometer gauges communicate KPI attainment at a glance — ideal for compact dashboard widgets.',
    variants: 4,
    primitives: ['RadialBarChart', 'RadialBar', 'PolarAngleAxis'],
  },
  {
    slug: 'radar',
    name: 'Radar Charts',
    category: 'Comparison',
    description: 'Spider charts for multivariate profiles — skill assessments, team comparisons, and period-over-period scoring across many dimensions.',
    variants: 3,
    primitives: ['RadarChart', 'Radar', 'PolarGrid', 'PolarAngleAxis'],
  },
  {
    slug: 'scatter',
    name: 'Scatter & Bubble',
    category: 'Relational',
    description: 'Reveal correlations between two continuous variables. Bubble charts add a third dimension via dot size.',
    variants: 3,
    primitives: ['ScatterChart', 'Scatter', 'ZAxis'],
  },
  {
    slug: 'composed',
    name: 'Composed Charts',
    category: 'Multi-type',
    description: 'Layer bars, lines, areas, and scatter on one canvas when metrics share a time axis but have different units or scales.',
    variants: 4,
    primitives: ['ComposedChart', 'Bar', 'Line', 'Area', 'Scatter'],
  },
  {
    slug: 'treemap',
    name: 'Treemap',
    category: 'Composition',
    description: 'Hierarchical data as nested rectangles — cell area encodes value, making it easy to spot dominant categories at a glance.',
    variants: 3,
    primitives: ['Treemap'],
    badge: 'New',
  },
  {
    slug: 'histogram',
    name: 'Histogram',
    category: 'Distribution',
    description: 'Frequency distributions across equal-width bins. Density and overlay variants reveal shape, skew, and overlap between populations.',
    variants: 3,
    primitives: ['BarChart', 'Bar', 'Cell'],
    badge: 'New',
  },
  {
    slug: 'candlestick',
    name: 'Candlestick',
    category: 'Temporal / Trend',
    description: 'OHLC price action visualised as colour-coded candles. Add a volume pane below for a complete trading chart layout.',
    variants: 2,
    primitives: ['ComposedChart', 'Bar', 'Line', 'Cell'],
    badge: 'Finance',
  },
];
