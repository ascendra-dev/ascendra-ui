"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { IdText } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["id-text"];

export function IdTextDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { IdText } from "@/ascendra-ui";

<IdText value="5b9e1c04-2a71-4c3e-9f8a-d3b6e0c1a1a1" />`}
      >
        <IdText value="5b9e1c04-2a71-4c3e-9f8a-d3b6e0c1a1a1" />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Sizes</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              size
            </code>{" "}
            defaults to &quot;full&quot; (the value as-is);
            &quot;sm&quot;/&quot;md&quot;/&quot;lg&quot; truncate to
            &quot;head…tail&quot; with progressively more characters — for
            tighter spaces like a table cell.
          </p>
          <ComponentPreview
            code={`<IdText value="5b9e1c04-2a71-4c3e-9f8a-d3b6e0c1a1a1" size="full" />
<IdText value="5b9e1c04-2a71-4c3e-9f8a-d3b6e0c1a1a1" size="lg" />
<IdText value="5b9e1c04-2a71-4c3e-9f8a-d3b6e0c1a1a1" size="md" />
<IdText value="5b9e1c04-2a71-4c3e-9f8a-d3b6e0c1a1a1" size="sm" />`}
          >
            <div className="flex flex-col gap-2">
              <IdText value="5b9e1c04-2a71-4c3e-9f8a-d3b6e0c1a1a1" size="full" />
              <IdText value="5b9e1c04-2a71-4c3e-9f8a-d3b6e0c1a1a1" size="lg" />
              <IdText value="5b9e1c04-2a71-4c3e-9f8a-d3b6e0c1a1a1" size="md" />
              <IdText value="5b9e1c04-2a71-4c3e-9f8a-d3b6e0c1a1a1" size="sm" />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Short values stay untruncated
          </h3>
          <p className="text-xs text-muted-foreground">
            A value that already fits within the size&apos;s head+tail
            length renders in full — no pointless ellipsis.
          </p>
          <ComponentPreview code={`<IdText value="inv_042" />`}>
            <IdText value="inv_042" />
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Default (copy + tooltip)
          </h3>
          <p className="text-xs text-muted-foreground">
            Click to copy the full value (icon flips to a checkmark
            briefly), hover to see the full value — both on by default.
          </p>
          <ComponentPreview
            code={`<IdText value="a7c1e4b2-5f3d-4a8e-9b2c-6d1f0e4a7c01" />`}
          >
            <IdText value="a7c1e4b2-5f3d-4a8e-9b2c-6d1f0e4a7c01" />
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Overriding the defaults
          </h3>
          <p className="text-xs text-muted-foreground">
            Turn off copy, tooltip, or both — the value is still just
            truncated text.
          </p>
          <ComponentPreview
            code={`<IdText value="b8d2f5c3-6a4e-4b9f-8c3d-7e2a1f5b8d01" copyable={false} />
<IdText value="b8d2f5c3-6a4e-4b9f-8c3d-7e2a1f5b8d01" showTooltip={false} />
<IdText value="b8d2f5c3-6a4e-4b9f-8c3d-7e2a1f5b8d01" copyable={false} showTooltip={false} />`}
          >
            <div className="flex flex-col gap-2">
              <IdText
                value="b8d2f5c3-6a4e-4b9f-8c3d-7e2a1f5b8d01"
                copyable={false}
              />
              <IdText
                value="b8d2f5c3-6a4e-4b9f-8c3d-7e2a1f5b8d01"
                showTooltip={false}
              />
              <IdText
                value="b8d2f5c3-6a4e-4b9f-8c3d-7e2a1f5b8d01"
                copyable={false}
                showTooltip={false}
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Overriding font-size
          </h3>
          <p className="text-xs text-muted-foreground">
            The monospace font is fixed, but{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              className
            </code>{" "}
            /{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              style
            </code>{" "}
            reach the text itself.
          </p>
          <ComponentPreview
            code={`<IdText
  value="c9e3f6d4-7b5f-4c8a-9d4e-8f3b2a6c9d01"
  style={{ fontSize: "1rem" }}
/>`}
          >
            <IdText
              value="c9e3f6d4-7b5f-4c8a-9d4e-8f3b2a6c9d01"
              style={{ fontSize: "1rem" }}
            />
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
