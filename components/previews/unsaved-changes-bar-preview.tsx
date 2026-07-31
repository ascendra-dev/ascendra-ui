"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Button, UnsavedChangesBar } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["unsaved-changes-bar"];

function BasicDemo() {
  const [isDirty, setIsDirty] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs text-muted-foreground">
        {isDirty
          ? "The bar is visible at the bottom of the page."
          : "Click the button to simulate a form change."}
      </p>
      <Button
        variant={isDirty ? "secondary" : "primary"}
        size="sm"
        onClick={() => setIsDirty((d) => !d)}
      >
        {isDirty ? "Discard changes" : "Make a change"}
      </Button>
      <UnsavedChangesBar
        isDirty={isDirty}
        isSaving={false}
        isValid={true}
        onSave={async () => {
          await new Promise((r) => setTimeout(r, 1200));
          setIsDirty(false);
          return true;
        }}
        onReset={() => setIsDirty(false)}
      />
    </div>
  );
}

function InvalidDemo() {
  const [isDirty, setIsDirty] = useState(true);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs text-muted-foreground">
        Clicking Save with an invalid form triggers a nudge and shows the
        validation message.
      </p>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsDirty((d) => !d)}
      >
        {isDirty ? "Hide bar" : "Show bar"}
      </Button>
      <UnsavedChangesBar
        isDirty={isDirty}
        isSaving={false}
        isValid={false}
        onSave={() => {}}
        onReset={() => setIsDirty(false)}
        validationMessage="Check the errors"
      />
    </div>
  );
}

export function UnsavedChangesBarDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero preview */}
      <ComponentPreview
        minHeight={120}
        code={`import { UnsavedChangesBar } from "@/ascendra-ui";

const [isDirty, setIsDirty] = useState(false);

<UnsavedChangesBar
  isDirty={isDirty}
  isSaving={false}
  isValid={true}
  onSave={async () => {
    await saveToServer();
    setIsDirty(false);
    return true;
  }}
  onReset={() => {
    resetForm();
    setIsDirty(false);
  }}
/>`}
      >
        <BasicDemo />
      </ComponentPreview>

      {/* Examples */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Invalid form */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Invalid form state
          </h3>
          <p className="text-xs text-muted-foreground">
            When{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              isValid
            </code>{" "}
            is{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              false
            </code>
            , clicking Save triggers a nudge animation and shows the validation
            message. Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              onInvalid
            </code>{" "}
            to trigger field-level error display in your form.
          </p>
          <ComponentPreview
            minHeight={120}
            code={`<UnsavedChangesBar
  isDirty={isDirty}
  isSaving={false}
  isValid={false}
  onInvalid={() => trigger()} // trigger react-hook-form validation
  onSave={() => {}}
  onReset={() => setIsDirty(false)}
  validationMessage="Check the errors"
/>`}
          >
            <InvalidDemo />
          </ComponentPreview>
        </div>

        {/* Sidebar offset */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Sidebar offset
          </h3>
          <p className="text-xs text-muted-foreground">
            By default the bar centres relative to the full viewport. When a
            sidebar is present, pass a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              className
            </code>{" "}
            to shift the centering point:
          </p>
          <div className="rounded-md border border-dashed p-4">
            <code className="font-mono text-xs text-muted-foreground">
              {`<UnsavedChangesBar className="lg:left-[calc(50%+7.75rem)]" ... />`}
            </code>
          </div>
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
