"use client";

import { cn, type ChartConfig } from "@/ascendra-ui/shadcn";

type Props = {
  config: ChartConfig;
  hidden: Record<string, boolean>;
  onToggle: (key: string) => void;
  className?: string;
};

export function ChartSeriesLegend({ config, hidden, onToggle, className }: Props) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5", className)}>
      {Object.entries(config).map(([key, value]) => (
        <button
          key={key}
          type="button"
          onClick={() => onToggle(key)}
          className={cn(
            "flex items-center gap-1.5 text-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
            hidden[key] ? "opacity-35" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span
            className="h-2 w-2 shrink-0 rounded-[2px]"
            style={{ backgroundColor: value.color }}
          />
          {String(value.label)}
        </button>
      ))}
    </div>
  );
}
