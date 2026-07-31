import { cn } from "@/ascendra-ui/shadcn";
import { SimpleBadge } from "@/ascendra-ui";

type ChartCardProps = {
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "blue" | "green" | "orange" | "red" | "amber" | "secondary";
  className?: string;
  children: React.ReactNode;
};

export function ChartCard({
  title,
  description,
  badge,
  badgeVariant = "secondary",
  className,
  children,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 flex flex-col gap-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-foreground leading-none">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {badge && (
          <SimpleBadge variant={badgeVariant} className="shrink-0 mt-px">
            {badge}
          </SimpleBadge>
        )}
      </div>
      {children}
    </div>
  );
}
