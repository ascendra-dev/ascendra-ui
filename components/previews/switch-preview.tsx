"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Switch } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["switch"];

export function SwitchDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { Switch } from "@/ascendra-ui";

<Switch defaultChecked />`}
      >
        <Switch defaultChecked />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">States</h3>
          <p className="text-xs text-muted-foreground">
            Off, on, and disabled states.
          </p>
          <ComponentPreview
            code={`<Switch />
<Switch defaultChecked />
<Switch disabled />
<Switch defaultChecked disabled />`}
          >
            <Switch />
            <Switch defaultChecked />
            <Switch disabled />
            <Switch defaultChecked disabled />
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With Label</h3>
          <p className="text-xs text-muted-foreground">
            Pair with a label for settings-style toggles.
          </p>
          <ComponentPreview
            align="start"
            code={`<label className="flex items-center justify-between gap-4">
  <div>
    <p className="text-sm font-medium text-foreground">Email notifications</p>
    <p className="text-xs text-muted-foreground">Receive alerts when invoices are paid.</p>
  </div>
  <Switch defaultChecked />
</label>
<label className="flex items-center justify-between gap-4">
  <div>
    <p className="text-sm font-medium text-foreground">SMS reminders</p>
    <p className="text-xs text-muted-foreground">Send overdue payment reminders via SMS.</p>
  </div>
  <Switch />
</label>`}
          >
            <div className="flex w-full max-w-sm flex-col gap-4">
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Email notifications
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Receive alerts when invoices are paid.
                  </p>
                </div>
                <Switch defaultChecked />
              </label>
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    SMS reminders
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Send overdue payment reminders via SMS.
                  </p>
                </div>
                <Switch />
              </label>
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
