"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  BackLink,
  Card,
  CardFooter,
  CardHeader,
  CardHeaderSubtitle,
  CardHeaderTitle,
  CardPanel,
  CardPanelItem,
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  Field,
  FieldGrid,
  FieldGroup,
  FieldHint,
  FieldInfo,
  FieldLabel,
  FieldLabelGroup,
  FieldLegend,
  FieldSet,
  Input,
  InputGroup,
  InputGroupTextarea,
  MainContent,
  PageHeader,
  PageHeaderGroup,
  PageMain,
  PageSubtitle,
  PageTitle,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  TabContent,
  TabList,
  Tabs,
  TabTrigger,
  UnsavedChangesBar,
} from "@/ascendra-ui";

// ─── Schemas ───────────────────────────────────────────────────────────────────

const generalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  displayName: z.string(),
  username: z
    .string()
    .regex(/^[a-zA-Z0-9-]*$/, "Only letters, numbers and hyphens allowed"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z.string(),
  bio: z.string().max(200, "Bio must be 200 characters or fewer"),
  website: z.string(),
});

const preferencesSchema = z.object({
  language: z.string().min(1, "Language is required"),
  timezone: z.string().min(1, "Timezone is required"),
  dateFormat: z.string().min(1, "Date format is required"),
  timeFormat: z.string().min(1, "Time format is required"),
  theme: z.string().min(1, "Theme is required"),
});

const notificationsSchema = z.object({
  notifyComment: z.boolean(),
  notifyMention: z.boolean(),
  notifyDM: z.boolean(),
  notifyDigest: z.boolean(),
  notifyProductUpdates: z.boolean(),
  notifyTeamActivity: z.boolean(),
});

type GeneralValues = z.infer<typeof generalSchema>;
type PreferencesValues = z.infer<typeof preferencesSchema>;
type NotificationsValues = z.infer<typeof notificationsSchema>;

// ─── Data ──────────────────────────────────────────────────────────────────────

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Portuguese",
];

const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

const DATE_FORMATS = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
];

const TIME_FORMATS = [
  { value: "12h", label: "12-hour" },
  { value: "24h", label: "24-hour" },
];

const THEMES = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const EMAIL_NOTIFICATION_FIELDS = [
  {
    name: "notifyComment" as const,
    label: "New comment on my items",
    id: "notify-comment",
  },
  { name: "notifyMention" as const, label: "Mentions", id: "notify-mention" },
  {
    name: "notifyDM" as const,
    label: "Direct messages",
    id: "notify-dm",
  },
  {
    name: "notifyDigest" as const,
    label: "Weekly digest",
    id: "notify-digest",
  },
];

const IN_APP_NOTIFICATION_FIELDS = [
  {
    name: "notifyProductUpdates" as const,
    label: "Product updates",
    id: "notify-product-updates",
  },
  {
    name: "notifyTeamActivity" as const,
    label: "Team activity",
    id: "notify-team-activity",
  },
];

// ─── Form ──────────────────────────────────────────────────────────────────────

export default function UserProfileForm() {
  const [isSavingGeneral, setIsSavingGeneral] = useState(false);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);

  const generalForm = useForm<GeneralValues>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      username: "",
      email: "jane.smith@example.com",
      phone: "",
      bio: "",
      website: "",
    },
    mode: "onTouched",
  });

  const preferencesForm = useForm<PreferencesValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      language: "",
      timezone: "",
      dateFormat: "",
      timeFormat: "",
      theme: "system",
    },
    mode: "onTouched",
  });

  const notificationsForm = useForm<NotificationsValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      notifyComment: false,
      notifyMention: false,
      notifyDM: false,
      notifyDigest: false,
      notifyProductUpdates: false,
      notifyTeamActivity: false,
    },
    mode: "onTouched",
  });

  async function handleSaveGeneral(): Promise<boolean> {
    const ok = await generalForm.trigger();
    if (!ok) return false;
    setIsSavingGeneral(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSavingGeneral(false);
    generalForm.reset(generalForm.getValues());
    return true;
  }

  async function handleSavePreferences(): Promise<boolean> {
    const ok = await preferencesForm.trigger();
    if (!ok) return false;
    setIsSavingPreferences(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSavingPreferences(false);
    preferencesForm.reset(preferencesForm.getValues());
    return true;
  }

  async function handleSaveNotifications(): Promise<boolean> {
    const ok = await notificationsForm.trigger();
    if (!ok) return false;
    setIsSavingNotifications(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSavingNotifications(false);
    notificationsForm.reset(notificationsForm.getValues());
    return true;
  }

  const {
    control: gc,
    formState: { isDirty: generalDirty, isValid: generalValid, errors: ge },
  } = generalForm;
  const {
    control: pc,
    formState: {
      isDirty: preferencesDirty,
      isValid: preferencesValid,
      errors: pe,
    },
  } = preferencesForm;
  const {
    control: nc,
    formState: { isDirty: notificationsDirty, isValid: notificationsValid },
  } = notificationsForm;

  return (
    <>
      <BackLink href="/showcase/forms">Forms Gallery</BackLink>

      <PageHeader>
        <PageHeaderGroup>
          <PageTitle>User Profile</PageTitle>
          <PageSubtitle>
            Manage your personal information and account preferences.
          </PageSubtitle>
        </PageHeaderGroup>
      </PageHeader>

      <PageMain>
        <Tabs defaultValue="general">
          <TabList>
            <TabTrigger value="general" dirty={generalDirty}>
              General
            </TabTrigger>
            <TabTrigger value="preferences" dirty={preferencesDirty}>
              Preferences
            </TabTrigger>
            <TabTrigger value="notifications" dirty={notificationsDirty}>
              Notifications
            </TabTrigger>
          </TabList>

          {/* ── Tab: General ──────────────────────────────────────────── */}
          <TabContent value="general">
            <MainContent>
              <Card>
                <CardHeader>
                  <CardHeaderTitle>Personal Information</CardHeaderTitle>
                  <CardHeaderSubtitle>
                    Update your name, contact details, and public profile.
                  </CardHeaderSubtitle>
                </CardHeader>

                <CardPanel>
                  {/* Panel Item 1 — Identity */}
                  <CardPanelItem>
                    <FieldSet>
                      <FieldGrid>
                        <Field>
                          <FieldLabelGroup>
                            <FieldLabel htmlFor="first-name">
                              First Name
                            </FieldLabel>
                            <FieldInfo>First name info</FieldInfo>
                          </FieldLabelGroup>
                          <Controller
                            name="firstName"
                            control={gc}
                            render={({ field: f }) => (
                              <Input
                                id="first-name"
                                full
                                placeholder="Jane"
                                autoComplete="given-name"
                                value={f.value}
                                onChange={f.onChange}
                                onBlur={f.onBlur}
                                aria-invalid={!!ge.firstName}
                              />
                            )}
                          />
                          <FieldHint
                            error={ge.firstName as { message?: string }}
                            mandatory
                          />
                        </Field>

                        <Field>
                          <FieldLabelGroup>
                            <FieldLabel htmlFor="last-name">
                              Last Name
                            </FieldLabel>
                            <FieldInfo breakPoint="sm" />
                          </FieldLabelGroup>
                          <Controller
                            name="lastName"
                            control={gc}
                            render={({ field: f }) => (
                              <Input
                                id="last-name"
                                full
                                placeholder="Smith"
                                autoComplete="family-name"
                                value={f.value}
                                onChange={f.onChange}
                                onBlur={f.onBlur}
                                aria-invalid={!!ge.lastName}
                              />
                            )}
                          />
                          <FieldHint
                            error={ge.lastName as { message?: string }}
                            mandatory
                          />
                        </Field>

                        <Field>
                          <FieldLabel htmlFor="display-name">
                            Display Name
                          </FieldLabel>
                          <Controller
                            name="displayName"
                            control={gc}
                            render={({ field: f }) => (
                              <Input
                                id="display-name"
                                full
                                placeholder="jane.smith"
                                value={f.value}
                                onChange={f.onChange}
                                onBlur={f.onBlur}
                              />
                            )}
                          />
                          <FieldHint description="Shown publicly to other team members." />
                        </Field>

                        <Field>
                          <FieldLabel htmlFor="username">Username</FieldLabel>
                          <Controller
                            name="username"
                            control={gc}
                            render={({ field: f }) => (
                              <Input
                                id="username"
                                full
                                placeholder="jane-smith"
                                autoComplete="username"
                                value={f.value}
                                onChange={f.onChange}
                                onBlur={f.onBlur}
                                aria-invalid={!!ge.username}
                              />
                            )}
                          />
                          <FieldHint
                            error={ge.username as { message?: string }}
                          />
                        </Field>
                      </FieldGrid>
                    </FieldSet>
                  </CardPanelItem>

                  {/* Panel Item 2 — Contact */}
                  <CardPanelItem>
                    <FieldGroup>
                      <Field>
                        <FieldLabelGroup>
                          <FieldLabel htmlFor="email">Email Address</FieldLabel>
                          <FieldInfo>Required for account login</FieldInfo>
                        </FieldLabelGroup>
                        <Controller
                          name="email"
                          control={gc}
                          render={({ field: f }) => (
                            <Input
                              id="email"
                              full
                              type="email"
                              value={f.value}
                              disabled
                            />
                          )}
                        />
                        <FieldHint />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                        <Controller
                          name="phone"
                          control={gc}
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
                    </FieldGroup>
                  </CardPanelItem>

                  {/* Panel Item 3 — About */}
                  <CardPanelItem>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="bio">Bio / About</FieldLabel>
                        <Controller
                          name="bio"
                          control={gc}
                          render={({ field: f }) => (
                            <InputGroup>
                              <InputGroupTextarea
                                id="bio"
                                rows={3}
                                placeholder="Tell your team a bit about yourself…"
                                value={f.value}
                                onChange={f.onChange}
                                onBlur={f.onBlur}
                                aria-invalid={!!ge.bio}
                                maxLength={200}
                              />
                            </InputGroup>
                          )}
                        />
                        <FieldHint error={ge.bio as { message?: string }} />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="website">Website</FieldLabel>
                        <Controller
                          name="website"
                          control={gc}
                          render={({ field: f }) => (
                            <Input
                              id="website"
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
                    </FieldGroup>
                  </CardPanelItem>
                </CardPanel>

                <CardFooter>
                  Changes to your display name are visible to all team members
                  immediately.
                </CardFooter>
              </Card>
            </MainContent>

            <UnsavedChangesBar
              isDirty={generalDirty}
              isValid={generalValid}
              isSaving={isSavingGeneral}
              onSave={handleSaveGeneral}
              onReset={() => generalForm.reset()}
              onInvalid={() => generalForm.trigger()}
              className="lg:left-[calc(50%+7rem)]"
            />
          </TabContent>

          {/* ── Tab: Preferences ──────────────────────────────────────── */}
          <TabContent value="preferences">
            <MainContent>
              {/* Section: Regional Settings */}
              <Card>
                <CardHeader>
                  <CardHeaderTitle>Regional Settings</CardHeaderTitle>
                  <CardHeaderSubtitle>
                    Set your language, timezone, and date/time formatting
                    preferences.
                  </CardHeaderSubtitle>
                </CardHeader>

                <CardPanel>
                  {/* Panel Item 1 — Locale */}
                  <CardPanelItem>
                    <FieldSet>
                      <FieldGrid>
                        <Field>
                          <FieldLabel htmlFor="language">Language</FieldLabel>
                          <Controller
                            name="language"
                            control={pc}
                            render={({ field: f }) => (
                              <Combobox
                                items={LANGUAGES}
                                value={f.value}
                                onValueChange={(v) => f.onChange(v)}
                              >
                                <ComboboxInput
                                  id="language"
                                  placeholder="Search language…"
                                  onBlur={f.onBlur}
                                  className="w-full"
                                />
                                <ComboboxContent>
                                  <ComboboxList>
                                    <ComboboxEmpty>
                                      No results found.
                                    </ComboboxEmpty>
                                    <ComboboxCollection>
                                      {(lang: string) => (
                                        <ComboboxItem key={lang} value={lang}>
                                          {lang}
                                        </ComboboxItem>
                                      )}
                                    </ComboboxCollection>
                                  </ComboboxList>
                                </ComboboxContent>
                              </Combobox>
                            )}
                          />
                          <FieldHint
                            error={pe.language as { message?: string }}
                            mandatory
                          />
                        </Field>

                        <Field>
                          <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
                          <Controller
                            name="timezone"
                            control={pc}
                            render={({ field: f }) => (
                              <Combobox
                                items={TIMEZONES}
                                value={f.value}
                                onValueChange={(v) => f.onChange(v)}
                              >
                                <ComboboxInput
                                  id="timezone"
                                  placeholder="Search timezone…"
                                  onBlur={f.onBlur}
                                  className="w-full"
                                />
                                <ComboboxContent>
                                  <ComboboxList>
                                    <ComboboxEmpty>
                                      No results found.
                                    </ComboboxEmpty>
                                    <ComboboxCollection>
                                      {(tz: string) => (
                                        <ComboboxItem key={tz} value={tz}>
                                          {tz}
                                        </ComboboxItem>
                                      )}
                                    </ComboboxCollection>
                                  </ComboboxList>
                                </ComboboxContent>
                              </Combobox>
                            )}
                          />
                          <FieldHint
                            error={pe.timezone as { message?: string }}
                            mandatory
                          />
                        </Field>
                      </FieldGrid>
                    </FieldSet>
                  </CardPanelItem>

                  {/* Panel Item 2 — Formatting */}
                  <CardPanelItem>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="date-format">
                          Date Format
                        </FieldLabel>
                        <Controller
                          name="dateFormat"
                          control={pc}
                          render={({ field: f }) => (
                            <Select
                              value={f.value}
                              onValueChange={f.onChange}
                              onOpenChange={(open) => {
                                if (!open) f.onBlur();
                              }}
                              readOnly
                            >
                              <SelectTrigger
                                id="date-format"
                                className="w-full"
                                aria-invalid={!!pe.dateFormat || undefined}
                              >
                                <SelectValue placeholder="Select a format…" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {DATE_FORMATS.map((d) => (
                                    <SelectItem key={d.value} value={d.value}>
                                      {d.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FieldHint
                          error={pe.dateFormat as { message?: string }}
                          mandatory
                        />
                      </Field>

                      <FieldSet>
                        <FieldLegend variant="label">Time Format</FieldLegend>
                        <Controller
                          name="timeFormat"
                          control={pc}
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
                              {TIME_FORMATS.map((opt) => (
                                <Field
                                  key={opt.value}
                                  orientation="horizontal"
                                  className="w-auto items-center"
                                >
                                  <RadioGroupItem
                                    value={opt.value}
                                    id={`time-format-${opt.value}`}
                                    className="mb-1"
                                  />
                                  <FieldLabel
                                    htmlFor={`time-format-${opt.value}`}
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
                          error={pe.timeFormat as { message?: string }}
                          mandatory
                        />
                      </FieldSet>
                    </FieldGroup>
                  </CardPanelItem>
                </CardPanel>
              </Card>

              {/* Section: Appearance */}
              <Card>
                <CardHeader>
                  <CardHeaderTitle>Appearance</CardHeaderTitle>
                  <CardHeaderSubtitle>
                    Choose how Ascendra looks for you.
                  </CardHeaderSubtitle>
                </CardHeader>

                <CardPanel>
                  <CardPanelItem>
                    <FieldSet>
                      <FieldLegend variant="label">Theme</FieldLegend>
                      <Controller
                        name="theme"
                        control={pc}
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
                            {THEMES.map((opt) => (
                              <Field
                                key={opt.value}
                                orientation="horizontal"
                                className="w-auto items-center"
                              >
                                <RadioGroupItem
                                  value={opt.value}
                                  id={`theme-${opt.value}`}
                                  className="mb-1"
                                />
                                <FieldLabel
                                  htmlFor={`theme-${opt.value}`}
                                  className="cursor-pointer font-normal"
                                >
                                  {opt.label}
                                </FieldLabel>
                              </Field>
                            ))}
                          </RadioGroup>
                        )}
                      />
                      <FieldHint error={pe.theme as { message?: string }} />
                    </FieldSet>
                  </CardPanelItem>
                </CardPanel>
              </Card>
            </MainContent>

            <UnsavedChangesBar
              isDirty={preferencesDirty}
              isValid={preferencesValid}
              isSaving={isSavingPreferences}
              onSave={handleSavePreferences}
              onReset={() => preferencesForm.reset()}
              onInvalid={() => preferencesForm.trigger()}
              className="lg:left-[calc(50%+7rem)]"
            />
          </TabContent>

          {/* ── Tab: Notifications ────────────────────────────────────── */}
          <TabContent value="notifications">
            <MainContent>
              {/* Section: Email Notifications */}
              <Card>
                <CardHeader>
                  <CardHeaderTitle>Email Notifications</CardHeaderTitle>
                  <CardHeaderSubtitle>
                    Choose which activity emails you&apos;d like to receive.
                  </CardHeaderSubtitle>
                </CardHeader>

                <CardPanel>
                  <CardPanelItem>
                    <FieldGroup>
                      {EMAIL_NOTIFICATION_FIELDS.map(({ name, label, id }) => (
                        <Controller
                          key={id}
                          name={name}
                          control={nc}
                          render={({ field: f }) => (
                            <Field
                              orientation="horizontal"
                              className="items-center"
                            >
                              <Switch
                                id={id}
                                checked={f.value}
                                onCheckedChange={f.onChange}
                                onBlur={f.onBlur}
                              />
                              <FieldLabel
                                htmlFor={id}
                                className="cursor-pointer font-normal"
                              >
                                {label}
                              </FieldLabel>
                            </Field>
                          )}
                        />
                      ))}
                    </FieldGroup>
                  </CardPanelItem>
                </CardPanel>
              </Card>

              {/* Section: In-App Notifications */}
              <Card>
                <CardHeader>
                  <CardHeaderTitle>In-App Notifications</CardHeaderTitle>
                  <CardHeaderSubtitle>
                    Control which notifications appear within the application.
                  </CardHeaderSubtitle>
                </CardHeader>

                <CardPanel>
                  <CardPanelItem>
                    <FieldGroup>
                      <Field orientation="horizontal" className="items-center">
                        <Switch id="system-alerts" checked={true} disabled />
                        <FieldLabel
                          htmlFor="system-alerts"
                          className="font-normal opacity-50"
                        >
                          System alerts
                        </FieldLabel>
                      </Field>

                      {IN_APP_NOTIFICATION_FIELDS.map(({ name, label, id }) => (
                        <Controller
                          key={id}
                          name={name}
                          control={nc}
                          render={({ field: f }) => (
                            <Field
                              orientation="horizontal"
                              className="items-center"
                            >
                              <Switch
                                id={id}
                                checked={f.value}
                                onCheckedChange={f.onChange}
                                onBlur={f.onBlur}
                              />
                              <FieldLabel
                                htmlFor={id}
                                className="cursor-pointer font-normal"
                              >
                                {label}
                              </FieldLabel>
                            </Field>
                          )}
                        />
                      ))}
                    </FieldGroup>
                  </CardPanelItem>
                </CardPanel>

                <CardFooter>
                  Notification settings apply across all devices linked to your
                  account.
                </CardFooter>
              </Card>
            </MainContent>

            <UnsavedChangesBar
              isDirty={notificationsDirty}
              isValid={notificationsValid}
              isSaving={isSavingNotifications}
              onSave={handleSaveNotifications}
              onReset={() => notificationsForm.reset()}
              onInvalid={() => notificationsForm.trigger()}
              className="lg:left-[calc(50%+7rem)]"
            />
          </TabContent>
        </Tabs>
      </PageMain>
    </>
  );
}
