"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { DatePicker } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["date-picker"];

export function DatePickerDocContent() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateDropdown, setDateDropdown] = useState<Date | undefined>(undefined);

  return (
    <div className="space-y-10">
      {/* Hero preview */}
      <ComponentPreview
        code={`import { DatePicker } from "@/ascendra-ui";

const [date, setDate] = useState<Date | undefined>(undefined);

<DatePicker value={date} onChange={setDate} />`}
      >
        <div className="w-64">
          <DatePicker value={date} onChange={setDate} />
        </div>
      </ComponentPreview>

      {/* Examples */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* With year/month dropdown */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            With year/month dropdown
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              fromYear
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              toYear
            </code>{" "}
            to enable a month/year dropdown inside the calendar popover.
          </p>
          <ComponentPreview
            code={`<DatePicker
  value={date}
  onChange={setDate}
  fromYear={2020}
  toYear={2030}
/>`}
          >
            <div className="w-64">
              <DatePicker
                value={dateDropdown}
                onChange={setDateDropdown}
                fromYear={2020}
                toYear={2030}
              />
            </div>
          </ComponentPreview>
        </div>

        {/* Disabled */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Disabled</h3>
          <ComponentPreview code={`<DatePicker disabled />`}>
            <div className="w-64">
              <DatePicker disabled />
            </div>
          </ComponentPreview>
        </div>

        {/* Invalid */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Invalid state</h3>
          <p className="text-xs text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              invalid
            </code>{" "}
            to apply a destructive outline — pair with a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldError
            </code>{" "}
            message below the picker.
          </p>
          <ComponentPreview code={`<DatePicker invalid />`}>
            <div className="w-64">
              <DatePicker invalid />
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
