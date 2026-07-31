"use client";

import Link from "next/link";
import { useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { sheetsConfig } from "@/lib/sheets-config";
import type { SheetType } from "@/lib/types";

import EmployeeProfileSheet from "@/components/sheets/employee-profile-sheet";
import OrderDetailsSheet from "@/components/sheets/order-details-sheet";
import SupportTicketSheet from "@/components/sheets/support-ticket-sheet";
import NotificationPreferencesSheet from "@/components/sheets/notification-preferences-sheet";
import CustomerProfileSheet from "@/components/sheets/customer-profile-sheet";
import InvoicePreviewSheet from "@/components/sheets/invoice-preview-sheet";
import ProjectOverviewSheet from "@/components/sheets/project-overview-sheet";
import AuditLogEntrySheet from "@/components/sheets/audit-log-entry-sheet";
import ProductDetailsSheet from "@/components/sheets/product-details-sheet";
import AccountSettingsSheet from "@/components/sheets/account-settings-sheet";

const typeColor: Record<SheetType, string> = {
  Detail:
    "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-400 dark:ring-blue-500/30",
  Preview:
    "bg-purple-500/10 text-purple-700 ring-purple-500/20 dark:text-purple-400 dark:ring-purple-500/30",
  Activity:
    "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400 dark:ring-amber-500/30",
  Settings:
    "bg-green-500/10 text-green-700 ring-green-500/20 dark:text-green-400 dark:ring-green-500/30",
};

const ALL_TYPES: SheetType[] = ["Detail", "Preview", "Activity", "Settings"];

const sheetComponents: Record<string, React.ComponentType> = {
  "employee-profile": EmployeeProfileSheet,
  "order-details": OrderDetailsSheet,
  "support-ticket": SupportTicketSheet,
  "notification-preferences": NotificationPreferencesSheet,
  "customer-profile": CustomerProfileSheet,
  "invoice-preview": InvoicePreviewSheet,
  "project-overview": ProjectOverviewSheet,
  "audit-log-entry": AuditLogEntrySheet,
  "product-details": ProductDetailsSheet,
  "account-settings": AccountSettingsSheet,
};

export default function SheetsGalleryPage() {
  const [activeType, setActiveType] = useState<SheetType | "All">("All");

  const filtered =
    activeType === "All"
      ? sheetsConfig
      : sheetsConfig.filter((s) => s.type === activeType);

  return (
    <>
      {/* Back */}
      <Link
        href="/showcase"
        className="text-muted-foreground hover:text-foreground mb-8 flex w-fit items-center gap-1.5 text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
      >
        <LuArrowLeft className="size-3 stroke-2" />
        Component Showcase
      </Link>

      {/* Hero */}
      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Sample Sheets
        </div>
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          Sheet Gallery
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A curated set of{" "}
          <span className="text-foreground font-medium">
            {sheetsConfig.length} fully interactive sheets
          </span>{" "}
          spanning detail views, quick previews, activity feeds, and settings panels — across
          multiple business domains. Click any trigger to open the sheet live.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 flex flex-wrap gap-6 border-t border-b py-5">
        {[
          { label: "Sheets", value: sheetsConfig.length },
          ...ALL_TYPES.map((t) => ({
            label: t,
            value: sheetsConfig.filter((s) => s.type === t).length,
          })),
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-2xl font-semibold text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Type filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["All", ...ALL_TYPES] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeType === t
                ? "border-foreground/20 bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((sheet) => {
          const Demo = sheetComponents[sheet.slug];
          return (
            <div
              key={sheet.slug}
              className="flex flex-col gap-4 rounded-xl border bg-muted/30 p-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-foreground">{sheet.name}</span>
                  <span className="text-xs text-muted-foreground">{sheet.domain}</span>
                </div>
                <span
                  className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ring-1 ring-inset ${typeColor[sheet.type]}`}
                >
                  {sheet.type}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {sheet.description}
              </p>

              {/* Components */}
              <div className="flex flex-wrap gap-1.5">
                {sheet.components.map((c) => (
                  <span
                    key={c}
                    className="rounded-sm border bg-background px-1.5 py-0.5 text-[0.6875rem] text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Live trigger */}
              <div className="border-border flex items-center border-t pt-4">
                {Demo ? <Demo /> : null}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
