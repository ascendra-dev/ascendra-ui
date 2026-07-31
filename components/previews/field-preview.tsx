"use client";

import { useState } from "react";
import { type DateRange } from "react-day-picker";

import { ComponentPreview } from "../component-preview";
import { PropsTable } from "../props-table";
import { SectionHeader } from "../section-header";

import { Button, Checkbox, Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, DatePicker, DateRangePicker, Field, FieldContent, FieldDescription, FieldGroup, FieldHint, FieldInfo, FieldLabel, FieldLabelGroup, FieldLegend, FieldSeparator, FieldSet, FieldTitle, Input, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea, RadioGroup, RadioGroupItem, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Switch } from "@/ascendra-ui";


import { registry } from "@/lib/registry";
import { LuGlobe } from "react-icons/lu";

const meta = registry["field"];

const countries = [
  "Pakistan",
  "United Kingdom",
  "United States",
  "Germany",
  "France",
];

// ─── Doc content ──────────────────────────────────────────────────────────────

export function FieldDocContent() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [comboValue, setComboValue] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <ComponentPreview
        align="start"
        code={`import {
  Field, FieldLabel, FieldLabelGroup, FieldInfo, FieldHint,
} from "@/ascendra-ui";

// Simple — label only
<Field>
  <FieldLabel htmlFor="email">Email address</FieldLabel>
  <Input id="email" placeholder="you@example.com" full />
  <FieldHint description="We will never share your email." optional />
</Field>

// With label info
<Field>
  <FieldLabelGroup>
    <FieldLabel htmlFor="company">Company</FieldLabel>
    <FieldInfo>Shown on invoices and receipts</FieldInfo>
  </FieldLabelGroup>
  <Input id="company" placeholder="Acme Inc." full />
  <FieldHint mandatory />
</Field>`}
      >
        <div className="w-72 space-y-5">
          <Field>
            <FieldLabel htmlFor="hero-email">Email address</FieldLabel>
            <Input id="hero-email" placeholder="you@example.com" full />
            <FieldHint description="We will never share your email." optional />
          </Field>
          <Field>
            <FieldLabelGroup>
              <FieldLabel htmlFor="hero-company">Company</FieldLabel>
              <FieldInfo>Shown on invoices and receipts</FieldInfo>
            </FieldLabelGroup>
            <Input id="hero-company" placeholder="Acme Inc." full />
            <FieldHint mandatory />
          </Field>
        </div>
      </ComponentPreview>

      {/* ── Label ────────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <SectionHeader>Label</SectionHeader>

        {/* FieldLabel */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">FieldLabel</h3>
          <p className="text-xs text-muted-foreground">
            Associates a label with a control via{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              htmlFor
            </code>
            . Inherits disabled / invalid tinting from the parent{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Field
            </code>
            .
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel htmlFor="username">Username</FieldLabel>
  <Input id="username" placeholder="acme" full />
  <FieldHint />
</Field>`}
          >
            <div className="w-64">
              <Field>
                <FieldLabel htmlFor="lv-username">Username</FieldLabel>
                <Input id="lv-username" placeholder="acme" full />
                <FieldHint />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* FieldLabelGroup + FieldInfo */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            FieldLabelGroup + FieldInfo
          </h3>
          <p className="text-xs text-muted-foreground">
            Wrap{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldLabel
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldInfo
            </code>{" "}
            in a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldLabelGroup
            </code>{" "}
            to add a secondary description line directly beneath the label —
            before the control.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabelGroup>
    <FieldLabel htmlFor="subdomain">Subdomain</FieldLabel>
    <FieldInfo>Changing this will break existing links</FieldInfo>
  </FieldLabelGroup>
  <Input id="subdomain" placeholder="acme" full />
  <FieldHint description="Must be lowercase, letters and hyphens only." />
</Field>`}
          >
            <div className="w-72">
              <Field>
                <FieldLabelGroup>
                  <FieldLabel htmlFor="lv-subdomain">Subdomain</FieldLabel>
                  <FieldInfo>Changing this will break existing links</FieldInfo>
                </FieldLabelGroup>
                <Input id="lv-subdomain" placeholder="acme" full />
                <FieldHint description="Must be lowercase, letters and hyphens only." />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* FieldDescription */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            FieldDescription
          </h3>
          <p className="text-xs text-muted-foreground">
            A lightweight helper text component that can be placed anywhere
            inside{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Field
            </code>{" "}
            — before or after the control — or directly after a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldLegend
            </code>
            . Unlike{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldHint
            </code>
            , it carries no badge row and is purely presentational.
          </p>
          <ComponentPreview
            align="start"
            code={`// Description after the control
<Field>
  <FieldLabel htmlFor="username">Username</FieldLabel>
  <Input id="username" placeholder="max_leiter" full />
  <FieldDescription>
    Choose a unique username for your account.
  </FieldDescription>
</Field>

// Description before the control
<Field>
  <FieldLabel htmlFor="password">Password</FieldLabel>
  <FieldDescription>Must be at least 8 characters long.</FieldDescription>
  <Input id="password" type="password" placeholder="••••••••" full />
</Field>`}
          >
            <div className="w-72 space-y-5">
              <Field>
                <FieldLabel htmlFor="fd-username">Username</FieldLabel>
                <Input id="fd-username" placeholder="max_leiter" full />
                <FieldDescription>
                  Choose a unique username for your account.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="fd-password">Password</FieldLabel>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                <Input
                  id="fd-password"
                  type="password"
                  placeholder="••••••••"
                  full
                />
              </Field>
            </div>
          </ComponentPreview>
        </div>
      </div>

      {/* ── FieldHint ────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <SectionHeader>FieldHint</SectionHeader>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Description</h3>
          <p className="text-xs text-muted-foreground">
            Pass a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              description
            </code>{" "}
            string for helper text below the control.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel htmlFor="pw">Password</FieldLabel>
  <Input id="pw" type="password" placeholder="••••••••" full />
  <FieldHint description="Must be at least 8 characters." />
</Field>`}
          >
            <div className="w-64">
              <Field>
                <FieldLabel htmlFor="fh-pw">Password</FieldLabel>
                <Input id="fh-pw" type="password" placeholder="••••••••" full />
                <FieldHint description="Must be at least 8 characters." />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* Error */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Error</h3>
          <p className="text-xs text-muted-foreground">
            Pass an{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              error
            </code>{" "}
            object to replace the description with a destructive message. Pair
            with{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              aria-invalid
            </code>{" "}
            on the control.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel htmlFor="email-err">Email</FieldLabel>
  <Input
    id="email-err"
    aria-invalid={true}
    defaultValue="invalid@"
    full
  />
  <FieldHint error={{ message: "Enter a valid email address." }} />
</Field>`}
          >
            <div className="w-64">
              <Field>
                <FieldLabel htmlFor="fh-email-err">Email</FieldLabel>
                <Input
                  id="fh-email-err"
                  aria-invalid={true}
                  defaultValue="invalid@"
                  full
                />
                <FieldHint
                  error={{ message: "Enter a valid email address." }}
                />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* Mandatory & Optional */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Mandatory &amp; Optional badges
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              mandatory
            </code>{" "}
            or{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              optional
            </code>{" "}
            to show a badge aligned to the trailing edge of the hint row. They
            can combine with a description or error.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel htmlFor="fullname">Full name</FieldLabel>
  <Input id="fullname" placeholder="Jane Doe" full />
  <FieldHint description="As it appears on your ID." mandatory />
</Field>

<Field>
  <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
  <Input id="nickname" placeholder="ace" full />
  <FieldHint optional />
</Field>`}
          >
            <div className="w-72 space-y-5">
              <Field>
                <FieldLabel htmlFor="fh-fullname">Full name</FieldLabel>
                <Input id="fh-fullname" placeholder="Jane Doe" full />
                <FieldHint description="As it appears on your ID." mandatory />
              </Field>
              <Field>
                <FieldLabel htmlFor="fh-nickname">Nickname</FieldLabel>
                <Input id="fh-nickname" placeholder="ace" full />
                <FieldHint optional />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* Help tooltip */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Help tooltip</h3>
          <p className="text-xs text-muted-foreground">
            Pass a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              help
            </code>{" "}
            string to render a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">?</code>{" "}
            badge that reveals extended guidance in a tooltip. Combine with{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              description
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              mandatory
            </code>
            , or{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              optional
            </code>{" "}
            — the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">?</code>{" "}
            badge always appears last in the badge row.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel htmlFor="workspace">Workspace name</FieldLabel>
  <Input id="workspace" placeholder="acme" full />
  <FieldHint
    description="Shown in all notifications and shared links."
    mandatory
    help="Pick something short and memorable. You can change it later in workspace settings."
  />
</Field>`}
          >
            <div className="w-72">
              <Field>
                <FieldLabel htmlFor="fh-workspace">Workspace name</FieldLabel>
                <Input id="fh-workspace" placeholder="acme" full />
                <FieldHint
                  description="Shown in all notifications and shared links."
                  mandatory
                  help="Pick something short and memorable. You can change it later in workspace settings."
                />
              </Field>
            </div>
          </ComponentPreview>
        </div>
      </div>

      {/* ── Forms & Input ────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <SectionHeader>Forms &amp; Input</SectionHeader>

        {/* Input */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Input</h3>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel htmlFor="city">City</FieldLabel>
  <Input id="city" placeholder="Karachi" full />
  <FieldHint mandatory />
</Field>`}
          >
            <div className="w-64">
              <Field>
                <FieldLabel htmlFor="ctrl-city">City</FieldLabel>
                <Input id="ctrl-city" placeholder="Karachi" full />
                <FieldHint mandatory />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* InputGroup */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">InputGroup</h3>
          <p className="text-xs text-muted-foreground">
            Wrap{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              InputGroupInput
            </code>{" "}
            in an{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              InputGroup
            </code>{" "}
            as the control inside{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Field
            </code>
            .
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel htmlFor="website">Website</FieldLabel>
  <InputGroup>
    <InputGroupAddon align="inline-start">
      <LuGlobe className="size-4" />
      <InputGroupText>https://</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput id="website" placeholder="example.com" />
  </InputGroup>
  <FieldHint description="Include the full URL." optional />
</Field>`}
          >
            <div className="w-72">
              <Field>
                <FieldLabel htmlFor="ctrl-website">Website</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <LuGlobe className="size-4" />
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="ctrl-website"
                    placeholder="example.com"
                  />
                </InputGroup>
                <FieldHint description="Include the full URL." optional />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* InputGroup Textarea */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            InputGroup Textarea
          </h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              InputGroupTextarea
            </code>{" "}
            inside an{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              InputGroup
            </code>{" "}
            for styling consistent with other InputGroup controls.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabelGroup>
    <FieldLabel htmlFor="notes">Notes</FieldLabel>
    <FieldInfo>Visible to client on the invoice</FieldInfo>
  </FieldLabelGroup>
  <InputGroup>
    <InputGroupTextarea id="notes" placeholder="Add a note..." rows={3} maxLength={450} />
  </InputGroup>
  <FieldHint optional />
</Field>`}
          >
            <div className="w-72">
              <Field>
                <FieldLabelGroup>
                  <FieldLabel htmlFor="ctrl-notes">Notes</FieldLabel>
                  <FieldInfo>Visible to client on the invoice</FieldInfo>
                </FieldLabelGroup>
                <InputGroup>
                  <InputGroupTextarea
                    id="ctrl-notes"
                    placeholder="Add a note..."
                    rows={3}
                    maxLength={450}
                  />
                </InputGroup>
                <FieldHint optional />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* Textarea standalone */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Textarea</h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              InputGroupTextarea
            </code>{" "}
            inside an{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              InputGroup
            </code>{" "}
            for consistent styling. Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              maxLength
            </code>{" "}
            to show a live character counter.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel htmlFor="comments">Comments</FieldLabel>
  <InputGroup>
    <InputGroupTextarea
      id="comments"
      placeholder="Add any additional comments"
      rows={3}
      maxLength={300}
    />
  </InputGroup>
  <FieldHint optional />
</Field>`}
          >
            <div className="w-72">
              <Field>
                <FieldLabel htmlFor="ctrl-comments">Comments</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id="ctrl-comments"
                    placeholder="Add any additional comments"
                    rows={3}
                    maxLength={300}
                  />
                </InputGroup>
                <FieldHint optional />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* Select */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Select</h3>
          <p className="text-xs text-muted-foreground">
            Wrap options in a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              SelectGroup
            </code>{" "}
            for proper ARIA grouping. Add multiple{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              SelectGroup
            </code>{" "}
            blocks with a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              SelectLabel
            </code>{" "}
            each to segment a long list.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel htmlFor="status">Status</FieldLabel>
  <Select>
    <SelectTrigger id="status">
      <SelectValue placeholder="Select status" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  <FieldHint mandatory />
</Field>`}
          >
            <div className="w-64">
              <Field>
                <FieldLabel htmlFor="ctrl-status">Status</FieldLabel>
                <Select>
                  <SelectTrigger id="ctrl-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldHint mandatory />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* Combobox */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Combobox</h3>
          <ComponentPreview
            align="start"
            code={`const [country, setCountry] = useState<string | null>(null);

<Field>
  <FieldLabelGroup>
    <FieldLabel htmlFor="country">Country</FieldLabel>
    <FieldInfo>Used for tax and compliance rules</FieldInfo>
  </FieldLabelGroup>
  <Combobox
    items={countries}
    value={country}
    onValueChange={(v) => setCountry(v as string)}
  >
    <ComboboxInput id="country" placeholder="Search country..." />
    <ComboboxContent>
      <ComboboxList>
        <ComboboxEmpty>No results.</ComboboxEmpty>
        <ComboboxCollection>
          {(c: string) => <ComboboxItem key={c} value={c}>{c}</ComboboxItem>}
        </ComboboxCollection>
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
  <FieldHint mandatory />
</Field>`}
          >
            <div className="w-64">
              <Field>
                <FieldLabelGroup>
                  <FieldLabel htmlFor="ctrl-country">Country</FieldLabel>
                  <FieldInfo>Used for tax and compliance rules</FieldInfo>
                </FieldLabelGroup>
                <Combobox
                  items={countries}
                  value={comboValue}
                  onValueChange={(v) => setComboValue(v as string)}
                >
                  <ComboboxInput
                    id="ctrl-country"
                    placeholder="Search country..."
                  />
                  <ComboboxContent>
                    <ComboboxList>
                      <ComboboxEmpty>No results.</ComboboxEmpty>
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
                <FieldHint mandatory />
              </Field>
            </div>
          </ComponentPreview>
        </div>
      </div>

      {/* ── Choice Controls ──────────────────────────────────────────────── */}
      <div className="space-y-8">
        <SectionHeader>Choice Controls</SectionHeader>

        {/* Checkbox */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Checkbox</h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              orientation=&quot;horizontal&quot;
            </code>{" "}
            so the checkbox and label sit side by side.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field orientation="horizontal">
  <Checkbox id="terms" />
  <FieldLabel htmlFor="terms">
    I agree to the Terms &amp; Conditions
  </FieldLabel>
</Field>

<Field orientation="horizontal">
  <Checkbox id="marketing" defaultChecked />
  <FieldLabel htmlFor="marketing">Receive marketing emails</FieldLabel>
</Field>`}
          >
            <div className="w-72 space-y-3">
              <Field orientation="horizontal" className="items-baseline">
                <Checkbox id="ctrl-terms" />
                <FieldLabel htmlFor="ctrl-terms">
                  I agree to the Terms &amp; Conditions
                </FieldLabel>
              </Field>
              <Field orientation="horizontal" className="items-baseline">
                <Checkbox id="ctrl-marketing" defaultChecked />
                <FieldLabel htmlFor="ctrl-marketing">
                  Receive marketing emails
                </FieldLabel>
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* FieldContent + FieldTitle */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">FieldContent</h3>
          <p className="text-xs text-muted-foreground">
            Wrap a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldLabel
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldDescription
            </code>{" "}
            inside{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldContent
            </code>{" "}
            to give a horizontal{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Field
            </code>{" "}
            a rich multi-line label block alongside a checkbox or radio.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field orientation="horizontal">
  <Checkbox id="sync-docs" defaultChecked />
  <FieldContent>
    <FieldLabel htmlFor="sync-docs">
      Sync Desktop &amp; Documents folders
    </FieldLabel>
    <FieldDescription>
      Your Desktop &amp; Documents folders are being synced with iCloud Drive.
      You can access them from other devices.
    </FieldDescription>
  </FieldContent>
</Field>`}
          >
            <div className="w-80">
              <Field orientation="horizontal">
                <Checkbox id="ctrl-sync-docs" defaultChecked />
                <FieldContent>
                  <FieldLabel htmlFor="ctrl-sync-docs">
                    Sync Desktop &amp; Documents folders
                  </FieldLabel>
                  <FieldDescription>
                    Your Desktop &amp; Documents folders are being synced with
                    iCloud Drive. You can access them from other devices.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* FieldTitle */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">FieldTitle</h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldTitle
            </code>{" "}
            inside{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldContent
            </code>{" "}
            when the label itself should not be a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              &lt;label&gt;
            </code>{" "}
            element — for example, when a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldLabel
            </code>{" "}
            wraps the entire card-style radio option.
          </p>
          <ComponentPreview
            align="start"
            code={`<RadioGroup defaultValue="kubernetes">
  <FieldLabel htmlFor="kubernetes">
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>Kubernetes</FieldTitle>
        <FieldDescription>
          Run GPU workloads on a K8s cluster.
        </FieldDescription>
      </FieldContent>
      <RadioGroupItem value="kubernetes" id="kubernetes" />
    </Field>
  </FieldLabel>
  <FieldLabel htmlFor="vm">
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>Virtual Machine</FieldTitle>
        <FieldDescription>
          Access a cluster to run GPU workloads.
        </FieldDescription>
      </FieldContent>
      <RadioGroupItem value="vm" id="vm" />
    </Field>
  </FieldLabel>
</RadioGroup>`}
          >
            <div className="w-80">
              <RadioGroup defaultValue="kubernetes">
                <FieldLabel htmlFor="ctrl-kubernetes">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Kubernetes</FieldTitle>
                      <FieldDescription>
                        Run GPU workloads on a K8s cluster.
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="kubernetes" id="ctrl-kubernetes" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="ctrl-vm">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Virtual Machine</FieldTitle>
                      <FieldDescription>
                        Access a cluster to run GPU workloads.
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="vm" id="ctrl-vm" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            </div>
          </ComponentPreview>
        </div>

        {/* RadioGroup */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">RadioGroup</h3>
          <p className="text-xs text-muted-foreground">
            Wrap radio items in a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldSet
            </code>{" "}
            +{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldLegend
            </code>{" "}
            for proper accessibility grouping.
          </p>
          <ComponentPreview
            align="start"
            code={`<FieldSet>
  <FieldLegend>Billing cycle</FieldLegend>
  <RadioGroup defaultValue="monthly">
    <Field orientation="horizontal">
      <RadioGroupItem id="monthly" value="monthly" className="mb-1" />
      <FieldLabel htmlFor="monthly">Monthly</FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem id="yearly" value="yearly" className="mb-1" />
      <FieldLabel htmlFor="yearly">Yearly</FieldLabel>
    </Field>
  </RadioGroup>
  <FieldHint description="Yearly billing saves 20%." />
</FieldSet>`}
          >
            <div className="w-56">
              <FieldSet>
                <FieldLegend>Billing cycle</FieldLegend>
                <RadioGroup defaultValue="monthly">
                  <Field orientation="horizontal" className="items-baseline">
                    <RadioGroupItem
                      id="ctrl-monthly"
                      value="monthly"
                      className="mb-1"
                    />
                    <FieldLabel htmlFor="ctrl-monthly">Monthly</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem
                      id="ctrl-yearly"
                      value="yearly"
                      className="mb-1"
                    />
                    <FieldLabel htmlFor="ctrl-yearly">Yearly</FieldLabel>
                  </Field>
                </RadioGroup>
                <FieldHint description="Yearly billing saves 20%." />
              </FieldSet>
            </div>
          </ComponentPreview>
        </div>

        {/* Switch */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Switch</h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              orientation=&quot;horizontal&quot;
            </code>{" "}
            and swap label order so the switch sits on the trailing edge.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field orientation="horizontal">
  <FieldLabel htmlFor="notifs">Email notifications</FieldLabel>
  <Switch id="notifs" defaultChecked />
</Field>

<Field orientation="horizontal">
  <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
  <Switch id="2fa" />
</Field>`}
          >
            <div className="w-64 space-y-3">
              <Field orientation="horizontal" className="items-baseline">
                <FieldLabel htmlFor="ctrl-notifs">
                  Email notifications
                </FieldLabel>
                <Switch id="ctrl-notifs" defaultChecked />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="ctrl-2fa">
                  Multi-factor authentication
                </FieldLabel>
                <Switch id="ctrl-2fa" />
              </Field>
            </div>
          </ComponentPreview>
        </div>
      </div>

      {/* ── Date & Time ──────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <SectionHeader>Date &amp; Time</SectionHeader>

        {/* DatePicker */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">DatePicker</h3>
          <ComponentPreview
            align="start"
            code={`const [dob, setDob] = useState<Date | undefined>(undefined);

<Field>
  <FieldLabel htmlFor="dob">Date of birth</FieldLabel>
  <DatePicker
    value={dob}
    onChange={setDob}
    fromYear={1950}
    toYear={2010}
  />
  <FieldHint mandatory />
</Field>`}
          >
            <div className="w-64">
              <Field>
                <FieldLabel htmlFor="ctrl-dob">Date of birth</FieldLabel>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  fromYear={1950}
                  toYear={2010}
                />
                <FieldHint mandatory />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        {/* DateRangePicker */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            DateRangePicker
          </h3>
          <ComponentPreview
            align="start"
            code={`const [range, setRange] = useState<DateRange | undefined>(undefined);

<Field>
  <FieldLabelGroup>
    <FieldLabel htmlFor="period">Reporting period</FieldLabel>
    <FieldInfo>Inclusive of start and end dates</FieldInfo>
  </FieldLabelGroup>
  <DateRangePicker value={range} onChange={setRange} />
  <FieldHint description="Select up to 90 days." optional />
</Field>`}
          >
            <div className="w-72">
              <Field>
                <FieldLabelGroup>
                  <FieldLabel htmlFor="ctrl-period">
                    Reporting period
                  </FieldLabel>
                  <FieldInfo>Inclusive of start and end dates</FieldInfo>
                </FieldLabelGroup>
                <DateRangePicker value={range} onChange={setRange} />
                <FieldHint description="Select up to 90 days." optional />
              </Field>
            </div>
          </ComponentPreview>
        </div>
      </div>

      {/* ── Grouping ─────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <SectionHeader>Grouping</SectionHeader>

        {/* FieldGroup */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">FieldGroup</h3>
          <p className="text-xs text-muted-foreground">
            Stack multiple fields with consistent vertical spacing. Each field
            gets its own{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldHint
            </code>{" "}
            row.
          </p>
          <ComponentPreview
            align="start"
            code={`<FieldGroup>
  <Field>
    <FieldLabel htmlFor="first">First name</FieldLabel>
    <Input id="first" placeholder="Jane" full />
    <FieldHint mandatory />
  </Field>
  <Field>
    <FieldLabel htmlFor="last">Last name</FieldLabel>
    <Input id="last" placeholder="Doe" full />
    <FieldHint mandatory />
  </Field>
  <Field>
    <FieldLabel htmlFor="email-group">Email</FieldLabel>
    <Input id="email-group" type="email" placeholder="you@example.com" full />
    <FieldHint optional />
  </Field>
</FieldGroup>`}
          >
            <div className="w-72">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="grp-first">First name</FieldLabel>
                  <Input id="grp-first" placeholder="Jane" full />
                  <FieldHint mandatory />
                </Field>
                <Field>
                  <FieldLabel htmlFor="grp-last">Last name</FieldLabel>
                  <Input id="grp-last" placeholder="Doe" full />
                  <FieldHint mandatory />
                </Field>
                <Field>
                  <FieldLabel htmlFor="grp-email">Email</FieldLabel>
                  <Input
                    id="grp-email"
                    type="email"
                    placeholder="you@example.com"
                    full
                  />
                  <FieldHint optional />
                </Field>
              </FieldGroup>
            </div>
          </ComponentPreview>
        </div>

        {/* FieldSet + FieldLegend */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            FieldSet + FieldLegend
          </h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldSet
            </code>{" "}
            with a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldLegend
            </code>{" "}
            to semantically group related fields. Add a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldDescription
            </code>{" "}
            immediately after the legend for group-level help text. Place a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldSeparator
            </code>{" "}
            between distinct sub-groups.
          </p>
          <ComponentPreview
            align="start"
            code={`<FieldSet>
  <FieldLegend>Billing address</FieldLegend>
  <FieldDescription>
    Enter the address associated with your payment method.
  </FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="addr-line1">Address line 1</FieldLabel>
      <Input id="addr-line1" placeholder="123 Main St" full />
      <FieldHint mandatory />
    </Field>
    <Field>
      <FieldLabel htmlFor="addr-line2">Address line 2</FieldLabel>
      <Input id="addr-line2" placeholder="Suite 4B" full />
      <FieldHint optional />
    </Field>
    <FieldSeparator />
    <Field>
      <FieldLabel htmlFor="addr-city">City</FieldLabel>
      <Input id="addr-city" placeholder="Karachi" full />
      <FieldHint mandatory />
    </Field>
    <Field>
      <FieldLabel htmlFor="addr-zip">Postal code</FieldLabel>
      <Input id="addr-zip" placeholder="75500" full />
      <FieldHint mandatory />
    </Field>
  </FieldGroup>
</FieldSet>`}
          >
            <div className="w-72">
              <FieldSet>
                <FieldLegend>Billing address</FieldLegend>
                <FieldDescription>
                  Enter the address associated with your payment method.
                </FieldDescription>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="fs-line1">Address line 1</FieldLabel>
                    <Input id="fs-line1" placeholder="123 Main St" full />
                    <FieldHint mandatory />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="fs-line2">Address line 2</FieldLabel>
                    <Input id="fs-line2" placeholder="Suite 4B" full />
                    <FieldHint optional />
                  </Field>
                  <FieldSeparator />
                  <Field>
                    <FieldLabel htmlFor="fs-city">City</FieldLabel>
                    <Input id="fs-city" placeholder="Karachi" full />
                    <FieldHint mandatory />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="fs-zip">Postal code</FieldLabel>
                    <Input id="fs-zip" placeholder="75500" full />
                    <FieldHint mandatory />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
          </ComponentPreview>
        </div>

        {/* FieldLegend variant="label" */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            FieldLegend — label variant
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              variant=&quot;label&quot;
            </code>{" "}
            to render the legend at the same size as a field label. Useful for
            inline checkbox or radio groups that feel like a single preference
            rather than a top-level form section.
          </p>
          <ComponentPreview
            align="start"
            code={`<FieldSet>
  <FieldLegend variant="label">Subscription Plan</FieldLegend>
  <FieldDescription>
    Yearly and lifetime plans offer significant savings.
  </FieldDescription>
  <RadioGroup defaultValue="monthly">
    <Field orientation="horizontal">
      <RadioGroupItem value="monthly" id="plan-monthly" />
      <FieldLabel htmlFor="plan-monthly" className="font-normal">
        Monthly ($9.99/month)
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem value="yearly" id="plan-yearly" />
      <FieldLabel htmlFor="plan-yearly" className="font-normal">
        Yearly ($99.99/year)
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem value="lifetime" id="plan-lifetime" />
      <FieldLabel htmlFor="plan-lifetime" className="font-normal">
        Lifetime ($299.99)
      </FieldLabel>
    </Field>
  </RadioGroup>
</FieldSet>`}
          >
            <div className="w-64">
              <FieldSet>
                <FieldLegend variant="label">Subscription Plan</FieldLegend>
                <FieldDescription>
                  Yearly and lifetime plans offer significant savings.
                </FieldDescription>
                <RadioGroup defaultValue="monthly">
                  <Field orientation="horizontal">
                    <RadioGroupItem value="monthly" id="grp-plan-monthly" />
                    <FieldLabel
                      htmlFor="grp-plan-monthly"
                      className="font-normal"
                    >
                      Monthly ($9.99/month)
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem value="yearly" id="grp-plan-yearly" />
                    <FieldLabel
                      htmlFor="grp-plan-yearly"
                      className="font-normal"
                    >
                      Yearly ($99.99/year)
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem value="lifetime" id="grp-plan-lifetime" />
                    <FieldLabel
                      htmlFor="grp-plan-lifetime"
                      className="font-normal"
                    >
                      Lifetime ($299.99)
                    </FieldLabel>
                  </Field>
                </RadioGroup>
              </FieldSet>
            </div>
          </ComponentPreview>
        </div>

        {/* Multiple FieldSets + FieldSeparator */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Multiple FieldSets + FieldSeparator
          </h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldSeparator
            </code>{" "}
            between{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldSet
            </code>{" "}
            blocks inside a top-level{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldGroup
            </code>{" "}
            to divide a long form into clearly bounded sections without
            additional visual chrome.
          </p>
          <ComponentPreview
            align="start"
            code={`<FieldGroup>
  <FieldSet>
    <FieldLegend>Personal details</FieldLegend>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="full-name">Full name</FieldLabel>
        <Input id="full-name" placeholder="Jane Doe" full />
        <FieldHint mandatory />
      </Field>
      <Field>
        <FieldLabel htmlFor="email-details">Email</FieldLabel>
        <Input id="email-details" type="email" placeholder="you@example.com" full />
        <FieldHint mandatory />
      </Field>
    </FieldGroup>
  </FieldSet>
  <FieldSeparator />
  <FieldSet>
    <FieldLegend>Preferences</FieldLegend>
    <Field orientation="horizontal">
      <Checkbox id="newsletter" />
      <FieldLabel htmlFor="newsletter">Subscribe to newsletter</FieldLabel>
    </Field>
  </FieldSet>
</FieldGroup>`}
          >
            <div className="w-72">
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Personal details</FieldLegend>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="ms-full-name">Full name</FieldLabel>
                      <Input id="ms-full-name" placeholder="Jane Doe" full />
                      <FieldHint mandatory />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="ms-email">Email</FieldLabel>
                      <Input
                        id="ms-email"
                        type="email"
                        placeholder="you@example.com"
                        full
                      />
                      <FieldHint mandatory />
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <FieldSeparator />
                <FieldSet>
                  <FieldLegend>Preferences</FieldLegend>
                  <Field orientation="horizontal" className="items-baseline">
                    <Checkbox id="ms-newsletter" />
                    <FieldLabel htmlFor="ms-newsletter">
                      Subscribe to newsletter
                    </FieldLabel>
                  </Field>
                </FieldSet>
              </FieldGroup>
            </div>
          </ComponentPreview>
        </div>
      </div>

      {/* ── Patterns ─────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <SectionHeader>Patterns</SectionHeader>

        {/* Account Setup */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Account Setup</h3>
          <p className="text-xs text-muted-foreground">
            A simple{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldSet
            </code>{" "}
            demonstrating{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldDescription
            </code>{" "}
            placed both after and before the control.
          </p>
          <ComponentPreview
            align="start"
            code={`<FieldSet>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="setup-username">Username</FieldLabel>
      <Input id="setup-username" placeholder="max_leiter" full />
      <FieldDescription>
        Choose a unique username for your account.
      </FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="setup-password">Password</FieldLabel>
      <FieldDescription>Must be at least 8 characters long.</FieldDescription>
      <Input id="setup-password" type="password" placeholder="••••••••" full />
    </Field>
  </FieldGroup>
</FieldSet>`}
          >
            <div className="w-72">
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="pat-setup-username">
                      Username
                    </FieldLabel>
                    <Input
                      id="pat-setup-username"
                      placeholder="max_leiter"
                      full
                    />
                    <FieldDescription>
                      Choose a unique username for your account.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="pat-setup-password">
                      Password
                    </FieldLabel>
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                    <Input
                      id="pat-setup-password"
                      type="password"
                      placeholder="••••••••"
                      full
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
          </ComponentPreview>
        </div>

        {/* Address Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Address Information
          </h3>
          <p className="text-xs text-muted-foreground">
            A{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldSet
            </code>{" "}
            with group-level{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldDescription
            </code>{" "}
            and a two-column grid for city and postal code.
          </p>
          <ComponentPreview
            align="start"
            code={`<FieldSet>
  <FieldLegend>Address Information</FieldLegend>
  <FieldDescription>
    We need your address to deliver your order.
  </FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="street">Street Address</FieldLabel>
      <Input id="street" placeholder="123 Main St" full />
    </Field>
    <div className="grid grid-cols-2 gap-4">
      <Field>
        <FieldLabel htmlFor="city">City</FieldLabel>
        <Input id="city" placeholder="New York" full />
      </Field>
      <Field>
        <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
        <Input id="zip" placeholder="90502" full />
      </Field>
    </div>
  </FieldGroup>
</FieldSet>`}
          >
            <div className="w-80">
              <FieldSet>
                <FieldLegend>Address Information</FieldLegend>
                <FieldDescription>
                  We need your address to deliver your order.
                </FieldDescription>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="pat-street">Street Address</FieldLabel>
                    <Input id="pat-street" placeholder="123 Main St" full />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="pat-city">City</FieldLabel>
                      <Input id="pat-city" placeholder="New York" full />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="pat-zip">Postal Code</FieldLabel>
                      <Input id="pat-zip" placeholder="90502" full />
                    </Field>
                  </div>
                </FieldGroup>
              </FieldSet>
            </div>
          </ComponentPreview>
        </div>

        {/* Desktop Preferences */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Desktop Preferences
          </h3>
          <p className="text-xs text-muted-foreground">
            A checkbox group under a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldLegend variant=&quot;label&quot;
            </code>{" "}
            divided by a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldSeparator
            </code>{" "}
            from a lone checkbox that uses{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldContent
            </code>{" "}
            for a richer description.
          </p>
          <ComponentPreview
            align="start"
            code={`<FieldGroup>
  <FieldSet>
    <FieldLegend variant="label">Show these items on the desktop</FieldLegend>
    <FieldDescription>
      Select the items you want to show on the desktop.
    </FieldDescription>
    <FieldGroup className="gap-3">
      <Field orientation="horizontal">
        <Checkbox id="pref-hard-disks" defaultChecked />
        <FieldLabel htmlFor="pref-hard-disks" className="font-normal">
          Hard disks
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="pref-external-disks" />
        <FieldLabel htmlFor="pref-external-disks" className="font-normal">
          External disks
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="pref-cds-dvds" />
        <FieldLabel htmlFor="pref-cds-dvds" className="font-normal">
          CDs, DVDs, and iPods
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="pref-servers" />
        <FieldLabel htmlFor="pref-servers" className="font-normal">
          Connected servers
        </FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
  <FieldSeparator />
  <Field orientation="horizontal">
    <Checkbox id="pref-sync-folders" defaultChecked />
    <FieldContent>
      <FieldLabel htmlFor="pref-sync-folders">
        Sync Desktop &amp; Documents folders
      </FieldLabel>
      <FieldDescription>
        Your Desktop &amp; Documents folders are being synced with iCloud Drive.
        You can access them from other devices.
      </FieldDescription>
    </FieldContent>
  </Field>
</FieldGroup>`}
          >
            <div className="w-80">
              <FieldGroup>
                <FieldSet>
                  <FieldLegend variant="label">
                    Show these items on the desktop
                  </FieldLegend>
                  <FieldDescription>
                    Select the items you want to show on the desktop.
                  </FieldDescription>
                  <FieldGroup className="gap-3">
                    <Field orientation="horizontal">
                      <Checkbox id="pat-pref-hard-disks" defaultChecked />
                      <FieldLabel
                        htmlFor="pat-pref-hard-disks"
                        className="font-normal"
                      >
                        Hard disks
                      </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                      <Checkbox id="pat-pref-external-disks" />
                      <FieldLabel
                        htmlFor="pat-pref-external-disks"
                        className="font-normal"
                      >
                        External disks
                      </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                      <Checkbox id="pat-pref-cds" />
                      <FieldLabel
                        htmlFor="pat-pref-cds"
                        className="font-normal"
                      >
                        CDs, DVDs, and iPods
                      </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                      <Checkbox id="pat-pref-servers" />
                      <FieldLabel
                        htmlFor="pat-pref-servers"
                        className="font-normal"
                      >
                        Connected servers
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <FieldSeparator />
                <Field orientation="horizontal">
                  <Checkbox id="pat-pref-sync" defaultChecked />
                  <FieldContent>
                    <FieldLabel htmlFor="pat-pref-sync">
                      Sync Desktop &amp; Documents folders
                    </FieldLabel>
                    <FieldDescription>
                      Your Desktop &amp; Documents folders are being synced with
                      iCloud Drive. You can access them from other devices.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </div>
          </ComponentPreview>
        </div>

        {/* Compute Environment */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Compute Environment
          </h3>
          <p className="text-xs text-muted-foreground">
            Card-style radio options built by wrapping a horizontal{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Field
            </code>{" "}
            inside{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldLabel
            </code>
            . The label&apos;s{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              has-data-checked
            </code>{" "}
            variant applies a tinted border when the radio is selected.
          </p>
          <ComponentPreview
            align="start"
            code={`<FieldGroup>
  <FieldSet>
    <FieldLegend variant="label">Compute Environment</FieldLegend>
    <FieldDescription>
      Select the compute environment for your cluster.
    </FieldDescription>
    <RadioGroup defaultValue="kubernetes">
      <FieldLabel htmlFor="env-kubernetes">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Kubernetes</FieldTitle>
            <FieldDescription>
              Run GPU workloads on a K8s cluster.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="kubernetes" id="env-kubernetes" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="env-vm">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Virtual Machine</FieldTitle>
            <FieldDescription>
              Access a cluster to run GPU workloads.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="vm" id="env-vm" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  </FieldSet>
</FieldGroup>`}
          >
            <div className="w-80">
              <FieldGroup>
                <FieldSet>
                  <FieldLegend variant="label">Compute Environment</FieldLegend>
                  <FieldDescription>
                    Select the compute environment for your cluster.
                  </FieldDescription>
                  <RadioGroup defaultValue="kubernetes">
                    <FieldLabel htmlFor="pat-env-kubernetes">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Kubernetes</FieldTitle>
                          <FieldDescription>
                            Run GPU workloads on a K8s cluster.
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value="kubernetes"
                          id="pat-env-kubernetes"
                        />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="pat-env-vm">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Virtual Machine</FieldTitle>
                          <FieldDescription>
                            Access a cluster to run GPU workloads.
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="vm" id="pat-env-vm" />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                </FieldSet>
              </FieldGroup>
            </div>
          </ComponentPreview>
        </div>

        {/* Payment Checkout */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Payment Checkout
          </h3>
          <p className="text-xs text-muted-foreground">
            A comprehensive form using a top-level{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldGroup
            </code>{" "}
            with multiple{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldSet
            </code>{" "}
            blocks separated by{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldSeparator
            </code>
            . Demonstrates{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              SelectGroup
            </code>
            , inline{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              FieldDescription
            </code>
            , and a horizontal{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Field
            </code>{" "}
            for form actions.
          </p>
          <ComponentPreview
            align="start"
            code={`<FieldGroup>
  <FieldSet>
    <FieldLegend>Payment Method</FieldLegend>
    <FieldDescription>
      All transactions are secure and encrypted.
    </FieldDescription>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="card-name">Name on Card</FieldLabel>
        <Input id="card-name" placeholder="Evil Rabbit" required full />
      </Field>
      <Field>
        <FieldLabel htmlFor="card-number">Card Number</FieldLabel>
        <Input id="card-number" placeholder="1234 5678 9012 3456" required full />
        <FieldDescription>Enter your 16-digit card number.</FieldDescription>
      </Field>
      <div className="grid grid-cols-3 gap-4">
        <Field>
          <FieldLabel htmlFor="exp-month">Month</FieldLabel>
          <Select>
            <SelectTrigger id="exp-month">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="01">01</SelectItem>
                {/* ... */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="exp-year">Year</FieldLabel>
          <Select>
            <SelectTrigger id="exp-year">
              <SelectValue placeholder="YYYY" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="2026">2026</SelectItem>
                {/* ... */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="cvv">CVV</FieldLabel>
          <Input id="cvv" placeholder="123" required full />
        </Field>
      </div>
    </FieldGroup>
  </FieldSet>
  <FieldSeparator />
  <FieldSet>
    <FieldLegend>Billing Address</FieldLegend>
    <FieldDescription>
      The billing address associated with your payment method.
    </FieldDescription>
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="same-as-shipping" defaultChecked />
        <FieldLabel htmlFor="same-as-shipping" className="font-normal">
          Same as shipping address
        </FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
  <FieldSet>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="comments">Comments</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="comments"
            placeholder="Add any additional comments"
            rows={3}
          />
        </InputGroup>
      </Field>
    </FieldGroup>
  </FieldSet>
  <Field orientation="horizontal">
    <Button type="submit">Submit</Button>
    <Button variant="secondary" type="button">Cancel</Button>
  </Field>
</FieldGroup>`}
          >
            <div className="w-96">
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Payment Method</FieldLegend>
                  <FieldDescription>
                    All transactions are secure and encrypted.
                  </FieldDescription>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="pat-card-name">
                        Name on Card
                      </FieldLabel>
                      <Input
                        id="pat-card-name"
                        placeholder="Evil Rabbit"
                        required
                        full
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="pat-card-number">
                        Card Number
                      </FieldLabel>
                      <Input
                        id="pat-card-number"
                        placeholder="1234 5678 9012 3456"
                        required
                        full
                      />
                      <FieldDescription>
                        Enter your 16-digit card number.
                      </FieldDescription>
                    </Field>
                    <div className="grid grid-cols-3 gap-4">
                      <Field>
                        <FieldLabel htmlFor="pat-exp-month">Month</FieldLabel>
                        <Select>
                          <SelectTrigger id="pat-exp-month">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="01">01</SelectItem>
                              <SelectItem value="02">02</SelectItem>
                              <SelectItem value="03">03</SelectItem>
                              <SelectItem value="04">04</SelectItem>
                              <SelectItem value="05">05</SelectItem>
                              <SelectItem value="06">06</SelectItem>
                              <SelectItem value="07">07</SelectItem>
                              <SelectItem value="08">08</SelectItem>
                              <SelectItem value="09">09</SelectItem>
                              <SelectItem value="10">10</SelectItem>
                              <SelectItem value="11">11</SelectItem>
                              <SelectItem value="12">12</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="pat-exp-year">Year</FieldLabel>
                        <Select>
                          <SelectTrigger id="pat-exp-year">
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="2025">2025</SelectItem>
                              <SelectItem value="2026">2026</SelectItem>
                              <SelectItem value="2027">2027</SelectItem>
                              <SelectItem value="2028">2028</SelectItem>
                              <SelectItem value="2029">2029</SelectItem>
                              <SelectItem value="2030">2030</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="pat-cvv">CVV</FieldLabel>
                        <Input id="pat-cvv" placeholder="123" required full />
                      </Field>
                    </div>
                  </FieldGroup>
                </FieldSet>
                <FieldSeparator />
                <FieldSet>
                  <FieldLegend>Billing Address</FieldLegend>
                  <FieldDescription>
                    The billing address associated with your payment method.
                  </FieldDescription>
                  <FieldGroup>
                    <Field orientation="horizontal" className="items-baseline">
                      <Checkbox id="pat-same-as-shipping" defaultChecked />
                      <FieldLabel
                        htmlFor="pat-same-as-shipping"
                        className="font-normal"
                      >
                        Same as shipping address
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="pat-comments">Comments</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id="pat-comments"
                          placeholder="Add any additional comments"
                          rows={3}
                        />
                      </InputGroup>
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal">
                  <Button type="submit">Submit</Button>
                  <Button variant="secondary" type="button">
                    Cancel
                  </Button>
                </Field>
              </FieldGroup>
            </div>
          </ComponentPreview>
        </div>
      </div>

      {/* ── Props ────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
