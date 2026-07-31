"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { SimpleAlert } from "@/ascendra-ui";
import { registry } from "@/lib/registry";
import { LuShieldAlert, LuCircleCheck } from "react-icons/lu";

const meta = registry["simple-alert"];

export function SimpleAlertDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { SimpleAlert } from "@/ascendra-ui";

<SimpleAlert>Your session will expire in 5 minutes.</SimpleAlert>`}
      >
        <SimpleAlert>Your session will expire in 5 minutes.</SimpleAlert>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Variants</h3>
          <p className="text-xs text-muted-foreground">
            Seven severity variants: default, secondary, destructive, success,
            warning, amber, and primary.
          </p>
          <ComponentPreview
            align="start"
            code={`<SimpleAlert variant="default">This is an informational alert.</SimpleAlert>
<SimpleAlert variant="secondary">This is a secondary note.</SimpleAlert>
<SimpleAlert variant="destructive">This action cannot be undone.</SimpleAlert>
<SimpleAlert variant="success">Your changes have been saved.</SimpleAlert>
<SimpleAlert variant="warning">Payment is overdue by 3 days.</SimpleAlert>
<SimpleAlert variant="amber">TLP:AMBER — Restricted to authorised recipients only.</SimpleAlert>
<SimpleAlert variant="primary">This is a primary alert.</SimpleAlert>`}
          >
            <div className="flex w-full flex-col gap-3">
              <SimpleAlert variant="default">
                This is an informational alert.
              </SimpleAlert>
              <SimpleAlert variant="secondary">
                This is a secondary note.
              </SimpleAlert>
              <SimpleAlert variant="destructive">
                This action cannot be undone.
              </SimpleAlert>
              <SimpleAlert variant="success">
                Your changes have been saved.
              </SimpleAlert>
              <SimpleAlert variant="warning">
                Payment is overdue by 3 days.
              </SimpleAlert>
              <SimpleAlert variant="amber">
                TLP:AMBER — Restricted to authorised recipients only.
              </SimpleAlert>
              <SimpleAlert variant="primary">
                This is a primary alert.
              </SimpleAlert>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Custom Icon</h3>
          <p className="text-xs text-muted-foreground">
            Pass any icon component via the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              icon
            </code>{" "}
            prop to override the default InfoIcon.
          </p>
          <ComponentPreview
            align="start"
            code={`import { LuShieldAlert, LuCircleCheck } from 'react-icons/lu';

<SimpleAlert variant="destructive" icon={LuShieldAlert}>
  Account access has been restricted.
</SimpleAlert>

<SimpleAlert variant="success" icon={LuCircleCheck}>
  Invoice #INV-042 was paid successfully.
</SimpleAlert>`}
          >
            <div className="flex w-full flex-col gap-3">
              <SimpleAlert variant="destructive" icon={LuShieldAlert}>
                Account access has been restricted.
              </SimpleAlert>
              <SimpleAlert variant="success" icon={LuCircleCheck}>
                Invoice #INV-042 was paid successfully.
              </SimpleAlert>
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
