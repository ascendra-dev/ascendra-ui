"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { SortField, toOrderBy } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["sort-field"];

const invoiceColumns = [
  { value: "issuedAt", label: "Issue Date" },
  { value: "dueDate", label: "Due Date" },
  { value: "amount", label: "Amount" },
  { value: "clientName", label: "Client" },
];

export function SortFieldDocContent() {
  const [orderBy, setOrderBy] = useState<string[]>(["issuedAt:desc", "amount"]);
  const [capped, setCapped] = useState<string[]>([]);

  return (
    <div className="space-y-10">
      {/* Hero preview */}
      <ComponentPreview
        code={`import { SortField, toOrderBy } from "@/ascendra-ui";

const [orderBy, setOrderBy] = useState<string[]>(["issuedAt:desc", "amount"]);

<SortField value={orderBy} onChange={setOrderBy} options={invoiceColumns} />
<code>orderBy={toOrderBy(orderBy) ?? "—"}</code>`}
      >
        <div className="flex w-full max-w-md flex-col gap-3">
          <SortField value={orderBy} onChange={setOrderBy} options={invoiceColumns} />
          <code className="text-muted-foreground text-xs">orderBy={toOrderBy(orderBy) ?? "—"}</code>
        </div>
      </ComponentPreview>

      {/* Examples */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>
        {/* At most N columns */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">At most two columns</h3>
          <p className="text-xs text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">maxItems</code>{" "}
            to cap how many columns can be sorted on — the rest are disabled in the list once it&apos;s reached.
          </p>
          <ComponentPreview
            code={`<SortField value={capped} onChange={setCapped} options={invoiceColumns} maxItems={2} placeholder="Sort invoices by…" />`}
          >
            <div className="w-full max-w-md">
              <SortField value={capped} onChange={setCapped} options={invoiceColumns} maxItems={2} placeholder="Sort invoices by…" />
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
