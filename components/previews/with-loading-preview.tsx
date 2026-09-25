"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  Button,
  Card,
  CardPanel,
  LoadingState,
  NormalState,
  WithLoading,
} from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["with-loading"];

function BasicDemo() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full max-w-sm space-y-3">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setIsLoading((v) => !v)}
      >
        {isLoading ? "Show value" : "Show loading"}
      </Button>
      <Card className="h-56">
        <CardPanel className="h-full">
          <WithLoading>
            <LoadingState if={isLoading} />
            <NormalState if={!isLoading}>
              <div className="flex h-full flex-col justify-center gap-1 p-4 text-sm">
                <p className="text-muted-foreground">Account balance</p>
                <p className="text-2xl font-semibold">$4,281.00</p>
              </div>
            </NormalState>
          </WithLoading>
        </CardPanel>
      </Card>
    </div>
  );
}

export function WithLoadingDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        minHeight={260}
        code={`const balance = useAccountBalance();

<WithLoading>
  <LoadingState if={balance.isLoading} />
  <NormalState if={!balance.isLoading}>
    <BalanceDisplay value={balance.data} />
  </NormalState>
</WithLoading>`}
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
            Use <code className="rounded bg-muted px-1 font-mono text-xs">WithLoading</code>{" "}
            when a section genuinely only ever has two states — loading and
            normal, no error and no empty result are possible (e.g. a value
            with a guaranteed fallback, or a locally-derived computation with
            no failure mode). The wrapper is functionally identical to{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">WithState</code>{" "}
            — it exists purely so its name tells a reader not to look for
            error/empty handling in this block. If a section can genuinely
            fail or come back empty, use{" "}
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
