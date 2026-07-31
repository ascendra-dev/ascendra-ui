"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Anchor } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["anchor"];

export function AnchorDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { Anchor } from "@/ascendra-ui";

<Anchor href="#">View invoice</Anchor>`}
      >
        <Anchor href="#">View invoice</Anchor>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Variants</h3>
          <p className="text-xs text-muted-foreground">
            Three color variants: primary (brand), blue (info), and muted.
          </p>
          <ComponentPreview
            code={`<Anchor href="#" variant="primary">Primary link</Anchor>
<Anchor href="#" variant="blue">Blue link</Anchor>
<Anchor href="#" variant="muted">Muted link</Anchor>`}
          >
            <Anchor href="#" variant="primary">
              Primary link
            </Anchor>
            <Anchor href="#" variant="blue">
              Blue link
            </Anchor>
            <Anchor href="#" variant="muted">
              Muted link
            </Anchor>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">In Context</h3>
          <p className="text-xs text-muted-foreground">
            Common usage inside paragraph text and description labels.
          </p>
          <ComponentPreview
            align="start"
            code={`<p className="text-sm text-muted-foreground">
  By continuing you agree to our{' '}
  <Anchor href="#" variant="primary">Terms of Service</Anchor>
  {' '}and{' '}
  <Anchor href="#" variant="primary">Privacy Policy</Anchor>.
</p>`}
          >
            <p className="text-sm text-muted-foreground">
              By continuing you agree to our{" "}
              <Anchor href="#" variant="primary">
                Terms of Service
              </Anchor>{" "}
              and{" "}
              <Anchor href="#" variant="primary">
                Privacy Policy
              </Anchor>
              .
            </p>
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
