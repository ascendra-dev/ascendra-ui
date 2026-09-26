"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { WithTooltip, Button } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["with-tooltip"];

export function WithTooltipDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { WithTooltip } from "@/ascendra-ui";

<WithTooltip tooltip="2026-09-04T14:05:00.000Z">
  Sep 4, 2026, 2:05 PM
</WithTooltip>`}
      >
        <WithTooltip tooltip="2026-09-04T14:05:00.000Z">
          Sep 4, 2026, 2:05 PM
        </WithTooltip>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Plain text</h3>
          <p className="text-xs text-muted-foreground">
            The simplest case — a bare string child.
          </p>
          <ComponentPreview
            code={`<WithTooltip tooltip="Exact match count">42 results</WithTooltip>`}
          >
            <WithTooltip tooltip="Exact match count">42 results</WithTooltip>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Multiple / mixed children
          </h3>
          <p className="text-xs text-muted-foreground">
            No wrapping needed on the caller&apos;s side —{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              WithTooltip
            </code>{" "}
            supplies its own single trigger element, so a Fragment with
            several nodes (e.g. a highlighted search match) works with no
            changes.
          </p>
          <ComponentPreview
            code={`<WithTooltip tooltip="2026-09-04T14:05:00.000Z">
  Sep 4, <mark>2026</mark>, 2:05 PM
</WithTooltip>`}
          >
            <WithTooltip tooltip="2026-09-04T14:05:00.000Z">
              Sep 4,{" "}
              <mark className="rounded-sm bg-yellow-200/50 dark:bg-yellow-400/30">
                2026
              </mark>
              , 2:05 PM
            </WithTooltip>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">A Button</h3>
          <p className="text-xs text-muted-foreground">
            Behaves the same as wrapping a Button directly in{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              TooltipTrigger asChild
            </code>{" "}
            — <code className="rounded bg-muted px-1 font-mono text-xs">WithTooltip</code>{" "}
            is a drop-in for the common case.
          </p>
          <ComponentPreview
            code={`<WithTooltip tooltip="Save changes">
  <Button variant="secondary">Save</Button>
</WithTooltip>`}
          >
            <WithTooltip tooltip="Save changes">
              <Button variant="secondary" size="sm">
                Save
              </Button>
            </WithTooltip>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            A disabled Button
          </h3>
          <p className="text-xs text-muted-foreground">
            A disabled element doesn&apos;t receive pointer events, so a raw{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              TooltipTrigger asChild
            </code>{" "}
            needs a manual span wrapper to work (see the Tooltip page&apos;s
            own &quot;Disabled element&quot; example).{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              WithTooltip
            </code>
            &apos;s own span already provides that anchor.
          </p>
          <ComponentPreview
            code={`<WithTooltip tooltip="Complete all required fields first">
  <Button disabled>Submit</Button>
</WithTooltip>`}
          >
            <WithTooltip tooltip="Complete all required fields first">
              <Button disabled size="sm">
                Submit
              </Button>
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
