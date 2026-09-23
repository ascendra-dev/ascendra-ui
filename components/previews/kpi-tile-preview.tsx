"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  Card,
  CardPanel,
  KpiCaption,
  KpiLabel,
  KpiTile,
  KpiTrend,
  KpiValue,
} from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["kpi-tile"];

export function KpiTileDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`<Card className="h-full">
  <CardPanel>
    <KpiTile>
      <KpiLabel>Monthly Recurring Revenue</KpiLabel>
      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <KpiValue>$248,400</KpiValue>
        <KpiTrend direction="up">+8.2%</KpiTrend>
      </div>
    </KpiTile>
  </CardPanel>
</Card>`}
      >
        <div className="w-64">
          <Card className="h-full">
            <CardPanel>
              <KpiTile>
                <KpiLabel>Monthly Recurring Revenue</KpiLabel>
                <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                  <KpiValue>$248,400</KpiValue>
                  <KpiTrend direction="up">+8.2%</KpiTrend>
                </div>
              </KpiTile>
            </CardPanel>
          </Card>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            KpiValue sizes
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">xl</code>{" "}
            for a dense multi-column report row up to{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">4xl</code>{" "}
            for a hero KPI row — pick per row, not per app.
          </p>
          <ComponentPreview
            code={`<div className="flex flex-wrap items-end gap-6">
  <KpiValue size="xl">$8.4M</KpiValue>
  <KpiValue size="2xl">$8.4M</KpiValue>
  <KpiValue size="3xl">$8.4M</KpiValue>
  <KpiValue size="4xl">$8.4M</KpiValue>
</div>`}
          >
            <div className="flex flex-wrap items-end gap-6">
              <KpiValue size="xl">$8.4M</KpiValue>
              <KpiValue size="2xl">$8.4M</KpiValue>
              <KpiValue size="3xl">$8.4M</KpiValue>
              <KpiValue size="4xl">$8.4M</KpiValue>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            KpiTrend variants
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              badge
            </code>{" "}
            (default) renders a SimpleBadge pill for a compact dashboard tile.{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              text
            </code>{" "}
            renders an inline colored label with no pill background, for an
            oversized report-hero value where a pill would look heavy.
          </p>
          <ComponentPreview
            code={`<div className="flex flex-wrap items-center gap-6">
  <KpiTrend direction="up">+8.2%</KpiTrend>
  <KpiTrend direction="down">-2.4%</KpiTrend>
  <KpiTrend direction="up" variant="text">+18.2%</KpiTrend>
  <KpiTrend direction="down" variant="text">-3.1%</KpiTrend>
</div>`}
          >
            <div className="flex flex-wrap items-center gap-6">
              <KpiTrend direction="up">+8.2%</KpiTrend>
              <KpiTrend direction="down">-2.4%</KpiTrend>
              <KpiTrend direction="up" variant="text">
                +18.2%
              </KpiTrend>
              <KpiTrend direction="down" variant="text">
                -3.1%
              </KpiTrend>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Dashboard KPI row
          </h3>
          <p className="text-xs text-muted-foreground">
            The common shape — 4 tiles, each a bordered Card, badge trend pinned
            to the bottom of the tile via{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              mt-auto
            </code>{" "}
            on its row.
          </p>
          <ComponentPreview
            code={`<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
  <Card className="h-full">
    <CardPanel>
      <KpiTile>
        <KpiLabel>Uptime (30d)</KpiLabel>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <KpiValue>99.94%</KpiValue>
          <KpiTrend direction="up">+0.04 pts</KpiTrend>
        </div>
      </KpiTile>
    </CardPanel>
  </Card>
  <Card className="h-full">
    <CardPanel>
      <KpiTile>
        <KpiLabel>P99 Latency</KpiLabel>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <KpiValue>182ms</KpiValue>
          <KpiTrend direction="down">+8ms</KpiTrend>
        </div>
      </KpiTile>
    </CardPanel>
  </Card>
  <Card className="h-full">
    <CardPanel>
      <KpiTile>
        <KpiLabel>Error Rate</KpiLabel>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <KpiValue>0.38%</KpiValue>
          <KpiTrend direction="up">-0.12 pts</KpiTrend>
        </div>
      </KpiTile>
    </CardPanel>
  </Card>
  <Card className="h-full">
    <CardPanel>
      <KpiTile>
        <KpiLabel>Deploy Frequency</KpiLabel>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <KpiValue>4.2/day</KpiValue>
          <KpiTrend direction="up">+0.8/day</KpiTrend>
        </div>
      </KpiTile>
    </CardPanel>
  </Card>
</div>`}
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card className="h-full">
                <CardPanel>
                  <KpiTile>
                    <KpiLabel>Uptime (30d)</KpiLabel>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                      <KpiValue>99.94%</KpiValue>
                      <KpiTrend direction="up">+0.04 pts</KpiTrend>
                    </div>
                  </KpiTile>
                </CardPanel>
              </Card>
              <Card className="h-full">
                <CardPanel>
                  <KpiTile>
                    <KpiLabel>P99 Latency</KpiLabel>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                      <KpiValue>182ms</KpiValue>
                      <KpiTrend direction="down">+8ms</KpiTrend>
                    </div>
                  </KpiTile>
                </CardPanel>
              </Card>
              <Card className="h-full">
                <CardPanel>
                  <KpiTile>
                    <KpiLabel>Error Rate</KpiLabel>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                      <KpiValue>0.38%</KpiValue>
                      <KpiTrend direction="up">-0.12 pts</KpiTrend>
                    </div>
                  </KpiTile>
                </CardPanel>
              </Card>
              <Card className="h-full">
                <CardPanel>
                  <KpiTile>
                    <KpiLabel>Deploy Frequency</KpiLabel>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                      <KpiValue>4.2/day</KpiValue>
                      <KpiTrend direction="up">+0.8/day</KpiTrend>
                    </div>
                  </KpiTile>
                </CardPanel>
              </Card>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Report hero row — no Card wrapper
          </h3>
          <p className="text-xs text-muted-foreground">
            KpiTile doesn&apos;t assume a Card — for an oversized report
            headline row, use it bare with a 4xl value, the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              text
            </code>{" "}
            trend variant, and a KpiCaption naming the comparison period.
          </p>
          <ComponentPreview
            code={`<div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
  <KpiTile className="p-0">
    <KpiLabel>H1 Revenue</KpiLabel>
    <KpiValue size="4xl" className="mt-1.5">$142.4M</KpiValue>
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <KpiTrend direction="up" variant="text">+18.2%</KpiTrend>
      <KpiCaption>vs $120.5M</KpiCaption>
    </div>
  </KpiTile>
  <KpiTile className="p-0">
    <KpiLabel>Gross Profit</KpiLabel>
    <KpiValue size="4xl" className="mt-1.5">$58.6M</KpiValue>
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <KpiTrend direction="up" variant="text">+21.4%</KpiTrend>
      <KpiCaption>vs $48.3M</KpiCaption>
    </div>
  </KpiTile>
</div>`}
          >
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <KpiTile className="p-0">
                <KpiLabel>H1 Revenue</KpiLabel>
                <KpiValue size="4xl" className="mt-1.5">
                  $142.4M
                </KpiValue>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <KpiTrend direction="up" variant="text">
                    +18.2%
                  </KpiTrend>
                  <KpiCaption>vs $120.5M</KpiCaption>
                </div>
              </KpiTile>
              <KpiTile className="p-0">
                <KpiLabel>Gross Profit</KpiLabel>
                <KpiValue size="4xl" className="mt-1.5">
                  $58.6M
                </KpiValue>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <KpiTrend direction="up" variant="text">
                    +21.4%
                  </KpiTrend>
                  <KpiCaption>vs $48.3M</KpiCaption>
                </div>
              </KpiTile>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Threshold warning
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              variant=&quot;warning&quot;
            </code>{" "}
            on KpiValue colors the number amber when a metric has breached its
            target — no trend badge needed, the caption states the miss.
          </p>
          <ComponentPreview
            code={`<div className="w-64">
  <Card>
    <CardPanel>
      <KpiTile>
        <KpiLabel>On-time Delivery</KpiLabel>
        <KpiValue size="3xl" variant="warning" className="mt-1.5">91.4%</KpiValue>
        <KpiCaption className="mt-1">-1.8 pp vs target 93%</KpiCaption>
      </KpiTile>
    </CardPanel>
  </Card>
</div>`}
          >
            <div className="w-64">
              <Card>
                <CardPanel>
                  <KpiTile>
                    <KpiLabel>On-time Delivery</KpiLabel>
                    <KpiValue size="3xl" variant="warning" className="mt-1.5">
                      91.4%
                    </KpiValue>
                    <KpiCaption className="mt-1">
                      -1.8 pp vs target 93%
                    </KpiCaption>
                  </KpiTile>
                </CardPanel>
              </Card>
            </div>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
