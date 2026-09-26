"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { DateTime } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["date-time"];

const SAMPLE_ISO = "2026-09-04T14:05:00.000Z";
const THREE_HOURS_AGO = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();

export function DateTimeDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { DateTime } from "@/ascendra-ui";

<DateTime value="${SAMPLE_ISO}" />`}
      >
        <DateTime value={SAMPLE_ISO} />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Styles</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              style
            </code>{" "}
            picks the same short/medium/long/relative formats{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              formatDateTime
            </code>{" "}
            supports.
          </p>
          <ComponentPreview
            code={`<DateTime value="${SAMPLE_ISO}" style="short" />
<DateTime value="${SAMPLE_ISO}" style="medium" />
<DateTime value="${SAMPLE_ISO}" style="long" />
<DateTime value="${THREE_HOURS_AGO}" style="relative" />`}
          >
            <div className="flex flex-col gap-1.5 text-sm">
              <DateTime value={SAMPLE_ISO} style="short" />
              <DateTime value={SAMPLE_ISO} style="medium" />
              <DateTime value={SAMPLE_ISO} style="long" />
              <DateTime value={THREE_HOURS_AGO} style="relative" />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With time</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              time
            </code>{" "}
            appends time-of-day; ignored when{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              style
            </code>{" "}
            is{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              &quot;relative&quot;
            </code>
            .
          </p>
          <ComponentPreview
            code={`<DateTime value="${SAMPLE_ISO}" time />`}
          >
            <DateTime value={SAMPLE_ISO} time />
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            With tooltip
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              showTooltip
            </code>{" "}
            to reveal the original timestamp as a full ISO string on hover —
            useful whenever the display format (especially{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              relative
            </code>
            ) hides precision a user may still want.
          </p>
          <ComponentPreview
            code={`<DateTime value="${THREE_HOURS_AGO}" style="relative" showTooltip />`}
          >
            <DateTime value={THREE_HOURS_AGO} style="relative" showTooltip />
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
