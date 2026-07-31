'use client';

import { useState } from 'react';
import { cn } from '@/ascendra-ui/shadcn';
import { CodeBlock } from './code-block';

type Props = {
  children: React.ReactNode;
  code: string;
  className?: string;
  minHeight?: number;
  align?: 'center' | 'start';
};

export function ComponentPreview({
  children,
  code,
  className,
  minHeight = 120,
  align = 'center',
}: Props) {
  const [view, setView] = useState<'preview' | 'code'>('preview');

  return (
    <div className={cn('rounded-lg border overflow-hidden', className)}>
      {/* Tab bar */}
      <div className="flex items-center gap-0.5 border-b bg-muted/60 px-3 py-1.5">
        {(['preview', 'code'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={cn(
              'rounded-sm px-2.5 py-1 text-xs font-medium capitalize transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              view === tab
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {view === 'preview' ? (
        <div
          className={cn(
            'flex flex-wrap gap-4 p-8',
            align === 'center' && 'items-center justify-center',
            align === 'start' && 'items-start justify-start'
          )}
          style={{ minHeight }}
        >
          {children}
        </div>
      ) : (
        <div className="rounded-none border-none">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
}
