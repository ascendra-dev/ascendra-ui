import Link from "next/link";
import {
  AppWindow,
  BarChart2,
  Bell,
  CalendarDays,
  ClipboardList,
  Compass,
  FileText,
  LayoutDashboard,
  LayoutPanelTop,
  MessageSquare,
  Monitor,
  PanelBottomOpen,
  PanelLeft,
  PanelRightOpen,
  ScrollText,
  Settings,
  Table2,
  Wrench,
} from "lucide-react";
import { navConfig } from "@/lib/nav-config";
import { registry } from "@/lib/registry";
import type { LucideIcon } from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  "Sample Dialogs": MessageSquare,
  "Sample Sheets": PanelRightOpen,
  "Sample Drawers": PanelBottomOpen,
  "Sample Dashboards": Monitor,
  "Sample Reports": ScrollText,
  "Sample Forms": FileText,
  Charts: BarChart2,
  "Feedback & Status": Bell,
  "Forms & Inputs": ClipboardList,
  "Date & Time": CalendarDays,
  Navigation: Compass,
  Overlays: AppWindow,
  "Tables & Data": Table2,
  Layout: LayoutDashboard,
  Tabs: LayoutPanelTop,
  Sidebar: PanelLeft,
  Utilities: Wrench,
};

export default function ShowcasePage() {
  const categories = navConfig.filter((c) => c.title !== "Getting Started");
  const componentCount = Object.keys(registry).length;
  const categoryCount = categories.length;

  return (
    <>
      {/* Hero */}
      <div className="mb-12">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Ascendra Design System
        </div>
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-foreground">
          Component Showcase
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          A reference for all custom components in{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
            ascendra-ui/components/
          </code>
          . Each entry includes a live preview, copyable code, import path, and
          props table.
        </p>
      </div>

      {/* Stats row */}
      <div className="mb-12 flex gap-6 border-y py-6">
        {[
          { value: String(componentCount), label: "Components" },
          { value: String(categoryCount), label: "Categories" },
          { value: "100%", label: "TypeScript" },
        ].map(({ value, label }) => (
          <div key={label}>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <div
            key={category.title}
            className="flex flex-col gap-3 rounded-lg border bg-background p-5 transition-all hover:border-foreground/20 hover:shadow-sm"
          >
            <Link
              href={`/showcase/${category.items[0].slug}`}
              className="group flex items-center justify-between rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center gap-2.5">
                {(() => {
                  const Icon = categoryIcons[category.title] ?? Settings;
                  return <Icon className="h-4 w-4 text-muted-foreground" />;
                })()}
                <span className="text-sm font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {category.title}
                </span>
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground">
                {category.items.length}
              </span>
            </Link>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <Link
                  key={item.slug}
                  href={
                    item.slug === ""
                      ? "/showcase/overview"
                      : `/showcase/${item.slug}`
                  }
                  className="rounded-sm bg-muted px-1.5 py-0.5 text-[0.6875rem] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-12 text-xs text-muted-foreground">
        All components live in{" "}
        <code className="rounded bg-muted px-1 font-mono">
          ascendra-ui/components/
        </code>{" "}
        and are built on Radix UI + Tailwind CSS v4.
      </p>
    </>
  );
}
