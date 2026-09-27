"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Button, ExportCsvButton } from "@/ascendra-ui";
import { downloadCsv } from "@/ascendra-ui/utils/common.util";
import { registry } from "@/lib/registry";
import { LuDownload } from "react-icons/lu";

const meta = registry["export-csv-button"];

const SAMPLE_ROWS = [
  {
    id: "INV-001",
    client: "Beacon Labs",
    amount: 1200,
    issuedAt: "2026-08-01T10:00:00.000Z",
  },
  {
    id: "INV-002",
    client: "Ridgeway Co",
    amount: 850,
    issuedAt: "2026-08-15T14:30:00.000Z",
  },
  {
    id: "INV-003",
    client: "Solent Group",
    amount: 430,
    issuedAt: "2026-09-02T09:15:00.000Z",
  },
];

export function ExportCsvButtonDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { ExportCsvButton } from "@/ascendra-ui";

<ExportCsvButton data={rows} />`}
      >
        <ExportCsvButton data={SAMPLE_ROWS} />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Icon only</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              iconOnly
            </code>{" "}
            to hide the label —{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              title
            </code>{" "}
            still applies, as the button&apos;s accessible name instead of
            visible text.
          </p>
          <ComponentPreview
            code={`<ExportCsvButton data={rows} iconOnly title="Export as CSV" />`}
          >
            <ExportCsvButton data={SAMPLE_ROWS} iconOnly title="Export as CSV" />
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Custom label, excluded column, and filename
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              exclude
            </code>{" "}
            omits a key from the exported columns without needing to
            reshape the data first.
          </p>
          <ComponentPreview
            code={`<ExportCsvButton
  data={rows}
  title="Download invoices"
  exclude={["id"]}
  filename="invoices.csv"
/>`}
          >
            <ExportCsvButton
              data={SAMPLE_ROWS}
              title="Download invoices"
              exclude={["id"]}
              filename="invoices.csv"
            />
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Calling downloadCsv directly
          </h3>
          <p className="text-xs text-muted-foreground">
            Skip the component entirely and wire the same utility into your
            own button, menu item, or keyboard shortcut —{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              ExportCsvButton
            </code>{" "}
            is a convenience wrapper, not the only way in.
          </p>
          <ComponentPreview
            code={`import { downloadCsv } from "@/ascendra-ui/utils/common.util";

<Button variant="secondary" onClick={() => downloadCsv(rows)}>
  <LuDownload className="size-3.5" />
  Custom export button
</Button>`}
          >
            <Button variant="secondary" onClick={() => downloadCsv(SAMPLE_ROWS)}>
              <LuDownload className="size-3.5" />
              Custom export button
            </Button>
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
