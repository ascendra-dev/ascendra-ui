"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Button } from "@/ascendra-ui";
import { registry } from "@/lib/registry";
import { LuPlus } from "react-icons/lu";

const meta = registry["button"];

export function ButtonDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero preview */}
      <ComponentPreview
        code={`import { Button } from "@/ascendra-ui";

<Button>Continue</Button>`}
      >
        <Button>Continue</Button>
      </ComponentPreview>

      {/* Examples */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Variants */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Variants</h3>
          <p className="text-xs text-muted-foreground">
            Five visual styles for different contexts and emphasis levels.
          </p>
          <ComponentPreview
            code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
          >
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </ComponentPreview>
        </div>

        {/* Sizes */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Sizes</h3>
          <p className="text-xs text-muted-foreground">
            Five sizes from compact inline labels to prominent page-level CTAs.
          </p>
          <ComponentPreview
            code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <LuPlus />
</Button>`}
          >
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <LuPlus />
            </Button>
          </ComponentPreview>
        </div>

        {/* Disabled */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Disabled</h3>
          <p className="text-xs text-muted-foreground">
            Disabled state reduces opacity and blocks pointer events.
          </p>
          <ComponentPreview
            code={`<Button disabled>Disabled</Button>
<Button variant="secondary" disabled>Disabled</Button>
<Button variant="destructive" disabled>Disabled</Button>`}
          >
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
            <Button variant="destructive" disabled>
              Disabled
            </Button>
          </ComponentPreview>
        </div>

        {/* asChild — link example */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">As Link</h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              asChild
            </code>{" "}
            with a Next.js{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Link
            </code>{" "}
            to render a button-styled anchor.
          </p>
          <ComponentPreview
            code={`import Link from 'next/link';

<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>`}
          >
            <Button asChild>
              <a href="#">Go to Dashboard</a>
            </Button>
          </ComponentPreview>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
