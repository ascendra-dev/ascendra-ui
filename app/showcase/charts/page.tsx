"use client";

import Link from "next/link";
import { useState } from "react";
import { chartsConfig } from "@/lib/charts-config";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const categoryColor: Record<string, string> = {
  Comparison:
    "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-400 dark:ring-blue-500/30",
  "Temporal / Trend": "bg-primary/10 text-primary ring-primary/20",
  Composition:
    "bg-green-500/10 text-green-700 ring-green-500/20 dark:text-green-400 dark:ring-green-500/30",
  Distribution:
    "bg-orange-500/10 text-orange-700 ring-orange-500/20 dark:text-orange-400 dark:ring-orange-500/30",
  Relational:
    "bg-purple-500/10 text-purple-700 ring-purple-500/20 dark:text-purple-400 dark:ring-purple-500/30",
  "Multi-type": "bg-muted text-muted-foreground ring-border",
};

const badgeColor: Record<string, string> = {
  New: "bg-green-500/10 text-green-700 ring-green-500/20 dark:text-green-400 dark:ring-green-500/30",
  Finance:
    "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400 dark:ring-amber-500/30",
};

const ALL_CATEGORIES = Array.from(new Set(chartsConfig.map((c) => c.category)));
const totalVariants = chartsConfig.reduce((sum, c) => sum + c.variants, 0);

export default function ChartsGalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string | "All">("All");

  const filtered =
    activeCategory === "All"
      ? chartsConfig
      : chartsConfig.filter((c) => c.category === activeCategory);

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
          Charts
        </div>
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          Chart Gallery
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <span className="text-foreground font-medium">
            {chartsConfig.length} chart types
          </span>
          {" · "}
          <span className="text-foreground font-medium">
            {totalVariants} variants total
          </span>
          {" · "}built with recharts + shadcn/ui
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 flex flex-wrap gap-6 border-t border-b py-5">
        {[
          { label: "Chart Types", value: chartsConfig.length },
          { label: "Total Variants", value: totalVariants },
          { label: "Categories", value: ALL_CATEGORIES.length },
          { label: "Built with", value: "recharts" },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-2xl font-semibold text-foreground">
              {value}
            </span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["All", ...ALL_CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeCategory === cat
                ? "border-foreground/20 bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((chart) => (
          <Link
            key={chart.slug}
            href={`/showcase/charts/${chart.slug}`}
            className="group relative flex flex-col gap-4 rounded-xl border bg-muted/30 p-5 ring-1 ring-transparent transition-all hover:bg-muted/60 hover:ring-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-foreground">
                  {chart.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {chart.variants} variant{chart.variants !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {chart.badge && (
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ring-1 ring-inset ${badgeColor[chart.badge] ?? "bg-muted text-muted-foreground ring-border"}`}
                  >
                    {chart.badge}
                  </span>
                )}
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ring-1 ring-inset ${categoryColor[chart.category] ?? "bg-muted text-muted-foreground ring-border"}`}
                >
                  {chart.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {chart.description}
            </p>

            {/* Primitives */}
            <div className="flex flex-wrap gap-1.5">
              {chart.primitives.slice(0, 5).map((p) => (
                <span
                  key={p}
                  className="rounded-sm border bg-background px-1.5 py-0.5 text-[0.6875rem] text-muted-foreground"
                >
                  {p}
                </span>
              ))}
              {chart.primitives.length > 5 && (
                <span className="rounded-sm border bg-background px-1.5 py-0.5 text-[0.6875rem] text-muted-foreground">
                  +{chart.primitives.length - 5} more
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View charts
              <LuArrowRight className="size-3" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
