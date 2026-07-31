import { PropDef } from "@/lib/types";
import { cn } from "@/ascendra-ui/shadcn";

type Props = {
  props: PropDef[];
  className?: string;
};

export function PropsTable({ props, className }: Props) {
  if (!props || props.length === 0) {
    return (
      <p className="text-xs text-muted-foreground italic">
        This component accepts all standard HTML element attributes.
      </p>
    );
  }

  return (
    <div className={cn("overflow-x-auto rounded-lg border", className)}>
      <table className="w-full min-w-150 text-xs">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
              Prop
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
              Type
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
              Default
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={cn(
                "border-b last:border-0",
                i % 2 === 1 && "bg-muted/20",
              )}
            >
              <td className="px-4 py-2.5 font-mono font-medium text-foreground">
                {prop.name}
              </td>
              <td className="px-4 py-2.5 font-mono text-muted-foreground">
                <span className="rounded bg-muted px-1 py-0.5">
                  {prop.type}
                </span>
              </td>
              <td className="px-4 py-2.5 font-mono text-muted-foreground">
                {prop.default ? (
                  <span className="rounded bg-muted px-1 py-0.5">
                    {prop.default}
                  </span>
                ) : (
                  <span className="text-muted-foreground/40">—</span>
                )}
              </td>
              <td className="px-4 py-2.5 text-muted-foreground leading-relaxed">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
