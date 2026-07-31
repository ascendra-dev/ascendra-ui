"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { BackLink, Card, CardFooter, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, CardPanelItem, Checkbox, Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, DatePicker, DateRangePicker, Field, FieldGroup, FieldHint, FieldInfo, FieldLabel, FieldLabelGroup, FieldLegend, FieldSet, Input, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, MainContent, PageContent, PageHeader, PageHeaderGroup, PageMain, PageSubtitle, PageTitle, PageWrapper, RadioGroup, RadioGroupItem, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SimpleAlert, Switch, TableLookup, type TableLookupColumn, UnsavedChangesBar } from "@/ascendra-ui";


// ─── Schema ────────────────────────────────────────────────────────────────────

const schema = z.object({
  transactionDate: z.date({ error: "Transaction date is required" }),
  transactionType: z.string().min(1, "Transaction type is required"),
  fromAccount: z.string().min(1, "From account is required"),
  payee: z.string().min(1, "Payee is required"),
  amount: z.string().min(1, "Amount is required"),
  category: z.string().min(1, "Category is required"),
  reference: z.string(),
  memo: z.string(),
  taxDeductible: z.boolean(),
  frequency: z.string(),
  activePeriod: z
    .object({ from: z.date().optional(), to: z.date().optional() })
    .optional(),
  endCondition: z.string(),
  occurrenceCount: z.string(),
});

type TransactionValues = z.infer<typeof schema>;

// ─── Data ──────────────────────────────────────────────────────────────────────

type Account = { id: string; name: string; number: string; type: string };

const MOCK_ACCOUNTS: Account[] = [
  {
    id: "1",
    name: "Operating Account",
    number: "****1234",
    type: "Checking",
  },
  { id: "2", name: "Payroll Account", number: "****5678", type: "Checking" },
  { id: "3", name: "Savings Reserve", number: "****9012", type: "Savings" },
  { id: "4", name: "Marketing Budget", number: "****3456", type: "Checking" },
];

const ACCOUNT_COLUMNS: TableLookupColumn<Account>[] = [
  { key: "name", label: "Account Name", searchable: true, width: 200 },
  { key: "number", label: "Number", width: 120 },
  { key: "type", label: "Type", width: 100 },
];

function searchAccounts(query: string): Account[] {
  if (!query) return MOCK_ACCOUNTS;
  const q = query.toLowerCase();
  return MOCK_ACCOUNTS.filter(
    (a) => a.name.toLowerCase().includes(q) || a.number.includes(q),
  );
}

const PAYEES = [
  "Adobe Inc.",
  "Amazon Web Services",
  "Atlassian",
  "GitHub",
  "Google Workspace",
  "Notion Labs",
  "Slack Technologies",
  "Stripe Inc.",
  "Zoom Video",
];

const CATEGORIES = [
  { value: "operating-expenses", label: "Operating Expenses" },
  { value: "travel", label: "Travel" },
  { value: "payroll", label: "Payroll" },
  { value: "revenue", label: "Revenue" },
  { value: "cogs", label: "COGS" },
  { value: "other", label: "Other" },
];

const TRANSACTION_TYPES = [
  { value: "debit", label: "Debit" },
  { value: "credit", label: "Credit" },
];

const FREQUENCIES = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
];

const END_CONDITIONS = [
  { value: "never", label: "Never" },
  { value: "on-date", label: "On a specific date" },
  { value: "after-n", label: "After N occurrences" },
];

// ─── Form ──────────────────────────────────────────────────────────────────────

export default function FinancialTransactionForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);

  const {
    control,
    trigger,
    reset,
    getValues,
    formState: { isDirty, isValid, errors },
  } = useForm<TransactionValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      transactionDate: undefined,
      transactionType: "",
      fromAccount: "",
      payee: "",
      amount: "",
      category: "",
      reference: "",
      memo: "",
      taxDeductible: false,
      frequency: "",
      activePeriod: undefined,
      endCondition: "",
      occurrenceCount: "",
    },
    mode: "onTouched",
  });

  const endCondition = useWatch({ control, name: "endCondition" });

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
              <PageTitle>New Transaction</PageTitle>
              <PageSubtitle>
                Record a financial transaction. Posted transactions are
                processed immediately.
              </PageSubtitle>
            </PageHeaderGroup>
          </PageHeader>

          <PageMain>
            <PageWrapper>
              <PageContent>
                <MainContent>
                  <SimpleAlert>
                    <span>
                      Posted transactions <strong>cannot be edited</strong>.
                      Contact your administrator to void or reverse a posted
                      entry.
                    </span>
                  </SimpleAlert>

                  {/* ── Section 1: Transaction Details ────────────────────── */}
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>
                        Transaction Details
                      </CardHeaderTitle>
                      <CardHeaderSubtitle>
                        Enter the core details for this transaction.
                      </CardHeaderSubtitle>
                    </CardHeader>

                    <CardPanel>
                      {/* Panel Item 1 — Core fields (horizontal layout) */}
                      <CardPanelItem>
                        <FieldGroup>
                          <Field
                            orientation="horizontal"
                            className="flex items-baseline"
                          >
                            <FieldLabelGroup className="max-w-60">
                              <FieldLabel htmlFor="transaction-date">
                                Transaction Date
                              </FieldLabel>
                              {/* <FieldInfo>
                                This is field info and this can be very long
                              </FieldInfo> */}
                            </FieldLabelGroup>
                            <div className="flex-1">
                              <Controller
                                name="transactionDate"
                                control={control}
                                render={({ field: f }) => (
                                  <DatePicker
                                    id="transaction-date"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                    placeholder="Pick a date"
                                  />
                                )}
                              />
                              <FieldHint
                                className="mt-2"
                                error={
                                  errors.transactionDate as {
                                    message?: string;
                                  }
                                }
                                mandatory
                                description="This is the description of the field"
                              />
                            </div>
                          </Field>

                          <Field
                            orientation="horizontal"
                            className="items-baseline"
                          >
                            <FieldLabelGroup>
                              <FieldLabel htmlFor="transaction-date">
                                Transaction Type
                              </FieldLabel>
                              <FieldInfo>This is field info </FieldInfo>
                            </FieldLabelGroup>
                            <div className="ml-auto">
                              <Controller
                                name="transactionType"
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
                                    {TRANSACTION_TYPES.map((opt) => (
                                      <Field
                                        key={opt.value}
                                        orientation="horizontal"
                                        className="w-auto items-center"
                                      >
                                        <RadioGroupItem
                                          value={opt.value}
                                          id={`tx-type-${opt.value}`}
                                          className="mb-1"
                                        />
                                        <FieldLabel
                                          htmlFor={`tx-type-${opt.value}`}
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
                                className="mt-2"
                                error={
                                  errors.transactionType as {
                                    message?: string;
                                  }
                                }
                                mandatory
                              />
                            </div>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className=" items-baseline"
                          >
                            <FieldLabelGroup>
                              <FieldLabel htmlFor="transaction-date">
                                Form Account
                              </FieldLabel>
                              <FieldInfo>info this is long info</FieldInfo>
                            </FieldLabelGroup>
                            <div className="flex-1">
                              <Controller
                                name="fromAccount"
                                control={control}
                                render={({ field: f }) => (
                                  <TableLookup<Account>
                                    columns={ACCOUNT_COLUMNS}
                                    valueKey="id"
                                    labelKey="name"
                                    onSearch={searchAccounts}
                                    value={
                                      MOCK_ACCOUNTS.find(
                                        (a) => a.id === f.value,
                                      ) ?? null
                                    }
                                    onChange={(v) =>
                                      f.onChange(v ? (v as Account).id : "")
                                    }
                                    placeholder="Select account…"
                                    title="Select Account"
                                    invalid={!!errors.fromAccount}
                                  />
                                )}
                              />
                              <FieldHint
                                className="mt-2"
                                error={
                                  errors.fromAccount as { message?: string }
                                }
                                mandatory
                              />
                            </div>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="items-baseline"
                          >
                            <FieldLabelGroup>
                              <FieldLabel htmlFor="payee">
                                To Account / Payee
                              </FieldLabel>
                            </FieldLabelGroup>
                            <div className="flex-1">
                              <Controller
                                name="payee"
                                control={control}
                                render={({ field: f }) => (
                                  <Combobox
                                    items={PAYEES}
                                    value={f.value}
                                    onValueChange={(v) => f.onChange(v)}
                                  >
                                    <ComboboxInput
                                      id="payee"
                                      placeholder="Search payee…"
                                      onBlur={f.onBlur}
                                      className="w-full"
                                      aria-invalid={!!errors.payee}
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
                                className="mt-2"
                                error={errors.payee as { message?: string }}
                                mandatory
                              />
                            </div>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="items-baseline"
                          >
                            <FieldLabelGroup>
                              <FieldLabel htmlFor="amount">Amount</FieldLabel>
                            </FieldLabelGroup>
                            <div className="ml-auto">
                              <Controller
                                name="amount"
                                control={control}
                                render={({ field: f }) => (
                                  <InputGroup className="max-w-60 ml-auto">
                                    <InputGroupAddon align="inline-start">
                                      <InputGroupText>USD</InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput
                                      id="amount"
                                      type="number"
                                      placeholder="0.00"
                                      value={f.value}
                                      onChange={f.onChange}
                                      onBlur={f.onBlur}
                                      aria-invalid={
                                        !!errors.amount || undefined
                                      }
                                    />
                                  </InputGroup>
                                )}
                              />
                              <FieldHint
                                className="mt-2"
                                error={errors.amount as { message?: string }}
                                mandatory
                              />
                            </div>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="items-baseline"
                          >
                            <FieldLabelGroup>
                              <FieldLabel htmlFor="category">
                                Category
                              </FieldLabel>
                            </FieldLabelGroup>
                            <div className="flex-1">
                              <Controller
                                name="category"
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
                                      id="category"
                                      className="w-full"
                                      aria-invalid={
                                        !!errors.category || undefined
                                      }
                                    >
                                      <SelectValue placeholder="Select category…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {CATEGORIES.map((c) => (
                                          <SelectItem
                                            key={c.value}
                                            value={c.value}
                                          >
                                            {c.label}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <FieldHint
                                className="mt-2"
                                error={errors.category as { message?: string }}
                                mandatory
                              />
                            </div>
                          </Field>
                        </FieldGroup>
                      </CardPanelItem>

                      {/* Panel Item 2 — Supporting details */}
                      <CardPanelItem>
                        <FieldGroup>
                          <Field
                            orientation="horizontal"
                            className="items-baseline"
                          >
                            <FieldLabelGroup>
                              <FieldLabel htmlFor="reference">
                                Reference Number
                              </FieldLabel>
                            </FieldLabelGroup>
                            <div className="flex-1">
                              <Controller
                                name="reference"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="reference"
                                    full
                                    placeholder="Invoice #, PO #…"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                  />
                                )}
                              />
                              <FieldHint optional className="mt-2" />
                            </div>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="items-baseline"
                          >
                            <FieldLabelGroup>
                              <FieldLabel htmlFor="memo">
                                Memo / Description
                              </FieldLabel>
                            </FieldLabelGroup>
                            <div className="flex-1">
                              <Controller
                                name="memo"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="memo"
                                    full
                                    placeholder="Brief description…"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                  />
                                )}
                              />
                              <FieldHint optional className="mt-2" />
                            </div>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="items-baseline"
                          >
                            <FieldLabelGroup>
                              <FieldLabel htmlFor="tax-deductible">
                                Tax Deductible
                              </FieldLabel>
                            </FieldLabelGroup>
                            <div className="ml-auto">
                              <Controller
                                name="taxDeductible"
                                control={control}
                                render={({ field: f }) => (
                                  <Field
                                    orientation="horizontal"
                                    className="items-baseline w-auto"
                                  >
                                    <Checkbox
                                      id="tax-deductible"
                                      checked={f.value}
                                      onCheckedChange={f.onChange}
                                      onBlur={f.onBlur}
                                    />
                                    <FieldLabel
                                      htmlFor="tax-deductible"
                                      className="cursor-pointer font-normal"
                                    >
                                      Mark as tax deductible
                                    </FieldLabel>
                                  </Field>
                                )}
                              />
                            </div>
                          </Field>
                        </FieldGroup>
                      </CardPanelItem>
                    </CardPanel>

                    <CardFooter>
                      All amounts in USD. Currency conversion is not supported
                      in this view.
                    </CardFooter>
                  </Card>

                  {/* ── Section 2: Recurring Schedule (collapsible) ────────── */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={isRecurring}
                          onCheckedChange={setIsRecurring}
                        />
                        <CardHeaderTitle>
                          Set as recurring
                        </CardHeaderTitle>
                      </div>
                      <CardHeaderSubtitle className="ml-8">
                        Automatically repeat this transaction on a schedule.
                      </CardHeaderSubtitle>
                    </CardHeader>

                    <CardPanel collapsed={!isRecurring}>
                      {/* Panel Item 1 — Frequency */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldLegend variant="label">Frequency</FieldLegend>
                          <Controller
                            name="frequency"
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
                                className="grid-cols-2 gap-y-1.5"
                              >
                                {FREQUENCIES.map((opt) => (
                                  <Field
                                    key={opt.value}
                                    orientation="horizontal"
                                    className="items-center"
                                  >
                                    <RadioGroupItem
                                      value={opt.value}
                                      id={`freq-${opt.value}`}
                                      className="mb-1"
                                    />
                                    <FieldLabel
                                      htmlFor={`freq-${opt.value}`}
                                      className="cursor-pointer font-normal"
                                    >
                                      {opt.label}
                                    </FieldLabel>
                                  </Field>
                                ))}
                              </RadioGroup>
                            )}
                          />
                          <FieldHint />
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 2 — Date range */}
                      <CardPanelItem>
                        <Field>
                          <FieldLabel htmlFor="active-period">
                            Active Period
                          </FieldLabel>
                          <Controller
                            name="activePeriod"
                            control={control}
                            render={({ field: f }) => (
                              <DateRangePicker
                                id="active-period"
                                value={f.value as DateRange | undefined}
                                onChange={f.onChange}
                                onBlur={f.onBlur}
                                placeholder="Select date range…"
                                readOnly
                              />
                            )}
                          />
                          <FieldHint />
                        </Field>
                      </CardPanelItem>

                      {/* Panel Item 3 — End condition */}
                      <CardPanelItem>
                        <FieldGroup>
                          <FieldSet>
                            <FieldLegend variant="label">
                              End Condition
                            </FieldLegend>
                            <Controller
                              name="endCondition"
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
                                  className="flex flex-col gap-y-1.5"
                                >
                                  {END_CONDITIONS.map((opt) => (
                                    <Field
                                      key={opt.value}
                                      orientation="horizontal"
                                      className="items-center"
                                    >
                                      <RadioGroupItem
                                        value={opt.value}
                                        id={`end-${opt.value}`}
                                        className="mb-1"
                                      />
                                      <FieldLabel
                                        htmlFor={`end-${opt.value}`}
                                        className="cursor-pointer font-normal"
                                      >
                                        {opt.label}
                                      </FieldLabel>
                                    </Field>
                                  ))}
                                </RadioGroup>
                              )}
                            />
                            <FieldHint />
                          </FieldSet>

                          {endCondition === "after-n" && (
                            <Field>
                              <FieldLabel htmlFor="occurrence-count">
                                Number of Occurrences
                              </FieldLabel>
                              <Controller
                                name="occurrenceCount"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="occurrence-count"
                                    type="number"
                                    placeholder="e.g. 12"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                    className="w-36"
                                  />
                                )}
                              />
                              <FieldHint />
                            </Field>
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
