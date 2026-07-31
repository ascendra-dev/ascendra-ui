import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

// ─── Types ────────────────────────────────────────────────────────────────────

type Decision = {
  component: string;
  slug: string;
  when: string;
  avoid?: string;
};

type Rule = {
  label: string;
  detail: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const statusIndicators: Decision[] = [
  {
    component: "StatusDot",
    slug: "status-dot",
    when:
      "Live system state in a table cell or beside a label — Active, Inactive, Pending, Error. One per row.",
    avoid: "Never use in running text. Never stack two StatusDots side by side.",
  },
  {
    component: "SimpleBadge",
    slug: "simple-badge",
    when:
      "Categorical labels or status text anywhere — inline with text, in table cells, in card headers, in filters.",
    avoid: "Do not use for numeric counts — use BubbleBadge.",
  },
  {
    component: "BubbleBadge",
    slug: "bubble-badge",
    when:
      "Numeric counters — unread messages (5), error counts (3), notification dots on nav items.",
    avoid:
      "Do not use for text labels or status words — use SimpleBadge.",
  },
];

const cardRules: Rule[] = [
  {
    label: "Use Card for any distinct content section",
    detail:
      "If a section has a title, collapseable body, or a footer — wrap it in Card. Do not recreate this pattern with raw divs.",
  },
  {
    label: "CardHeader is for title + subtitle only",
    detail:
      "Do not put form fields or data inside CardHeader. It should only contain CardHeaderTitle and optionally CardHeaderSubtitle.",
  },
  {
    label: "Legends and summaries go inside CardPanel, not CardFooter",
    detail:
      "CardFooter is for icon-only status indicators (CardFooterIcon). Chart legends, metric summaries, and notes belong inside the CardPanel body.",
  },
  {
    label: "Never use CardHeader outside a Card",
    detail:
      "CardHeader reads from CardContext. Outside a Card the context returns a default non-collapseable state, which works visually but is semantically wrong.",
  },
  {
    label: "Use plain div only for invisible layout grouping",
    detail:
      "Raw divs with border + rounded-* are not a substitute for Card. If you need a visible container with a header, use Card.",
  },
];

const layoutRules: Rule[] = [
  {
    label: "Always use PageWrapper → PageHeader → PageMain",
    detail:
      "Every full page should follow this composition: BackLink (if sub-page) → PageHeader → PageMain → PageWrapper. Never replicate this with hardcoded divs.",
  },
  {
    label: "Use BackLink on every sub-page",
    detail:
      "Any page that navigates from a parent list/gallery page gets a BackLink above the PageHeader. Hardcoded '← Back' anchor links are not acceptable.",
  },
  {
    label: "Use app-container for full-width page layouts",
    detail:
      "The .app-container CSS class provides responsive horizontal padding (1.5rem mobile, 2.5rem desktop) and a max-w-6xl cap. Apply it to the outermost div on pages that span the full viewport width rather than living inside the showcase sidebar layout.",
  },
  {
    label: "Use MainContent + AsideContent for two-column layouts",
    detail:
      "Wrap the primary content in MainContent and the contextual sidebar in AsideContent. Never use CSS grid columns directly for this layout.",
  },
];

const tableRules: Decision[] = [
  {
    component: "DataTable",
    slug: "data-table",
    when:
      "Sortable, filterable, paginated data with batch actions and column management. CRUD admin tables.",
    avoid:
      "Do not use in dashboard widgets or summary panels — it has too much chrome for read-only data.",
  },
  {
    component: "Table (simple)",
    slug: "table",
    when:
      "Read-only data in dashboards, summary panels, or tables with fewer than 10 rows. No sorting or pagination needed.",
    avoid:
      "Do not add sorting or filtering logic to simple Table — use DataTable instead.",
  },
];

const buttonVariants: { variant: string; use: string; avoid: string }[] = [
  {
    variant: "default (primary)",
    use: "Primary CTA — submit, save, confirm. One per form or modal max.",
    avoid: "Never use two primary buttons in the same section.",
  },
  {
    variant: "secondary",
    use: "Supporting action alongside a primary button — Cancel next to Save.",
    avoid: "Not for standalone actions with no adjacent primary.",
  },
  {
    variant: "outline",
    use: "Lower-emphasis actions, toolbar items, filter toggles.",
    avoid: "Not for destructive actions.",
  },
  {
    variant: "ghost",
    use: "Icon-only actions in table rows, compact toolbars, nav items.",
    avoid: "Do not use ghost for labelled buttons — add at least an icon.",
  },
  {
    variant: "destructive",
    use: "Delete, remove, revoke — actions that cannot be undone. Pair with an Alert Dialog confirmation.",
    avoid: "Never use destructive for reversible actions.",
  },
];

const fieldRules: Rule[] = [
  {
    label: "Always use Field + FieldHint for form inputs",
    detail:
      "The Field system handles label, description, error display, and mandatory/optional badges in one composable primitive. Never use a raw <label> + <input> pair in a form.",
  },
  {
    label: "FieldError requires an errors prop from react-hook-form",
    detail:
      "Wire FieldError to formState.errors[fieldName]. Passing a static string to FieldError is acceptable for prototyping but not for production forms.",
  },
  {
    label: "Use FieldGrid for aligned multi-column form layouts",
    detail:
      "FieldGrid provides consistent column alignment. Do not use CSS grid directly inside a form — use FieldGrid and FieldGroup instead.",
  },
  {
    label: "Plain Input is only for non-form search fields",
    detail:
      "Inline search inputs inside tables or toolbars that are not part of a form submission can use Input directly. Everything else uses Field.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function DecisionRow({ item }: { item: Decision }) {
  return (
    <div className="grid grid-cols-[160px_1fr_1fr] gap-4 border-b py-3 last:border-0 text-sm">
      <div>
        <Link
          href={`/showcase/${item.slug}`}
          className="font-mono font-medium text-primary hover:underline"
        >
          {item.component}
        </Link>
      </div>
      <div className="text-foreground">{item.when}</div>
      {item.avoid && (
        <div className="text-muted-foreground">{item.avoid}</div>
      )}
    </div>
  );
}

function RuleList({ rules }: { rules: Rule[] }) {
  return (
    <ul className="space-y-3">
      {rules.map((rule) => (
        <li key={rule.label} className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-foreground">
            {rule.label}
          </span>
          <span className="text-sm text-muted-foreground">{rule.detail}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GuidelinesPage() {
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
        Usage Guidelines
      </p>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="mb-1.5 text-2xl font-semibold tracking-tight text-foreground">
          Usage Guidelines
        </h1>
        <p className="text-sm text-muted-foreground">
          Decision rules for when to use which component. These answer the &quot;which
          one?&quot; questions that the component pages don&apos;t.
        </p>
      </div>

      <div className="space-y-12">
        {/* ── Status Indicators ── */}
        <div className="space-y-4">
          <SectionHeader>Status Indicators</SectionHeader>
          <p className="text-xs text-muted-foreground">
            Three components exist for status — each has a distinct purpose.
            Mixing them is the most common mistake.
          </p>
          <div className="rounded-lg border overflow-hidden">
            <div className="grid grid-cols-[160px_1fr_1fr] gap-4 border-b bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Component</span>
              <span>Use when</span>
              <span>Avoid when</span>
            </div>
            <div className="px-4">
              {statusIndicators.map((item) => (
                <DecisionRow key={item.component} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Card ── */}
        <div className="space-y-4">
          <SectionHeader>Card</SectionHeader>
          <p className="text-xs text-muted-foreground">
            Card is the primary content container. These rules prevent the most
            common misuses.
          </p>
          <div className="rounded-lg border p-4">
            <RuleList rules={cardRules} />
          </div>
        </div>

        {/* ── Page Layout ── */}
        <div className="space-y-4">
          <SectionHeader>Page Layout</SectionHeader>
          <p className="text-xs text-muted-foreground">
            The layout system is non-negotiable for new pages. These rules ensure
            global changes (spacing, back-link style, header alignment) propagate
            everywhere automatically.
          </p>
          <div className="rounded-lg border p-4">
            <RuleList rules={layoutRules} />
          </div>
          <p className="text-xs text-muted-foreground">
            See the{" "}
            <Link
              href="/showcase/layout-guide"
              className="text-primary hover:underline"
            >
              Layout Guide
            </Link>{" "}
            for live examples of every composition pattern.
          </p>
        </div>

        {/* ── Tables ── */}
        <div className="space-y-4">
          <SectionHeader>Tables</SectionHeader>
          <p className="text-xs text-muted-foreground">
            Two table systems exist. The wrong choice makes dashboards bloated and
            admin tables unusable.
          </p>
          <div className="rounded-lg border overflow-hidden">
            <div className="grid grid-cols-[160px_1fr_1fr] gap-4 border-b bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Component</span>
              <span>Use when</span>
              <span>Avoid when</span>
            </div>
            <div className="px-4">
              {tableRules.map((item) => (
                <DecisionRow key={item.component} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Button Variants ── */}
        <div className="space-y-4">
          <SectionHeader>Button Variants</SectionHeader>
          <p className="text-xs text-muted-foreground">
            Variant hierarchy creates visual priority. More than one primary
            button in a section destroys that hierarchy.
          </p>
          <div className="rounded-lg border overflow-hidden">
            <div className="grid grid-cols-[160px_1fr_1fr] gap-4 border-b bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Variant</span>
              <span>Use when</span>
              <span>Avoid when</span>
            </div>
            <div className="px-4">
              {buttonVariants.map((row) => (
                <div
                  key={row.variant}
                  className="grid grid-cols-[160px_1fr_1fr] gap-4 border-b py-3 last:border-0 text-sm"
                >
                  <div className="font-mono font-medium text-foreground">
                    {row.variant}
                  </div>
                  <div className="text-foreground">{row.use}</div>
                  <div className="text-muted-foreground">{row.avoid}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Field System ── */}
        <div className="space-y-4">
          <SectionHeader>Field System</SectionHeader>
          <p className="text-xs text-muted-foreground">
            The{" "}
            <Link
              href="/showcase/field"
              className="text-primary hover:underline"
            >
              Field
            </Link>{" "}
            system is mandatory for all form inputs. These rules define the
            boundary between Field and raw Input.
          </p>
          <div className="rounded-lg border p-4">
            <RuleList rules={fieldRules} />
          </div>
        </div>

        {/* ── Source note ── */}
        <p className="border-t pt-6 text-xs text-muted-foreground">
          These guidelines reflect decisions made in the project. When a new
          component is added, update this page with its decision criteria before
          shipping. Breaking changes should also be recorded in{" "}
          <code className="rounded bg-muted px-1 font-mono">CHANGELOG.md</code>.
        </p>
      </div>
    </>
  );
}
