"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  ReportSummary,
  ReportNotes,
  ReportNote,
  ReportNoteHeader,
  ReportNoteText,
  ReportPdfExportButton,
  ReportSectionHeader,
} from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["report-content"];

export function ReportContentDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero — analyst notes block */}
      <ComponentPreview
        code={`import {
  ReportNotes, ReportNote, ReportNoteHeader, ReportNoteText,
} from "@/ascendra-ui";

<ReportNotes>
  <ReportNote>
    <ReportNoteHeader>Revenue Recognition Policy</ReportNoteHeader>
    <ReportNoteText>
      Revenue from software licences is recognised on delivery of the licence key.
      Subscription revenue is recognised ratably over the contract term.
    </ReportNoteText>
  </ReportNote>
  <ReportNote>
    <ReportNoteHeader>Foreign Currency</ReportNoteHeader>
    <ReportNoteText>
      Transactions denominated in foreign currencies are translated at the exchange rate
      prevailing at the date of the transaction. Monetary assets are retranslated at the
      closing rate with differences recognised in profit or loss.
    </ReportNoteText>
  </ReportNote>
  <ReportNote>
    <ReportNoteHeader>Contingent Liabilities</ReportNoteHeader>
    <ReportNoteText>
      The Group is party to certain legal proceedings. No material liability is expected
      to arise and accordingly no provision has been recognised.
    </ReportNoteText>
  </ReportNote>
</ReportNotes>`}
      >
        <div className="w-full">
          <ReportNotes>
            <ReportNote>
              <ReportNoteHeader>Revenue Recognition Policy</ReportNoteHeader>
              <ReportNoteText>
                Revenue from software licences is recognised on delivery of the licence key.
                Subscription revenue is recognised ratably over the contract term in accordance with IFRS 15.
              </ReportNoteText>
            </ReportNote>
            <ReportNote>
              <ReportNoteHeader>Foreign Currency</ReportNoteHeader>
              <ReportNoteText>
                Transactions denominated in foreign currencies are translated at the exchange rate
                prevailing at the date of the transaction. Monetary assets are retranslated at the
                closing rate with differences recognised in profit or loss.
              </ReportNoteText>
            </ReportNote>
            <ReportNote>
              <ReportNoteHeader>Contingent Liabilities</ReportNoteHeader>
              <ReportNoteText>
                The Group is party to certain legal proceedings arising in the ordinary course of business.
                No material liability is expected to arise and accordingly no provision has been recognised.
              </ReportNoteText>
            </ReportNote>
          </ReportNotes>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* ReportSummary */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Executive Summary</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">ReportSummary</code> is a flex column that spaces{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">&lt;p&gt;</code> paragraphs with relaxed line-height — ideal for narrative executive summaries and management commentary.
          </p>
          <ComponentPreview
            code={`<ReportSummary>
  <p>
    Ascendra delivered a record fiscal year, with total revenue growing 15.1% to $42.8M
    driven by strong enterprise sales and the successful launch of the Platform tier in Q2.
  </p>
  <p>
    Net income increased 16.4% to $6.4M, reflecting improved gross margins from the
    subscription mix shift and disciplined operating expense management despite continued
    headcount investment in Engineering and Customer Success.
  </p>
  <p>
    The balance sheet remains strong with $18.2M in cash and no long-term debt.
    The Board has approved a $3M share buyback programme to commence in Q1 FY25.
  </p>
</ReportSummary>`}
          >
            <div className="w-full">
              <ReportSummary>
                <p>
                  Ascendra delivered a record fiscal year, with total revenue growing 15.1% to $42.8M
                  driven by strong enterprise sales and the successful launch of the Platform tier in Q2.
                </p>
                <p>
                  Net income increased 16.4% to $6.4M, reflecting improved gross margins from the
                  subscription mix shift and disciplined operating expense management despite continued
                  headcount investment in Engineering and Customer Success.
                </p>
                <p>
                  The balance sheet remains strong with $18.2M in cash and no long-term debt.
                  The Board has approved a $3M share buyback programme to commence in Q1 FY25.
                </p>
              </ReportSummary>
            </div>
          </ComponentPreview>
        </div>

        {/* Notes without header */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Notes Without Headers</h3>
          <p className="text-xs text-muted-foreground">
            Omit <code className="rounded bg-muted px-1 font-mono text-xs">ReportNoteHeader</code> when the notes are unlabelled bullet-style observations.
          </p>
          <ComponentPreview
            code={`<ReportNotes>
  <ReportNote>
    <ReportNoteText>
      Carbon emissions reduced 12% YoY to 48,200 tCO2e, ahead of the 10% annual
      target set in the 2030 Net Zero roadmap.
    </ReportNoteText>
  </ReportNote>
  <ReportNote>
    <ReportNoteText>
      Renewable energy share reached 64%, up 8 percentage points from FY23,
      driven by the commissioning of the roof-top solar array at our Dublin campus.
    </ReportNoteText>
  </ReportNote>
  <ReportNote>
    <ReportNoteText>
      Scope 3 value-chain emissions fell 51% following the supplier engagement
      programme launched in H2 2023.
    </ReportNoteText>
  </ReportNote>
</ReportNotes>`}
          >
            <div className="w-full">
              <ReportNotes>
                <ReportNote>
                  <ReportNoteText>
                    Carbon emissions reduced 12% YoY to 48,200 tCO2e, ahead of the 10% annual
                    target set in the 2030 Net Zero roadmap.
                  </ReportNoteText>
                </ReportNote>
                <ReportNote>
                  <ReportNoteText>
                    Renewable energy share reached 64%, up 8 percentage points from FY23,
                    driven by the commissioning of the roof-top solar array at our Dublin campus.
                  </ReportNoteText>
                </ReportNote>
                <ReportNote>
                  <ReportNoteText>
                    Scope 3 value-chain emissions fell 51% following the supplier engagement
                    programme launched in H2 2023.
                  </ReportNoteText>
                </ReportNote>
              </ReportNotes>
            </div>
          </ComponentPreview>
        </div>

        {/* Summary + Notes in a section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Summary + Notes in a Section</h3>
          <p className="text-xs text-muted-foreground">
            Compose <code className="rounded bg-muted px-1 font-mono text-xs">ReportSummary</code> and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">ReportNotes</code> inside a section with{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">ReportSectionHeader</code> to build a full content block.
          </p>
          <ComponentPreview
            code={`<div className="space-y-5">
  <ReportSectionHeader>
    <h2 className="text-base font-semibold">Clinical Summary</h2>
  </ReportSectionHeader>

  <ReportSummary>
    <p>
      Patient presents with well-controlled Type 2 Diabetes Mellitus with an HbA1c of 6.8%,
      down from 7.4% at the previous review. Blood pressure is within target range at 124/78 mmHg.
    </p>
  </ReportSummary>

  <ReportNotes>
    <ReportNote>
      <ReportNoteHeader>Medication Review</ReportNoteHeader>
      <ReportNoteText>
        Metformin 1000mg BD and Empagliflozin 10mg OD — continue unchanged.
        Statin therapy titrated to Atorvastatin 40mg following lipid panel results.
      </ReportNoteText>
    </ReportNote>
    <ReportNote>
      <ReportNoteHeader>Next Steps</ReportNoteHeader>
      <ReportNoteText>
        Repeat HbA1c and renal panel in 3 months. Referral to dietitian for ongoing
        carbohydrate management support.
      </ReportNoteText>
    </ReportNote>
  </ReportNotes>
</div>`}
          >
            <div className="w-full space-y-5">
              <ReportSectionHeader>
                <h2 className="text-base font-semibold">Clinical Summary</h2>
              </ReportSectionHeader>

              <ReportSummary>
                <p>
                  Patient presents with well-controlled Type 2 Diabetes Mellitus with an HbA1c of 6.8%,
                  down from 7.4% at the previous review. Blood pressure is within target range at 124/78 mmHg.
                </p>
              </ReportSummary>

              <ReportNotes>
                <ReportNote>
                  <ReportNoteHeader>Medication Review</ReportNoteHeader>
                  <ReportNoteText>
                    Metformin 1000mg BD and Empagliflozin 10mg OD — continue unchanged.
                    Statin therapy titrated to Atorvastatin 40mg following lipid panel results.
                  </ReportNoteText>
                </ReportNote>
                <ReportNote>
                  <ReportNoteHeader>Next Steps</ReportNoteHeader>
                  <ReportNoteText>
                    Repeat HbA1c and renal panel in 3 months. Referral to dietitian for ongoing
                    carbohydrate management support.
                  </ReportNoteText>
                </ReportNote>
              </ReportNotes>
            </div>
          </ComponentPreview>
        </div>

        {/* PDF Export Button */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">PDF Export Button</h3>
          <p className="text-xs text-muted-foreground">
            Captures the element with{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">id="report-content"</code> (set automatically by{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">ReportDocumentWrapper</code>) and downloads a paginated A4 PDF. Place it outside the wrapper so it is excluded from the export.
          </p>
          <ComponentPreview
            code={`{/* Outside ReportDocumentWrapper — excluded from the PDF */}
<ReportPdfExportButton fileName="annual-financial-statement-fy2024" />

{/* Custom label */}
<ReportPdfExportButton
  fileName="esg-report-2024"
  title="Download Report"
/>`}
          >
            <div className="flex flex-wrap gap-3">
              <ReportPdfExportButton fileName="annual-financial-statement-fy2024" />
              <ReportPdfExportButton fileName="esg-report-2024" title="Download Report" />
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
