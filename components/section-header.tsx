import { cn } from '@/ascendra-ui/shadcn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function SectionHeader({ children, className }: Props) {
  return (
    <div className={cn('flex items-center gap-3 pb-1', className)}>
      <h2 className="text-sm font-semibold text-foreground whitespace-nowrap">{children}</h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
