"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  Card,
  CardPanel,
  ReportDocumentWrapper,
  ReportDocumentFooter,
  ReportDocumentFooterNote,
  ReportDocumentFooterLine,
  ReportDocumentFooterLineLeft,
  ReportDocumentFooterLineRight,
  ReportSectionHeader,
  ReportHeaderContent,
  ReportHeaderBody,
  ReportHeaderBodyWrap,
  ReportTitle,
  ReportTitleHeader,
  ReportSubTitle,
  ReportHeaderFooter,
  ReportHeaderField,
  SimpleBadge,
} from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["report-document"];

export function ReportDocumentDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero — full document shell */}
      <ComponentPreview
        code={`import {
  Card, CardPanel,
  ReportDocumentWrapper,
  ReportHeaderContent, ReportHeaderBody, ReportHeaderBodyWrap,
  ReportTitle, ReportTitleHeader, ReportSubTitle,
  ReportHeaderFooter, ReportHeaderField,
  ReportSectionHeader,
  ReportDocumentFooter, ReportDocumentFooterNote,
  ReportDocumentFooterLine, ReportDocumentFooterLineLeft, ReportDocumentFooterLineRight,
} from "@/ascendra-ui";

<ReportDocumentWrapper>
  <Card>
    <CardPanel border={{ color: "teal" }}>
      <ReportHeaderContent>
        <ReportHeaderBody>
          <ReportHeaderBodyWrap>
            <ReportTitle>Annual Financial Report</ReportTitle>
            <ReportTitleHeader>Ascendra Holdings Ltd.</ReportTitleHeader>
            <ReportSubTitle>Fiscal Year ended December 31, 2024</ReportSubTitle>
          </ReportHeaderBodyWrap>
        </ReportHeaderBody>
        <ReportHeaderFooter>
          <ReportHeaderField label="Prepared by">Finance Team</ReportHeaderField>
          <ReportHeaderField label="Report Date">January 15, 2025</ReportHeaderField>
        </ReportHeaderFooter>
      </ReportHeaderContent>
    </CardPanel>
  </Card>

  {/* … report sections … */}

  <ReportDocumentFooter>
    <ReportDocumentFooterNote>
      All figures in USD thousands unless stated otherwise.
    </ReportDocumentFooterNote>
    <ReportDocumentFooterLine>
      <ReportDocumentFooterLineLeft>
        Ascendra Holdings Ltd. — Finance Team
      </ReportDocumentFooterLineLeft>
      <ReportDocumentFooterLineRight>
        <span>v1.0</span>
        <span>Confidential</span>
        <span>January 15, 2025</span>
      </ReportDocumentFooterLineRight>
    </ReportDocumentFooterLine>
  </ReportDocumentFooter>
</ReportDocumentWrapper>`}
      >
        <div className="w-full space-y-6">
          <Card className="w-full">
            <CardPanel border={{ color: "teal" }}>
            <ReportHeaderContent>
              <ReportHeaderBody>
                <ReportHeaderBodyWrap>
                  <ReportTitle>Annual Financial Report</ReportTitle>
                  <ReportTitleHeader>Ascendra Holdings Ltd.</ReportTitleHeader>
                  <ReportSubTitle>Fiscal Year ended December 31, 2024</ReportSubTitle>
                </ReportHeaderBodyWrap>
              </ReportHeaderBody>
              <ReportHeaderFooter>
                <ReportHeaderField label="Prepared by">Finance Team</ReportHeaderField>
                <ReportHeaderField label="Report Date">January 15, 2025</ReportHeaderField>
              </ReportHeaderFooter>
            </ReportHeaderContent>
            </CardPanel>
          </Card>

          <ReportSectionHeader>
            <h2 className="text-base font-semibold">Revenue Summary</h2>
          </ReportSectionHeader>

          <ReportSectionHeader>
            <h2 className="text-base font-semibold">Operating Expenses</h2>
          </ReportSectionHeader>

          <ReportDocumentFooter>
            <ReportDocumentFooterNote>
              All figures in USD thousands unless stated otherwise. Prior year figures have been restated for comparability.
            </ReportDocumentFooterNote>
            <ReportDocumentFooterLine>
              <ReportDocumentFooterLineLeft>
                Ascendra Holdings Ltd. — Finance Team
              </ReportDocumentFooterLineLeft>
              <ReportDocumentFooterLineRight>
                <span>v1.0</span>
                <span>Confidential</span>
                <span>January 15, 2025</span>
              </ReportDocumentFooterLineRight>
            </ReportDocumentFooterLine>
          </ReportDocumentFooter>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Section header variants */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Section Headers</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">ReportSectionHeader</code> is a plain border-bottom divider — pass any heading element or heading + badge as children.
          </p>
          <ComponentPreview
            code={`{/* Simple heading */}
<ReportSectionHeader>
  <h2 className="text-base font-semibold">Revenue Summary</h2>
</ReportSectionHeader>

{/* Heading with badge */}
<ReportSectionHeader>
  <div className="flex items-center gap-2">
    <h2 className="text-base font-semibold">Risk Assessment</h2>
    <SimpleBadge variant="red">Critical</SimpleBadge>
  </div>
</ReportSectionHeader>

{/* Heading with subtitle */}
<ReportSectionHeader>
  <h2 className="text-base font-semibold">Emissions by Scope</h2>
  <p className="mt-0.5 text-xs text-muted-foreground">GHG Protocol — tCO2e, 2024</p>
</ReportSectionHeader>`}
          >
            <div className="w-full space-y-6">
              <ReportSectionHeader>
                <h2 className="text-base font-semibold">Revenue Summary</h2>
              </ReportSectionHeader>

              <ReportSectionHeader>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold">Risk Assessment</h2>
                  <SimpleBadge variant="red">Critical</SimpleBadge>
                </div>
              </ReportSectionHeader>

              <ReportSectionHeader>
                <h2 className="text-base font-semibold">Emissions by Scope</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">GHG Protocol — tCO2e, 2024</p>
              </ReportSectionHeader>
            </div>
          </ComponentPreview>
        </div>

        {/* Document footer — minimal */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Document Footer — Minimal</h3>
          <p className="text-xs text-muted-foreground">
            A single attribution line without a disclaimer note — suited to internal operational reports.
          </p>
          <ComponentPreview
            code={`<ReportDocumentFooter>
  <ReportDocumentFooterLine>
    <ReportDocumentFooterLineLeft>
      Ascendra Sales — Revenue Operations
    </ReportDocumentFooterLineLeft>
    <ReportDocumentFooterLineRight>
      <span>Confidential</span>
      <span>September 2, 2024</span>
    </ReportDocumentFooterLineRight>
  </ReportDocumentFooterLine>
</ReportDocumentFooter>`}
          >
            <div className="w-full">
              <ReportDocumentFooter>
                <ReportDocumentFooterLine>
                  <ReportDocumentFooterLineLeft>
                    Ascendra Sales — Revenue Operations
                  </ReportDocumentFooterLineLeft>
                  <ReportDocumentFooterLineRight>
                    <span>Confidential</span>
                    <span>September 2, 2024</span>
                  </ReportDocumentFooterLineRight>
                </ReportDocumentFooterLine>
              </ReportDocumentFooter>
            </div>
          </ComponentPreview>
        </div>

        {/* Document footer — with disclaimer */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Document Footer — With Disclaimer</h3>
          <p className="text-xs text-muted-foreground">
            One or more <code className="rounded bg-muted px-1 font-mono text-xs">ReportDocumentFooterNote</code> paragraphs above the attribution line — typical for financial and ESG reports.
          </p>
          <ComponentPreview
            code={`<ReportDocumentFooter>
  <ReportDocumentFooterNote>
    All figures in USD thousands unless stated otherwise. Prior year figures have been restated for comparability.
  </ReportDocumentFooterNote>
  <ReportDocumentFooterNote>
    This report has been prepared by Ascendra Holdings Ltd. and is intended solely for the use of the Board of Directors.
  </ReportDocumentFooterNote>
  <ReportDocumentFooterLine>
    <ReportDocumentFooterLineLeft>
      Ascendra Holdings Ltd. — Finance Team
    </ReportDocumentFooterLineLeft>
    <ReportDocumentFooterLineRight>
      <span>v1.0</span>
      <span>Confidential</span>
      <span>January 15, 2025</span>
    </ReportDocumentFooterLineRight>
  </ReportDocumentFooterLine>
</ReportDocumentFooter>`}
          >
            <div className="w-full">
              <ReportDocumentFooter>
                <ReportDocumentFooterNote>
                  All figures in USD thousands unless stated otherwise. Prior year figures have been restated for comparability.
                </ReportDocumentFooterNote>
                <ReportDocumentFooterNote>
                  This report has been prepared by Ascendra Holdings Ltd. and is intended solely for the use of the Board of Directors.
                </ReportDocumentFooterNote>
                <ReportDocumentFooterLine>
                  <ReportDocumentFooterLineLeft>
                    Ascendra Holdings Ltd. — Finance Team
                  </ReportDocumentFooterLineLeft>
                  <ReportDocumentFooterLineRight>
                    <span>v1.0</span>
                    <span>Confidential</span>
                    <span>January 15, 2025</span>
                  </ReportDocumentFooterLineRight>
                </ReportDocumentFooterLine>
              </ReportDocumentFooter>
            </div>
          </ComponentPreview>
        </div>

        {/* ReportDocumentWrapper note */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">ReportDocumentWrapper</h3>
          <p className="text-xs text-muted-foreground">
            Wrap the entire report in <code className="rounded bg-muted px-1 font-mono text-xs">ReportDocumentWrapper</code>. It sets{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">id="report-content"</code> on the root element — the target the PDF export button captures. It also applies{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">flex flex-col gap-10</code> to space sections evenly.
          </p>
          <ComponentPreview
            code={`<ReportDocumentWrapper>
  {/* Report header card */}
  <Card>
    <CardPanel border={{ color: "teal" }}>
      {/* ReportHeaderContent … */}
    </CardPanel>
  </Card>

  {/* Each section — gap-10 is applied automatically */}
  <div>
    <ReportSectionHeader>…</ReportSectionHeader>
    {/* section content */}
  </div>

  {/* Footer — always last */}
  <ReportDocumentFooter>…</ReportDocumentFooter>
</ReportDocumentWrapper>`}
          >
            <ReportDocumentWrapper className="w-full">
              <Card className="w-full">
                <CardPanel border={{ color: "teal" }}>
                  <ReportHeaderContent>
                    <ReportHeaderBody>
                      <ReportHeaderBodyWrap>
                        <ReportTitle>Supply Chain Operations</ReportTitle>
                        <ReportTitleHeader>Ascendra Logistics — Q3 2024</ReportTitleHeader>
                        <ReportSubTitle>July – September 2024</ReportSubTitle>
                      </ReportHeaderBodyWrap>
                    </ReportHeaderBody>
                    <ReportHeaderFooter>
                      <ReportHeaderField label="Prepared by">Ops Analytics</ReportHeaderField>
                      <ReportHeaderField label="Report Date">October 10, 2024</ReportHeaderField>
                    </ReportHeaderFooter>
                  </ReportHeaderContent>
                </CardPanel>
              </Card>

              <div>
                <ReportSectionHeader>
                  <h2 className="text-base font-semibold">Fulfilment Performance</h2>
                </ReportSectionHeader>
              </div>

              <div>
                <ReportSectionHeader>
                  <h2 className="text-base font-semibold">Carrier Scorecard</h2>
                </ReportSectionHeader>
              </div>

              <ReportDocumentFooter>
                <ReportDocumentFooterLine>
                  <ReportDocumentFooterLineLeft>Ascendra Logistics — Ops Analytics</ReportDocumentFooterLineLeft>
                  <ReportDocumentFooterLineRight>
                    <span>Internal</span>
                    <span>October 10, 2024</span>
                  </ReportDocumentFooterLineRight>
                </ReportDocumentFooterLine>
              </ReportDocumentFooter>
            </ReportDocumentWrapper>
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
