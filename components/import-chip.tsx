"use client";

import { useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";

export function ImportChip({ importStatement }: { importStatement: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(importStatement);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 font-mono text-xs text-muted-foreground">
      <span className="flex-1 truncate">{importStatement}</span>
      <button
        onClick={handleCopy}
        aria-label="Copy import statement"
        className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? (
          <LuCheck className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <LuCopy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
