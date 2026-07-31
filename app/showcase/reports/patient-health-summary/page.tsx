import {
  BackLink,
  ReportPdfExportButton,
  Card,
  CardHeaderTitle,
  CardPanel,
  ReportHeaderBody,
  ReportHeaderContent,
  ReportHeaderField,
  ReportHeaderFooter,
  ReportTitle,
  ReportTitleHeader,
  SimpleBadge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
  TableWrapper,
  ReportDocumentFooter,
  ReportDocumentFooterLine,
  ReportDocumentFooterLineLeft,
  ReportDocumentFooterLineRight,
  ReportDocumentFooterNote,
  CardHeaderSubtitle,
  ReportDocumentWrapper,
  ReportHeaderBodyWrap,
  ReportSectionHeader,
  ReportNote,
  ReportNoteHeader,
  ReportNotes,
  ReportNoteText,
} from "@/ascendra-ui";

// ─── Patient data ──────────────────────────────────────────────────────────────

const patient = {
  name: "Marcus J. Okafor",
  dob: "14 March 1978",
  age: 46,
  mrn: "PX-2024-08847",
  physician: "Dr. Sarah Chen, MD",
  specialty: "Internal Medicine",
  insurance: "BlueCross PPO",
  memberId: "BCX-4481-9027",
  visitDate: "28 May 2024",
  nextVisit: "28 August 2024",
};

const vitals = [
  { label: "Heart Rate", value: "72 bpm", status: "normal" },
  { label: "Blood Pressure", value: "128 / 82 mmHg", status: "borderline" },
  { label: "Temperature", value: "98.6 °F", status: "normal" },
  { label: "SpO2", value: "97 %", status: "normal" },
  { label: "Weight", value: "187 lbs", status: "normal" },
  { label: "BMI", value: "26.4", status: "normal" },
];

const medications = [
  {
    drug: "Lisinopril",
    dose: "10 mg",
    freq: "Once daily (morning)",
    prescriber: "Dr. Chen",
    start: "15 Jan 2023",
  },
  {
    drug: "Atorvastatin",
    dose: "20 mg",
    freq: "Once daily (evening)",
    prescriber: "Dr. Chen",
    start: "15 Jan 2023",
  },
  {
    drug: "Metformin",
    dose: "500 mg",
    freq: "Twice daily (with meals)",
    prescriber: "Dr. Patel",
    start: "02 Jun 2022",
  },
  {
    drug: "Vitamin D3",
    dose: "2,000 IU",
    freq: "Once daily",
    prescriber: "Self",
    start: "10 Mar 2024",
  },
];

type LabStatus = "normal" | "borderline" | "abnormal";

const labs: {
  test: string;
  result: string;
  range: string;
  status: LabStatus;
}[] = [
  {
    test: "HbA1c",
    result: "6.8 %",
    range: "< 5.7% (normal), < 7.0% (controlled)",
    status: "normal",
  },
  {
    test: "Fasting Glucose",
    result: "112 mg/dL",
    range: "70 – 99 mg/dL",
    status: "borderline",
  },
  {
    test: "Total Cholesterol",
    result: "172 mg/dL",
    range: "< 200 mg/dL",
    status: "normal",
  },
  {
    test: "LDL Cholesterol",
    result: "98 mg/dL",
    range: "< 100 mg/dL",
    status: "normal",
  },
  {
    test: "HDL Cholesterol",
    result: "52 mg/dL",
    range: "> 40 mg/dL (male)",
    status: "normal",
  },
  {
    test: "Triglycerides",
    result: "148 mg/dL",
    range: "< 150 mg/dL",
    status: "normal",
  },
  { test: "eGFR", result: "78 mL/min", range: "> 60 mL/min", status: "normal" },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PatientHealthSummaryPage() {
  return (
    <>
      <BackLink href="/showcase/reports">Report Gallery</BackLink>

        <ReportDocumentWrapper>
          {/* ── Document Header ──────────────────────────────────────────────── */}
          <Card>
            <CardPanel border={{ color: "teal" }}>
              <ReportHeaderContent>
                <ReportHeaderBody>
                  <ReportHeaderBodyWrap>
                    <ReportTitle>Patient Health Summary</ReportTitle>
                    <ReportTitleHeader>{patient.name}</ReportTitleHeader>
                  </ReportHeaderBodyWrap>
                  <SimpleBadge variant={"info"}>Visit Summary</SimpleBadge>
                </ReportHeaderBody>
                <ReportHeaderFooter stacked className="sm:grid-cols-4">
                  {[
                    { label: "Date of Birth", value: patient.dob },
                    { label: "Age", value: `${patient.age} years` },
                    { label: "MRN", value: patient.mrn },
                    { label: "Physician", value: patient.physician },
                    { label: "Specialty", value: patient.specialty },
                    { label: "Insurance", value: patient.insurance },
                    { label: "Visit Date", value: patient.visitDate },
                    { label: "Next Appointment", value: patient.nextVisit },
                  ].map((f) => (
                    <ReportHeaderField key={f.label} label={f.label}>
                      {f.value}
                    </ReportHeaderField>
                  ))}
                </ReportHeaderFooter>
              </ReportHeaderContent>
            </CardPanel>
          </Card>

          {/* ── Vital Signs ──────────────────────────────────────────────────── */}
          <div>
            <ReportSectionHeader>
              <CardHeaderTitle>Vital Signs</CardHeaderTitle>
            </ReportSectionHeader>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {vitals.map((v) => (
                <Card key={v.label}>
                  <CardPanel>
                    <div className="flex h-full flex-col gap-2 p-4">
                      <span className="text-[0.6875rem] text-muted-foreground">
                        {v.label}
                      </span>
                      <span className="text-xl font-bold leading-tight tracking-tight text-foreground">
                        {v.value}
                      </span>
                      <SimpleBadge
                        className="mt-auto self-start"
                        variant={v.status === "normal" ? "green" : "amber"}
                      >
                        {v.status === "normal" ? "Normal" : "Borderline"}
                      </SimpleBadge>
                    </div>
                  </CardPanel>
                </Card>
              ))}
            </div>
          </div>

          {/* ── Active Medications ───────────────────────────────────────────── */}
          <div>
            <ReportSectionHeader>
              <CardHeaderTitle>Active Medications</CardHeaderTitle>
            </ReportSectionHeader>
            <TableWrapper>
              <Table horizontal vertical scrollable>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dose</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Prescriber</TableHead>
                    <TableHead>Start Date</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody border={{}} bg={{}}>
                  {medications.map((m) => (
                    <TableRow key={m.drug}>
                      <TableCell className="font-medium">{m.drug}</TableCell>
                      <TableCell className="tabular-nums text-muted-foreground">
                        {m.dose}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {m.freq}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {m.prescriber}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {m.start}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>
          </div>

          {/* ── Lab Results ──────────────────────────────────────────────────── */}
          <div>
            <ReportSectionHeader>
              <CardHeaderTitle>Recent Lab Results</CardHeaderTitle>
              <CardHeaderSubtitle>
                Specimens drawn {patient.visitDate} · Processed at Ascendra
                Regional Laboratory
              </CardHeaderSubtitle>
            </ReportSectionHeader>
            <TableWrapper>
              <Table horizontal vertical scrollable>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHead>Test</TableHead>
                    <TableHead className="text-right">Result</TableHead>
                    <TableHead>Reference Range</TableHead>
                    <TableHead>Status</TableHead>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody border={{}} bg={{}}>
                  {labs.map((l) => (
                    <TableRow key={l.test}>
                      <TableCell className="font-medium">{l.test}</TableCell>
                      <TableCell className="text-right font-mono tabular-nums font-medium">
                        {l.result}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {l.range}
                      </TableCell>
                      <TableCell>
                        <SimpleBadge
                          variant={
                            l.status === "normal"
                              ? "green"
                              : l.status === "borderline"
                                ? "amber"
                                : "red"
                          }
                        >
                          {l.status}
                        </SimpleBadge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>
          </div>

          {/* ── Clinical Notes ───────────────────────────────────────────────── */}
          <div>
            <ReportSectionHeader>
              <CardHeaderTitle>Clinical Notes</CardHeaderTitle>
            </ReportSectionHeader>
            <ReportNotes>
              <ReportNote>
                <ReportNoteHeader>Reason for Visit</ReportNoteHeader>
                <ReportNoteText>
                  Routine follow-up for management of Type 2 Diabetes Mellitus
                  and hypertension. Patient attends every 3 months for
                  monitoring and medication review.
                </ReportNoteText>
              </ReportNote>
              <ReportNote>
                <ReportNoteHeader>Findings</ReportNoteHeader>
                <ReportNoteText>
                  Patient reports good compliance with all prescribed
                  medications. HbA1c at 6.8% remains within the controlled
                  target range (&lt; 7.0%). Fasting glucose slightly elevated at
                  112 mg/dL; patient was counselled on dietary modifications,
                  particularly reducing refined carbohydrate intake. Blood
                  pressure borderline at 128/82 mmHg; patient counselled on
                  sodium reduction and increased physical activity. All lipid
                  panels within normal reference ranges, consistent with statin
                  therapy response. No signs of renal deterioration (eGFR 78
                  mL/min). No new symptoms reported.
                </ReportNoteText>
              </ReportNote>
              <ReportNote>
                <ReportNoteHeader>Assessment & Plan</ReportNoteHeader>
                <ul className="flex flex-col gap-1.5">
                  {[
                    "Continue Lisinopril 10 mg and Atorvastatin 20 mg — no dose adjustment required at this time.",
                    "Continue Metformin 500 mg BD; reinforce dietary advice regarding carbohydrate management.",
                    "Repeat HbA1c and fasting glucose in 3 months to monitor trend.",
                    "Monitor blood pressure at home; advise patient to keep log for next visit.",
                    "Referral to registered dietitian for structured nutrition counselling.",
                    "Follow-up appointment scheduled for 28 August 2024.",
                  ].map((note) => (
                    <li key={note} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                      {note}
                    </li>
                  ))}
                </ul>
              </ReportNote>
            </ReportNotes>
          </div>

          {/* ── Facility Footer ──────────────────────────────────────────────── */}
          <ReportDocumentFooter>
            <ReportDocumentFooterNote>
              This document is a confidential patient health record generated by
              Ascendra Regional Medical Centre. It is intended solely for the
              treating physician and authorised clinical staff. Unauthorised
              disclosure is prohibited under applicable privacy law.
            </ReportDocumentFooterNote>
            <ReportDocumentFooterLine>
              <ReportDocumentFooterLineLeft>
                Ascendra Regional Medical Centre
              </ReportDocumentFooterLineLeft>
              <ReportDocumentFooterLineRight>
                <span>MRN: {patient.mrn}</span>
                <span>·</span>
                <span>Report Date: {patient.visitDate}</span>
                <span>·</span>
                <span>Confidential</span>
              </ReportDocumentFooterLineRight>
            </ReportDocumentFooterLine>
          </ReportDocumentFooter>
        </ReportDocumentWrapper>
      <ReportPdfExportButton fileName="patient-health-summary" />
    </>
  );
}
