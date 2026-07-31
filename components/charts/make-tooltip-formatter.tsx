import type { ChartConfig } from "@/ascendra-ui/shadcn"

export function makeTooltipFormatter(
  config: ChartConfig,
  fmt: (v: number, key: string) => string
) {
  function TooltipContent(
    value: string | number | readonly (string | number)[] | undefined,
    name: string | number | undefined,
    item: { color?: string }
  ) {
    if (value === undefined) return null
    const key = String(name ?? "")
    const label = String(config[key]?.label ?? key)
    const numVal = Array.isArray(value) ? Number(value[0]) : Number(value)
    return (
      <>
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
          style={{ background: item.color ?? "currentColor" }}
        />
        <div className="flex flex-1 justify-between items-center leading-none gap-4">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-mono font-medium tabular-nums text-foreground">
            {fmt(numVal, key)}
          </span>
        </div>
      </>
    )
  }
  return TooltipContent
}
