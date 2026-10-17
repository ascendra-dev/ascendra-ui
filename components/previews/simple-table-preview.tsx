"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  SimpleBadge,
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["simple-table"];

const actions = [
  { action: "invoice.created", count: 42, last: "2 hours ago" },
  { action: "invoice.issued", count: 17, last: "yesterday" },
  { action: "user.role_revoked", count: 3, last: "4 days ago" },
];

const tokens = [
  { token: "--text-caption", size: "11px", role: "Timestamps · tooltips" },
  { token: "--text-label", size: "12px", role: "Form labels · badge text" },
  { token: "--text-body-sm", size: "14px", role: "Secondary body copy" },
];

const members = [
  { name: "Jane Cooper", email: "jane@acme.test", role: "Owner", status: "Active" },
  { name: "Omer Siddiqui", email: "omer@acme.test", role: "Admin", status: "Invited" },
  { name: "Rabia Farooq", email: "rabia@acme.test", role: "Viewer", status: "Active" },
];

export function SimpleTableDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        align="start"
        code={`import {
  SimpleTable, SimpleTableHeader, SimpleTableHead,
  SimpleTableBody, SimpleTableRow, SimpleTableCell,
} from "@/ascendra-ui";

<SimpleTable>
  <SimpleTableHeader>
    <SimpleTableHead>Token</SimpleTableHead>
    <SimpleTableHead>Size</SimpleTableHead>
    <SimpleTableHead>Role</SimpleTableHead>
  </SimpleTableHeader>
  <SimpleTableBody>
    {tokens.map((row) => (
      <SimpleTableRow key={row.token}>
        <SimpleTableCell className="font-mono text-xs">{row.token}</SimpleTableCell>
        <SimpleTableCell className="text-muted-foreground font-mono text-xs">{row.size}</SimpleTableCell>
        <SimpleTableCell>{row.role}</SimpleTableCell>
      </SimpleTableRow>
    ))}
  </SimpleTableBody>
</SimpleTable>`}
      >
        <SimpleTable>
          <SimpleTableHeader>
            <SimpleTableHead>Token</SimpleTableHead>
            <SimpleTableHead>Size</SimpleTableHead>
            <SimpleTableHead>Role</SimpleTableHead>
          </SimpleTableHeader>
          <SimpleTableBody>
            {tokens.map((row) => (
              <SimpleTableRow key={row.token}>
                <SimpleTableCell className="font-mono text-xs">{row.token}</SimpleTableCell>
                <SimpleTableCell className="text-muted-foreground font-mono text-xs">{row.size}</SimpleTableCell>
                <SimpleTableCell>{row.role}</SimpleTableCell>
              </SimpleTableRow>
            ))}
          </SimpleTableBody>
        </SimpleTable>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">In a sheet or narrow panel</h3>
          <p className="text-xs text-muted-foreground">
            Columns size to their content, so a short summary stays compact. Right-align a numeric column by giving
            its head and cells{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">text-right</code>.
          </p>
          <ComponentPreview
            align="start"
            code={`<SimpleTable>
  <SimpleTableHeader>
    <SimpleTableHead>Action</SimpleTableHead>
    <SimpleTableHead className="text-right">Count</SimpleTableHead>
    <SimpleTableHead>Last</SimpleTableHead>
  </SimpleTableHeader>
  <SimpleTableBody>
    {actions.map((row) => (
      <SimpleTableRow key={row.action}>
        <SimpleTableCell><SimpleBadge>{row.action}</SimpleBadge></SimpleTableCell>
        <SimpleTableCell className="text-right tabular-nums">{row.count}</SimpleTableCell>
        <SimpleTableCell className="text-muted-foreground whitespace-nowrap">{row.last}</SimpleTableCell>
      </SimpleTableRow>
    ))}
  </SimpleTableBody>
</SimpleTable>`}
          >
            <div className="w-full max-w-md">
              <SimpleTable>
                <SimpleTableHeader>
                  <SimpleTableHead>Action</SimpleTableHead>
                  <SimpleTableHead className="text-right">Count</SimpleTableHead>
                  <SimpleTableHead>Last</SimpleTableHead>
                </SimpleTableHeader>
                <SimpleTableBody>
                  {actions.map((row) => (
                    <SimpleTableRow key={row.action}>
                      <SimpleTableCell>
                        <SimpleBadge>{row.action}</SimpleBadge>
                      </SimpleTableCell>
                      <SimpleTableCell className="text-right tabular-nums">{row.count}</SimpleTableCell>
                      <SimpleTableCell className="text-muted-foreground whitespace-nowrap">{row.last}</SimpleTableCell>
                    </SimpleTableRow>
                  ))}
                </SimpleTableBody>
              </SimpleTable>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Rich cells</h3>
          <p className="text-xs text-muted-foreground">
            A cell takes any content — a second muted line, a badge, an action.
          </p>
          <ComponentPreview
            align="start"
            code={`<SimpleTableRow key={row.email}>
  <SimpleTableCell>
    <div className="font-medium">{row.name}</div>
    <div className="text-muted-foreground text-xs">{row.email}</div>
  </SimpleTableCell>
  <SimpleTableCell>{row.role}</SimpleTableCell>
  <SimpleTableCell>
    <SimpleBadge variant={row.status === "Active" ? "positive" : "secondary"}>{row.status}</SimpleBadge>
  </SimpleTableCell>
</SimpleTableRow>`}
          >
            <SimpleTable>
              <SimpleTableHeader>
                <SimpleTableHead>Member</SimpleTableHead>
                <SimpleTableHead>Role</SimpleTableHead>
                <SimpleTableHead>Status</SimpleTableHead>
              </SimpleTableHeader>
              <SimpleTableBody>
                {members.map((row) => (
                  <SimpleTableRow key={row.email}>
                    <SimpleTableCell>
                      <div className="font-medium">{row.name}</div>
                      <div className="text-muted-foreground text-xs">{row.email}</div>
                    </SimpleTableCell>
                    <SimpleTableCell>{row.role}</SimpleTableCell>
                    <SimpleTableCell>
                      <SimpleBadge variant={row.status === "Active" ? "positive" : "secondary"}>
                        {row.status}
                      </SimpleBadge>
                    </SimpleTableCell>
                  </SimpleTableRow>
                ))}
              </SimpleTableBody>
            </SimpleTable>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">When to use it</h3>
          <p className="text-xs text-muted-foreground">
            A short, read-only list inside something else — a sheet, a card, a dashboard panel. For a page-level table
            use Table; for search, sorting, column choice or paging use DataTable.
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
