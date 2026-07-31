"use client";

import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Calendar } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["calendar"];

export function CalendarDocContent() {
  const [single, setSingle] = useState<Date | undefined>(undefined);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [dropdown, setDropdown] = useState<Date | undefined>(undefined);

  return (
    <div className="space-y-10">
      {/* Hero preview */}
      <ComponentPreview
        align="start"
        code={`import { Calendar } from "@/ascendra-ui";

const [date, setDate] = useState<Date | undefined>(undefined);

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>`}
      >
        <Calendar mode="single" selected={single} onSelect={setSingle} />
      </ComponentPreview>

      {/* Examples */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Range selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Range selection
          </h3>
          <p className="text-xs text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              mode=&quot;range&quot;
            </code>{" "}
            and pass a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DateRange
            </code>{" "}
            as the selected value. Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              numberOfMonths
            </code>{" "}
            to display multiple months side-by-side.
          </p>
          <ComponentPreview
            align="start"
            code={`const [range, setRange] = useState<DateRange | undefined>(undefined);

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
/>`}
          >
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={2}
            />
          </ComponentPreview>
        </div>

        {/* With year/month dropdown */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            With year/month dropdown
          </h3>
          <p className="text-xs text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              startMonth
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              endMonth
            </code>{" "}
            to automatically enable the month/year dropdown caption.
          </p>
          <ComponentPreview
            align="start"
            code={`<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  startMonth={new Date(2020, 0)}
  endMonth={new Date(2030, 11)}
/>`}
          >
            <Calendar
              mode="single"
              selected={dropdown}
              onSelect={setDropdown}
              startMonth={new Date(2020, 0)}
              endMonth={new Date(2030, 11)}
            />
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
