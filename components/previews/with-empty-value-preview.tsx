"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { WithEmptyValue } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["with-empty-value"];

export function WithEmptyValueDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { WithEmptyValue } from "@/ascendra-ui";

<WithEmptyValue value="Manual correction">
  Manual correction
</WithEmptyValue>
<WithEmptyValue value={null}>
  Manual correction
</WithEmptyValue>`}
      >
        <div className="flex flex-col gap-1.5 text-sm">
          <WithEmptyValue value="Manual correction">
            Manual correction
          </WithEmptyValue>
          <WithEmptyValue value={null}>Manual correction</WithEmptyValue>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            What counts as empty
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              null
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              undefined
            </code>
            , and an empty string all render the fallback. Everything else —
            including{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">0</code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              false
            </code>
            {" "}— renders children.
          </p>
          <ComponentPreview
            code={`<WithEmptyValue value={null}>Reason</WithEmptyValue>
<WithEmptyValue value={undefined}>Reason</WithEmptyValue>
<WithEmptyValue value="">Reason</WithEmptyValue>
<WithEmptyValue value={0}>Reason</WithEmptyValue>`}
          >
            <div className="flex flex-col gap-1.5 text-sm">
              <WithEmptyValue value={null}>Reason</WithEmptyValue>
              <WithEmptyValue value={undefined}>Reason</WithEmptyValue>
              <WithEmptyValue value="">Reason</WithEmptyValue>
              <WithEmptyValue value={0}>Reason</WithEmptyValue>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Custom fallback
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              fallback
            </code>{" "}
            to show something other than an em dash.
          </p>
          <ComponentPreview
            code={`<WithEmptyValue value={null} fallback="No tenant">
  tenant_abc123
</WithEmptyValue>`}
          >
            <WithEmptyValue value={null} fallback="No tenant">
              tenant_abc123
            </WithEmptyValue>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            A data table cell
          </h3>
          <p className="text-xs text-muted-foreground">
            The case that motivated this component: a table cell that
            highlights a searchable field when present (via{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DataTableHighlight
            </code>
            ), falling back to an em dash otherwise — previously a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              value ? &lt;X /&gt; : &apos;—&apos;
            </code>{" "}
            ternary repeated across several screens.
          </p>
          <ComponentPreview
            code={`<WithEmptyValue value="Manual correction after audit review">
  Manual correction after audit review
</WithEmptyValue>
<WithEmptyValue value={null}>
  Manual correction after audit review
</WithEmptyValue>`}
          >
            <div className="flex flex-col gap-1.5 text-sm">
              <WithEmptyValue value="Manual correction after audit review">
                Manual correction after audit review
              </WithEmptyValue>
              <WithEmptyValue value={null}>
                Manual correction after audit review
              </WithEmptyValue>
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
