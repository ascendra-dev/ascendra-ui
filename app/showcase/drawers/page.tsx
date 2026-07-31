"use client";

import Link from "next/link";
import { useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { drawersConfig } from "@/lib/drawers-config";
import type { DrawerType } from "@/lib/types";

import QuickActionsDrawer from "@/components/drawers/quick-actions-drawer";
import SmartFilterDrawer from "@/components/drawers/smart-filter-drawer";
import ShareSheetDrawer from "@/components/drawers/share-sheet-drawer";
import EventPreviewDrawer from "@/components/drawers/event-preview-drawer";
import MediaAttachmentDrawer from "@/components/drawers/media-attachment-drawer";
import AssignTaskDrawer from "@/components/drawers/assign-task-drawer";
import NotificationCenterDrawer from "@/components/drawers/notification-center-drawer";
import DangerZoneDrawer from "@/components/drawers/danger-zone-drawer";

const typeColor: Record<DrawerType, string> = {
  Action:
    "bg-red-500/10 text-red-700 ring-red-500/20 dark:text-red-400 dark:ring-red-500/30",
  Panel:
    "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-400 dark:ring-blue-500/30",
  Preview:
    "bg-purple-500/10 text-purple-700 ring-purple-500/20 dark:text-purple-400 dark:ring-purple-500/30",
  Input:
    "bg-green-500/10 text-green-700 ring-green-500/20 dark:text-green-400 dark:ring-green-500/30",
};

const ALL_TYPES: DrawerType[] = ["Action", "Panel", "Preview", "Input"];

const drawerComponents: Record<string, React.ComponentType> = {
  "quick-actions": QuickActionsDrawer,
  "smart-filter": SmartFilterDrawer,
  "share-sheet": ShareSheetDrawer,
  "event-preview": EventPreviewDrawer,
  "media-attachment": MediaAttachmentDrawer,
  "assign-task": AssignTaskDrawer,
  "notification-center": NotificationCenterDrawer,
  "danger-zone": DangerZoneDrawer,
};

export default function DrawersGalleryPage() {
  const [activeType, setActiveType] = useState<DrawerType | "All">("All");

  const filtered =
    activeType === "All"
      ? drawersConfig
      : drawersConfig.filter((d) => d.type === activeType);

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
          Sample Drawers
        </div>
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          Drawer Gallery
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A curated set of{" "}
          <span className="text-foreground font-medium">
            {drawersConfig.length} fully interactive drawers
          </span>{" "}
          covering action sheets, filter panels, content previews with snap points, and input
          capture — all edge-attached and built for touch-first interactions. Click any trigger to
          open the drawer live.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 flex flex-wrap gap-6 border-t border-b py-5">
        {[
          { label: "Drawers", value: drawersConfig.length },
          ...ALL_TYPES.map((t) => ({
            label: t,
            value: drawersConfig.filter((d) => d.type === t).length,
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
        {filtered.map((drawer) => {
          const Demo = drawerComponents[drawer.slug];
          return (
            <div
              key={drawer.slug}
              className="flex flex-col gap-4 rounded-xl border bg-muted/30 p-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-foreground">{drawer.name}</span>
                  <span className="text-xs text-muted-foreground">{drawer.domain}</span>
                </div>
                <span
                  className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ring-1 ring-inset ${typeColor[drawer.type]}`}
                >
                  {drawer.type}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {drawer.description}
              </p>

              {/* Components */}
              <div className="flex flex-wrap gap-1.5">
                {drawer.components.map((c) => (
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
