"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { CopyText } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["copy-text"];

export function CopyTextDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { CopyText } from "@/ascendra-ui";

<CopyText value="INV-00124">INV-00124</CopyText>`}
      >
        <CopyText value="INV-00124">INV-00124</CopyText>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Default (hover to reveal icon)
          </h3>
          <p className="text-xs text-muted-foreground">
            The copy icon is hidden by default and reveals on hover.
          </p>
          <ComponentPreview
            code={`<CopyText value="user_abc123">user_abc123</CopyText>`}
          >
            <CopyText value="user_abc123">user_abc123</CopyText>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Opaque</h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              opaque
            </code>{" "}
            to always show the copy icon without hover.
          </p>
          <ComponentPreview
            code={`<CopyText value="pk_live_abc123" opaque>pk_live_abc123</CopyText>`}
          >
            <CopyText value="pk_live_abc123" opaque>
              pk_live_abc123
            </CopyText>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With Tooltip</h3>
          <p className="text-xs text-muted-foreground">
            Show a &quot;Copied&quot; tooltip confirmation by passing{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              showTooltip
            </code>
            .
          </p>
          <ComponentPreview
            code={`<CopyText value="admin@beacon.edu.pk" showTooltip opaque>
  admin@beacon.edu.pk
</CopyText>`}
          >
            <CopyText value="admin@beacon.edu.pk" showTooltip opaque>
              admin@beacon.edu.pk
            </CopyText>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Value Only (no child)
          </h3>
          <p className="text-xs text-muted-foreground">
            Omit children to render the value text automatically.
          </p>
          <ComponentPreview
            code={`<CopyText value="https://pay.ascendra.pk/invoice/INV-042" opaque />`}
          >
            <CopyText value="https://pay.ascendra.pk/invoice/INV-042" opaque />
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
