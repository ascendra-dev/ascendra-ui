"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { SimpleBadge } from "@/ascendra-ui";
import { registry } from "@/lib/registry";
import { LuCircleCheck, LuTriangleAlert } from "react-icons/lu";

const meta = registry["simple-badge"];

export function SimpleBadgeDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero preview */}
      <ComponentPreview
        code={`import { SimpleBadge } from "@/ascendra-ui";

<SimpleBadge>Active</SimpleBadge>`}
      >
        <SimpleBadge>Active</SimpleBadge>
      </ComponentPreview>

      {/* Examples */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* All variants */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Variants</h3>
          <p className="text-xs text-muted-foreground">
            Eleven semantic color variants matching the project&apos;s color
            system.
          </p>
          <ComponentPreview
            code={`<SimpleBadge variant="default">Default</SimpleBadge>
<SimpleBadge variant="secondary">Secondary</SimpleBadge>
<SimpleBadge variant="green">Green</SimpleBadge>
<SimpleBadge variant="blue">Blue</SimpleBadge>
<SimpleBadge variant="orange">Orange</SimpleBadge>
<SimpleBadge variant="amber">Amber</SimpleBadge>
<SimpleBadge variant="red">Red</SimpleBadge>
<SimpleBadge variant="violet">Violet</SimpleBadge>
<SimpleBadge variant="warning">Warning</SimpleBadge>
<SimpleBadge variant="positive">Positive</SimpleBadge>
<SimpleBadge variant="info">Info</SimpleBadge>`}
          >
            <SimpleBadge variant="default">Default</SimpleBadge>
            <SimpleBadge variant="secondary">Secondary</SimpleBadge>
            <SimpleBadge variant="green">Green</SimpleBadge>
            <SimpleBadge variant="blue">Blue</SimpleBadge>
            <SimpleBadge variant="orange">Orange</SimpleBadge>
            <SimpleBadge variant="amber">Amber</SimpleBadge>
            <SimpleBadge variant="red">Red</SimpleBadge>
            <SimpleBadge variant="violet">Violet</SimpleBadge>
            <SimpleBadge variant="warning">Warning</SimpleBadge>
            <SimpleBadge variant="positive">Positive</SimpleBadge>
            <SimpleBadge variant="info">Info</SimpleBadge>
          </ComponentPreview>
        </div>

        {/* With icon */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With Icon</h3>
          <p className="text-xs text-muted-foreground">
            Place an icon before the label text. The inner flex container
            handles alignment.
          </p>
          <ComponentPreview
            code={`import { LuCircleCheck, LuTriangleAlert } from 'react-icons/lu';

<SimpleBadge variant="green">
  <LuCircleCheck className="h-3 w-3" />
  Paid
</SimpleBadge>

<SimpleBadge variant="amber">
  <LuTriangleAlert className="h-3 w-3" />
  Overdue
</SimpleBadge>

<SimpleBadge variant="red">
  <LuTriangleAlert className="h-3 w-3" />
  Failed
</SimpleBadge>`}
          >
            <SimpleBadge variant="green">
              <LuCircleCheck className="h-3 w-3" />
              Paid
            </SimpleBadge>
            <SimpleBadge variant="amber">
              <LuTriangleAlert className="h-3 w-3" />
              Overdue
            </SimpleBadge>
            <SimpleBadge variant="red">
              <LuTriangleAlert className="h-3 w-3" />
              Failed
            </SimpleBadge>
          </ComponentPreview>
        </div>

        {/* Status labels — practical usage */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Invoice Status Labels
          </h3>
          <p className="text-xs text-muted-foreground">
            Practical usage for invoice or payment status in a table.
          </p>
          <ComponentPreview
            code={`<SimpleBadge variant="green">Paid</SimpleBadge>
<SimpleBadge variant="secondary">Draft</SimpleBadge>
<SimpleBadge variant="blue">Pending</SimpleBadge>
<SimpleBadge variant="amber">Overdue</SimpleBadge>
<SimpleBadge variant="red">Cancelled</SimpleBadge>`}
          >
            <SimpleBadge variant="green">Paid</SimpleBadge>
            <SimpleBadge variant="secondary">Draft</SimpleBadge>
            <SimpleBadge variant="blue">Pending</SimpleBadge>
            <SimpleBadge variant="amber">Overdue</SimpleBadge>
            <SimpleBadge variant="red">Cancelled</SimpleBadge>
          </ComponentPreview>
        </div>

        {/* asChild */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">As Child</h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              asChild
            </code>{" "}
            to apply badge styles to any element, such as a link or button.
          </p>
          <ComponentPreview
            code={`<SimpleBadge asChild variant="blue">
  <a href="#">View Plan</a>
</SimpleBadge>`}
          >
            <SimpleBadge asChild variant="blue">
              <a href="#">View Plan</a>
            </SimpleBadge>
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
