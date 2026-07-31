"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  Card,
  CardPanel,
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

const meta = registry["report-header"];

export function ReportHeaderDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero — full financial report header */}
      <ComponentPreview
        code={`import {
  Card, CardPanel,
  ReportHeaderContent, ReportHeaderBody, ReportHeaderBodyWrap,
  ReportTitle, ReportTitleHeader, ReportSubTitle,
  ReportHeaderFooter, ReportHeaderField,
} from "@/ascendra-ui";

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
        <ReportHeaderField label="Reviewed by">Board Audit Committee</ReportHeaderField>
        <ReportHeaderField label="Currency">USD ($000s)</ReportHeaderField>
      </ReportHeaderFooter>
    </ReportHeaderContent>
  </CardPanel>
</Card>`}
      >
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
              <ReportHeaderField label="Reviewed by">Board Audit Committee</ReportHeaderField>
              <ReportHeaderField label="Currency">USD ($000s)</ReportHeaderField>
            </ReportHeaderFooter>
          </ReportHeaderContent>
          </CardPanel>
        </Card>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Inline footer (default) vs Stacked footer */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Footer Layout — Inline vs Stacked</h3>
          <p className="text-xs text-muted-foreground">
            The default inline layout suits up to 4 fields. Add{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">stacked</code> when you have 5 or more — fields render as a responsive 2–3 column grid.
          </p>
          <ComponentPreview
            code={`{/* Inline (default) — blue accent */}
<Card>
  <CardPanel border={{ color: "blue" }}>
    <ReportHeaderContent>
      {/* … */}
      <ReportHeaderFooter>
        <ReportHeaderField label="Prepared by">Revenue Operations</ReportHeaderField>
        <ReportHeaderField label="Period">Jan 1 – Aug 31, 2024</ReportHeaderField>
        <ReportHeaderField label="Report Date">September 2, 2024</ReportHeaderField>
      </ReportHeaderFooter>
    </ReportHeaderContent>
  </CardPanel>
</Card>

{/* Stacked — red accent */}
<Card>
  <CardPanel border={{ color: "red" }}>
    <ReportHeaderContent>
      {/* … */}
      <ReportHeaderFooter stacked>
        <ReportHeaderField label="Incident ID">SEC-2024-0847</ReportHeaderField>
        <ReportHeaderField label="Severity">Critical</ReportHeaderField>
        <ReportHeaderField label="Reported by">SOC Team</ReportHeaderField>
        <ReportHeaderField label="Date">October 14, 2024</ReportHeaderField>
        <ReportHeaderField label="Affected Systems">API Gateway, Auth</ReportHeaderField>
        <ReportHeaderField label="Status">Resolved</ReportHeaderField>
      </ReportHeaderFooter>
    </ReportHeaderContent>
  </CardPanel>
</Card>`}
          >
            <div className="flex w-full flex-col gap-6">
              <Card className="w-full">
                <CardPanel border={{ color: "blue" }}>
                  <ReportHeaderContent>
                    <ReportHeaderBody>
                      <ReportHeaderBodyWrap>
                        <ReportTitle>Sales Pipeline Report</ReportTitle>
                        <ReportTitleHeader>Ascendra Sales — YTD Performance</ReportTitleHeader>
                        <ReportSubTitle>Year-to-date · January – August 2024</ReportSubTitle>
                      </ReportHeaderBodyWrap>
                    </ReportHeaderBody>
                    <ReportHeaderFooter>
                      <ReportHeaderField label="Prepared by">Revenue Operations</ReportHeaderField>
                      <ReportHeaderField label="Period">Jan 1 – Aug 31, 2024</ReportHeaderField>
                      <ReportHeaderField label="Report Date">September 2, 2024</ReportHeaderField>
                    </ReportHeaderFooter>
                  </ReportHeaderContent>
                </CardPanel>
              </Card>

              <Card className="w-full">
                <CardPanel border={{ color: "red" }}>
                  <ReportHeaderContent>
                    <ReportHeaderBody>
                      <ReportHeaderBodyWrap>
                        <ReportTitle>Security Incident Report</ReportTitle>
                        <ReportTitleHeader>API Gateway Breach — Post-Incident Analysis</ReportTitleHeader>
                        <ReportSubTitle>Incident window: October 14, 2024 02:41–04:18 UTC</ReportSubTitle>
                      </ReportHeaderBodyWrap>
                    </ReportHeaderBody>
                    <ReportHeaderFooter stacked>
                      <ReportHeaderField label="Incident ID">SEC-2024-0847</ReportHeaderField>
                      <ReportHeaderField label="Severity">Critical</ReportHeaderField>
                      <ReportHeaderField label="Reported by">SOC Team</ReportHeaderField>
                      <ReportHeaderField label="Date">October 14, 2024</ReportHeaderField>
                      <ReportHeaderField label="Affected Systems">API Gateway, Auth</ReportHeaderField>
                      <ReportHeaderField label="Status">Resolved</ReportHeaderField>
                    </ReportHeaderFooter>
                  </ReportHeaderContent>
                </CardPanel>
              </Card>
            </div>
          </ComponentPreview>
        </div>

        {/* Right-side badge / logo slot */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With Badge or Logo</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">ReportHeaderBody</code> is a flex row — place any element to the right of{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">ReportHeaderBodyWrap</code> for a logo, badge, or classification chip.
          </p>
          <ComponentPreview
            code={`<Card>
  <CardPanel border={{ color: "teal" }}>
    <ReportHeaderContent>
      <ReportHeaderBody>
        <ReportHeaderBodyWrap>
          <ReportTitle>ESG Sustainability Report</ReportTitle>
          <ReportTitleHeader>Ascendra Group — FY 2024</ReportTitleHeader>
          <ReportSubTitle>Environmental · Social · Governance</ReportSubTitle>
        </ReportHeaderBodyWrap>
        <SimpleBadge variant="green">Published</SimpleBadge>
      </ReportHeaderBody>
      <ReportHeaderFooter>
        <ReportHeaderField label="Prepared by">Sustainability Office</ReportHeaderField>
        <ReportHeaderField label="Report Date">March 2025</ReportHeaderField>
        <ReportHeaderField label="Framework">GRI Standards 2021</ReportHeaderField>
      </ReportHeaderFooter>
    </ReportHeaderContent>
  </CardPanel>
</Card>`}
          >
            <Card className="w-full">
              <CardPanel border={{ color: "teal" }}>
                <ReportHeaderContent>
                  <ReportHeaderBody>
                    <ReportHeaderBodyWrap>
                      <ReportTitle>ESG Sustainability Report</ReportTitle>
                      <ReportTitleHeader>Ascendra Group — FY 2024</ReportTitleHeader>
                      <ReportSubTitle>Environmental · Social · Governance</ReportSubTitle>
                    </ReportHeaderBodyWrap>
                    <SimpleBadge variant="green">Published</SimpleBadge>
                  </ReportHeaderBody>
                  <ReportHeaderFooter>
                    <ReportHeaderField label="Prepared by">Sustainability Office</ReportHeaderField>
                    <ReportHeaderField label="Report Date">March 2025</ReportHeaderField>
                    <ReportHeaderField label="Framework">GRI Standards 2021</ReportHeaderField>
                  </ReportHeaderFooter>
                </ReportHeaderContent>
              </CardPanel>
            </Card>
          </ComponentPreview>
        </div>

        {/* Patient / clinical header */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Clinical / Medical Report</h3>
          <p className="text-xs text-muted-foreground">
            Stacked footer with 4 columns suits reports with dense patient or case metadata.
          </p>
          <ComponentPreview
            code={`<Card>
  <CardPanel border={{ color: "blue" }}>
    <ReportHeaderContent>
      <ReportHeaderBody>
        <ReportHeaderBodyWrap>
          <ReportTitle>Patient Health Summary</ReportTitle>
          <ReportTitleHeader>Jordan M. Patel</ReportTitleHeader>
          <ReportSubTitle>DOB: March 12, 1984 · MRN: 00847-291</ReportSubTitle>
        </ReportHeaderBodyWrap>
      </ReportHeaderBody>
      <ReportHeaderFooter stacked className="sm:grid-cols-4">
        <ReportHeaderField label="Attending">Dr. Sarah Chen, MD</ReportHeaderField>
        <ReportHeaderField label="Specialty">Internal Medicine</ReportHeaderField>
        <ReportHeaderField label="Facility">Ascendra Medical Centre</ReportHeaderField>
        <ReportHeaderField label="Report Date">November 18, 2024</ReportHeaderField>
      </ReportHeaderFooter>
    </ReportHeaderContent>
  </CardPanel>
</Card>`}
          >
            <Card className="w-full">
              <CardPanel border={{ color: "blue" }}>
                <ReportHeaderContent>
                  <ReportHeaderBody>
                    <ReportHeaderBodyWrap>
                      <ReportTitle>Patient Health Summary</ReportTitle>
                      <ReportTitleHeader>Jordan M. Patel</ReportTitleHeader>
                      <ReportSubTitle>DOB: March 12, 1984 · MRN: 00847-291</ReportSubTitle>
                    </ReportHeaderBodyWrap>
                  </ReportHeaderBody>
                  <ReportHeaderFooter stacked className="sm:grid-cols-4">
                    <ReportHeaderField label="Attending">Dr. Sarah Chen, MD</ReportHeaderField>
                    <ReportHeaderField label="Specialty">Internal Medicine</ReportHeaderField>
                    <ReportHeaderField label="Facility">Ascendra Medical Centre</ReportHeaderField>
                    <ReportHeaderField label="Report Date">November 18, 2024</ReportHeaderField>
                  </ReportHeaderFooter>
                </ReportHeaderContent>
              </CardPanel>
            </Card>
          </ComponentPreview>
        </div>

        {/* HR / performance review */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">HR Performance Review</h3>
          <p className="text-xs text-muted-foreground">
            Minimal inline footer for internal HR documents with fewer metadata fields.
          </p>
          <ComponentPreview
            code={`<Card>
  <CardPanel border={{ color: "purple" }}>
    <ReportHeaderContent>
      <ReportHeaderBody>
        <ReportHeaderBodyWrap>
          <ReportTitle>Employee Performance Review</ReportTitle>
          <ReportTitleHeader>Marcus T. Rivera</ReportTitleHeader>
          <ReportSubTitle>Senior Engineer · Platform Team · FY 2024 Annual Review</ReportSubTitle>
        </ReportHeaderBodyWrap>
      </ReportHeaderBody>
      <ReportHeaderFooter>
        <ReportHeaderField label="Manager">Priya Nair</ReportHeaderField>
        <ReportHeaderField label="Review Period">Jan 1 – Dec 31, 2024</ReportHeaderField>
        <ReportHeaderField label="Department">Engineering</ReportHeaderField>
      </ReportHeaderFooter>
    </ReportHeaderContent>
  </CardPanel>
</Card>`}
          >
            <Card className="w-full">
              <CardPanel border={{ color: "purple" }}>
                <ReportHeaderContent>
                  <ReportHeaderBody>
                    <ReportHeaderBodyWrap>
                      <ReportTitle>Employee Performance Review</ReportTitle>
                      <ReportTitleHeader>Marcus T. Rivera</ReportTitleHeader>
                      <ReportSubTitle>Senior Engineer · Platform Team · FY 2024 Annual Review</ReportSubTitle>
                    </ReportHeaderBodyWrap>
                  </ReportHeaderBody>
                  <ReportHeaderFooter>
                    <ReportHeaderField label="Manager">Priya Nair</ReportHeaderField>
                    <ReportHeaderField label="Review Period">Jan 1 – Dec 31, 2024</ReportHeaderField>
                    <ReportHeaderField label="Department">Engineering</ReportHeaderField>
                  </ReportHeaderFooter>
                </ReportHeaderContent>
              </CardPanel>
            </Card>
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
