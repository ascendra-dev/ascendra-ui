"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { WithCopyText, WithTooltip } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["with-copy-text"];

export function WithCopyTextDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { WithCopyText } from "@/ascendra-ui";

<WithCopyText value="INV-00124">INV-00124</WithCopyText>`}
      >
        <WithCopyText value="INV-00124">INV-00124</WithCopyText>
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
            code={`<WithCopyText value="user_abc123">user_abc123</WithCopyText>`}
          >
            <WithCopyText value="user_abc123">user_abc123</WithCopyText>
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
            code={`<WithCopyText value="pk_live_abc123" opaque>pk_live_abc123</WithCopyText>`}
          >
            <WithCopyText value="pk_live_abc123" opaque>
              pk_live_abc123
            </WithCopyText>
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
            code={`<WithCopyText value="admin@beacon.edu.pk" showTooltip opaque>
  admin@beacon.edu.pk
</WithCopyText>`}
          >
            <WithCopyText value="admin@beacon.edu.pk" showTooltip opaque>
              admin@beacon.edu.pk
            </WithCopyText>
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
            code={`<WithCopyText value="https://pay.ascendra.pk/invoice/INV-042" opaque />`}
          >
            <WithCopyText
              value="https://pay.ascendra.pk/invoice/INV-042"
              opaque
            />
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Composed with WithTooltip
          </h3>
          <p className="text-xs text-muted-foreground">
            Both are children-first wrapper components, so they nest freely —
            here <code className="rounded bg-muted px-1 font-mono text-xs">
              WithTooltip
            </code>{" "}
            explains what the value is, and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              WithCopyText
            </code>{" "}
            makes it click-to-copy, each unaware of the other.
          </p>
          <ComponentPreview
            code={`<WithTooltip tooltip="Full live secret key — click to copy">
  <WithCopyText value="sk_live_51H8x9k2eZvKYlo2C" opaque>
    sk_live_••••••••••••lo2C
  </WithCopyText>
</WithTooltip>`}
          >
            <WithTooltip tooltip="Full live secret key — click to copy">
              <WithCopyText value="sk_live_51H8x9k2eZvKYlo2C" opaque>
                sk_live_••••••••••••lo2C
              </WithCopyText>
            </WithTooltip>
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
