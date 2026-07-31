"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { ThemeToggle } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["theme-toggle"];

export function ThemeToggleDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { ThemeToggle } from "@/ascendra-ui";

<ThemeToggle />`}
      >
        <ThemeToggle />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">In a Header</h3>
          <p className="text-xs text-muted-foreground">
            Drop into any header or toolbar — no props required.
          </p>
          <ComponentPreview
            code={`<div className="flex items-center justify-between rounded-lg border px-4 py-2">
  <span className="text-sm font-medium text-foreground">Ascendra Pay</span>
  <ThemeToggle />
</div>`}
          >
            <div className="flex w-full max-w-sm items-center justify-between rounded-lg border px-4 py-2">
              <span className="text-sm font-medium text-foreground">
                Ascendra Pay
              </span>
              <ThemeToggle />
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
