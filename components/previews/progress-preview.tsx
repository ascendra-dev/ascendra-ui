"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { ProgressBar, Stepper } from "@/ascendra-ui";
import type { StepperItem } from "@/ascendra-ui";
import { Button } from "@/ascendra-ui";

const ONBOARDING_STEPS: StepperItem[] = [
  { label: "Account", description: "Create login" },
  { label: "Profile", description: "Personal info" },
  { label: "Team", description: "Invite members" },
  { label: "Done", description: "All set!" },
];

const CHECKOUT_STEPS: StepperItem[] = [
  { label: "Cart" },
  { label: "Shipping" },
  { label: "Payment" },
  { label: "Confirm" },
];

function InteractiveStepper() {
  const [step, setStep] = useState(1);
  return (
    <div className="flex flex-col gap-5">
      <Stepper steps={ONBOARDING_STEPS} currentStep={step} />
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>
        <Button
          size="sm"
          disabled={step === ONBOARDING_STEPS.length - 1}
          onClick={() => setStep((s) => Math.min(ONBOARDING_STEPS.length - 1, s + 1))}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export function ProgressDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { ProgressBar } from "@/ascendra-ui";

<ProgressBar value={60} />`}
      >
        <div className="w-64">
          <ProgressBar value={60} />
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>ProgressBar examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Sizes</h3>
          <p className="text-xs text-muted-foreground">
            Four height options from{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">xs</code> (2 px) to{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">lg</code> (10 px).
          </p>
          <ComponentPreview
            align="start"
            code={`<ProgressBar value={70} size="xs" />
<ProgressBar value={70} size="sm" />
<ProgressBar value={70} size="md" />
<ProgressBar value={70} size="lg" />`}
          >
            <div className="flex w-64 flex-col gap-3">
              <ProgressBar value={70} size="xs" />
              <ProgressBar value={70} size="sm" />
              <ProgressBar value={70} size="md" />
              <ProgressBar value={70} size="lg" />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Color variants</h3>
          <p className="text-xs text-muted-foreground">
            Five semantic colors matching the design system palette.
          </p>
          <ComponentPreview
            align="start"
            code={`<ProgressBar value={60} color="default" />
<ProgressBar value={60} color="success" />
<ProgressBar value={60} color="warning" />
<ProgressBar value={60} color="destructive" />
<ProgressBar value={60} color="info" />`}
          >
            <div className="flex w-64 flex-col gap-3">
              <ProgressBar value={60} color="default" />
              <ProgressBar value={60} color="success" />
              <ProgressBar value={60} color="warning" />
              <ProgressBar value={60} color="destructive" />
              <ProgressBar value={60} color="info" />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Indeterminate</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">indeterminate</code>{" "}
            when progress is unknown — the bar animates continuously.
          </p>
          <ComponentPreview
            align="start"
            code={`<ProgressBar indeterminate />
<ProgressBar indeterminate color="success" />`}
          >
            <div className="flex w-64 flex-col gap-3">
              <ProgressBar indeterminate />
              <ProgressBar indeterminate color="success" />
            </div>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-8">
        <SectionHeader>Stepper examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Interactive onboarding</h3>
          <p className="text-xs text-muted-foreground">
            Drive{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">currentStep</code>{" "}
            with state. Completed steps show a checkmark; the active step is highlighted.
          </p>
          <ComponentPreview
            align="start"
            code={`const [step, setStep] = useState(1);

<Stepper steps={steps} currentStep={step} />
<Button onClick={() => setStep(s => s + 1)}>Continue</Button>`}
          >
            <div className="w-full max-w-sm">
              <InteractiveStepper />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">3-step flow (no descriptions)</h3>
          <ComponentPreview
            align="start"
            code={`<Stepper
  steps={[{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }, { label: "Confirm" }]}
  currentStep={2}
/>`}
          >
            <div className="w-full max-w-sm">
              <Stepper steps={CHECKOUT_STEPS} currentStep={2} />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Error state</h3>
          <p className="text-xs text-muted-foreground">
            Pass per-step{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">status</code>{" "}
            manually to override the computed value — useful to flag a validation error.
          </p>
          <ComponentPreview
            align="start"
            code={`<Stepper
  steps={[
    { label: "Account",  status: "completed" },
    { label: "Profile",  status: "error" },
    { label: "Team",     status: "pending" },
    { label: "Done",     status: "pending" },
  ]}
/>`}
          >
            <div className="w-full max-w-sm">
              <Stepper
                steps={[
                  { label: "Account", status: "completed" },
                  { label: "Profile", status: "error" },
                  { label: "Team", status: "pending" },
                  { label: "Done", status: "pending" },
                ]}
              />
            </div>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-8">
        <SectionHeader>Props</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">ProgressBar</h3>
          <PropsTable
            props={[
              { name: "value", type: "number", description: "Progress value 0–100. Omit for indeterminate." },
              { name: "size", type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: "Bar height." },
              { name: "color", type: "'default' | 'success' | 'warning' | 'destructive' | 'info'", default: "'default'", description: "Fill color." },
              { name: "indeterminate", type: "boolean", default: "false", description: "Looping animation when progress is unknown." },
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Stepper</h3>
          <PropsTable
            props={[
              { name: "steps", type: "StepperItem[]", description: "Array of step objects with label, optional description, and optional status." },
              { name: "currentStep", type: "number", description: "Active step index. Drives completed/active/pending status automatically." },
              { name: "className", type: "string", description: "Additional CSS classes." },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
