---
description: Scaffold a standalone chart with ChartContainer, chartConfig, and correct imports
---

Read `docs/ui-reference.md` for ChartContainer, ChartTooltip, ChartLegend props and `docs/showcase-reference.md` → Charts section before generating.

Ask:
1. Chart type: area | bar | line | pie | donut | radar | scatter
2. What data series does it show? (describe the axes or segments)
3. Legend needed? (ChartLegend / ChartLegendGroup)
4. Standalone component or wrapped in a `<Card>`?
5. Data: hardcoded sample or passed as a prop?

Generate:
- `ChartContainer` from `@/ascendra-ui/shadcn` with typed `chartConfig` using `chart-1` through `chart-8`
- Recharts primitive from `recharts`
- `CartesianGrid`, `XAxis`, `YAxis` for cartesian charts
- `ChartTooltip` + `ChartTooltipContent` from `@/ascendra-ui/shadcn`
- `ChartLegend` / `ChartLegendGroup` from `@/ascendra-ui` if requested
- Sample or prop-typed data
- `Card` wrapper from `@/ascendra-ui` if requested
