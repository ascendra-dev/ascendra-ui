"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { RadioGroup, RadioGroupItem } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["radio-group"];

export function RadioGroupDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { RadioGroup, RadioGroupItem } from "@/ascendra-ui";

<RadioGroup defaultValue="monthly">
  <RadioGroupItem value="monthly" />
  <RadioGroupItem value="yearly" />
</RadioGroup>`}
      >
        <RadioGroup defaultValue="monthly">
          <RadioGroupItem value="monthly" />
          <RadioGroupItem value="yearly" />
        </RadioGroup>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">With Labels</h3>
          <p className="text-muted-foreground text-xs">
            Wrap items in labels for accessible selection.
          </p>
          <ComponentPreview
            align="start"
            code={`<RadioGroup defaultValue="monthly">
  <label className="flex cursor-pointer items-center gap-0.5">
    <RadioGroupItem value="monthly" className="mb-1" />
    <span className="text-sm text-foreground">Monthly</span>
  </label>
  <label className="flex cursor-pointer items-center gap-0.5">
    <RadioGroupItem value="yearly" className="mb-1" />
    <span className="text-sm text-foreground">Yearly</span>
  </label>
</RadioGroup>`}
          >
            <RadioGroup defaultValue="monthly">
              <label className="flex cursor-pointer items-center gap-0.5">
                <RadioGroupItem value="monthly" className="mb-1" />
                <span className="text-foreground text-sm">Monthly</span>
              </label>
              <label className="flex cursor-pointer items-center gap-0.5">
                <RadioGroupItem value="yearly" className="mb-1" />
                <span className="text-foreground text-sm">Yearly</span>
              </label>
            </RadioGroup>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">
            With Disabled Item
          </h3>
          <p className="text-muted-foreground text-xs">
            Disable individual items by passing the{" "}
            <code className="bg-muted rounded px-1 font-mono text-xs">
              disabled
            </code>{" "}
            prop to{" "}
            <code className="bg-muted rounded px-1 font-mono text-xs">
              RadioGroupItem
            </code>
            .
          </p>
          <ComponentPreview
            align="start"
            code={`<RadioGroup defaultValue="card">
  <label className="flex cursor-pointer items-center gap-0.5">
    <RadioGroupItem value="card" className="mb-1" />
    <span className="text-sm text-foreground">Credit card</span>
  </label>
  <label className="flex items-center gap-0.5 opacity-50 cursor-not-allowed">
    <RadioGroupItem value="bank" disabled className="mb-1" />
    <span className="text-sm text-foreground">Bank transfer</span>
  </label>
</RadioGroup>`}
          >
            <RadioGroup defaultValue="card">
              <label className="flex cursor-pointer items-center gap-0.5">
                <RadioGroupItem value="card" className="mb-1" />
                <span className="text-foreground text-sm">Credit card</span>
              </label>
              <label className="flex cursor-not-allowed items-center gap-0.5 opacity-50">
                <RadioGroupItem value="bank" className="mb-1" disabled />
                <span className="text-foreground text-sm">Bank transfer</span>
              </label>
            </RadioGroup>
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
