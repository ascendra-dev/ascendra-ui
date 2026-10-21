"use client";

import { useState } from "react";
import { LuCalendar, LuKanban, LuList } from "react-icons/lu";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { SegmentControl, SegmentControlItem } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["segment-control"];

const PERIODS = [
  { value: "hour", label: "Past hour" },
  { value: "day", label: "Past 24 hours" },
  { value: "week", label: "Past 7 days" },
];

/** A controlled period picker — what a dashboard reads to fetch its numbers. */
function PeriodExample() {
  const [period, setPeriod] = useState("day");
  const label = PERIODS.find((p) => p.value === period)?.label;
  return (
    <div className="flex flex-col items-start gap-3">
      <SegmentControl aria-label="Period" segments={PERIODS} value={period} onValueChange={setPeriod} />
      <p className="text-muted-foreground text-xs">Showing: {label}</p>
    </div>
  );
}

export function SegmentControlDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        align="start"
        code={`import { SegmentControl, SegmentControlItem } from "@/ascendra-ui";

const PERIODS = [
  { value: "hour", label: "Past hour" },
  { value: "day", label: "Past 24 hours" },
  { value: "week", label: "Past 7 days" },
];

const [period, setPeriod] = useState("day");

<SegmentControl aria-label="Period" segments={PERIODS} value={period} onValueChange={setPeriod} />`}
      >
        <PeriodExample />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Small, uncontrolled</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">size=&quot;sm&quot;</code> for a toolbar or a
            card header. Without <code className="rounded bg-muted px-1 font-mono text-xs">value</code> it keeps its
            own choice — <code className="rounded bg-muted px-1 font-mono text-xs">defaultValue</code>, or the first
            segment when that is omitted too.
          </p>
          <ComponentPreview
            align="start"
            code={`<SegmentControl
  aria-label="Density"
  size="sm"
  segments={[
    { value: "compact", label: "Compact" },
    { value: "comfortable", label: "Comfortable" },
    { value: "spacious", label: "Spacious", disabled: true },
  ]}
/>`}
          >
            <SegmentControl
              aria-label="Density"
              size="sm"
              segments={[
                { value: "compact", label: "Compact" },
                { value: "comfortable", label: "Comfortable" },
                { value: "spacious", label: "Spacious", disabled: true },
              ]}
            />
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Custom segments</h3>
          <p className="text-xs text-muted-foreground">
            For content beyond a plain label — an icon, a count — compose{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">SegmentControlItem</code> children instead of
            passing <code className="rounded bg-muted px-1 font-mono text-xs">segments</code>.
          </p>
          <ComponentPreview
            align="start"
            code={`<SegmentControl aria-label="View" defaultValue="list">
  <SegmentControlItem value="list"><LuList /> List</SegmentControlItem>
  <SegmentControlItem value="board"><LuKanban /> Board</SegmentControlItem>
  <SegmentControlItem value="calendar"><LuCalendar /> Calendar</SegmentControlItem>
</SegmentControl>`}
          >
            <SegmentControl aria-label="View" defaultValue="list">
              <SegmentControlItem value="list">
                <LuList /> List
              </SegmentControlItem>
              <SegmentControlItem value="board">
                <LuKanban /> Board
              </SegmentControlItem>
              <SegmentControlItem value="calendar">
                <LuCalendar /> Calendar
              </SegmentControlItem>
            </SegmentControl>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Segment control or tabs?</h3>
          <p className="text-xs text-muted-foreground">
            A segment control picks a value the page reads — the same content, counted or shown differently. Tabs
            switch between different panels of content. A period picker on a dashboard is a segment control.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
