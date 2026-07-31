import Link from "next/link";
import { LuArrowLeft, LuConstruction } from "react-icons/lu";
import type { FormMeta, FormComplexity } from "@/lib/types";

const complexityColor: Record<FormComplexity, string> = {
  Simple:
    "bg-green-500/10 text-green-700 ring-green-500/20 dark:text-green-400 dark:ring-green-500/30",
  Medium:
    "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400 dark:ring-amber-500/30",
  Complex:
    "bg-purple-500/10 text-purple-700 ring-purple-500/20 dark:text-purple-400 dark:ring-purple-500/30",
};

export function FormComingSoon({ form }: { form: FormMeta }) {
  return (
    <>
      {/* Back */}
      <Link
        href="/showcase/forms"
        className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
      >
        <LuArrowLeft className="size-3.5" />
        Forms Gallery
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-medium tracking-tight">{form.name}</h1>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ring-1 ring-inset ${complexityColor[form.complexity]}`}
          >
            {form.complexity}
          </span>
        </div>
        <p className="text-muted-foreground text-sm">{form.description}</p>
      </div>

      {/* Placeholder body */}
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-muted/20 py-16 text-center">
        <LuConstruction className="size-8 text-muted-foreground/50" />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-foreground">Coming soon</p>
          <p className="text-xs text-muted-foreground">
            This form is part of the planned gallery and will be built next.
          </p>
        </div>

        {/* Metadata preview */}
        <div className="mt-4 flex flex-col items-center gap-3 text-xs text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">Domain:</span>{" "}
            {form.domain}
          </div>
          <div>
            <span className="font-medium text-foreground">Layout:</span>{" "}
            {form.layout}
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {form.components.map((c) => (
              <span
                key={c}
                className="rounded-sm border bg-background px-1.5 py-0.5"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
