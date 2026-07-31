"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { ChartLegend, ChartLegendGroup } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["chart-legend"];

export function ChartLegendDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <ComponentPreview
        code={`import { ChartLegend, ChartLegendGroup } from "@/ascendra-ui";

<ChartLegendGroup>
  <ChartLegend variant="chart-1">Direct</ChartLegend>
  <ChartLegend variant="chart-2">Organic Search</ChartLegend>
  <ChartLegend variant="chart-3">Referral</ChartLegend>
  <ChartLegend variant="chart-4">Social</ChartLegend>
  <ChartLegend variant="chart-5">Email</ChartLegend>
</ChartLegendGroup>`}
      >
        <ChartLegendGroup>
          <ChartLegend variant="chart-1">Direct</ChartLegend>
          <ChartLegend variant="chart-2">Organic Search</ChartLegend>
          <ChartLegend variant="chart-3">Referral</ChartLegend>
          <ChartLegend variant="chart-4">Social</ChartLegend>
          <ChartLegend variant="chart-5">Email</ChartLegend>
        </ChartLegendGroup>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Shape variants */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Shapes</h3>
          <p className="text-xs text-muted-foreground">
            Round suits line and pie charts; square suits bar and area charts.
          </p>
          <ComponentPreview
            code={`{/* Round (default) */}
<ChartLegendGroup>
  <ChartLegend variant="chart-1" shape="round">Revenue</ChartLegend>
  <ChartLegend variant="chart-2" shape="round">Expenses</ChartLegend>
  <ChartLegend variant="chart-3" shape="round">Profit</ChartLegend>
</ChartLegendGroup>

{/* Square */}
<ChartLegendGroup>
  <ChartLegend variant="chart-1" shape="square">Revenue</ChartLegend>
  <ChartLegend variant="chart-2" shape="square">Expenses</ChartLegend>
  <ChartLegend variant="chart-3" shape="square">Profit</ChartLegend>
</ChartLegendGroup>`}
          >
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <p className="text-center text-[0.65rem] text-muted-foreground">round</p>
                <ChartLegendGroup>
                  <ChartLegend variant="chart-1" shape="round">Revenue</ChartLegend>
                  <ChartLegend variant="chart-2" shape="round">Expenses</ChartLegend>
                  <ChartLegend variant="chart-3" shape="round">Profit</ChartLegend>
                </ChartLegendGroup>
              </div>
              <div className="space-y-1">
                <p className="text-center text-[0.65rem] text-muted-foreground">square</p>
                <ChartLegendGroup>
                  <ChartLegend variant="chart-1" shape="square">Revenue</ChartLegend>
                  <ChartLegend variant="chart-2" shape="square">Expenses</ChartLegend>
                  <ChartLegend variant="chart-3" shape="square">Profit</ChartLegend>
                </ChartLegendGroup>
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* Size variants */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Sizes</h3>
          <p className="text-xs text-muted-foreground">
            Four swatch sizes: xs (4 px), sm (8 px), md (12 px), lg (16 px).
          </p>
          <ComponentPreview
            code={`<ChartLegendGroup>
  <ChartLegend variant="chart-1" size="xs">xs · Q1</ChartLegend>
  <ChartLegend variant="chart-2" size="sm">sm · Q2</ChartLegend>
  <ChartLegend variant="chart-3" size="md">md · Q3</ChartLegend>
  <ChartLegend variant="chart-4" size="lg">lg · Q4</ChartLegend>
</ChartLegendGroup>`}
          >
            <ChartLegendGroup>
              <ChartLegend variant="chart-1" size="xs">xs · Q1</ChartLegend>
              <ChartLegend variant="chart-2" size="sm">sm · Q2</ChartLegend>
              <ChartLegend variant="chart-3" size="md">md · Q3</ChartLegend>
              <ChartLegend variant="chart-4" size="lg">lg · Q4</ChartLegend>
            </ChartLegendGroup>
          </ComponentPreview>
        </div>

        {/* All chart color variants */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Color Variants</h3>
          <p className="text-xs text-muted-foreground">
            Eight chart color tokens, adapting to light and dark themes via CSS variables.
          </p>
          <ComponentPreview
            code={`<ChartLegendGroup>
  <ChartLegend variant="chart-1">chart-1 · Violet</ChartLegend>
  <ChartLegend variant="chart-2">chart-2 · Sky</ChartLegend>
  <ChartLegend variant="chart-3">chart-3 · Emerald</ChartLegend>
  <ChartLegend variant="chart-4">chart-4 · Rose</ChartLegend>
  <ChartLegend variant="chart-5">chart-5 · Orange</ChartLegend>
  <ChartLegend variant="chart-6">chart-6 · Amber</ChartLegend>
  <ChartLegend variant="chart-7">chart-7 · Red</ChartLegend>
  <ChartLegend variant="chart-8">chart-8 · Primary</ChartLegend>
</ChartLegendGroup>`}
          >
            <ChartLegendGroup>
              <ChartLegend variant="chart-1">chart-1 · Violet</ChartLegend>
              <ChartLegend variant="chart-2">chart-2 · Sky</ChartLegend>
              <ChartLegend variant="chart-3">chart-3 · Emerald</ChartLegend>
              <ChartLegend variant="chart-4">chart-4 · Rose</ChartLegend>
              <ChartLegend variant="chart-5">chart-5 · Orange</ChartLegend>
              <ChartLegend variant="chart-6">chart-6 · Amber</ChartLegend>
              <ChartLegend variant="chart-7">chart-7 · Red</ChartLegend>
              <ChartLegend variant="chart-8">chart-8 · Primary</ChartLegend>
            </ChartLegendGroup>
          </ComponentPreview>
        </div>

        {/* Alignment */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Alignment</h3>
          <p className="text-xs text-muted-foreground">
            The group wrapper supports left, center, and right alignment.
          </p>
          <ComponentPreview
            code={`<ChartLegendGroup align="left">
  <ChartLegend variant="chart-1">Planned</ChartLegend>
  <ChartLegend variant="chart-2">Actual</ChartLegend>
  <ChartLegend variant="chart-3">Forecast</ChartLegend>
</ChartLegendGroup>

<ChartLegendGroup align="center">
  <ChartLegend variant="chart-1">Planned</ChartLegend>
  <ChartLegend variant="chart-2">Actual</ChartLegend>
  <ChartLegend variant="chart-3">Forecast</ChartLegend>
</ChartLegendGroup>

<ChartLegendGroup align="right">
  <ChartLegend variant="chart-1">Planned</ChartLegend>
  <ChartLegend variant="chart-2">Actual</ChartLegend>
  <ChartLegend variant="chart-3">Forecast</ChartLegend>
</ChartLegendGroup>`}
          >
            <div className="flex w-full flex-col gap-4">
              {(["left", "center", "right"] as const).map((align) => (
                <div key={align} className="space-y-1">
                  <p className="text-[0.65rem] text-muted-foreground">{align}</p>
                  <ChartLegendGroup align={align}>
                    <ChartLegend variant="chart-1">Planned</ChartLegend>
                    <ChartLegend variant="chart-2">Actual</ChartLegend>
                    <ChartLegend variant="chart-3">Forecast</ChartLegend>
                  </ChartLegendGroup>
                </div>
              ))}
            </div>
          </ComponentPreview>
        </div>

        {/* Real-world: revenue breakdown */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Revenue Breakdown</h3>
          <p className="text-xs text-muted-foreground">
            Square swatches below a bar chart, left-aligned with the chart edge.
          </p>
          <ComponentPreview
            code={`<ChartLegendGroup align="left">
  <ChartLegend variant="chart-1" shape="square">Enterprise</ChartLegend>
  <ChartLegend variant="chart-2" shape="square">Mid-Market</ChartLegend>
  <ChartLegend variant="chart-3" shape="square">SMB</ChartLegend>
  <ChartLegend variant="chart-4" shape="square">Self-Serve</ChartLegend>
</ChartLegendGroup>`}
          >
            <ChartLegendGroup align="left">
              <ChartLegend variant="chart-1" shape="square">Enterprise</ChartLegend>
              <ChartLegend variant="chart-2" shape="square">Mid-Market</ChartLegend>
              <ChartLegend variant="chart-3" shape="square">SMB</ChartLegend>
              <ChartLegend variant="chart-4" shape="square">Self-Serve</ChartLegend>
            </ChartLegendGroup>
          </ComponentPreview>
        </div>

        {/* Real-world: audience segments pie */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Audience Segments</h3>
          <p className="text-xs text-muted-foreground">
            Round swatches centered below a donut chart, mirroring the pie slice colors.
          </p>
          <ComponentPreview
            code={`<ChartLegendGroup align="center">
  <ChartLegend variant="chart-1">18–24 · 22%</ChartLegend>
  <ChartLegend variant="chart-2">25–34 · 34%</ChartLegend>
  <ChartLegend variant="chart-3">35–44 · 21%</ChartLegend>
  <ChartLegend variant="chart-5">45–54 · 13%</ChartLegend>
  <ChartLegend variant="chart-6">55+ · 10%</ChartLegend>
</ChartLegendGroup>`}
          >
            <ChartLegendGroup align="center">
              <ChartLegend variant="chart-1">18–24 · 22%</ChartLegend>
              <ChartLegend variant="chart-2">25–34 · 34%</ChartLegend>
              <ChartLegend variant="chart-3">35–44 · 21%</ChartLegend>
              <ChartLegend variant="chart-5">45–54 · 13%</ChartLegend>
              <ChartLegend variant="chart-6">55+ · 10%</ChartLegend>
            </ChartLegendGroup>
          </ComponentPreview>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
