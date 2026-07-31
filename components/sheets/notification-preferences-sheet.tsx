"use client";

import { useState } from "react";
import { Button, Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetSection, SheetSectionHeader, SheetTitle, SheetTrigger, Switch } from "@/ascendra-ui";

type Prefs = {
  emailProduct: boolean;
  emailMarketing: boolean;
  emailSecurity: boolean;
  pushActivity: boolean;
  pushMentions: boolean;
  inappUpdates: boolean;
  inappAlerts: boolean;
};

const defaultPrefs: Prefs = {
  emailProduct: true,
  emailMarketing: false,
  emailSecurity: true,
  pushActivity: true,
  pushMentions: true,
  inappUpdates: true,
  inappAlerts: false,
};

function SwitchRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={id}
          className="cursor-pointer text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export default function NotificationPreferencesSheet() {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const set = (key: keyof Prefs) => (v: boolean) =>
    setPrefs((p) => ({ ...p, [key]: v }));

  return (
    <Sheet onOpenChange={() => setPrefs(defaultPrefs)}>
      <SheetTrigger asChild>
        <Button variant="secondary">Manage Notifications</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notification Preferences</SheetTitle>
          <SheetDescription>
            Choose how and when you receive notifications.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <SheetSection>
            <SheetSectionHeader>Email</SheetSectionHeader>
            <div className="flex flex-col gap-4">
              <SwitchRow
                id="email-product"
                label="Product updates"
                description="Release notes, new features, and improvements."
                checked={prefs.emailProduct}
                onCheckedChange={set("emailProduct")}
              />
              <SwitchRow
                id="email-marketing"
                label="Marketing & promotions"
                description="Tips, case studies, and special offers."
                checked={prefs.emailMarketing}
                onCheckedChange={set("emailMarketing")}
              />
              <SwitchRow
                id="email-security"
                label="Security alerts"
                description="Sign-ins from new devices and password changes."
                checked={prefs.emailSecurity}
                onCheckedChange={set("emailSecurity")}
              />
            </div>
          </SheetSection>
          <SheetSection>
            <SheetSectionHeader>Push</SheetSectionHeader>
            <div className="flex flex-col gap-4">
              <SwitchRow
                id="push-activity"
                label="Activity on your items"
                description="Comments, reactions, and status changes."
                checked={prefs.pushActivity}
                onCheckedChange={set("pushActivity")}
              />
              <SwitchRow
                id="push-mentions"
                label="Direct mentions"
                description="When someone mentions you by name."
                checked={prefs.pushMentions}
                onCheckedChange={set("pushMentions")}
              />
            </div>
          </SheetSection>
          <SheetSection>
            <SheetSectionHeader>In-App</SheetSectionHeader>
            <div className="flex flex-col gap-4">
              <SwitchRow
                id="inapp-updates"
                label="System updates"
                description="Maintenance windows and platform changes."
                checked={prefs.inappUpdates}
                onCheckedChange={set("inappUpdates")}
              />
              <SwitchRow
                id="inapp-alerts"
                label="Billing alerts"
                description="Payment failures and subscription changes."
                checked={prefs.inappAlerts}
                onCheckedChange={set("inappAlerts")}
              />
            </div>
          </SheetSection>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Save Preferences</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
