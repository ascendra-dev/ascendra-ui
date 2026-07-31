"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { registry } from "@/lib/registry";

const meta = registry["scroll-to-top"];

export function ScrollToTopDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero — code-only, no live widget (behavior component) */}
      <ComponentPreview
        code={`import { ScrollToTop } from "@/ascendra-ui";

// Place once in your root layout:
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}`}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium text-foreground">
            Behavior-only component
          </p>
          <p className="text-xs text-muted-foreground">
            Renders nothing — scroll restoration happens automatically on every
            route change.
          </p>
        </div>
      </ComponentPreview>

      {/* Details */}
      <div className="space-y-8">
        <SectionHeader>How it works</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            What it does
          </h3>
          <p className="text-xs text-muted-foreground">
            On mount it sets{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              history.scrollRestoration = &apos;manual&apos;
            </code>{" "}
            so the browser does not attempt to restore the previous scroll
            position between navigations. On every pathname change it calls{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              window.scrollTo(0, 0)
            </code>
            .
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Placement</h3>
          <p className="text-xs text-muted-foreground">
            Add it once at the root of your app. In Next.js App Router the
            correct location is your root{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              app/layout.tsx
            </code>
            , inside the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              {"<body>"}
            </code>
            . Adding it to every page is redundant.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Back / Forward navigation
          </h3>
          <p className="text-xs text-muted-foreground">
            Because{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              scrollRestoration
            </code>{" "}
            is set to{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              manual
            </code>
            , the browser will not restore scroll on Back/Forward either. If
            you need scroll-position memory for those navigations, track and
            restore it manually in your router.
          </p>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
