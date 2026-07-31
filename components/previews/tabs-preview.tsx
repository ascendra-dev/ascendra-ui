"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { TabContent, TabList, Tabs, TabTrigger } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["tabs"];

export function TabsDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        align="start"
        code={`import { Tabs, TabList, TabTrigger, TabContent } from "@/ascendra-ui";

<Tabs defaultValue="overview">
  <TabList>
    <TabTrigger value="overview">Overview</TabTrigger>
    <TabTrigger value="students">Students</TabTrigger>
    <TabTrigger value="invoices">Invoices</TabTrigger>
  </TabList>
</Tabs>`}
      >
        <div className="w-full">
          <Tabs defaultValue="overview">
            <TabList>
              <TabTrigger value="overview">Overview</TabTrigger>
              <TabTrigger value="students">Students</TabTrigger>
              <TabTrigger value="invoices">Invoices</TabTrigger>
            </TabList>
          </Tabs>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            With Tab Content
          </h3>
          <p className="text-xs text-muted-foreground">
            Pair with{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              TabContent
            </code>{" "}
            to render panel content for each tab.
          </p>
          <ComponentPreview
            align="start"
            code={`<Tabs defaultValue="overview">
  <TabList>
    <TabTrigger value="overview">Overview</TabTrigger>
    <TabTrigger value="invoices">Invoices</TabTrigger>
  </TabList>
  <TabContent value="overview">
    <p className="mt-4 text-sm text-muted-foreground">Overview content goes here.</p>
  </TabContent>
  <TabContent value="invoices">
    <p className="mt-4 text-sm text-muted-foreground">Invoice list goes here.</p>
  </TabContent>
</Tabs>`}
          >
            <div className="w-full">
              <Tabs defaultValue="overview">
                <TabList>
                  <TabTrigger value="overview">Overview</TabTrigger>
                  <TabTrigger value="invoices">Invoices</TabTrigger>
                </TabList>
                <TabContent value="overview">
                  <p className="mt-4 text-sm text-muted-foreground">
                    Overview content goes here.
                  </p>
                </TabContent>
                <TabContent value="invoices">
                  <p className="mt-4 text-sm text-muted-foreground">
                    Invoice list goes here.
                  </p>
                </TabContent>
              </Tabs>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Dirty Indicator
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              dirty
            </code>{" "}
            to show an orange dot indicating unsaved changes on that tab.
          </p>
          <ComponentPreview
            align="start"
            code={`<Tabs defaultValue="settings">
  <TabList>
    <TabTrigger value="settings">Settings</TabTrigger>
    <TabTrigger value="billing" dirty>Billing</TabTrigger>
    <TabTrigger value="notifications">Notifications</TabTrigger>
  </TabList>
</Tabs>`}
          >
            <div className="w-full">
              <Tabs defaultValue="settings">
                <TabList>
                  <TabTrigger value="settings">Settings</TabTrigger>
                  <TabTrigger value="billing" dirty>
                    Billing
                  </TabTrigger>
                  <TabTrigger value="notifications">Notifications</TabTrigger>
                </TabList>
              </Tabs>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Disabled Tab</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              disabled
            </code>{" "}
            to prevent a tab from being selected.
          </p>
          <ComponentPreview
            align="start"
            code={`<Tabs defaultValue="overview">
  <TabList>
    <TabTrigger value="overview">Overview</TabTrigger>
    <TabTrigger value="analytics" disabled>Analytics</TabTrigger>
    <TabTrigger value="reports" disabled>Reports</TabTrigger>
  </TabList>
</Tabs>`}
          >
            <div className="w-full">
              <Tabs defaultValue="overview">
                <TabList>
                  <TabTrigger value="overview">Overview</TabTrigger>
                  <TabTrigger value="analytics" disabled>
                    Analytics
                  </TabTrigger>
                  <TabTrigger value="reports" disabled>
                    Reports
                  </TabTrigger>
                </TabList>
              </Tabs>
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
