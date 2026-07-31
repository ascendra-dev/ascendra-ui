"use client";

import Link from "next/link";
import { useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { dialogsConfig } from "@/lib/dialogs-config";
import type { DialogType } from "@/lib/types";

import ArchiveProjectDialog from "@/components/dialogs/archive-project-dialog";
import TransferOwnershipDialog from "@/components/dialogs/transfer-ownership-dialog";
import DeleteRecordDialog from "@/components/dialogs/delete-record-dialog";
import DeleteAccountDialog from "@/components/dialogs/delete-account-dialog";
import RenameItemDialog from "@/components/dialogs/rename-item-dialog";
import AddNoteDialog from "@/components/dialogs/add-note-dialog";
import InviteMemberDialog from "@/components/dialogs/invite-member-dialog";
import ChangePasswordDialog from "@/components/dialogs/change-password-dialog";
import SessionExpiredDialog from "@/components/dialogs/session-expired-dialog";
import PaymentFailedDialog from "@/components/dialogs/payment-failed-dialog";
import FeatureAnnouncementDialog from "@/components/dialogs/feature-announcement-dialog";
import UpgradeRequiredDialog from "@/components/dialogs/upgrade-required-dialog";

const typeColor: Record<DialogType, string> = {
  Confirmation:
    "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400 dark:ring-amber-500/30",
  Destructive:
    "bg-red-500/10 text-red-700 ring-red-500/20 dark:text-red-400 dark:ring-red-500/30",
  Input:
    "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-400 dark:ring-blue-500/30",
  Alert:
    "bg-orange-500/10 text-orange-700 ring-orange-500/20 dark:text-orange-400 dark:ring-orange-500/30",
  Feature:
    "bg-purple-500/10 text-purple-700 ring-purple-500/20 dark:text-purple-400 dark:ring-purple-500/30",
};

const ALL_TYPES: DialogType[] = [
  "Confirmation",
  "Destructive",
  "Input",
  "Alert",
  "Feature",
];

const dialogComponents: Record<string, React.ComponentType> = {
  "archive-project": ArchiveProjectDialog,
  "transfer-ownership": TransferOwnershipDialog,
  "delete-record": DeleteRecordDialog,
  "delete-account": DeleteAccountDialog,
  "rename-item": RenameItemDialog,
  "add-note": AddNoteDialog,
  "invite-member": InviteMemberDialog,
  "change-password": ChangePasswordDialog,
  "session-expired": SessionExpiredDialog,
  "payment-failed": PaymentFailedDialog,
  "feature-announcement": FeatureAnnouncementDialog,
  "upgrade-required": UpgradeRequiredDialog,
};

export default function DialogsGalleryPage() {
  const [activeType, setActiveType] = useState<DialogType | "All">("All");

  const filtered =
    activeType === "All"
      ? dialogsConfig
      : dialogsConfig.filter((d) => d.type === activeType);

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
          Sample Dialogs
        </div>
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          Dialog Gallery
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A curated set of{" "}
          <span className="text-foreground font-medium">
            {dialogsConfig.length} fully interactive dialogs
          </span>{" "}
          spanning alerts, confirmations, input capture, and feature gates.
          Click any trigger to open the dialog live.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 flex flex-wrap gap-6 border-t border-b py-5">
        {[
          { label: "Dialogs", value: dialogsConfig.length },
          ...ALL_TYPES.map((t) => ({
            label: t,
            value: dialogsConfig.filter((d) => d.type === t).length,
          })),
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-2xl font-semibold text-foreground">
              {value}
            </span>
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
        {filtered.map((dialog) => {
          const Demo = dialogComponents[dialog.slug];
          return (
            <div
              key={dialog.slug}
              className="flex flex-col gap-4 rounded-xl border bg-muted/30 p-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <span className="font-medium text-foreground">
                  {dialog.name}
                </span>
                <span
                  className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ring-1 ring-inset ${typeColor[dialog.type]}`}
                >
                  {dialog.type}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {dialog.description}
              </p>

              {/* Components */}
              <div className="flex flex-wrap gap-1.5">
                {dialog.components.map((c) => (
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
