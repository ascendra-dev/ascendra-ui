"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  Button,
  Card,
  CardPanel,
  KpiLabel,
  KpiTile,
  KpiValue,
  NormalState,
  Skeleton,
  SkeletonState,
  WithSkeleton,
} from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["with-skeleton"];

function BasicDemo() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-64 space-y-3">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setIsLoading((v) => !v)}
      >
        {isLoading ? "Show real content" : "Show skeleton"}
      </Button>
      <Card className="h-full">
        <CardPanel>
          <WithSkeleton>
            <SkeletonState if={isLoading}>
              <KpiTile>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="mt-4 h-7 w-20" />
              </KpiTile>
            </SkeletonState>
            <NormalState if={!isLoading}>
              <KpiTile>
                <KpiLabel>Monthly Active Users</KpiLabel>
                <KpiValue className="mt-1.5">84,204</KpiValue>
              </KpiTile>
            </NormalState>
          </WithSkeleton>
        </CardPanel>
      </Card>
    </div>
  );
}

export function WithSkeletonDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        minHeight={220}
        code={`const query = useQuery(...);

<WithSkeleton>
  <SkeletonState if={query.isLoading}>
    <KpiTile>
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-4 h-7 w-20" />
    </KpiTile>
  </SkeletonState>
  <NormalState if={!query.isLoading}>
    <KpiTile>
      <KpiLabel>Monthly Active Users</KpiLabel>
      <KpiValue className="mt-1.5">{query.data.mau}</KpiValue>
    </KpiTile>
  </NormalState>
</WithSkeleton>`}
      >
        <BasicDemo />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            No built-in skeleton shape
          </h3>
          <p className="text-xs text-muted-foreground">
            Unlike LoadingState/EmptyState/ErrorState (see With State),
            SkeletonState has no default content — a skeleton&apos;s shape is
            always specific to what it&apos;s replacing (a KPI tile skeleton
            looks nothing like a bar-chart skeleton), so both branches are
            supplied by the caller.
          </p>
          <ComponentPreview
            code={`<SkeletonState if={isLoading}>
  <Skeleton className="h-40 w-full animate-pulse" />
</SkeletonState>`}
          >
            <div className="w-full max-w-sm">
              <SkeletonState if={true}>
                <Skeleton className="h-40 w-full animate-pulse" />
              </SkeletonState>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Pairs with NormalState
          </h3>
          <p className="text-xs text-muted-foreground">
            NormalState is shared with With State — the same component,
            since &quot;real content&quot; means the same thing regardless of
            which sibling wrapper it&apos;s used with.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
