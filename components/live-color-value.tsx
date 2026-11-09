"use client";

import * as React from "react";
import { useTheme } from "next-themes";

// Reads a colour token's resolved value in the active theme and shows it as hex.
// Used for tokens derived from --primary, whose value depends on the project's theme,
// so a hard-coded label would go stale the moment --primary changes.
function resolveHex(cssVar: string): string | null {
  const probe = document.createElement("span");
  probe.style.color = `var(${cssVar})`;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();

  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = computed;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export function LiveColorValue({ cssVar }: { cssVar: string }) {
  const { resolvedTheme } = useTheme();
  const [hex, setHex] = React.useState<string | null>(null);

  React.useEffect(() => {
    setHex(resolveHex(cssVar));
  }, [cssVar, resolvedTheme]);

  return (
    <span>
      {resolvedTheme === "dark" ? "☾" : "☀"} {hex ?? "…"}{" "}
      <span className="italic">(live)</span>
    </span>
  );
}
