"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/ascendra-ui";
import { registry } from "@/lib/registry";
import { LuFileX, LuPlus } from "react-icons/lu";

const meta = registry["empty"];

export function EmptyDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import {
  Empty, EmptyHeader, EmptyTitle, EmptyDescription,
  EmptyContent, EmptyMedia,
} from "@/ascendra-ui";

<Empty>
  <EmptyHeader>
    <EmptyTitle>No invoices found</EmptyTitle>
    <EmptyDescription>Create your first invoice to get started.</EmptyDescription>
  </EmptyHeader>
</Empty>`}
      >
        <div className="w-full rounded-lg border border-dashed">
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No invoices found</EmptyTitle>
              <EmptyDescription>
                Create your first invoice to get started.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            With Icon Media
          </h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              EmptyMedia variant=&quot;icon&quot;
            </code>{" "}
            for a boxed icon above the title.
          </p>
          <ComponentPreview
            code={`<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <LuFileX />
    </EmptyMedia>
    <EmptyTitle>No parents added</EmptyTitle>
    <EmptyDescription>Add your first parent to start managing students and invoices.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>
      <LuPlus />
      Add Parent
    </Button>
  </EmptyContent>
</Empty>`}
          >
            <div className="w-full rounded-lg border border-dashed">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <LuFileX />
                  </EmptyMedia>
                  <EmptyTitle>No parents added</EmptyTitle>
                  <EmptyDescription>
                    Add your first parent to start managing students and
                    invoices.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button>
                    <LuPlus />
                    Add Parent
                  </Button>
                </EmptyContent>
              </Empty>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Minimal</h3>
          <p className="text-xs text-muted-foreground">
            Text-only empty state for compact areas like table bodies.
          </p>
          <ComponentPreview
            code={`<Empty className="py-8">
  <EmptyHeader>
    <EmptyTitle>No results</EmptyTitle>
    <EmptyDescription>Try adjusting your search or filter criteria.</EmptyDescription>
  </EmptyHeader>
</Empty>`}
          >
            <div className="w-full rounded-lg border border-dashed">
              <Empty className="py-8">
                <EmptyHeader>
                  <EmptyTitle>No results</EmptyTitle>
                  <EmptyDescription>
                    Try adjusting your search or filter criteria.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
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
