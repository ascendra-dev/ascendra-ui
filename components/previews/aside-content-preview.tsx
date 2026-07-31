"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { AsideContent } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["aside-content"];

export function AsideContentDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        align="start"
        code={`import { AsideContent } from "@/ascendra-ui";

<AsideContent>
  <p className="text-sm text-foreground font-medium">Invoice Summary</p>
  <p className="text-xs text-muted-foreground">Total: PKR 45,000</p>
</AsideContent>`}
      >
        <div className="w-64">
          <AsideContent>
            <p className="text-sm text-foreground font-medium">
              Invoice Summary
            </p>
            <p className="text-xs text-muted-foreground">Total: PKR 45,000</p>
          </AsideContent>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Default</h3>
          <p className="text-xs text-muted-foreground">
            Full-width on mobile with a card border; desktop renders without
            border.
          </p>
          <ComponentPreview
            align="start"
            code={`<AsideContent>
  <p className="text-sm font-medium text-foreground">Student Details</p>
  <div className="mt-2 space-y-1">
    <p className="text-xs text-muted-foreground">Name: Ali Hassan</p>
    <p className="text-xs text-muted-foreground">Class: Grade 5</p>
    <p className="text-xs text-muted-foreground">Roll No: 23</p>
  </div>
</AsideContent>`}
          >
            <div className="w-64">
              <AsideContent>
                <p className="text-sm font-medium text-foreground">
                  Student Details
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Name: Ali Hassan
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Class: Grade 5
                  </p>
                  <p className="text-xs text-muted-foreground">Roll No: 23</p>
                </div>
              </AsideContent>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Dimmed</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              dimmed
            </code>{" "}
            to reduce opacity and block pointer events on the aside.
          </p>
          <ComponentPreview
            align="start"
            code={`<AsideContent dimmed>
  <p className="text-sm font-medium text-foreground">Student Details</p>
  <p className="text-xs text-muted-foreground">Name: Ali Hassan</p>
</AsideContent>`}
          >
            <div className="w-64">
              <AsideContent dimmed>
                <p className="text-sm font-medium text-foreground">
                  Student Details
                </p>
                <p className="text-xs text-muted-foreground">
                  Name: Ali Hassan
                </p>
              </AsideContent>
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
