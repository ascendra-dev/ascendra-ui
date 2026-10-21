"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { SegmentedControl, SegmentedControlItem } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["segmented-control"];

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
      <SegmentedControl aria-label="Period" value={period} onValueChange={setPeriod}>
        {PERIODS.map((p) => (
          <SegmentedControlItem key={p.value} value={p.value}>
            {p.label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <p className="text-muted-foreground text-xs">Showing: {label}</p>
    </div>
  );
}

export function SegmentedControlDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        align="start"
        code={`import { SegmentedControl, SegmentedControlItem } from "@/ascendra-ui";

const [period, setPeriod] = useState("day");

<SegmentedControl aria-label="Period" value={period} onValueChange={setPeriod}>
  <SegmentedControlItem value="hour">Past hour</SegmentedControlItem>
  <SegmentedControlItem value="day">Past 24 hours</SegmentedControlItem>
  <SegmentedControlItem value="week">Past 7 days</SegmentedControlItem>
</SegmentedControl>`}
      >
        <PeriodExample />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Small, uncontrolled</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">size=&quot;sm&quot;</code> for a toolbar or a
            card header; <code className="rounded bg-muted px-1 font-mono text-xs">defaultValue</code> when nothing
            else needs to read the choice.
          </p>
          <ComponentPreview
            align="start"
            code={`<SegmentedControl aria-label="View" size="sm" defaultValue="list">
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="board">Board</SegmentedControlItem>
  <SegmentedControlItem value="calendar" disabled>Calendar</SegmentedControlItem>
</SegmentedControl>`}
          >
            <SegmentedControl aria-label="View" size="sm" defaultValue="list">
              <SegmentedControlItem value="list">List</SegmentedControlItem>
              <SegmentedControlItem value="board">Board</SegmentedControlItem>
              <SegmentedControlItem value="calendar" disabled>
                Calendar
              </SegmentedControlItem>
            </SegmentedControl>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Segmented control or tabs?</h3>
          <p className="text-xs text-muted-foreground">
            A segmented control picks a value the page reads — the same content, counted or shown differently. Tabs
            switch between different panels of content. A period picker on a dashboard is a segmented control.
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
