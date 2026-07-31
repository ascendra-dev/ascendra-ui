"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/ascendra-ui";
import { registry } from "@/lib/registry";
import { LuSearch, LuCopy, LuGlobe } from "react-icons/lu";

const meta = registry["input-group"];

export function InputGroupDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import {
  InputGroup, InputGroupAddon, InputGroupButton,
  InputGroupText, InputGroupInput, InputGroupTextarea,
} from "@/ascendra-ui";

<InputGroup>
  <InputGroupAddon align="inline-start">
    <LuSearch className="size-4" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
</InputGroup>`}
      >
        <div className="w-64">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <LuSearch className="size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">Icon Prefix</h3>
          <p className="text-muted-foreground text-xs">
            Inline-start addon for icon or text prefix.
          </p>
          <ComponentPreview
            align="start"
            code={`<InputGroup>
  <InputGroupAddon align="inline-start">
    <LuSearch className="size-4" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search parents..." />
</InputGroup>`}
          >
            <div className="w-64">
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <LuSearch className="size-4" />
                </InputGroupAddon>
                <InputGroupInput placeholder="Search parents..." />
              </InputGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">Text Prefix</h3>
          <p className="text-muted-foreground text-xs">
            Use{" "}
            <code className="bg-muted rounded px-1 font-mono text-xs">
              InputGroupText
            </code>{" "}
            inside the addon for a text label.
          </p>
          <ComponentPreview
            align="start"
            code={`<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>PKR</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="0.00" type="number" />
</InputGroup>`}
          >
            <div className="w-64">
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>PKR</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="0.00" type="number" />
              </InputGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">
            Icon + Text Prefix
          </h3>
          <p className="text-muted-foreground text-xs">
            Combine an icon and a text label in the same inline-start addon.
          </p>
          <ComponentPreview
            align="start"
            code={`<InputGroup>
  <InputGroupAddon align="inline-start">
    <LuGlobe className="size-4" />
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>`}
          >
            <div className="w-64">
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <LuGlobe className="size-4" />
                  <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="example.com" />
              </InputGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">Domain Prefix</h3>
          <p className="text-muted-foreground text-xs">
            A muted, bordered inline-start addon showing a fixed host — useful
            for path or slug inputs (e.g. the Clerk Paths page pattern).
          </p>
          <ComponentPreview
            align="start"
            code={`<InputGroup className="w-full">
  <InputGroupInput placeholder="e.g. /unauthorized-sign-in" />
  <InputGroupAddon className="rounded-tl-sm rounded-bl-sm border-r border-gray-200 bg-gray-100">
    <div className="flex items-center gap-2 pr-2">
      <span className="font-normal">$DEVHOST</span>
    </div>
  </InputGroupAddon>
</InputGroup>`}
          >
            <div className="w-72">
              <InputGroup className="w-full">
                <InputGroupInput placeholder="e.g. /unauthorized-sign-in" />
                <InputGroupAddon className="rounded-tl-sm rounded-bl-sm border-r border-gray-200 bg-gray-100">
                  <div className="flex items-center gap-2 pr-2">
                    <span className="font-normal">$DEVHOST</span>
                  </div>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">Button Suffix</h3>
          <p className="text-muted-foreground text-xs">
            Inline-end addon with a ghost action button.
          </p>
          <ComponentPreview
            align="start"
            code={`<InputGroup>
  <InputGroupInput defaultValue="INV-00124" readOnly />
  <InputGroupAddon align="inline-end">
    <InputGroupButton>
      <LuCopy className="size-3.5" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}
          >
            <div className="w-64">
              <InputGroup>
                <InputGroupInput defaultValue="INV-00124" readOnly />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton>
                    <LuCopy className="size-3.5" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">
            Text Prefix + Copy Button
          </h3>
          <p className="text-muted-foreground text-xs">
            Pair a{" "}
            <code className="bg-muted rounded px-1 font-mono text-xs">
              InputGroupText
            </code>{" "}
            prefix on the left with a copy action button on the right.
          </p>
          <ComponentPreview
            align="start"
            code={`<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>PKR</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput defaultValue="12,500.00" readOnly />
  <InputGroupAddon align="inline-end">
    <InputGroupButton>
      <LuCopy className="size-3.5" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}
          >
            <div className="w-64">
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>PKR</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput defaultValue="12,500.00" readOnly />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton>
                    <LuCopy className="size-3.5" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">
            Block Label (Top)
          </h3>
          <p className="text-muted-foreground text-xs">
            Block-start addon places a label above the input inside the group
            border.
          </p>
          <ComponentPreview
            align="start"
            code={`<InputGroup>
  <InputGroupAddon align="block-start">Amount</InputGroupAddon>
  <InputGroupInput placeholder="0.00" type="number" />
</InputGroup>`}
          >
            <div className="w-64">
              <InputGroup>
                <InputGroupAddon align="block-start">Amount</InputGroupAddon>
                <InputGroupInput placeholder="0.00" type="number" />
              </InputGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">Textarea</h3>
          <p className="text-muted-foreground text-xs">
            Use{" "}
            <code className="bg-muted rounded px-1 font-mono text-xs">
              InputGroupTextarea
            </code>{" "}
            for multiline input with the same group styling.
          </p>
          <ComponentPreview
            align="start"
            code={`<InputGroup>
  <InputGroupTextarea placeholder="Add a note..." rows={3} />
</InputGroup>`}
          >
            <div className="w-64">
              <InputGroup>
                <InputGroupTextarea placeholder="Add a note..." rows={3} />
              </InputGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">Invalid state</h3>
          <p className="text-muted-foreground text-xs">
            Pass{" "}
            <code className="bg-muted rounded px-1 font-mono text-xs">
              aria-invalid={"{true}"}
            </code>{" "}
            on{" "}
            <code className="bg-muted rounded px-1 font-mono text-xs">
              InputGroupInput
            </code>{" "}
            — the group wrapper detects it and applies the red ring.
          </p>
          <ComponentPreview
            align="start"
            code={`<InputGroup>
  <InputGroupAddon align="inline-start">
    <LuSearch className="size-4" />
  </InputGroupAddon>
  <InputGroupInput aria-invalid={true} placeholder="Search..." />
</InputGroup>`}
          >
            <div className="w-64">
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <LuSearch className="size-4" />
                </InputGroupAddon>
                <InputGroupInput aria-invalid={true} placeholder="Search..." />
              </InputGroup>
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
