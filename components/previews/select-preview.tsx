"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["select"];

export function SelectDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import {
  Select, SelectTrigger, SelectContent, SelectItem,
  SelectGroup, SelectLabel, SelectValue, SelectSeparator,
} from "@/ascendra-ui";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="paid">Paid</SelectItem>
    <SelectItem value="pending">Pending</SelectItem>
    <SelectItem value="overdue">Overdue</SelectItem>
  </SelectContent>
</Select>`}
      >
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Sizes</h3>
          <p className="text-xs text-muted-foreground">
            Default (h-8) and small (h-5) trigger sizes.
          </p>
          <ComponentPreview
            code={`<Select>
  <SelectTrigger size="default">
    <SelectValue placeholder="Default size" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>

<Select>
  <SelectTrigger size="sm">
    <SelectValue placeholder="Small size" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>`}
          >
            <Select>
              <SelectTrigger size="default">
                <SelectValue placeholder="Default size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
                <SelectItem value="b">Option B</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger size="sm">
                <SelectValue placeholder="Small size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
                <SelectItem value="b">Option B</SelectItem>
              </SelectContent>
            </Select>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Grouped Options
          </h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              SelectGroup
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              SelectLabel
            </code>{" "}
            to organize related items.
          </p>
          <ComponentPreview
            code={`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select class" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Primary</SelectLabel>
      <SelectItem value="g1">Grade 1</SelectItem>
      <SelectItem value="g2">Grade 2</SelectItem>
      <SelectItem value="g3">Grade 3</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Secondary</SelectLabel>
      <SelectItem value="g6">Grade 6</SelectItem>
      <SelectItem value="g7">Grade 7</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
          >
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Primary</SelectLabel>
                  <SelectItem value="g1">Grade 1</SelectItem>
                  <SelectItem value="g2">Grade 2</SelectItem>
                  <SelectItem value="g3">Grade 3</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Secondary</SelectLabel>
                  <SelectItem value="g6">Grade 6</SelectItem>
                  <SelectItem value="g7">Grade 7</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Disabled</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              disabled
            </code>{" "}
            to the trigger to prevent interaction.
          </p>
          <ComponentPreview
            code={`<Select disabled>
  <SelectTrigger>
    <SelectValue placeholder="Disabled select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>`}
          >
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Disabled select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
              </SelectContent>
            </Select>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Invalid state</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              aria-invalid={"{true}"}
            </code>{" "}
            on{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              SelectTrigger
            </code>{" "}
            to apply a destructive outline.
          </p>
          <ComponentPreview
            code={`<Select>
  <SelectTrigger aria-invalid={true}>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>`}
          >
            <Select>
              <SelectTrigger aria-invalid={true}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
                <SelectItem value="b">Option B</SelectItem>
              </SelectContent>
            </Select>
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
