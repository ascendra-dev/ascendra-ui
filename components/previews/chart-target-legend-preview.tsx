"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { ChartTargetLegend, ChartTargetLegendGroup } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["chart-target-legend"];

export function ChartTargetLegendDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <ComponentPreview
        code={`import { ChartTargetLegend, ChartTargetLegendGroup } from "@/ascendra-ui";

<ChartTargetLegendGroup>
  <ChartTargetLegend variant="chart-1">Budget Target</ChartTargetLegend>
  <ChartTargetLegend variant="chart-2">Revenue Goal</ChartTargetLegend>
  <ChartTargetLegend variant="chart-3">Forecast Line</ChartTargetLegend>
</ChartTargetLegendGroup>`}
      >
        <ChartTargetLegendGroup>
          <ChartTargetLegend variant="chart-1">Budget Target</ChartTargetLegend>
          <ChartTargetLegend variant="chart-2">Revenue Goal</ChartTargetLegend>
          <ChartTargetLegend variant="chart-3">Forecast Line</ChartTargetLegend>
        </ChartTargetLegendGroup>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Size variants */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Sizes</h3>
          <p className="text-xs text-muted-foreground">
            Two bar widths: md (16×2 px) and lg (24×2 px). Height is always 2 px.
          </p>
          <ComponentPreview
            code={`<ChartTargetLegendGroup>
  <ChartTargetLegend variant="chart-1" size="md">md · Target</ChartTargetLegend>
  <ChartTargetLegend variant="chart-2" size="lg">lg · Goal</ChartTargetLegend>
</ChartTargetLegendGroup>`}
          >
            <ChartTargetLegendGroup>
              <ChartTargetLegend variant="chart-1" size="md">md · Target</ChartTargetLegend>
              <ChartTargetLegend variant="chart-2" size="lg">lg · Goal</ChartTargetLegend>
            </ChartTargetLegendGroup>
          </ComponentPreview>
        </div>

        {/* All color variants */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Color Variants</h3>
          <p className="text-xs text-muted-foreground">
            Eight chart color tokens, adapting to light and dark themes via CSS variables.
          </p>
          <ComponentPreview
            code={`<ChartTargetLegendGroup>
  <ChartTargetLegend variant="chart-1">chart-1 · Violet</ChartTargetLegend>
  <ChartTargetLegend variant="chart-2">chart-2 · Sky</ChartTargetLegend>
  <ChartTargetLegend variant="chart-3">chart-3 · Emerald</ChartTargetLegend>
  <ChartTargetLegend variant="chart-4">chart-4 · Rose</ChartTargetLegend>
  <ChartTargetLegend variant="chart-5">chart-5 · Orange</ChartTargetLegend>
  <ChartTargetLegend variant="chart-6">chart-6 · Amber</ChartTargetLegend>
  <ChartTargetLegend variant="chart-7">chart-7 · Red</ChartTargetLegend>
  <ChartTargetLegend variant="chart-8">chart-8 · Primary</ChartTargetLegend>
</ChartTargetLegendGroup>`}
          >
            <ChartTargetLegendGroup>
              <ChartTargetLegend variant="chart-1">chart-1 · Violet</ChartTargetLegend>
              <ChartTargetLegend variant="chart-2">chart-2 · Sky</ChartTargetLegend>
              <ChartTargetLegend variant="chart-3">chart-3 · Emerald</ChartTargetLegend>
              <ChartTargetLegend variant="chart-4">chart-4 · Rose</ChartTargetLegend>
              <ChartTargetLegend variant="chart-5">chart-5 · Orange</ChartTargetLegend>
              <ChartTargetLegend variant="chart-6">chart-6 · Amber</ChartTargetLegend>
              <ChartTargetLegend variant="chart-7">chart-7 · Red</ChartTargetLegend>
              <ChartTargetLegend variant="chart-8">chart-8 · Primary</ChartTargetLegend>
            </ChartTargetLegendGroup>
          </ComponentPreview>
        </div>

        {/* Alignment */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Alignment</h3>
          <p className="text-xs text-muted-foreground">
            The group wrapper supports left, center, and right alignment.
          </p>
          <ComponentPreview
            code={`<ChartTargetLegendGroup align="left">
  <ChartTargetLegend variant="chart-1">Planned</ChartTargetLegend>
  <ChartTargetLegend variant="chart-2">Actual</ChartTargetLegend>
</ChartTargetLegendGroup>

<ChartTargetLegendGroup align="center">
  <ChartTargetLegend variant="chart-1">Planned</ChartTargetLegend>
  <ChartTargetLegend variant="chart-2">Actual</ChartTargetLegend>
</ChartTargetLegendGroup>

<ChartTargetLegendGroup align="right">
  <ChartTargetLegend variant="chart-1">Planned</ChartTargetLegend>
  <ChartTargetLegend variant="chart-2">Actual</ChartTargetLegend>
</ChartTargetLegendGroup>`}
          >
            <div className="flex w-full flex-col gap-4">
              {(["left", "center", "right"] as const).map((align) => (
                <div key={align} className="space-y-1">
                  <p className="text-[0.65rem] text-muted-foreground">{align}</p>
                  <ChartTargetLegendGroup align={align}>
                    <ChartTargetLegend variant="chart-1">Planned</ChartTargetLegend>
                    <ChartTargetLegend variant="chart-2">Actual</ChartTargetLegend>
                  </ChartTargetLegendGroup>
                </div>
              ))}
            </div>
          </ComponentPreview>
        </div>

        {/* Real-world: KPI targets */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">KPI Target Lines</h3>
          <p className="text-xs text-muted-foreground">
            Mixed with regular ChartLegend to distinguish series from reference lines on the same chart.
          </p>
          <ComponentPreview
            code={`<ChartTargetLegendGroup align="left">
  <ChartTargetLegend variant="chart-4">Quota · $2M</ChartTargetLegend>
  <ChartTargetLegend variant="chart-5">Stretch · $2.4M</ChartTargetLegend>
  <ChartTargetLegend variant="chart-6">Industry Avg · $1.6M</ChartTargetLegend>
</ChartTargetLegendGroup>`}
          >
            <ChartTargetLegendGroup align="left">
              <ChartTargetLegend variant="chart-4">Quota · $2M</ChartTargetLegend>
              <ChartTargetLegend variant="chart-5">Stretch · $2.4M</ChartTargetLegend>
              <ChartTargetLegend variant="chart-6">Industry Avg · $1.6M</ChartTargetLegend>
            </ChartTargetLegendGroup>
          </ComponentPreview>
        </div>

        {/* Real-world: capacity thresholds */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Capacity Thresholds</h3>
          <p className="text-xs text-muted-foreground">
            Lg size for reference lines on a capacity or headcount chart.
          </p>
          <ComponentPreview
            code={`<ChartTargetLegendGroup align="center">
  <ChartTargetLegend variant="chart-7" size="lg">Critical · 95%</ChartTargetLegend>
  <ChartTargetLegend variant="chart-5" size="lg">Warning · 75%</ChartTargetLegend>
  <ChartTargetLegend variant="chart-3" size="lg">Safe · 50%</ChartTargetLegend>
</ChartTargetLegendGroup>`}
          >
            <ChartTargetLegendGroup align="center">
              <ChartTargetLegend variant="chart-7" size="lg">Critical · 95%</ChartTargetLegend>
              <ChartTargetLegend variant="chart-5" size="lg">Warning · 75%</ChartTargetLegend>
              <ChartTargetLegend variant="chart-3" size="lg">Safe · 50%</ChartTargetLegend>
            </ChartTargetLegendGroup>
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
