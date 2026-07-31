"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { BackLink, Card, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, CardPanelItem, Checkbox, Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, DatePicker, Field, FieldGrid, FieldGroup, FieldHint, FieldLabel, FieldSet, Input, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea, MainContent, PageContent, PageHeader, PageHeaderGroup, PageMain, PageSubtitle, PageTitle, PageWrapper, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, UnsavedChangesBar } from "@/ascendra-ui";


// ─── Schema ────────────────────────────────────────────────────────────────────

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z.string(),
  linkedIn: z.string(),
  portfolio: z.string(),
  position: z.string().min(1, "Position is required"),
  department: z.string(),
  availableFrom: z.date({ error: "Available date is required" }),
  workArrangement: z.string().min(1, "Work arrangement is required"),
  expectedSalary: z.string(),
  payPeriod: z.string(),
  yearsExperience: z.string().min(1, "Please select years of experience"),
  education: z.string().min(1, "Please select your education level"),
  currentEmployer: z.string(),
  noticePeriod: z.string(),
  coverLetter: z
    .string()
    .min(1, "Cover letter is required")
    .min(50, "Cover letter must be at least 50 characters"),
  declarationAccurate: z.literal(true, { error: "Please confirm accuracy" }),
  declarationPrivacy: z.literal(true, {
    error: "Please accept the privacy policy",
  }),
});

type JobApplicationValues = z.infer<typeof schema>;

// ─── Data ──────────────────────────────────────────────────────────────────────

const POSITIONS = [
  "Frontend Engineer",
  "Backend Engineer",
  "Product Designer",
  "Product Manager",
  "Data Analyst",
  "DevOps Engineer",
  "Other",
];

const DEPARTMENTS = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "data", label: "Data" },
  { value: "operations", label: "Operations" },
  { value: "sales", label: "Sales" },
];

const WORK_ARRANGEMENTS = [
  { value: "onsite", label: "Onsite" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];

const PAY_PERIODS = [
  { value: "per-year", label: "Per year" },
  { value: "per-month", label: "Per month" },
  { value: "per-hour", label: "Per hour" },
];

const YEARS_EXPERIENCE = [
  { value: "0-1", label: "0–1 years" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5-10", label: "5–10 years" },
  { value: "10+", label: "10+ years" },
];

const EDUCATION_LEVELS = [
  { value: "high-school", label: "High School" },
  { value: "associate", label: "Associate" },
  { value: "bachelor", label: "Bachelor's" },
  { value: "master", label: "Master's" },
  { value: "phd", label: "PhD" },
  { value: "other", label: "Other" },
];

const NOTICE_PERIODS = [
  { value: "immediately", label: "Immediately" },
  { value: "2-weeks", label: "2 weeks" },
  { value: "1-month", label: "1 month" },
  { value: "2-months", label: "2 months" },
  { value: "3-months", label: "3 months" },
];

// ─── Form ──────────────────────────────────────────────────────────────────────

export default function JobApplicationForm() {
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    trigger,
    reset,
    getValues,
    formState: { isDirty, isValid, errors },
  } = useForm<JobApplicationValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedIn: "",
      portfolio: "",
      position: "",
      department: "",
      availableFrom: undefined,
      workArrangement: "",
      expectedSalary: "",
      payPeriod: "",
      yearsExperience: "",
      education: "",
      currentEmployer: "",
      noticePeriod: "",
      coverLetter: "",
      declarationAccurate: undefined,
      declarationPrivacy: undefined,
    },
    mode: "onTouched",
  });

  async function handleSave(): Promise<boolean> {
    const ok = await trigger();
    if (!ok) return false;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSaving(false);
    reset(getValues());
    return true;
  }

  return (
    <>
          <BackLink href="/showcase/forms">Forms Gallery</BackLink>

          <PageHeader>
            <PageHeaderGroup>
              <PageTitle>Job Application</PageTitle>
              <PageSubtitle>
                Apply for a position at Ascendra. We review all applications
                within 5 business days.
              </PageSubtitle>
            </PageHeaderGroup>
          </PageHeader>

          <PageMain>
            <PageWrapper>
              <PageContent>
                <MainContent>
                  {/* ── Section 1: Personal Information ───────────────────── */}
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>
                        Personal Information
                      </CardHeaderTitle>
                      <CardHeaderSubtitle>
                        Tell us a bit about yourself and how we can reach you.
                      </CardHeaderSubtitle>
                    </CardHeader>

                    <CardPanel>
                      {/* Panel Item 1 — Name */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="first-name">
                                First Name
                              </FieldLabel>
                              <Controller
                                name="firstName"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="first-name"
                                    full
                                    placeholder="Jane"
                                    autoComplete="given-name"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                    aria-invalid={!!errors.firstName}
                                  />
                                )}
                              />
                              <FieldHint
                                error={errors.firstName as { message?: string }}
                                mandatory
                                help="This is help text"
                              />
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="last-name">
                                Last Name
                              </FieldLabel>
                              <Controller
                                name="lastName"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="last-name"
                                    full
                                    placeholder="Smith"
                                    autoComplete="family-name"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                    aria-invalid={!!errors.lastName}
                                  />
                                )}
                              />
                              <FieldHint
                                error={errors.lastName as { message?: string }}
                                mandatory
                              />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 2 — Contact */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="email">
                                Email Address
                              </FieldLabel>
                              <Controller
                                name="email"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="email"
                                    full
                                    type="email"
                                    placeholder="jane@example.com"
                                    autoComplete="email"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                    aria-invalid={!!errors.email}
                                  />
                                )}
                              />
                              <FieldHint
                                error={errors.email as { message?: string }}
                                mandatory
                              />
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="phone">
                                Phone Number
                              </FieldLabel>
                              <Controller
                                name="phone"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="phone"
                                    full
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    autoComplete="tel"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                  />
                                )}
                              />
                              <FieldHint />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 3 — Online presence */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="linkedin">
                                LinkedIn URL
                              </FieldLabel>
                              <Controller
                                name="linkedIn"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="linkedin"
                                    full
                                    type="url"
                                    placeholder="https://linkedin.com/in/…"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                  />
                                )}
                              />
                              <FieldHint />
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="portfolio">
                                Portfolio / Website
                              </FieldLabel>
                              <Controller
                                name="portfolio"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="portfolio"
                                    full
                                    type="url"
                                    placeholder="https://yoursite.com"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                  />
                                )}
                              />
                              <FieldHint />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>
                    </CardPanel>
                  </Card>

                  {/* ── Section 2: Position Details ────────────────────────── */}
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>
                        Position Details
                      </CardHeaderTitle>
                      <CardHeaderSubtitle>
                        Tell us about the role you&apos;re applying for and your
                        availability.
                      </CardHeaderSubtitle>
                    </CardHeader>

                    <CardPanel>
                      {/* Panel Item 1 — Role */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="position">
                                Position
                              </FieldLabel>
                              <Controller
                                name="position"
                                control={control}
                                render={({ field: f }) => (
                                  <Combobox
                                    items={POSITIONS}
                                    value={f.value}
                                    onValueChange={(v) => f.onChange(v)}
                                  >
                                    <ComboboxInput
                                      id="position"
                                      placeholder="Search position…"
                                      onBlur={f.onBlur}
                                      className="w-full"
                                    />
                                    <ComboboxContent>
                                      <ComboboxList>
                                        <ComboboxEmpty>
                                          No results found.
                                        </ComboboxEmpty>
                                        <ComboboxCollection>
                                          {(p: string) => (
                                            <ComboboxItem key={p} value={p}>
                                              {p}
                                            </ComboboxItem>
                                          )}
                                        </ComboboxCollection>
                                      </ComboboxList>
                                    </ComboboxContent>
                                  </Combobox>
                                )}
                              />
                              <FieldHint
                                error={errors.position as { message?: string }}
                                mandatory
                              />
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="department">
                                Department
                              </FieldLabel>
                              <Controller
                                name="department"
                                control={control}
                                render={({ field: f }) => (
                                  <Select
                                    value={f.value}
                                    onValueChange={f.onChange}
                                    onOpenChange={(open) => {
                                      if (!open) f.onBlur();
                                    }}
                                  >
                                    <SelectTrigger
                                      id="department"
                                      className="w-full"
                                    >
                                      <SelectValue placeholder="Select department…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {DEPARTMENTS.map((d) => (
                                          <SelectItem
                                            key={d.value}
                                            value={d.value}
                                          >
                                            {d.label}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <FieldHint />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 2 — Availability & arrangement */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="available-from">
                                Available From
                              </FieldLabel>
                              <Controller
                                name="availableFrom"
                                control={control}
                                render={({ field: f }) => (
                                  <DatePicker
                                    id="available-from"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                    placeholder="Pick a date"
                                    fromYear={new Date().getFullYear()}
                                  />
                                )}
                              />
                              <FieldHint
                                error={
                                  errors.availableFrom as { message?: string }
                                }
                                mandatory
                              />
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="work-arrangement">
                                Work Arrangement
                              </FieldLabel>
                              <Controller
                                name="workArrangement"
                                control={control}
                                render={({ field: f }) => (
                                  <Select
                                    value={f.value}
                                    onValueChange={f.onChange}
                                    onOpenChange={(open) => {
                                      if (!open) f.onBlur();
                                    }}
                                  >
                                    <SelectTrigger
                                      id="work-arrangement"
                                      className="w-full"
                                      aria-invalid={
                                        !!errors.workArrangement || undefined
                                      }
                                    >
                                      <SelectValue placeholder="Select arrangement…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {WORK_ARRANGEMENTS.map((w) => (
                                          <SelectItem
                                            key={w.value}
                                            value={w.value}
                                          >
                                            {w.label}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <FieldHint
                                error={
                                  errors.workArrangement as {
                                    message?: string;
                                  }
                                }
                                mandatory
                              />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 3 — Compensation */}
                      <CardPanelItem>
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="expected-salary">
                              Expected Salary
                            </FieldLabel>
                            <div className="flex gap-2">
                              <Controller
                                name="expectedSalary"
                                control={control}
                                render={({ field: f }) => (
                                  <InputGroup className="flex-1">
                                    <InputGroupAddon align="inline-start">
                                      <InputGroupText>USD</InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput
                                      id="expected-salary"
                                      type="number"
                                      placeholder="0"
                                      value={f.value}
                                      onChange={f.onChange}
                                      onBlur={f.onBlur}
                                    />
                                  </InputGroup>
                                )}
                              />
                              <Controller
                                name="payPeriod"
                                control={control}
                                render={({ field: f }) => (
                                  <Select
                                    value={f.value}
                                    onValueChange={f.onChange}
                                    onOpenChange={(open) => {
                                      if (!open) f.onBlur();
                                    }}
                                  >
                                    <SelectTrigger className="w-36">
                                      <SelectValue placeholder="Period…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {PAY_PERIODS.map((p) => (
                                          <SelectItem
                                            key={p.value}
                                            value={p.value}
                                          >
                                            {p.label}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                            <FieldHint />
                          </Field>
                        </FieldGroup>
                      </CardPanelItem>
                    </CardPanel>
                  </Card>

                  {/* ── Section 3: Background & Cover Letter ───────────────── */}
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>
                        Background &amp; Cover Letter
                      </CardHeaderTitle>
                      <CardHeaderSubtitle>
                        Share your experience and why you&apos;re a great fit
                        for this role.
                      </CardHeaderSubtitle>
                    </CardHeader>

                    <CardPanel>
                      {/* Panel Item 1 — Experience */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="years-experience">
                                Years of Experience
                              </FieldLabel>
                              <Controller
                                name="yearsExperience"
                                control={control}
                                render={({ field: f }) => (
                                  <Select
                                    value={f.value}
                                    onValueChange={f.onChange}
                                    onOpenChange={(open) => {
                                      if (!open) f.onBlur();
                                    }}
                                  >
                                    <SelectTrigger
                                      id="years-experience"
                                      className="w-full"
                                      aria-invalid={
                                        !!errors.yearsExperience || undefined
                                      }
                                    >
                                      <SelectValue placeholder="Select range…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {YEARS_EXPERIENCE.map((y) => (
                                          <SelectItem
                                            key={y.value}
                                            value={y.value}
                                          >
                                            {y.label}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <FieldHint
                                error={
                                  errors.yearsExperience as {
                                    message?: string;
                                  }
                                }
                                mandatory
                              />
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="education">
                                Highest Education
                              </FieldLabel>
                              <Controller
                                name="education"
                                control={control}
                                render={({ field: f }) => (
                                  <Select
                                    value={f.value}
                                    onValueChange={f.onChange}
                                    onOpenChange={(open) => {
                                      if (!open) f.onBlur();
                                    }}
                                  >
                                    <SelectTrigger
                                      id="education"
                                      className="w-full"
                                      aria-invalid={
                                        !!errors.education || undefined
                                      }
                                    >
                                      <SelectValue placeholder="Select level…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {EDUCATION_LEVELS.map((e) => (
                                          <SelectItem
                                            key={e.value}
                                            value={e.value}
                                          >
                                            {e.label}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <FieldHint
                                error={errors.education as { message?: string }}
                                mandatory
                              />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 2 — Current situation */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="current-employer">
                                Current Employer
                              </FieldLabel>
                              <Controller
                                name="currentEmployer"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="current-employer"
                                    full
                                    placeholder="Company name"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                  />
                                )}
                              />
                              <FieldHint />
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="notice-period">
                                Notice Period
                              </FieldLabel>
                              <Controller
                                name="noticePeriod"
                                control={control}
                                render={({ field: f }) => (
                                  <Select
                                    value={f.value}
                                    onValueChange={f.onChange}
                                    onOpenChange={(open) => {
                                      if (!open) f.onBlur();
                                    }}
                                  >
                                    <SelectTrigger
                                      id="notice-period"
                                      className="w-full"
                                    >
                                      <SelectValue placeholder="Select notice period…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {NOTICE_PERIODS.map((n) => (
                                          <SelectItem
                                            key={n.value}
                                            value={n.value}
                                          >
                                            {n.label}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <FieldHint />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 3 — Cover letter */}
                      <CardPanelItem>
                        <Field>
                          <FieldLabel htmlFor="cover-letter">
                            Cover Letter
                          </FieldLabel>
                          <Controller
                            name="coverLetter"
                            control={control}
                            render={({ field: f }) => (
                              <InputGroup>
                                <InputGroupTextarea
                                  id="cover-letter"
                                  rows={7}
                                  placeholder="Tell us why you're a great fit for this role…"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  aria-invalid={!!errors.coverLetter}
                                  maxLength={300}
                                />
                              </InputGroup>
                            )}
                          />
                          <FieldHint
                            error={errors.coverLetter as { message?: string }}
                            mandatory
                          />
                        </Field>
                      </CardPanelItem>

                      {/* Panel Item 4 — Declarations */}
                      <CardPanelItem>
                        <FieldGroup className="gap-1">
                          <Controller
                            name="declarationAccurate"
                            control={control}
                            render={({ field: f }) => (
                              <Field
                                orientation="horizontal"
                                className="items-baseline"
                              >
                                <Checkbox
                                  id="declaration-accurate"
                                  checked={!!f.value}
                                  onCheckedChange={(checked) =>
                                    f.onChange(checked ? true : undefined)
                                  }
                                  onBlur={f.onBlur}
                                  aria-invalid={!!errors.declarationAccurate}
                                />
                                <FieldLabel
                                  htmlFor="declaration-accurate"
                                  className="cursor-pointer font-normal"
                                >
                                  All information provided is accurate and
                                  complete.
                                </FieldLabel>
                              </Field>
                            )}
                          />
                          {errors.declarationAccurate && (
                            <FieldHint
                              error={
                                errors.declarationAccurate as {
                                  message?: string;
                                }
                              }
                            />
                          )}

                          <Controller
                            name="declarationPrivacy"
                            control={control}
                            render={({ field: f }) => (
                              <Field
                                orientation="horizontal"
                                className="items-baseline mt-2"
                              >
                                <Checkbox
                                  id="declaration-privacy"
                                  checked={!!f.value}
                                  onCheckedChange={(checked) =>
                                    f.onChange(checked ? true : undefined)
                                  }
                                  onBlur={f.onBlur}
                                  aria-invalid={!!errors.declarationPrivacy}
                                />
                                <FieldLabel
                                  htmlFor="declaration-privacy"
                                  className="cursor-pointer font-normal"
                                >
                                  I agree to the recruitment privacy policy.
                                </FieldLabel>
                              </Field>
                            )}
                          />
                          {errors.declarationPrivacy && (
                            <FieldHint
                              error={
                                errors.declarationPrivacy as {
                                  message?: string;
                                }
                              }
                            />
                          )}
                        </FieldGroup>
                      </CardPanelItem>
                    </CardPanel>
                  </Card>
                </MainContent>
              </PageContent>
            </PageWrapper>
          </PageMain>

      <UnsavedChangesBar
        isDirty={isDirty}
        isValid={isValid}
        isSaving={isSaving}
        onSave={handleSave}
        onReset={() => reset()}
        onInvalid={() => trigger()}
        className="lg:left-[calc(50%+7rem)]"
      />
    </>
  );
}
