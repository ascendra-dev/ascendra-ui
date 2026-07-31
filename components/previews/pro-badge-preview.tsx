"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { ProBadge } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["pro-badge"];

export function ProBadgeDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { ProBadge } from "@/ascendra-ui";

<ProBadge>Pro</ProBadge>`}
      >
        <ProBadge>Pro</ProBadge>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Feature Gate</h3>
          <p className="text-xs text-muted-foreground">
            Attach to feature labels to indicate premium-only access.
          </p>
          <ComponentPreview
            code={`<div className="flex items-center gap-2">
  <span className="text-sm text-foreground">Advanced Analytics</span>
  <ProBadge>Pro</ProBadge>
</div>
<div className="flex items-center gap-2">
  <span className="text-sm text-foreground">Custom Branding</span>
  <ProBadge>Pro</ProBadge>
</div>`}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">
                  Advanced Analytics
                </span>
                <ProBadge>Pro</ProBadge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">Custom Branding</span>
                <ProBadge>Pro</ProBadge>
              </div>
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
