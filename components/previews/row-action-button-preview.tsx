"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { RowActionButton } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["row-action-button"];

export function RowActionButtonDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { RowActionButton } from "@/ascendra-ui";

<RowActionButton opaque />`}
      >
        <RowActionButton opaque />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Default (hidden until row hover)
          </h3>
          <p className="text-xs text-muted-foreground">
            By default the button is invisible (
            <code className="rounded bg-muted px-1 font-mono text-xs">
              opacity-0
            </code>
            ) and becomes visible when the parent row has{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              group/row
            </code>{" "}
            and is hovered. Hover over the row below to see it.
          </p>
          <ComponentPreview
            code={`<div className="group/row flex items-center justify-between rounded-lg border px-4 py-3">
  <span className="text-sm text-foreground">Ahmed Khan</span>
  <RowActionButton />
</div>`}
          >
            <div className="group/row flex w-full max-w-sm items-center justify-between rounded-lg border px-4 py-3">
              <span className="text-sm text-foreground">Ahmed Khan</span>
              <RowActionButton />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Opaque</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              opaque
            </code>{" "}
            to always show the button regardless of hover state.
          </p>
          <ComponentPreview
            code={`<div className="flex items-center justify-between rounded-lg border px-4 py-3">
  <span className="text-sm text-foreground">Sara Ali</span>
  <RowActionButton opaque />
</div>`}
          >
            <div className="flex w-full max-w-sm items-center justify-between rounded-lg border px-4 py-3">
              <span className="text-sm text-foreground">Sara Ali</span>
              <RowActionButton opaque />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With Dropdown</h3>
          <p className="text-xs text-muted-foreground">
            Pair with{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DropdownMenuTrigger asChild
            </code>{" "}
            for a full row action menu.
          </p>
          <ComponentPreview
            code={`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/ascendra-ui";

<div className="group/row flex items-center justify-between rounded-lg border px-4 py-3">
  <span className="text-sm text-foreground">Ahmed Khan</span>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <RowActionButton />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>View</DropdownMenuItem>
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>`}
          >
            {/* Static demo — shown without dropdown wiring for simplicity */}
            <div className="flex w-full max-w-sm items-center justify-between rounded-lg border px-4 py-3">
              <span className="text-sm text-foreground">Ahmed Khan</span>
              <RowActionButton opaque />
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
