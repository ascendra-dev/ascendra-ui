"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Rating } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["rating"];

function InteractiveRating() {
  const [value, setValue] = useState(0);
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating rating={value} onChange={setValue} size="lg" color="amber" />
      <p className="text-xs text-muted-foreground">
        {value > 0
          ? `You rated this ${value} star${value !== 1 ? "s" : ""}`
          : "Click a star to rate"}
      </p>
    </div>
  );
}

export function RatingDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero preview */}
      <ComponentPreview
        code={`import { Rating } from "@/ascendra-ui";

<Rating rating={3.5} />`}
      >
        <Rating rating={3.5} />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Sizes */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Sizes</h3>
          <p className="text-xs text-muted-foreground">
            Five sizes from{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">xs</code>{" "}
            to{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">xl</code>.
          </p>
          <ComponentPreview
            align="start"
            code={`<Rating rating={4} size="xs" />
<Rating rating={4} size="sm" />
<Rating rating={4} size="md" />
<Rating rating={4} size="lg" />
<Rating rating={4} size="xl" />`}
          >
            <div className="flex flex-col gap-3">
              <Rating rating={4} size="xs" />
              <Rating rating={4} size="sm" />
              <Rating rating={4} size="md" />
              <Rating rating={4} size="lg" />
              <Rating rating={4} size="xl" />
            </div>
          </ComponentPreview>
        </div>

        {/* Colors */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Colors</h3>
          <p className="text-xs text-muted-foreground">
            Seven color options — the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">default</code>{" "}
            variant uses the theme&apos;s chart accent color.
          </p>
          <ComponentPreview
            align="start"
            code={`<Rating rating={4} color="default" />
<Rating rating={4} color="amber" />
<Rating rating={4} color="orange" />
<Rating rating={4} color="red" />
<Rating rating={4} color="green" />
<Rating rating={4} color="blue" />
<Rating rating={4} color="violet" />`}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Rating rating={4} color="default" />
                <span className="text-xs text-muted-foreground">default</span>
              </div>
              <div className="flex items-center gap-3">
                <Rating rating={4} color="amber" />
                <span className="text-xs text-muted-foreground">amber</span>
              </div>
              <div className="flex items-center gap-3">
                <Rating rating={4} color="orange" />
                <span className="text-xs text-muted-foreground">orange</span>
              </div>
              <div className="flex items-center gap-3">
                <Rating rating={4} color="red" />
                <span className="text-xs text-muted-foreground">red</span>
              </div>
              <div className="flex items-center gap-3">
                <Rating rating={4} color="green" />
                <span className="text-xs text-muted-foreground">green</span>
              </div>
              <div className="flex items-center gap-3">
                <Rating rating={4} color="blue" />
                <span className="text-xs text-muted-foreground">blue</span>
              </div>
              <div className="flex items-center gap-3">
                <Rating rating={4} color="violet" />
                <span className="text-xs text-muted-foreground">violet</span>
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* Half vs full precision */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Precision</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              half
            </code>{" "}
            renders fractional values as half-filled stars.{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              full
            </code>{" "}
            snaps to whole stars.
          </p>
          <ComponentPreview
            align="start"
            code={`<Rating rating={3.5} precision="half" />
<Rating rating={3.5} precision="full" />`}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Rating rating={3.5} precision="half" />
                <span className="text-xs text-muted-foreground">
                  3.5 — half precision
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Rating rating={3.5} precision="full" />
                <span className="text-xs text-muted-foreground">
                  3.5 — full precision
                </span>
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* Show value label */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Show value</h3>
          <p className="text-xs text-muted-foreground">
            Add a numeric label alongside the stars with{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              showValue
            </code>
            .
          </p>
          <ComponentPreview
            code={`<Rating rating={4.2} showValue />
<Rating rating={4.2} showValue size="lg" color="amber" />`}
          >
            <div className="flex flex-col gap-3">
              <Rating rating={4.2} showValue />
              <Rating rating={4.2} showValue size="lg" color="amber" />
            </div>
          </ComponentPreview>
        </div>

        {/* Stacked layout */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Stacked layout</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">layout=&quot;stacked&quot;</code>{" "}
            places a large numeric value above the stars — useful for scorecards,
            performance reviews, and any prominent rating display.
          </p>
          <ComponentPreview
            code={`<Rating rating={4.2} layout="stacked" showValue size="xl" />
<Rating rating={4.2} layout="stacked" showValue size="lg" color="amber" />
<Rating rating={4.2} layout="stacked" showValue size="md" color="violet" />`}
          >
            <div className="flex flex-wrap items-end gap-10">
              <Rating rating={4.2} layout="stacked" showValue size="xl" />
              <Rating rating={4.2} layout="stacked" showValue size="lg" color="amber" />
              <Rating rating={4.2} layout="stacked" showValue size="md" color="violet" />
            </div>
          </ComponentPreview>
        </div>

        {/* Stacked — multiple metrics */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Stacked — metric group</h3>
          <p className="text-xs text-muted-foreground">
            A natural fit for side-by-side metric summaries in dashboards and reports.
          </p>
          <ComponentPreview
            align="start"
            code={`{metrics.map(m => (
  <div key={m.label} className="flex flex-col items-center gap-1">
    <Rating rating={m.score} layout="stacked" showValue size="lg" color={m.color} />
    <span className="text-xs text-muted-foreground">{m.label}</span>
  </div>
))}`}
          >
            <div className="flex flex-wrap gap-8">
              {[
                { label: "Overall", score: 4.2, color: "default" as const },
                { label: "Quality", score: 4.7, color: "green" as const },
                { label: "Speed", score: 3.8, color: "amber" as const },
                { label: "Support", score: 4.0, color: "blue" as const },
              ].map((m) => (
                <div key={m.label} className="flex flex-col items-center gap-1">
                  <Rating rating={m.score} layout="stacked" showValue size="lg" color={m.color} />
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </div>
              ))}
            </div>
          </ComponentPreview>
        </div>

        {/* Custom max */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Custom max</h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">max</code>{" "}
            to change the total number of stars.
          </p>
          <ComponentPreview
            code={`<Rating rating={3} max={3} color="green" showValue />
<Rating rating={7} max={10} color="blue" showValue />`}
          >
            <div className="flex flex-col gap-3">
              <Rating rating={3} max={3} color="green" showValue />
              <Rating rating={7} max={10} color="blue" showValue />
            </div>
          </ComponentPreview>
        </div>

        {/* Fractional showcase */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Fractional values
          </h3>
          <p className="text-xs text-muted-foreground">
            Any fractional value is supported, not just 0.5 increments.
          </p>
          <ComponentPreview
            align="start"
            code={`<Rating rating={1.0} showValue />
<Rating rating={2.5} showValue />
<Rating rating={3.3} showValue />
<Rating rating={4.7} showValue />
<Rating rating={5.0} showValue />`}
          >
            <div className="flex flex-col gap-2">
              {[1.0, 2.5, 3.3, 4.7, 5.0].map((r) => (
                <Rating key={r} rating={r} showValue />
              ))}
            </div>
          </ComponentPreview>
        </div>

        {/* Interactive */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Interactive</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              onChange
            </code>{" "}
            to enable click-to-rate. Hover previews the selection before
            committing. Add{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              readOnly
            </code>{" "}
            to disable interaction without removing the handler.
          </p>
          <ComponentPreview
            code={`const [value, setValue] = useState(0);

<Rating rating={value} onChange={setValue} size="lg" color="amber" />`}
          >
            <InteractiveRating />
          </ComponentPreview>
        </div>

        {/* Read-only override */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Read-only</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              readOnly
            </code>{" "}
            disables hover and click even when an{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              onChange
            </code>{" "}
            handler is present — useful for conditionally toggling edit mode.
          </p>
          <ComponentPreview
            code={`<Rating rating={4} onChange={() => {}} readOnly />`}
          >
            <Rating rating={4} onChange={() => {}} readOnly />
          </ComponentPreview>
        </div>

        {/* In context — e.g. review card */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            In context — review cards
          </h3>
          <p className="text-xs text-muted-foreground">
            Combining{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              showValue
            </code>{" "}
            and a compact size for typical review list layouts.
          </p>
          <ComponentPreview
            align="start"
            code={`{reviews.map(r => (
  <div key={r.name} className="flex items-center justify-between">
    <span className="text-sm text-foreground">{r.name}</span>
    <Rating rating={r.score} size="sm" showValue />
  </div>
))}`}
          >
            <div className="flex w-full max-w-xs flex-col gap-3 rounded-lg border bg-muted/30 p-4">
              {[
                { name: "Product Quality", score: 4.5 },
                { name: "Delivery Speed", score: 3.8 },
                { name: "Customer Support", score: 4.0 },
                { name: "Value for Money", score: 4.2 },
              ].map((r) => (
                <div key={r.name} className="flex items-center justify-between">
                  <span className="text-xs text-foreground">{r.name}</span>
                  <Rating rating={r.score} size="sm" showValue />
                </div>
              ))}
            </div>
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
