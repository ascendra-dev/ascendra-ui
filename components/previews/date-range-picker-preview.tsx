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
  const [editableRange, setEditableRange] = useState<DateRange | undefined>(undefined);
  const [clearableRange, setClearableRange] = useState<DateRange | undefined>(
    () => {
      const to = new Date();
      return { from: new Date(to.getFullYear(), to.getMonth(), to.getDate() - 6), to };
    }
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

        {/* Editable */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Editable</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">editable</code> to type the range as well as pick it,
            in one field — e.g. 14/07/2026 – 11/10/2026. Any text between
            the two dates works (14-7-2026 to 11-10-2026 too). It&apos;s read on
            blur or Enter: one date is a start-only range, an end typed first
            is swapped, unreadable text reverts and empty text clears. The
            calendar button opens the picker.{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">dateFormat</code> sets the day/month order (default
            dd/MM/yyyy).
          </p>
          <ComponentPreview
            code={`<DateRangePicker value={range} onChange={setRange} editable showClear />`}
          >
            <div className="w-80">
              <DateRangePicker
                value={editableRange}
                onChange={setEditableRange}
                editable
                showClear
              />
            </div>
          </ComponentPreview>
        </div>

        {/* Clearable */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Clearable</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              showClear
            </code>{" "}
            to show a × while a value is set. Clicking it, or pressing
            Backspace/Delete on the focused trigger, clears the value without
            opening the calendar. The query filter panel turns it on for every
            optional date field.
          </p>
          <ComponentPreview
            code={`<DateRangePicker value={range} onChange={setRange} showClear />`}
          >
            <div className="w-72">
              <DateRangePicker
                value={clearableRange}
                onChange={setClearableRange}
                showClear
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
