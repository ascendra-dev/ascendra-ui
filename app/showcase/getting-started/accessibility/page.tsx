import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "pass" | "fail" | "partial" | "na";

type ComponentRow = {
  component: string;
  slug: string;
  keyboard: Status;
  aria: Status;
  contrast: Status;
  gap?: string;
  priority?: "fix-now" | "backlog";
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const components: ComponentRow[] = [
  {
    component: "Button",
    slug: "button",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "StatusDot",
    slug: "status-dot",
    keyboard: "na",
    aria: "fail",
    contrast: "na",
    gap: "Renders as a plain <span> with no aria-label. Screen readers see a colored dot with no meaning. Needs aria-label prop (e.g. aria-label=\"Active\").",
    priority: "fix-now",
  },
  {
    component: "SimpleBadge",
    slug: "simple-badge",
    keyboard: "na",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "BubbleBadge",
    slug: "bubble-badge",
    keyboard: "na",
    aria: "pass",
    contrast: "partial",
    gap: "Some variants use raw Tailwind colors (bg-blue-400, bg-green-400) rather than semantic tokens. Contrast ratios are not guaranteed against all backgrounds.",
    priority: "backlog",
  },
  {
    component: "SimpleAlert",
    slug: "simple-alert",
    keyboard: "na",
    aria: "partial",
    contrast: "pass",
    gap: "No role=\"alert\" attribute. Screen readers won't announce dynamically inserted alerts automatically.",
    priority: "backlog",
  },
  {
    component: "Card / CardPanel",
    slug: "card",
    keyboard: "pass",
    aria: "partial",
    contrast: "pass",
    gap: "The expand/collapse toggle button has no aria-expanded attribute. Screen readers announce a button but not its current state.",
    priority: "backlog",
  },
  {
    component: "Input",
    slug: "input",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Field / FieldError",
    slug: "field",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Checkbox",
    slug: "checkbox",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Radio Group",
    slug: "radio-group",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Switch",
    slug: "switch",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Select",
    slug: "select",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Combobox",
    slug: "combobox",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "DataTable",
    slug: "data-table",
    keyboard: "pass",
    aria: "partial",
    contrast: "pass",
    gap: "Column sort state is not announced to screen readers. Sorted column headers need aria-sort attribute.",
    priority: "backlog",
  },
  {
    component: "Table (simple)",
    slug: "table",
    keyboard: "na",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Dialog",
    slug: "dialog",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Sheet",
    slug: "sheet",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Dropdown Menu",
    slug: "dropdown-menu",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Tooltip",
    slug: "tooltips",
    keyboard: "partial",
    aria: "pass",
    contrast: "pass",
    gap: "Tooltip trigger is keyboard focusable (Radix), but tooltip content is not reachable via keyboard — content must be discoverable another way.",
    priority: "backlog",
  },
  {
    component: "Toast",
    slug: "toasts",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Tabs",
    slug: "tabs",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Progress",
    slug: "progress",
    keyboard: "na",
    aria: "partial",
    contrast: "pass",
    gap: "Progress bar should have aria-valuenow, aria-valuemin, aria-valuemax, and aria-label. Current implementation may be missing these on the inner bar element.",
    priority: "backlog",
  },
  {
    component: "File Upload",
    slug: "file-upload",
    keyboard: "pass",
    aria: "partial",
    contrast: "pass",
    gap: "Drop zone needs aria-label describing the accepted file types. Error state for rejected files should use aria-describedby.",
    priority: "backlog",
  },
  {
    component: "Command Palette",
    slug: "command-palette",
    keyboard: "pass",
    aria: "pass",
    contrast: "pass",
  },
  {
    component: "Pagination Button",
    slug: "pagination-button",
    keyboard: "pass",
    aria: "partial",
    contrast: "pass",
    gap: "Previous/Next icon buttons need aria-label. Current page should have aria-current=\"page\".",
    priority: "backlog",
  },
];

const knownGaps = components.filter((c) => c.gap);
const fixNow = knownGaps.filter((c) => c.priority === "fix-now");

// ─── Sub-components ───────────────────────────────────────────────────────────

const statusConfig: Record<Status, { label: string; className: string }> = {
  pass: { label: "Pass", className: "bg-positive/10 text-positive" },
  fail: { label: "Fail", className: "bg-negative/10 text-negative" },
  partial: { label: "Partial", className: "bg-warning/10 text-warning" },
  na: { label: "N/A", className: "bg-muted text-muted-foreground" },
};

function StatusCell({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[0.6875rem] font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccessibilityPage() {
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
        Accessibility
      </p>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="mb-1.5 text-2xl font-semibold tracking-tight text-foreground">
          Accessibility
        </h1>
        <p className="text-sm text-muted-foreground">
          WCAG 2.1 AA compliance status per component. This is a living document
          — update it when gaps are fixed or new components are added.
        </p>
      </div>

      <div className="space-y-10">
        {/* ── Target + Legend ── */}
        <div className="space-y-4">
          <SectionHeader>Target & Legend</SectionHeader>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border p-4 space-y-1.5">
              <p className="text-sm font-medium text-foreground">WCAG Target</p>
              <p className="text-sm text-muted-foreground">
                WCAG 2.1 Level AA. This covers keyboard navigability, sufficient
                color contrast (4.5:1 for text, 3:1 for UI components), and
                programmatic labels for all interactive elements.
              </p>
            </div>
            <div className="rounded-lg border p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">Column guide</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  <span className="font-medium">Keyboard</span> — focusable,
                  operable without a mouse
                </li>
                <li>
                  <span className="font-medium">ARIA</span> — correct roles,
                  labels, and live regions
                </li>
                <li>
                  <span className="font-medium">Contrast</span> — meets 4.5:1
                  text / 3:1 UI minimum
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                {(Object.keys(statusConfig) as Status[]).map((s) => (
                  <StatusCell key={s} status={s} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Fix Now ── */}
        {fixNow.length > 0 && (
          <div className="space-y-3">
            <SectionHeader>Fix Now</SectionHeader>
            <p className="text-xs text-muted-foreground">
              These gaps have the highest impact and lowest fix cost. Address
              them before shipping to consumers.
            </p>
            {fixNow.map((item) => (
              <div
                key={item.component}
                className="rounded-lg border border-negative/20 bg-negative/5 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <Link
                      href={`/showcase/${item.slug}`}
                      className="font-mono text-sm font-medium text-primary hover:underline"
                    >
                      {item.component}
                    </Link>
                    <p className="mt-1 text-sm text-foreground">{item.gap}</p>
                  </div>
                  <StatusCell status="fail" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Full Matrix ── */}
        <div className="space-y-3">
          <SectionHeader>Component Matrix</SectionHeader>
          <div className="rounded-lg border overflow-hidden">
            <div className="grid grid-cols-[1fr_80px_80px_80px] gap-3 border-b bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Component</span>
              <span>Keyboard</span>
              <span>ARIA</span>
              <span>Contrast</span>
            </div>
            {components.map((item) => (
              <div key={item.component}>
                <div className="grid grid-cols-[1fr_80px_80px_80px] items-start gap-3 border-b px-4 py-3 last:border-0">
                  <div>
                    <Link
                      href={`/showcase/${item.slug}`}
                      className="font-mono text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.component}
                    </Link>
                  </div>
                  <div>
                    <StatusCell status={item.keyboard} />
                  </div>
                  <div>
                    <StatusCell status={item.aria} />
                  </div>
                  <div>
                    <StatusCell status={item.contrast} />
                  </div>
                </div>
                {item.gap && (
                  <div className="border-b bg-muted/30 px-4 pb-3 -mt-px last:border-0">
                    <p className="text-xs text-muted-foreground pl-0">
                      <span className="font-medium text-foreground/70">
                        Gap:{" "}
                      </span>
                      {item.gap}
                      {item.priority === "backlog" && (
                        <span className="ml-2 inline-flex items-center rounded bg-muted px-1.5 py-0.5 font-mono text-[0.6rem] text-muted-foreground">
                          backlog
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── How to Update ── */}
        <div className="space-y-3">
          <SectionHeader>How to update this page</SectionHeader>
          <div className="rounded-lg border p-4 space-y-2 text-sm text-muted-foreground">
            <p>
              When you fix a gap, update the component&apos;s row from{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                fail
              </code>{" "}
              or{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                partial
              </code>{" "}
              to{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                pass
              </code>{" "}
              and remove the <code className="rounded bg-muted px-1 font-mono text-xs">gap</code> string.
            </p>
            <p>
              When you add a new component, add a row to the{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                components
              </code>{" "}
              array in{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                app/showcase/accessibility/page.tsx
              </code>
              . Default to{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                partial
              </code>{" "}
              for ARIA until it&apos;s been reviewed — don&apos;t leave it blank.
            </p>
            <p>
              For components built on Radix primitives (Dialog, Select, Combobox,
              DropdownMenu, Tabs), ARIA and keyboard support are provided by
              Radix and can be marked{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                pass
              </code>{" "}
              by default unless you&apos;ve overridden the trigger or content
              structure.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
