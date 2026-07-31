"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LuShieldCheck } from "react-icons/lu";
import { z } from "zod";

import {
  BackLink,
  Card,
  CardFooter,
  CardFooterIcon,
  CardHeader,
  CardHeaderSubtitle,
  CardHeaderTitle,
  CardPanel,
  CardPanelField,
  CardPanelItem,
  Checkbox,
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  DatePicker,
  Field,
  FieldGrid,
  FieldGroup,
  FieldHint,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  MainContent,
  PageContent,
  PageHeader,
  PageHeaderGroup,
  PageMain,
  PageSubtitle,
  PageTitle,
  PageWrapper,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SimpleAlert,
  Switch,
  Stepper,
  StepperNavigator,
  StepperProvider,
  type StepperStep,
} from "@/ascendra-ui";

// ─── Schema ────────────────────────────────────────────────────────────────────

const schema = z.object({
  // Step 1
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.date({ error: "Date of birth is required" }),
  nationalId: z.string().min(1, "National ID is required"),
  personalEmail: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  personalPhone: z.string().min(1, "Phone is required"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  // Step 2
  jobTitle: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  manager: z.string().min(1, "Manager is required"),
  officeLocation: z.string().min(1, "Office location is required"),
  startDate: z.date({ error: "Start date is required" }),
  employmentType: z.string().min(1, "Employment type is required"),
  workEmail: z.string(),
  employeeId: z.string(),
  // Step 3
  baseSalary: z.string().min(1, "Base salary is required"),
  payFrequency: z.string().min(1, "Pay frequency is required"),
  bonusEligible: z.boolean(),
  equityGrant: z.string(),
  enrollHealth: z.boolean(),
  enrollDental: z.boolean(),
  enroll401k: z.boolean(),
  contribution401k: z.string(),
  // Step 4
  laptopType: z.string().min(1, "Laptop type is required"),
  operatingSystem: z.string().min(1, "Operating system is required"),
  software: z.string(),
  licenseTier: z.string().min(1, "License tier is required"),
  accessLevel: z.string().min(1, "Access level is required"),
  vpnAccess: z.boolean(),
  adminConsole: z.boolean(),
  mfaEnrollment: z.boolean(),
  hardwareKey: z.boolean(),
});

type OnboardingValues = z.infer<typeof schema>;

// ─── Data ──────────────────────────────────────────────────────────────────────

const STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Illinois",
  "New York",
  "Texas",
  "Washington",
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "Australia",
  "India",
];

const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "HR",
  "Finance",
  "Operations",
  "Sales",
];

const MANAGERS = [
  "Alice Chen",
  "Bob Martinez",
  "Carol Lee",
  "David Kim",
  "Emily Watson",
];

const OFFICE_LOCATIONS = [
  { value: "hq", label: "HQ" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "new-york", label: "New York" },
  { value: "london", label: "London" },
  { value: "singapore", label: "Singapore" },
];

const EMPLOYMENT_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "intern", label: "Intern" },
];

const PAY_FREQUENCIES = [
  { value: "weekly", label: "Weekly" },
  { value: "bi-weekly", label: "Bi-weekly" },
  { value: "semi-monthly", label: "Semi-monthly" },
  { value: "monthly", label: "Monthly" },
];

const LAPTOP_TYPES = [
  { value: "mbp-14", label: 'MacBook Pro 14"' },
  { value: "mbp-16", label: 'MacBook Pro 16"' },
  { value: "dell-xps", label: "Dell XPS" },
  { value: "thinkpad", label: "ThinkPad" },
  { value: "other", label: "Other" },
];

const OS_OPTIONS = [
  { value: "macos", label: "macOS" },
  { value: "windows", label: "Windows" },
  { value: "linux", label: "Linux" },
];

const LICENSE_TIERS = [
  { value: "standard", label: "Standard" },
  { value: "professional", label: "Professional" },
  { value: "enterprise", label: "Enterprise" },
];

const ACCESS_LEVELS = [
  { value: "viewer", label: "Viewer" },
  { value: "contributor", label: "Contributor" },
  { value: "admin", label: "Admin" },
];

const STEP_FIELDS: (keyof OnboardingValues)[][] = [
  [
    "firstName",
    "lastName",
    "dateOfBirth",
    "nationalId",
    "personalEmail",
    "personalPhone",
    "street",
    "city",
    "state",
    "zip",
    "country",
  ],
  [
    "jobTitle",
    "department",
    "manager",
    "officeLocation",
    "startDate",
    "employmentType",
  ],
  ["baseSalary", "payFrequency"],
  ["laptopType", "operatingSystem", "licenseTier", "accessLevel"],
];

// ─── Form ──────────────────────────────────────────────────────────────────────

export default function EmployeeOnboardingForm() {
  const {
    control,
    trigger,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      nationalId: "",
      personalEmail: "",
      personalPhone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      jobTitle: "",
      department: "",
      manager: "",
      officeLocation: "",
      startDate: undefined,
      employmentType: "",
      workEmail: "",
      employeeId: "",
      baseSalary: "",
      payFrequency: "",
      bonusEligible: false,
      equityGrant: "",
      enrollHealth: false,
      enrollDental: false,
      enroll401k: false,
      contribution401k: "",
      laptopType: "",
      operatingSystem: "",
      software: "",
      licenseTier: "",
      accessLevel: "",
      vpnAccess: false,
      adminConsole: false,
      mfaEnrollment: true,
      hardwareKey: false,
    },
    mode: "onTouched",
  });

  const accessLevel = watch("accessLevel");
  const enroll401k = watch("enroll401k");

  const STEPPER_STEPS: StepperStep[] = [
    {
      label: "Personal Information",
      description: "Identity & address",
      onNext: () => trigger(STEP_FIELDS[0]),
    },
    {
      label: "Employment Details",
      description: "Role & contract",
      onNext: () => trigger(STEP_FIELDS[1]),
    },
    {
      label: "Compensation & Benefits",
      description: "Salary & perks",
      onNext: () => trigger(STEP_FIELDS[2]),
    },
    { label: "IT & System Access", description: "Hardware & permissions" },
  ];

  async function handleSave(): Promise<boolean> {
    const ok = await trigger();
    if (!ok) return false;
    await new Promise((r) => setTimeout(r, 1400));
    reset(getValues());
    return true;
  }

  return (
    <>
      <StepperProvider steps={STEPPER_STEPS} onSubmit={handleSave}>
        <BackLink href="/showcase/forms">Forms Gallery</BackLink>
        <PageHeader>
          <PageHeaderGroup>
            <PageTitle>Employee Onboarding</PageTitle>
            <PageSubtitle>
              Complete all four steps to set up the new employee&apos;s profile
              and access.
            </PageSubtitle>
          </PageHeaderGroup>
        </PageHeader>
        <PageMain>
          <PageWrapper>
            <PageContent>
              <MainContent>
                <Stepper />
                {/* ── Step 1: Personal Information ──────────────────────── */}
                <Card step={0}>
                  <CardHeader>
                    <CardHeaderTitle>
                      Step 1 — Personal Information
                    </CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Enter the employee&apos;s personal details and home
                      address.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel>
                    <CardPanelItem>
                      <FieldSet>
                        <FieldGrid>
                          <Field>
                            <FieldLabel htmlFor="s1-first-name">
                              First Name
                            </FieldLabel>
                            <Controller
                              name="firstName"
                              control={control}
                              render={({ field: f }) => (
                                <Input
                                  id="s1-first-name"
                                  full
                                  placeholder="Jane"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  aria-invalid={!!errors.firstName}
                                />
                              )}
                            />
                            <FieldHint
                              error={errors.firstName as { message?: string }}
                              optional={false}
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="s1-last-name">
                              Last Name
                            </FieldLabel>
                            <Controller
                              name="lastName"
                              control={control}
                              render={({ field: f }) => (
                                <Input
                                  id="s1-last-name"
                                  full
                                  placeholder="Smith"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  aria-invalid={!!errors.lastName}
                                />
                              )}
                            />
                            <FieldHint
                              error={errors.lastName as { message?: string }}
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="s1-dob">
                              Date of Birth
                            </FieldLabel>
                            <Controller
                              name="dateOfBirth"
                              control={control}
                              render={({ field: f }) => (
                                <DatePicker
                                  id="s1-dob"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  placeholder="Pick a date"
                                  toYear={new Date().getFullYear()}
                                  captionLayout="dropdown"
                                />
                              )}
                            />
                            <FieldHint
                              error={errors.dateOfBirth as { message?: string }}
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="s1-national-id">
                              National ID / SSN
                            </FieldLabel>
                            <Controller
                              name="nationalId"
                              control={control}
                              render={({ field: f }) => (
                                <Input
                                  id="s1-national-id"
                                  full
                                  placeholder="XXX-XX-XXXX"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  aria-invalid={!!errors.nationalId}
                                />
                              )}
                            />
                            <FieldHint
                              error={errors.nationalId as { message?: string }}
                            />
                          </Field>
                        </FieldGrid>
                      </FieldSet>
                    </CardPanelItem>

                    <CardPanelItem>
                      <FieldSet>
                        <FieldGrid>
                          <Field>
                            <FieldLabel htmlFor="s1-email">
                              Personal Email
                            </FieldLabel>
                            <Controller
                              name="personalEmail"
                              control={control}
                              render={({ field: f }) => (
                                <Input
                                  id="s1-email"
                                  full
                                  type="email"
                                  placeholder="jane@personal.com"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  aria-invalid={!!errors.personalEmail}
                                />
                              )}
                            />
                            <FieldHint
                              error={
                                errors.personalEmail as { message?: string }
                              }
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="s1-phone">
                              Personal Phone
                            </FieldLabel>
                            <Controller
                              name="personalPhone"
                              control={control}
                              render={({ field: f }) => (
                                <Input
                                  id="s1-phone"
                                  full
                                  type="tel"
                                  placeholder="+1 (555) 000-0000"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  aria-invalid={!!errors.personalPhone}
                                />
                              )}
                            />
                            <FieldHint
                              error={
                                errors.personalPhone as { message?: string }
                              }
                            />
                          </Field>
                        </FieldGrid>
                      </FieldSet>
                    </CardPanelItem>

                    <CardPanelItem>
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor="s1-street">
                            Street Address
                          </FieldLabel>
                          <Controller
                            name="street"
                            control={control}
                            render={({ field: f }) => (
                              <Input
                                id="s1-street"
                                full
                                placeholder="123 Main St"
                                value={f.value}
                                onChange={f.onChange}
                                onBlur={f.onBlur}
                                aria-invalid={!!errors.street}
                              />
                            )}
                          />
                          <FieldHint
                            error={errors.street as { message?: string }}
                          />
                        </Field>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="s1-city">City</FieldLabel>
                              <Controller
                                name="city"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="s1-city"
                                    full
                                    placeholder="San Francisco"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                    aria-invalid={!!errors.city}
                                  />
                                )}
                              />
                              <FieldHint
                                error={errors.city as { message?: string }}
                              />
                            </Field>
                            <Field>
                              <FieldLabel htmlFor="s1-zip">
                                ZIP / Postal Code
                              </FieldLabel>
                              <Controller
                                name="zip"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="s1-zip"
                                    full
                                    placeholder="94105"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                    aria-invalid={!!errors.zip}
                                  />
                                )}
                              />
                              <FieldHint
                                error={errors.zip as { message?: string }}
                              />
                            </Field>
                            <Field>
                              <FieldLabel htmlFor="s1-state">
                                State / Province
                              </FieldLabel>
                              <Controller
                                name="state"
                                control={control}
                                render={({ field: f }) => (
                                  <Combobox
                                    items={STATES}
                                    value={f.value}
                                    onValueChange={(v) => f.onChange(v)}
                                  >
                                    <ComboboxInput
                                      id="s1-state"
                                      placeholder="Search state…"
                                      onBlur={f.onBlur}
                                      className="w-full"
                                    />
                                    <ComboboxContent>
                                      <ComboboxList>
                                        <ComboboxEmpty>
                                          No results found.
                                        </ComboboxEmpty>
                                        <ComboboxCollection>
                                          {(s: string) => (
                                            <ComboboxItem key={s} value={s}>
                                              {s}
                                            </ComboboxItem>
                                          )}
                                        </ComboboxCollection>
                                      </ComboboxList>
                                    </ComboboxContent>
                                  </Combobox>
                                )}
                              />
                              <FieldHint
                                error={errors.state as { message?: string }}
                              />
                            </Field>
                            <Field>
                              <FieldLabel htmlFor="s1-country">
                                Country
                              </FieldLabel>
                              <Controller
                                name="country"
                                control={control}
                                render={({ field: f }) => (
                                  <Combobox
                                    items={COUNTRIES}
                                    value={f.value}
                                    onValueChange={(v) => f.onChange(v)}
                                  >
                                    <ComboboxInput
                                      id="s1-country"
                                      placeholder="Search country…"
                                      onBlur={f.onBlur}
                                      className="w-full"
                                    />
                                    <ComboboxContent>
                                      <ComboboxList>
                                        <ComboboxEmpty>
                                          No results found.
                                        </ComboboxEmpty>
                                        <ComboboxCollection>
                                          {(c: string) => (
                                            <ComboboxItem key={c} value={c}>
                                              {c}
                                            </ComboboxItem>
                                          )}
                                        </ComboboxCollection>
                                      </ComboboxList>
                                    </ComboboxContent>
                                  </Combobox>
                                )}
                              />
                              <FieldHint
                                error={errors.country as { message?: string }}
                              />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </FieldGroup>
                    </CardPanelItem>
                  </CardPanel>
                </Card>

                {/* ── Step 2: Employment Details ─────────────────────────── */}
                <Card step={1}>
                  <CardHeader>
                    <CardHeaderTitle>
                      Step 2 — Employment Details
                    </CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Define the role, reporting structure, and start date.
                    </CardHeaderSubtitle>
                  </CardHeader>

                  <CardPanel>
                    <CardPanelItem>
                      <FieldSet>
                        <FieldGrid>
                          <Field>
                            <FieldLabel htmlFor="s2-job-title">
                              Job Title
                            </FieldLabel>
                            <Controller
                              name="jobTitle"
                              control={control}
                              render={({ field: f }) => (
                                <Input
                                  id="s2-job-title"
                                  full
                                  placeholder="e.g. Senior Engineer"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  aria-invalid={!!errors.jobTitle}
                                />
                              )}
                            />
                            <FieldHint
                              error={errors.jobTitle as { message?: string }}
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="s2-department">
                              Department
                            </FieldLabel>
                            <Controller
                              name="department"
                              control={control}
                              render={({ field: f }) => (
                                <Combobox
                                  items={DEPARTMENTS}
                                  value={f.value}
                                  onValueChange={(v) => f.onChange(v)}
                                >
                                  <ComboboxInput
                                    id="s2-department"
                                    placeholder="Search department…"
                                    onBlur={f.onBlur}
                                    className="w-full"
                                  />
                                  <ComboboxContent>
                                    <ComboboxList>
                                      <ComboboxEmpty>
                                        No results found.
                                      </ComboboxEmpty>
                                      <ComboboxCollection>
                                        {(d: string) => (
                                          <ComboboxItem key={d} value={d}>
                                            {d}
                                          </ComboboxItem>
                                        )}
                                      </ComboboxCollection>
                                    </ComboboxList>
                                  </ComboboxContent>
                                </Combobox>
                              )}
                            />
                            <FieldHint
                              error={errors.department as { message?: string }}
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="s2-manager">
                              Manager
                            </FieldLabel>
                            <Controller
                              name="manager"
                              control={control}
                              render={({ field: f }) => (
                                <Combobox
                                  items={MANAGERS}
                                  value={f.value}
                                  onValueChange={(v) => f.onChange(v)}
                                >
                                  <ComboboxInput
                                    id="s2-manager"
                                    placeholder="Search manager…"
                                    onBlur={f.onBlur}
                                    className="w-full"
                                  />
                                  <ComboboxContent>
                                    <ComboboxList>
                                      <ComboboxEmpty>
                                        No results found.
                                      </ComboboxEmpty>
                                      <ComboboxCollection>
                                        {(m: string) => (
                                          <ComboboxItem key={m} value={m}>
                                            {m}
                                          </ComboboxItem>
                                        )}
                                      </ComboboxCollection>
                                    </ComboboxList>
                                  </ComboboxContent>
                                </Combobox>
                              )}
                            />
                            <FieldHint
                              error={errors.manager as { message?: string }}
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="s2-office">
                              Office Location
                            </FieldLabel>
                            <Controller
                              name="officeLocation"
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
                                    id="s2-office"
                                    className="w-full"
                                    aria-invalid={
                                      !!errors.officeLocation || undefined
                                    }
                                  >
                                    <SelectValue placeholder="Select location…" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {OFFICE_LOCATIONS.map((l) => (
                                        <SelectItem
                                          key={l.value}
                                          value={l.value}
                                        >
                                          {l.label}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            <FieldHint
                              error={
                                errors.officeLocation as { message?: string }
                              }
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="s2-start-date">
                              Start Date
                            </FieldLabel>
                            <Controller
                              name="startDate"
                              control={control}
                              render={({ field: f }) => (
                                <DatePicker
                                  id="s2-start-date"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  placeholder="Pick a date"
                                  fromYear={new Date().getFullYear()}
                                />
                              )}
                            />
                            <FieldHint
                              error={errors.startDate as { message?: string }}
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="s2-employment-type">
                              Employment Type
                            </FieldLabel>
                            <Controller
                              name="employmentType"
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
                                    id="s2-employment-type"
                                    className="w-full"
                                    aria-invalid={
                                      !!errors.employmentType || undefined
                                    }
                                  >
                                    <SelectValue placeholder="Select type…" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {EMPLOYMENT_TYPES.map((t) => (
                                        <SelectItem
                                          key={t.value}
                                          value={t.value}
                                        >
                                          {t.label}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            <FieldHint
                              error={
                                errors.employmentType as { message?: string }
                              }
                            />
                          </Field>
                        </FieldGrid>
                      </FieldSet>
                    </CardPanelItem>

                    <CardPanelItem>
                      <FieldSet>
                        <FieldGrid>
                          <Field>
                            <FieldLabel htmlFor="s2-work-email">
                              Work Email
                            </FieldLabel>
                            <Controller
                              name="workEmail"
                              control={control}
                              render={({ field: f }) => (
                                <Input
                                  id="s2-work-email"
                                  full
                                  type="email"
                                  placeholder="Auto-populated on start date"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  readOnly
                                />
                              )}
                            />
                            <FieldHint
                              description="Assigned automatically."
                              optional
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="s2-employee-id">
                              Employee ID
                            </FieldLabel>
                            <Controller
                              name="employeeId"
                              control={control}
                              render={({ field: f }) => (
                                <Input
                                  id="s2-employee-id"
                                  full
                                  placeholder="Auto-assigned"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  readOnly
                                />
                              )}
                            />
                            <FieldHint
                              description="Assigned automatically."
                              optional
                            />
                          </Field>
                        </FieldGrid>
                      </FieldSet>
                      <SimpleAlert variant="secondary">
                        A welcome email with login instructions will be sent to
                        the personal email on the start date.
                      </SimpleAlert>
                    </CardPanelItem>
                  </CardPanel>
                </Card>

                {/* ── Step 3: Compensation & Benefits ───────────────────── */}
                <Card step={2}>
                  <CardHeader>
                    <CardHeaderTitle>
                      Step 3 — Compensation &amp; Benefits
                    </CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Set salary, equity, and benefits enrollment.
                    </CardHeaderSubtitle>
                  </CardHeader>

                  <CardPanel>
                    <CardPanelItem>
                      <FieldSet>
                        <FieldGrid>
                          <Field>
                            <FieldLabel htmlFor="s3-salary">
                              Base Salary
                            </FieldLabel>
                            <Controller
                              name="baseSalary"
                              control={control}
                              render={({ field: f }) => (
                                <InputGroup>
                                  <InputGroupAddon align="inline-start">
                                    <InputGroupText>USD</InputGroupText>
                                  </InputGroupAddon>
                                  <InputGroupInput
                                    id="s3-salary"
                                    type="number"
                                    placeholder="0"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                    aria-invalid={
                                      !!errors.baseSalary || undefined
                                    }
                                  />
                                </InputGroup>
                              )}
                            />
                            <FieldHint
                              error={errors.baseSalary as { message?: string }}
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="s3-pay-frequency">
                              Pay Frequency
                            </FieldLabel>
                            <Controller
                              name="payFrequency"
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
                                    id="s3-pay-frequency"
                                    className="w-full"
                                    aria-invalid={
                                      !!errors.payFrequency || undefined
                                    }
                                  >
                                    <SelectValue placeholder="Select frequency…" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {PAY_FREQUENCIES.map((p) => (
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
                            <FieldHint
                              error={
                                errors.payFrequency as { message?: string }
                              }
                            />
                          </Field>
                        </FieldGrid>
                      </FieldSet>
                    </CardPanelItem>

                    <CardPanelItem>
                      <FieldSet>
                        <Controller
                          name="bonusEligible"
                          control={control}
                          render={({ field: f }) => (
                            <Field
                              orientation="horizontal"
                              className="items-center"
                            >
                              <Switch
                                id="s3-bonus"
                                checked={f.value}
                                onCheckedChange={f.onChange}
                              />
                              <FieldLabel
                                htmlFor="s3-bonus"
                                className="cursor-pointer font-normal"
                              >
                                Eligible for bonus
                              </FieldLabel>
                            </Field>
                          )}
                        />
                        <Field>
                          <FieldLabel htmlFor="s3-equity">
                            Equity Grant (RSUs)
                          </FieldLabel>
                          <div className="flex items-center gap-2">
                            <Controller
                              name="equityGrant"
                              control={control}
                              render={({ field: f }) => (
                                <InputGroup className="max-w-40">
                                  <InputGroupInput
                                    id="s3-equity"
                                    type="number"
                                    placeholder="0"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                  />
                                  <InputGroupAddon align="inline-end">
                                    <InputGroupText>shares</InputGroupText>
                                  </InputGroupAddon>
                                </InputGroup>
                              )}
                            />
                          </div>
                          <FieldHint optional />
                        </Field>
                      </FieldSet>
                    </CardPanelItem>

                    <CardPanelItem>
                      <FieldSet>
                        <FieldLegend>Benefits</FieldLegend>
                        <Controller
                          name="enrollHealth"
                          control={control}
                          render={({ field: f }) => (
                            <Field
                              orientation="horizontal"
                              className="items-baseline"
                            >
                              <Checkbox
                                id="s3-health"
                                checked={f.value}
                                onCheckedChange={f.onChange}
                              />
                              <FieldLabel
                                htmlFor="s3-health"
                                className="cursor-pointer font-normal"
                              >
                                Enroll in health insurance plan
                              </FieldLabel>
                            </Field>
                          )}
                        />
                        <Controller
                          name="enrollDental"
                          control={control}
                          render={({ field: f }) => (
                            <Field
                              orientation="horizontal"
                              className="items-baseline"
                            >
                              <Checkbox
                                id="s3-dental"
                                checked={f.value}
                                onCheckedChange={f.onChange}
                              />
                              <FieldLabel
                                htmlFor="s3-dental"
                                className="cursor-pointer font-normal"
                              >
                                Enroll in dental and vision
                              </FieldLabel>
                            </Field>
                          )}
                        />
                        <Controller
                          name="enroll401k"
                          control={control}
                          render={({ field: f }) => (
                            <Field
                              orientation="horizontal"
                              className="items-baseline"
                            >
                              <Checkbox
                                id="s3-401k"
                                checked={f.value}
                                onCheckedChange={f.onChange}
                              />
                              <FieldLabel
                                htmlFor="s3-401k"
                                className="cursor-pointer font-normal"
                              >
                                Enroll in 401(k) retirement plan
                              </FieldLabel>
                            </Field>
                          )}
                        />
                        <CardPanelField collapsed={!enroll401k}>
                          <Field className="pl-px">
                            <FieldLabel htmlFor="s3-contribution">
                              Contribution %
                            </FieldLabel>
                            <Controller
                              name="contribution401k"
                              control={control}
                              render={({ field: f }) => (
                                <InputGroup className="max-w-32">
                                  <InputGroupInput
                                    id="s3-contribution"
                                    type="number"
                                    placeholder="e.g. 5"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                  />
                                  <InputGroupAddon align="inline-end">
                                    <InputGroupText>%</InputGroupText>
                                  </InputGroupAddon>
                                </InputGroup>
                              )}
                            />
                            <FieldHint optional />
                          </Field>
                        </CardPanelField>
                      </FieldSet>
                    </CardPanelItem>
                  </CardPanel>
                </Card>

                {/* ── Step 4: IT & System Access ─────────────────────────── */}
                <Card step={3}>
                  <CardHeader>
                    <CardHeaderTitle>
                      Step 4 — IT &amp; System Access
                    </CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Provision hardware, software, and access permissions.
                    </CardHeaderSubtitle>
                  </CardHeader>

                  <CardPanel>
                    <CardPanelItem>
                      <FieldGroup>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="s4-laptop">
                                Laptop Type
                              </FieldLabel>
                              <Controller
                                name="laptopType"
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
                                      id="s4-laptop"
                                      className="w-full"
                                      aria-invalid={
                                        !!errors.laptopType || undefined
                                      }
                                    >
                                      <SelectValue placeholder="Select laptop…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {LAPTOP_TYPES.map((l) => (
                                          <SelectItem
                                            key={l.value}
                                            value={l.value}
                                          >
                                            {l.label}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <FieldHint
                                error={
                                  errors.laptopType as { message?: string }
                                }
                              />
                            </Field>
                          </FieldGrid>
                        </FieldSet>

                        <FieldSet>
                          <FieldLegend variant="label">
                            Operating System
                          </FieldLegend>
                          <Controller
                            name="operatingSystem"
                            control={control}
                            render={({ field: f }) => (
                              <RadioGroup
                                value={f.value}
                                onValueChange={f.onChange}
                                onBlurCapture={(e: React.FocusEvent) => {
                                  if (
                                    !e.currentTarget.contains(
                                      e.relatedTarget as Node,
                                    )
                                  )
                                    f.onBlur();
                                }}
                                className="flex gap-4"
                              >
                                {OS_OPTIONS.map((opt) => (
                                  <Field
                                    key={opt.value}
                                    orientation="horizontal"
                                    className="w-auto items-baseline"
                                  >
                                    <RadioGroupItem
                                      value={opt.value}
                                      id={`s4-os-${opt.value}`}
                                    />
                                    <FieldLabel
                                      htmlFor={`s4-os-${opt.value}`}
                                      className="cursor-pointer font-normal"
                                    >
                                      {opt.label}
                                    </FieldLabel>
                                  </Field>
                                ))}
                              </RadioGroup>
                            )}
                          />
                          <FieldHint
                            error={
                              errors.operatingSystem as { message?: string }
                            }
                          />
                        </FieldSet>
                      </FieldGroup>
                    </CardPanelItem>

                    <CardPanelItem>
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor="s4-software">
                            Required Software
                          </FieldLabel>
                          <Controller
                            name="software"
                            control={control}
                            render={({ field: f }) => (
                              <Input
                                id="s4-software"
                                full
                                placeholder="e.g. Slack, Notion, Figma"
                                value={f.value}
                                onChange={f.onChange}
                                onBlur={f.onBlur}
                              />
                            )}
                          />
                          <FieldHint
                            description="Comma-separated list of required tools."
                            optional
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="s4-license-tier">
                            License Tier
                          </FieldLabel>
                          <Controller
                            name="licenseTier"
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
                                  id="s4-license-tier"
                                  className="w-full"
                                  aria-invalid={
                                    !!errors.licenseTier || undefined
                                  }
                                >
                                  <SelectValue placeholder="Select tier…" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {LICENSE_TIERS.map((t) => (
                                      <SelectItem key={t.value} value={t.value}>
                                        {t.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <FieldHint
                            error={errors.licenseTier as { message?: string }}
                          />
                        </Field>
                      </FieldGroup>
                    </CardPanelItem>

                    <CardPanelItem>
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor="s4-access-level">
                            Access Level
                          </FieldLabel>
                          <Controller
                            name="accessLevel"
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
                                  id="s4-access-level"
                                  className="w-full"
                                  aria-invalid={
                                    !!errors.accessLevel || undefined
                                  }
                                >
                                  <SelectValue placeholder="Select access level…" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {ACCESS_LEVELS.map((a) => (
                                      <SelectItem key={a.value} value={a.value}>
                                        {a.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <FieldHint
                            error={errors.accessLevel as { message?: string }}
                          />
                        </Field>
                        <Controller
                          name="vpnAccess"
                          control={control}
                          render={({ field: f }) => (
                            <Field
                              orientation="horizontal"
                              className="items-center"
                            >
                              <Switch
                                id="s4-vpn"
                                checked={f.value}
                                onCheckedChange={f.onChange}
                              />
                              <FieldLabel
                                htmlFor="s4-vpn"
                                className="cursor-pointer font-normal"
                              >
                                VPN access
                              </FieldLabel>
                            </Field>
                          )}
                        />
                        <Controller
                          name="adminConsole"
                          control={control}
                          render={({ field: f }) => (
                            <Field
                              orientation="horizontal"
                              className="items-center"
                            >
                              <Switch
                                id="s4-admin-console"
                                checked={f.value}
                                onCheckedChange={f.onChange}
                                disabled={accessLevel !== "admin"}
                              />
                              <FieldLabel
                                htmlFor="s4-admin-console"
                                className={
                                  accessLevel !== "admin"
                                    ? "font-normal cursor-default opacity-50"
                                    : "font-normal"
                                }
                              >
                                Admin console access
                              </FieldLabel>
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </CardPanelItem>

                    <CardPanelItem>
                      <FieldGroup>
                        <FieldLegend>Security</FieldLegend>
                        <Controller
                          name="mfaEnrollment"
                          control={control}
                          render={({ field: f }) => (
                            <Field
                              orientation="horizontal"
                              className="items-baseline"
                            >
                              <Checkbox
                                id="s4-mfa"
                                checked={f.value}
                                onCheckedChange={f.onChange}
                              />
                              <FieldLabel
                                htmlFor="s4-mfa"
                                className="cursor-pointer font-normal"
                              >
                                Send MFA enrollment email
                              </FieldLabel>
                            </Field>
                          )}
                        />
                        <Controller
                          name="hardwareKey"
                          control={control}
                          render={({ field: f }) => (
                            <Field
                              orientation="horizontal"
                              className="items-baseline"
                            >
                              <Checkbox
                                id="s4-hardware-key"
                                checked={f.value}
                                onCheckedChange={f.onChange}
                              />
                              <FieldLabel
                                htmlFor="s4-hardware-key"
                                className="cursor-pointer font-normal"
                              >
                                Hardware security key required
                              </FieldLabel>
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </CardPanelItem>
                  </CardPanel>

                  <CardFooter>
                    <CardFooterIcon icon={LuShieldCheck} />
                    <span>
                      IT provisioning typically takes 1–2 business days before
                      the start date.
                    </span>
                  </CardFooter>
                </Card>

                <StepperNavigator />
              </MainContent>
            </PageContent>
          </PageWrapper>
        </PageMain>
      </StepperProvider>
    </>
  );
}
