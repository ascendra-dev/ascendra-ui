"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  Skeleton,
  SkeletonText,
  SkeletonUser,
  SkeletonCard,
  SkeletonTableRow,
  SkeletonTable,
  SkeletonStat,
} from "@/ascendra-ui";

export function SkeletonDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { Skeleton } from "@/ascendra-ui";

<Skeleton className="h-4 w-48" />`}
      >
        <Skeleton className="h-4 w-48" />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Base Skeleton</h3>
          <p className="text-xs text-muted-foreground">
            The raw{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">Skeleton</code>{" "}
            div — size it however you need.
          </p>
          <ComponentPreview
            align="start"
            code={`<Skeleton className="h-8 w-8 rounded-full" />
<Skeleton className="h-4 w-40" />
<Skeleton className="h-20 w-full rounded-lg" />`}
          >
            <div className="flex flex-col gap-3 w-64">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">SkeletonText</h3>
          <p className="text-xs text-muted-foreground">
            A block of text lines. The last line is shorter to look natural.
          </p>
          <ComponentPreview
            align="start"
            code={`<SkeletonText />
<SkeletonText lines={2} />`}
          >
            <div className="flex flex-col gap-4 w-64">
              <SkeletonText />
              <SkeletonText lines={2} />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">SkeletonUser</h3>
          <p className="text-xs text-muted-foreground">
            Avatar + two lines of text — ideal for list items and comment threads.
          </p>
          <ComponentPreview
            align="start"
            code={`<SkeletonUser />
<SkeletonUser />
<SkeletonUser />`}
          >
            <div className="flex flex-col gap-3 w-64">
              <SkeletonUser />
              <SkeletonUser />
              <SkeletonUser />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">SkeletonStat</h3>
          <p className="text-xs text-muted-foreground">
            A KPI tile with a label and large value — use in dashboard grids.
          </p>
          <ComponentPreview
            align="start"
            code={`<div className="grid grid-cols-3 gap-4">
  <SkeletonStat />
  <SkeletonStat />
  <SkeletonStat />
</div>`}
          >
            <div className="grid w-full max-w-sm grid-cols-3 gap-3">
              <SkeletonStat />
              <SkeletonStat />
              <SkeletonStat />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">SkeletonCard</h3>
          <p className="text-xs text-muted-foreground">
            A full card with a header image area, title, and body lines.
          </p>
          <ComponentPreview
            align="start"
            code={`<SkeletonCard />
<SkeletonCard />`}
          >
            <div className="grid w-full max-w-sm grid-cols-2 gap-3">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">SkeletonTable</h3>
          <p className="text-xs text-muted-foreground">
            A full table placeholder with a header row and configurable row count.
          </p>
          <ComponentPreview
            align="start"
            code={`<SkeletonTable rows={4} />
<SkeletonTableRow />`}
          >
            <div className="w-full">
              <SkeletonTable rows={4} />
            </div>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable
          props={[
            { name: "className", type: "string", description: "Skeleton — additional CSS classes for size/shape." },
            { name: "lines", type: "number", default: "3", description: "SkeletonText — number of text lines." },
            { name: "rows", type: "number", default: "5", description: "SkeletonTable — number of data rows." },
          ]}
        />
      </div>
    </div>
  );
}
