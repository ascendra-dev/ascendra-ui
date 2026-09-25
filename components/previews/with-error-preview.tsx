"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  Button,
  Card,
  CardPanel,
  ErrorState,
  NormalState,
  WithError,
} from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["with-error"];

function BasicDemo() {
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-3">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setHasFailed((v) => !v)}
      >
        {hasFailed ? "Simulate successful sync" : "Simulate sync failure"}
      </Button>
      <Card className="h-56">
        <CardPanel className="h-full">
          <WithError>
            <ErrorState
              if={hasFailed}
              title="Sync failed"
              error={new Error("Could not reach the sync service")}
              onRetry={() => setHasFailed(false)}
            />
            <NormalState if={!hasFailed}>
              <div className="flex h-full flex-col justify-center gap-1 p-4 text-sm">
                <p className="text-muted-foreground">Last synced</p>
                <p className="text-2xl font-semibold">Just now</p>
              </div>
            </NormalState>
          </WithError>
        </CardPanel>
      </Card>
    </div>
  );
}

export function WithErrorDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        minHeight={260}
        code={`const sync = useBackgroundSync();

<WithError>
  <ErrorState if={sync.hasFailed} error={sync.error} onRetry={sync.retry} />
  <NormalState if={!sync.hasFailed}>
    <LastSyncedLabel at={sync.lastSyncedAt} />
  </NormalState>
</WithError>`}
      >
        <BasicDemo />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            When to reach for this instead of With State
          </h3>
          <p className="text-xs text-muted-foreground">
            Use <code className="rounded bg-muted px-1 font-mono text-xs">WithError</code>{" "}
            when a section&apos;s content is always already available except when
            a background action fails — no loading state, no empty result,
            just error/normal (e.g. an optimistic value that only shows an
            error affordance if a background refresh or sync fails). The
            wrapper is functionally identical to{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">WithState</code>{" "}
            — it exists purely so its name tells a reader not to look for
            loading/empty handling in this block. If the section can
            genuinely be loading or empty too, use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              WithState
            </code>{" "}
            instead so the full state set stays visible.
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
