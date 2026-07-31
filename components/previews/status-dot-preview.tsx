"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { StatusDot } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["status-dot"];

export function StatusDotDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { StatusDot } from "@/ascendra-ui";

<StatusDot variant="emerald" />`}
      >
        <StatusDot variant="emerald" />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Variants</h3>
          <p className="text-xs text-muted-foreground">
            Twelve semantic color variants with matching halo shadow ring.
          </p>
          <ComponentPreview
            code={`<StatusDot variant="orange" />
<StatusDot variant="emerald" />
<StatusDot variant="sky" />
<StatusDot variant="violet" />
<StatusDot variant="rose" />
<StatusDot variant="amber" />
<StatusDot variant="red" />
<StatusDot variant="primary" />
<StatusDot variant="gray" />
<StatusDot variant="warning" />
<StatusDot variant="positive" />
<StatusDot variant="info" />`}
          >
            <StatusDot variant="orange" />
            <StatusDot variant="emerald" />
            <StatusDot variant="sky" />
            <StatusDot variant="violet" />
            <StatusDot variant="rose" />
            <StatusDot variant="amber" />
            <StatusDot variant="red" />
            <StatusDot variant="primary" />
            <StatusDot variant="gray" />
            <StatusDot variant="warning" />
            <StatusDot variant="positive" />
            <StatusDot variant="info" />
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With Label</h3>
          <p className="text-xs text-muted-foreground">
            Compose with a span to create labeled status indicators.
          </p>
          <ComponentPreview
            code={`<div className="flex items-center gap-2">
  <StatusDot variant="emerald" />
  <span className="text-sm text-foreground">Active</span>
</div>
<div className="flex items-center gap-2">
  <StatusDot variant="amber" />
  <span className="text-sm text-foreground">Pending</span>
</div>
<div className="flex items-center gap-2">
  <StatusDot variant="gray" />
  <span className="text-sm text-muted-foreground">Inactive</span>
</div>`}
          >
            <div className="flex items-center gap-2">
              <StatusDot variant="emerald" />
              <span className="text-sm text-foreground">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot variant="amber" />
              <span className="text-sm text-foreground">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot variant="gray" />
              <span className="text-sm text-muted-foreground">Inactive</span>
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
