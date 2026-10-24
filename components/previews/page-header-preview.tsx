"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  Button,
  PageFocus,
  PageFocusToggle,
  PageHeader,
  PageHeaderAction,
  PageHeaderGroup,
  PageMain,
  PageSubtitle,
  PageTitle,
} from "@/ascendra-ui";
import { registry } from "@/lib/registry";
import { LuPlus } from "react-icons/lu";

const meta = registry["page-header"];

export function PageHeaderDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        align="start"
        code={`import { PageHeader, PageHeaderGroup, PageTitle, PageSubtitle, PageHeaderAction } from "@/ascendra-ui";

<PageHeader>
  <PageHeaderGroup>
    <PageTitle>Parents</PageTitle>
  </PageHeaderGroup>
</PageHeader>`}
      >
        <div className="w-full">
          <PageHeader>
            <PageHeaderGroup>
              <PageTitle>Parents</PageTitle>
            </PageHeaderGroup>
          </PageHeader>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With Subtitle</h3>
          <p className="text-xs text-muted-foreground">
            Add a subtitle below the title using{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              PageSubtitle
            </code>
            .
          </p>
          <ComponentPreview
            align="start"
            code={`<PageHeader>
  <PageHeaderGroup>
    <PageTitle>Parents</PageTitle>
    <PageSubtitle>Manage all parents and their students.</PageSubtitle>
  </PageHeaderGroup>
</PageHeader>`}
          >
            <div className="w-full">
              <PageHeader>
                <PageHeaderGroup>
                  <PageTitle>Parents</PageTitle>
                  <PageSubtitle>
                    Manage all parents and their students.
                  </PageSubtitle>
                </PageHeaderGroup>
              </PageHeader>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With Action</h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              PageHeaderAction
            </code>{" "}
            on the right for primary page CTAs.
          </p>
          <ComponentPreview
            align="start"
            code={`<PageHeader>
  <PageHeaderGroup>
    <PageTitle>Invoices</PageTitle>
    <PageSubtitle>Track and manage all student fee invoices.</PageSubtitle>
  </PageHeaderGroup>
  <PageHeaderAction>
    <Button>
      <LuPlus />
      New Invoice
    </Button>
  </PageHeaderAction>
</PageHeader>`}
          >
            <div className="w-full">
              <PageHeader>
                <PageHeaderGroup>
                  <PageTitle>Invoices</PageTitle>
                  <PageSubtitle>
                    Track and manage all student fee invoices.
                  </PageSubtitle>
                </PageHeaderGroup>
                <PageHeaderAction>
                  <Button>
                    <LuPlus />
                    New Invoice
                  </Button>
                </PageHeaderAction>
              </PageHeader>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Focus mode</h3>
          <p className="text-xs text-muted-foreground">
            Wrap the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">PageHeader</code> and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">PageMain</code> in{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">PageFocus</code>, and put a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">PageFocusToggle</code> last in the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">PageHeaderAction</code>: the page fills the
            screen over a light overlay — a table keeps its query, filters and page. With one DataTable the page is
            compact: the title, query bar and toolbar stay put, the rows scroll under the column header and the
            pagination footer sits at the bottom (otherwise the page scrolls inside the panel). Focus mode
            is for reading: a row or chart link that would leave the page brings it back first, and the title&apos;s
            back arrow hides. Keep a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">BackLink</code> outside. A page holding a
            maximizable Card can&apos;t be focused (no stacking) — the toggle doesn&apos;t show.
          </p>
          <ComponentPreview
            align="start"
            code={`<BackLink href="/invoices">Back to overview</BackLink>
<PageFocus>
  <PageHeader>
    <PageHeaderGroup>
      <PageTitle>Invoices</PageTitle>
      <PageSubtitle>Every invoice, newest first.</PageSubtitle>
    </PageHeaderGroup>
    <PageHeaderAction className="w-fit">
      <PageFocusToggle />
    </PageHeaderAction>
  </PageHeader>
  <PageMain>...</PageMain>
</PageFocus>`}
          >
            <div className="w-full">
              <PageFocus>
                <PageHeader>
                  <PageHeaderGroup>
                    <PageTitle>Invoices</PageTitle>
                    <PageSubtitle>Every invoice, newest first.</PageSubtitle>
                  </PageHeaderGroup>
                  <PageHeaderAction className="w-fit">
                    <PageFocusToggle />
                  </PageHeaderAction>
                </PageHeader>
                <PageMain>
                  <p className="text-sm text-muted-foreground">The page&apos;s content — a table, its query bar.</p>
                </PageMain>
              </PageFocus>
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
