"use client";

import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { DateRangePicker } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["date-range-picker"];

export function DateRangePickerDocContent() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [singleRange, setSingleRange] = useState<DateRange | undefined>(
    undefined
  );

  return (
    <div className="space-y-10">
      {/* Hero preview */}
      <ComponentPreview
        code={`import { DateRangePicker } from "@/ascendra-ui";
import type { DateRange } from "react-day-picker";

const [range, setRange] = useState<DateRange | undefined>(undefined);

<DateRangePicker value={range} onChange={setRange} />`}
      >
        <div className="w-72">
          <DateRangePicker value={range} onChange={setRange} />
        </div>
      </ComponentPreview>

      {/* Examples */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Single month */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Single month</h3>
          <p className="text-xs text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              numberOfMonths={"{1}"}
            </code>{" "}
            for a compact single-month range picker. The default is{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">2</code>.
          </p>
          <ComponentPreview
            code={`<DateRangePicker
  value={range}
  onChange={setRange}
  numberOfMonths={1}
/>`}
          >
            <div className="w-64">
              <DateRangePicker
                value={singleRange}
                onChange={setSingleRange}
                numberOfMonths={1}
              />
            </div>
          </ComponentPreview>
        </div>

        {/* Disabled */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Disabled</h3>
          <ComponentPreview code={`<DateRangePicker disabled />`}>
            <div className="w-72">
              <DateRangePicker disabled />
            </div>
          </ComponentPreview>
        </div>

        {/* Invalid */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Invalid state</h3>
          <ComponentPreview code={`<DateRangePicker invalid />`}>
            <div className="w-72">
              <DateRangePicker invalid />
            </div>
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
