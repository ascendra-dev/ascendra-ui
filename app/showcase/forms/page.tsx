"use client";

import Link from "next/link";
import { useState } from "react";
import { formsConfig } from "@/lib/forms-config";
import type { FormComplexity } from "@/lib/types";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const complexityColor: Record<FormComplexity, string> = {
  Simple:
    "bg-green-500/10 text-green-700 ring-green-500/20 dark:text-green-400 dark:ring-green-500/30",
  Medium:
    "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400 dark:ring-amber-500/30",
  Complex:
    "bg-purple-500/10 text-purple-700 ring-purple-500/20 dark:text-purple-400 dark:ring-purple-500/30",
};

const ALL_COMPLEXITIES: FormComplexity[] = ["Simple", "Medium", "Complex"];

export default function FormsGalleryPage() {
  const [activeComplexity, setActiveComplexity] = useState<FormComplexity | "All">("All");

  const filtered =
    activeComplexity === "All"
      ? formsConfig
      : formsConfig.filter((f) => f.complexity === activeComplexity);

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
          Sample Forms
        </div>
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          Form Gallery
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A curated set of{" "}
          <span className="text-foreground font-medium">
            {formsConfig.length} production-grade forms
          </span>{" "}
          spanning multiple business domains and layouts — from a simple contact
          form to a multi-step onboarding stepper. Each form is fully interactive
          and built exclusively with components from this design system.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 flex flex-wrap gap-6 border-t border-b py-5">
        {[
          { label: "Forms", value: formsConfig.length },
          {
            label: "Simple",
            value: formsConfig.filter((f) => f.complexity === "Simple").length,
          },
          {
            label: "Medium",
            value: formsConfig.filter((f) => f.complexity === "Medium").length,
          },
          {
            label: "Complex",
            value: formsConfig.filter((f) => f.complexity === "Complex").length,
          },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-2xl font-semibold text-foreground">
              {value}
            </span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Complexity filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["All", ...ALL_COMPLEXITIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActiveComplexity(c)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeComplexity === c
                ? "border-foreground/20 bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((form) => (
          <Link
            key={form.slug}
            href={`/showcase/forms/${form.slug}`}
            className="group relative flex flex-col gap-4 rounded-xl border bg-muted/30 p-5 ring-1 ring-transparent transition-all hover:bg-muted/60 hover:ring-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-foreground">{form.name}</span>
                <span className="text-xs text-muted-foreground">
                  {form.domain}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ring-1 ring-inset ${complexityColor[form.complexity]}`}
                >
                  {form.complexity}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {form.description}
            </p>

            {/* Layout tag */}
            <p className="text-[0.6875rem] text-muted-foreground/70 italic">
              {form.layout}
            </p>

            {/* Components */}
            <div className="flex flex-wrap gap-1.5">
              {form.components.slice(0, 6).map((c) => (
                <span
                  key={c}
                  className="rounded-sm border bg-background px-1.5 py-0.5 text-[0.6875rem] text-muted-foreground"
                >
                  {c}
                </span>
              ))}
              {form.components.length > 6 && (
                <span className="rounded-sm border bg-background px-1.5 py-0.5 text-[0.6875rem] text-muted-foreground">
                  +{form.components.length - 6} more
                </span>
              )}
            </div>

            {/* CTA arrow */}
            <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View form
              <LuArrowRight className="size-3" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
