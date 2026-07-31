import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

// ─── Token data ───────────────────────────────────────────────────────────────
// Values hard-coded from app/globals.css so no client-side JS is needed.
// Swatches use Tailwind utility classes, so they flip automatically with the
// dark-mode toggle — no JavaScript required.

type ColorToken = {
  name: string;
  cssVar: string;
  twBg: string;
  lightApprox: string;
  darkApprox: string;
};

const semanticColors: ColorToken[] = [
  {
    name: "Background",
    cssVar: "--background",
    twBg: "bg-background",
    lightApprox: "#ffffff",
    darkApprox: "#1e1e24",
  },
  {
    name: "Foreground",
    cssVar: "--foreground",
    twBg: "bg-foreground",
    lightApprox: "#2b2b34",
    darkApprox: "#f6f6f7",
  },
  {
    name: "Surface Soft",
    cssVar: "--surface-soft",
    twBg: "bg-surface-soft",
    lightApprox: "#fafafa",
    darkApprox: "#1e1e22",
  },
  {
    name: "Primary",
    cssVar: "--primary",
    twBg: "bg-primary",
    lightApprox: "#6c47ff",
    darkApprox: "#6c47ff",
  },
  {
    name: "Primary Foreground",
    cssVar: "--primary-foreground",
    twBg: "bg-primary-foreground",
    lightApprox: "#f4f9fc",
    darkApprox: "#0f2040",
  },
  {
    name: "Secondary",
    cssVar: "--secondary",
    twBg: "bg-secondary",
    lightApprox: "#ffffff",
    darkApprox: "#33333e",
  },
  {
    name: "Secondary Foreground",
    cssVar: "--secondary-foreground",
    twBg: "bg-secondary-foreground",
    lightApprox: "#1b1b1b",
    darkApprox: "#f9f9f6",
  },
  {
    name: "Muted",
    cssVar: "--muted",
    twBg: "bg-muted",
    lightApprox: "#fafafb",
    darkApprox: "#111113",
  },
  {
    name: "Muted Foreground",
    cssVar: "--muted-foreground",
    twBg: "bg-muted-foreground",
    lightApprox: "#5f5f6f",
    darkApprox: "#adadb7",
  },
  {
    name: "Accent",
    cssVar: "--accent",
    twBg: "bg-accent",
    lightApprox: "#f7f7ef",
    darkApprox: "#2b2520",
  },
  {
    name: "Accent Foreground",
    cssVar: "--accent-foreground",
    twBg: "bg-accent-foreground",
    lightApprox: "#1c1c1b",
    darkApprox: "#f9f9f6",
  },
  {
    name: "Destructive",
    cssVar: "--destructive",
    twBg: "bg-destructive",
    lightApprox: "#e13232",
    darkApprox: "#e84e4e",
  },
  {
    name: "Border",
    cssVar: "--border",
    twBg: "bg-border",
    lightApprox: "#ececee",
    darkApprox: "#232328",
  },
  {
    name: "Ring",
    cssVar: "--ring",
    twBg: "bg-ring",
    lightApprox: "#6c47ff",
    darkApprox: "#6c47ff",
  },
  {
    name: "Card",
    cssVar: "--card",
    twBg: "bg-card",
    lightApprox: "#ffffff",
    darkApprox: "#1c1c1b",
  },
  {
    name: "Popover",
    cssVar: "--popover",
    twBg: "bg-popover",
    lightApprox: "#ffffff",
    darkApprox: "#1c1c1b",
  },
];

const brandColors: ColorToken[] = [
  {
    name: "Brand",
    cssVar: "--brand",
    twBg: "bg-brand",
    lightApprox: "#6c47ff",
    darkApprox: "#846bff",
  },
  {
    name: "Positive",
    cssVar: "--positive",
    twBg: "bg-positive",
    lightApprox: "#15892b",
    darkApprox: "#31c854",
  },
  {
    name: "Negative",
    cssVar: "--negative",
    twBg: "bg-negative",
    lightApprox: "#e02e2e",
    darkApprox: "#f73d3d",
  },
  {
    name: "Warning",
    cssVar: "--warning",
    twBg: "bg-warning",
    lightApprox: "#fd7224",
    darkApprox: "#fd7224",
  },
  {
    name: "Info",
    cssVar: "--info",
    twBg: "bg-info",
    lightApprox: "#236dd7",
    darkApprox: "#307ff6",
  },
  {
    name: "Dimmed",
    cssVar: "--dimmed",
    twBg: "bg-dimmed",
    lightApprox: "#adadb7",
    darkApprox: "#5f5f6f",
  },
];

type RadiusToken = {
  name: string;
  cssVar: string;
  twClass: string;
  value: string;
};

const radiusTokens: RadiusToken[] = [
  {
    name: "sm",
    cssVar: "--radius-sm",
    twClass: "rounded-sm",
    value: "0.375rem (6px)",
  },
  {
    name: "md",
    cssVar: "--radius-md",
    twClass: "rounded-md",
    value: "0.5rem (8px)",
  },
  {
    name: "lg",
    cssVar: "--radius-lg",
    twClass: "rounded-lg",
    value: "0.625rem (10px)",
  },
  {
    name: "xl",
    cssVar: "--radius-xl",
    twClass: "rounded-xl",
    value: "0.875rem (14px)",
  },
  {
    name: "2xl",
    cssVar: "--radius-2xl",
    twClass: "rounded-2xl",
    value: "1.125rem (18px)",
  },
  {
    name: "3xl",
    cssVar: "--radius-3xl",
    twClass: "rounded-3xl",
    value: "1.375rem (22px)",
  },
  {
    name: "4xl",
    cssVar: "--radius-4xl",
    twClass: "rounded-4xl",
    value: "1.625rem (26px)",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ColorSwatch({ token }: { token: ColorToken }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className={`h-12 w-full border-b ${token.twBg}`} />
      <div className="space-y-0.5 p-2.5">
        <p className="text-xs font-medium text-foreground">{token.name}</p>
        <p className="font-mono text-[0.6875rem] text-muted-foreground">
          {token.cssVar}
        </p>
        <p className="font-mono text-[0.6875rem] text-muted-foreground">
          {token.twBg}
        </p>
        <p className="pt-0.5 font-mono text-[0.6rem] text-muted-foreground/60">
          <span className="mr-2">☀ {token.lightApprox}</span>
          <span>☾ {token.darkApprox}</span>
        </p>
      </div>
    </div>
  );
}

function RadiusSwatch({ token }: { token: RadiusToken }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`h-12 w-16 border-2 border-primary/40 bg-primary/10 ${token.twClass}`}
      />
      <div className="text-center">
        <p className="font-mono text-xs font-medium text-foreground">
          {token.name}
        </p>
        <p className="font-mono text-[0.6rem] text-muted-foreground">
          {token.value}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignTokensPage() {
  return (
    <>
      {/* Breadcrumb */}
      <p className="mb-8 text-xs text-muted-foreground">
        <Link
          href="/showcase"
          className="hover:text-foreground transition-colors"
        >
          Overview
        </Link>
        <span className="mx-1.5">/</span>
        Getting Started
        <span className="mx-1.5">/</span>
        Design Tokens
      </p>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="mb-1.5 text-2xl font-semibold tracking-tight text-foreground">
          Design Tokens
        </h1>
        <p className="text-sm text-muted-foreground">
          OKLCH-based semantic token system defined in{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">
            app/globals.css
          </code>
          . All swatches switch automatically with the dark-mode toggle —
          colours are driven by live CSS variables, not static values.
        </p>
      </div>

      <div className="space-y-12">
        {/* ── Semantic Colors ── */}
        <div className="space-y-4">
          <SectionHeader>Semantic Colors</SectionHeader>
          <p className="text-xs text-muted-foreground">
            shadcn/ui base tokens mapped via{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              @theme inline
            </code>{" "}
            to Tailwind utilities (
            <code className="rounded bg-muted px-1 font-mono text-xs">
              bg-primary
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              text-muted-foreground
            </code>
            , etc.).
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {semanticColors.map((token) => (
              <ColorSwatch key={token.cssVar} token={token} />
            ))}
          </div>
        </div>

        {/* ── Brand Colors ── */}
        <div className="space-y-4">
          <SectionHeader>Brand Colors</SectionHeader>
          <p className="text-xs text-muted-foreground">
            Intent-based semantic aliases. Light and dark values differ — see{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              .dark
            </code>{" "}
            overrides in{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              globals.css
            </code>
            .
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {brandColors.map((token) => (
              <ColorSwatch key={token.cssVar} token={token} />
            ))}
          </div>
        </div>

        {/* ── Border Radius ── */}
        <div className="space-y-4">
          <SectionHeader>Border Radius Scale</SectionHeader>
          <p className="text-xs text-muted-foreground">
            All steps derived from a single base variable{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              --radius: 0.625rem
            </code>{" "}
            (10px). Changing the base shifts every step at once.
          </p>
          <div className="flex flex-wrap gap-6 pt-2">
            {radiusTokens.map((token) => (
              <RadiusSwatch key={token.cssVar} token={token} />
            ))}
          </div>
        </div>

        {/* ── Typography ── */}
        <div className="space-y-4">
          <SectionHeader>Typography</SectionHeader>

          {/* Font families */}
          <p className="text-xs font-medium text-foreground">Font families</p>
          <p className="text-xs text-muted-foreground">
            Injected by{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              next/font
            </code>{" "}
            in the root layout and exposed as CSS variables.
          </p>
          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <p className="mb-2 font-mono text-[0.6875rem] text-muted-foreground">
                --font-sans · <span className="italic">body / UI text</span>
              </p>
              <p className="text-sm text-foreground">
                The quick brown fox jumps over the lazy dog. 0123456789
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="mb-2 font-mono text-[0.6875rem] text-muted-foreground">
                --font-mono · <span className="italic">code blocks</span>
              </p>
              <p className="font-mono text-sm text-foreground">
                const token = &quot;oklch(0.5573 0.2543 283.67)&quot;;
              </p>
            </div>
          </div>

          {/* Semantic type scale */}
          <p className="pt-2 text-xs font-medium text-foreground">
            Semantic type scale
          </p>
          <p className="text-xs text-muted-foreground">
            Defined in{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              @theme inline
            </code>{" "}
            — available as Tailwind utilities (
            <code className="rounded bg-muted px-1 font-mono text-xs">
              text-body
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              text-heading
            </code>
            , etc.) and as CSS vars.
          </p>
          <div className="rounded-lg border overflow-hidden">
            <div className="grid grid-cols-[140px_80px_80px_1fr] gap-4 border-b bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Token</span>
              <span>Size</span>
              <span>Line-h</span>
              <span>Example</span>
            </div>
            <div className="divide-y">
              {[
                {
                  token: "--text-caption",
                  tw: "text-caption",
                  size: "11px",
                  lh: "16px",
                  role: "Timestamps · tooltips",
                  style: { fontSize: "0.6875rem", lineHeight: "1rem" },
                },
                {
                  token: "--text-label",
                  tw: "text-label",
                  size: "12px",
                  lh: "16px",
                  role: "Form labels · badge text",
                  style: { fontSize: "0.75rem", lineHeight: "1rem" },
                },
                {
                  token: "--text-body-sm",
                  tw: "text-body-sm",
                  size: "14px",
                  lh: "20px",
                  role: "Secondary body copy",
                  style: { fontSize: "0.875rem", lineHeight: "1.25rem" },
                },
                {
                  token: "--text-body",
                  tw: "text-body",
                  size: "16px",
                  lh: "24px",
                  role: "Primary body copy",
                  style: { fontSize: "1rem", lineHeight: "1.5rem" },
                },
                {
                  token: "--text-heading-sm",
                  tw: "text-heading-sm",
                  size: "18px",
                  lh: "28px",
                  role: "Card titles",
                  style: {
                    fontSize: "1.125rem",
                    lineHeight: "1.75rem",
                    fontWeight: 600,
                  },
                },
                {
                  token: "--text-heading",
                  tw: "text-heading",
                  size: "20px",
                  lh: "28px",
                  role: "Section headings",
                  style: {
                    fontSize: "1.25rem",
                    lineHeight: "1.75rem",
                    fontWeight: 600,
                  },
                },
                {
                  token: "--text-heading-lg",
                  tw: "text-heading-lg",
                  size: "24px",
                  lh: "32px",
                  role: "Page headings",
                  style: {
                    fontSize: "1.5rem",
                    lineHeight: "2rem",
                    fontWeight: 600,
                  },
                },
                {
                  token: "--text-display",
                  tw: "text-display",
                  size: "30px",
                  lh: "36px",
                  role: "Hero / display",
                  style: {
                    fontSize: "1.875rem",
                    lineHeight: "2.25rem",
                    fontWeight: 700,
                  },
                },
              ].map((row) => (
                <div
                  key={row.token}
                  className="grid grid-cols-[140px_80px_80px_1fr] items-baseline gap-4 px-4 py-3"
                >
                  <code className="font-mono text-[0.6875rem] text-foreground">
                    {row.token}
                  </code>
                  <span className="font-mono text-xs text-muted-foreground">
                    {row.size}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {row.lh}
                  </span>
                  <span style={row.style} className="text-foreground">
                    {row.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Spacing ── */}
        <div className="space-y-4">
          <SectionHeader>Spacing Scale</SectionHeader>
          <p className="text-xs text-muted-foreground">
            One layout spacing token controls horizontal padding across the entire
            app. It responds to screen size automatically.
          </p>
          <div className="space-y-3">
            <div className="rounded-lg border overflow-hidden">
              <div className="grid grid-cols-[160px_1fr_1fr] gap-4 border-b bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Token</span>
                <span>Value</span>
                <span>Context</span>
              </div>
              <div className="divide-y">
                <div className="grid grid-cols-[160px_1fr_1fr] gap-4 px-4 py-3 text-sm">
                  <code className="font-mono text-xs text-foreground">
                    --app-layout-spacing
                  </code>
                  <span className="text-foreground">1.5rem (24px)</span>
                  <span className="text-muted-foreground">
                    Mobile — default
                  </span>
                </div>
                <div className="grid grid-cols-[160px_1fr_1fr] gap-4 px-4 py-3 text-sm">
                  <code className="font-mono text-xs text-foreground">
                    --app-layout-spacing
                  </code>
                  <span className="text-foreground">2.5rem (40px)</span>
                  <span className="text-muted-foreground">
                    Tablet / desktop (md+)
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4 space-y-1.5">
              <p className="font-mono text-xs font-medium text-foreground">
                .app-container
              </p>
              <p className="text-xs text-muted-foreground">
                CSS class defined in{" "}
                <code className="rounded bg-muted px-1 font-mono">
                  globals.css
                </code>
                . Applies responsive horizontal padding via{" "}
                <code className="rounded bg-muted px-1 font-mono">
                  --app-layout-spacing
                </code>{" "}
                and caps width at{" "}
                <code className="rounded bg-muted px-1 font-mono">
                  max-w-6xl
                </code>
                . Use this on the outermost div of any full-viewport-width page
                that lives outside the showcase sidebar layout.
              </p>
              <div className="mt-2 rounded bg-muted px-3 py-2 font-mono text-xs text-foreground">
                {`<div className="app-container">`}
                <br />
                &nbsp;&nbsp;{`<PageHeader>…</PageHeader>`}
                <br />
                {`</div>`}
              </div>
            </div>
          </div>
        </div>

        {/* ── Chart Colors ── */}
        <div className="space-y-4">
          <SectionHeader>Chart Color Mapping</SectionHeader>
          <p className="text-xs text-muted-foreground">
            Eight chart variables map to semantic intent. Always use them in
            order (chart-1 first) to keep visual language consistent across
            charts. Dark mode values are neon-boosted for legibility on dark
            backgrounds.
          </p>
          <div className="rounded-lg border overflow-hidden">
            <div className="grid grid-cols-[60px_120px_1fr_1fr] gap-4 border-b bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Token</span>
              <span>Swatch</span>
              <span>Semantic role</span>
              <span>Dark mode</span>
            </div>
            <div className="divide-y">
              {[
                {
                  token: "chart-1",
                  bg: "bg-[--chart-1]",
                  lightOklch: "oklch(0.606 0.230 281)",
                  role: "Primary / Brand — violet",
                  dark: "Neon violet · oklch(0.72 0.26 281)",
                },
                {
                  token: "chart-2",
                  bg: "bg-[--chart-2]",
                  lightOklch: "oklch(0.679 0.154 233)",
                  role: "Info — sky blue",
                  dark: "Neon sky · oklch(0.78 0.18 233)",
                },
                {
                  token: "chart-3",
                  bg: "bg-[--chart-3]",
                  lightOklch: "oklch(0.698 0.152 163)",
                  role: "Positive — emerald",
                  dark: "Neon emerald · oklch(0.78 0.18 163)",
                },
                {
                  token: "chart-4",
                  bg: "bg-[--chart-4]",
                  lightOklch: "oklch(0.647 0.227 14)",
                  role: "Negative — rose",
                  dark: "Neon rose · oklch(0.74 0.25 14)",
                },
                {
                  token: "chart-5",
                  bg: "bg-[--chart-5]",
                  lightOklch: "oklch(0.702 0.187 44)",
                  role: "Warning — orange",
                  dark: "Neon orange · oklch(0.78 0.21 44)",
                },
                {
                  token: "chart-6",
                  bg: "bg-[--chart-6]",
                  lightOklch: "oklch(0.769 0.170 70)",
                  role: "Accent — amber",
                  dark: "Neon amber · oklch(0.86 0.18 70)",
                },
                {
                  token: "chart-7",
                  bg: "bg-[--chart-7]",
                  lightOklch: "oklch(0.637 0.213 27)",
                  role: "Danger — red",
                  dark: "Neon red · oklch(0.72 0.23 27)",
                },
                {
                  token: "chart-8",
                  bg: "bg-[--chart-8]",
                  lightOklch: "oklch(0.557 0.254 284)",
                  role: "Secondary brand — deep violet",
                  dark: "Neon deep violet · oklch(0.70 0.26 284)",
                },
              ].map((row) => (
                <div
                  key={row.token}
                  className="grid grid-cols-[60px_120px_1fr_1fr] items-center gap-4 px-4 py-3 text-sm"
                >
                  <code className="font-mono text-xs text-foreground">
                    {row.token}
                  </code>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-6 w-6 rounded border ${row.bg}`}
                      style={{ background: `var(--${row.token})` }}
                    />
                    <span className="font-mono text-[0.6rem] text-muted-foreground leading-tight break-all">
                      {row.lightOklch}
                    </span>
                  </div>
                  <span className="text-foreground">{row.role}</span>
                  <span className="text-muted-foreground text-xs">
                    {row.dark}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            When adding a new chart, use{" "}
            <code className="rounded bg-muted px-1 font-mono">chart-1</code>{" "}
            through{" "}
            <code className="rounded bg-muted px-1 font-mono">chart-8</code>{" "}
            as{" "}
            <code className="rounded bg-muted px-1 font-mono">
              stroke=&#34;var(--chart-1)&#34;
            </code>{" "}
            — never hard-code hex or named colors in chart components.
          </p>
        </div>

        {/* ── Source note ── */}
        <p className="border-t pt-6 text-xs text-muted-foreground">
          All values are defined in{" "}
          <code className="rounded bg-muted px-1 font-mono">
            app/globals.css
          </code>
          . Edit the{" "}
          <code className="rounded bg-muted px-1 font-mono">:root</code> and{" "}
          <code className="rounded bg-muted px-1 font-mono">.dark</code> blocks
          to update light and dark mode values globally.
        </p>
      </div>
    </>
  );
}
