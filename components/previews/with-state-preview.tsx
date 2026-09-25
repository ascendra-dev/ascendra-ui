"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  Button,
  Card,
  CardPanel,
  EmptyState,
  ErrorState,
  LoadingState,
  NormalState,
  WithState,
} from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["with-state"];

type DemoState = "loading" | "error" | "empty" | "normal";

function BasicDemo() {
  const [demoState, setDemoState] = useState<DemoState>("normal");

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex flex-wrap gap-2">
        {(["loading", "error", "empty", "normal"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={demoState === s ? "primary" : "secondary"}
            onClick={() => setDemoState(s)}
          >
            {s[0].toUpperCase() + s.slice(1)}
          </Button>
        ))}
      </div>
      <Card className="h-64">
        <CardPanel className="h-full">
          <WithState>
            <LoadingState if={demoState === "loading"} />
            <ErrorState
              if={demoState === "error"}
              error={new Error("Request timed out")}
              onRetry={() => setDemoState("normal")}
            />
            <EmptyState if={demoState === "empty"} />
            <NormalState if={demoState === "normal"}>
              <div className="flex h-full flex-col justify-center gap-1 p-4 text-sm">
                <p className="font-medium">3 recent events</p>
                <p className="text-muted-foreground">
                  user.login · payment.captured · invoice.sent
                </p>
              </div>
            </NormalState>
          </WithState>
        </CardPanel>
      </Card>
    </div>
  );
}

export function WithStateDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        minHeight={280}
        code={`const query = useQuery(...);

<WithState>
  <LoadingState if={query.isLoading} />
  <ErrorState if={query.isError} error={query.error} onRetry={query.refetch} />
  <EmptyState if={!query.isLoading && !query.isError && query.data.length === 0} />
  <NormalState if={!query.isLoading && !query.isError && query.data.length > 0}>
    <RecentEventsList events={query.data} />
  </NormalState>
</WithState>`}
      >
        <BasicDemo />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Default UI per state
          </h3>
          <p className="text-xs text-muted-foreground">
            LoadingState, ErrorState, and EmptyState each render a built-in{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Empty
            </code>
            -based UI when no children are given. NormalState has no
            default — there is no generic &quot;success&quot; UI, so it
            always requires children.
          </p>
          <ComponentPreview
            code={`<div className="grid grid-cols-3 gap-4">
  <LoadingState if={true} />
  <ErrorState if={true} error={new Error("Request timed out")} onRetry={() => {}} />
  <EmptyState if={true} />
</div>`}
          >
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
              <Card className="h-56">
                <CardPanel className="h-full">
                  <LoadingState if={true} />
                </CardPanel>
              </Card>
              <Card className="h-56">
                <CardPanel className="h-full">
                  <ErrorState
                    if={true}
                    error={new Error("Request timed out")}
                    onRetry={() => {}}
                  />
                </CardPanel>
              </Card>
              <Card className="h-56">
                <CardPanel className="h-full">
                  <EmptyState if={true} />
                </CardPanel>
              </Card>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Custom content overrides the default
          </h3>
          <p className="text-xs text-muted-foreground">
            Passing children to LoadingState/ErrorState/EmptyState replaces
            the built-in UI entirely — title/description/icon/className are
            then ignored.
          </p>
          <ComponentPreview
            code={`<EmptyState if={true}>
  <div className="p-6 text-center text-sm text-muted-foreground">
    No audit events match this filter.
  </div>
</EmptyState>`}
          >
            <Card className="h-40 w-full max-w-sm">
              <CardPanel className="h-full">
                <EmptyState if={true}>
                  <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
                    No audit events match this filter.
                  </div>
                </EmptyState>
              </CardPanel>
            </Card>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Used standalone
          </h3>
          <p className="text-xs text-muted-foreground">
            Every state component is independently usable — drop ErrorState
            in on its own wherever a boolean condition needs an error
            affordance, with no WithState wrapper required.
          </p>
          <ComponentPreview
            code={`<ErrorState if={hasPermissionError} title="Access denied" onRetry={requestAccess} />`}
          >
            <Card className="h-40 w-full max-w-sm">
              <CardPanel className="h-full">
                <ErrorState if={true} title="Access denied" onRetry={() => {}} />
              </CardPanel>
            </Card>
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
