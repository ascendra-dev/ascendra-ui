"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Nav, NavLink } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["nav"];

export function NavDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero preview */}
      <ComponentPreview
        align="start"
        minHeight={80}
        code={`import { Nav } from "@/ascendra-ui";

<Nav>
  <NavLink href="/overview">Overview</NavLink>
  <NavLink href="/settings">Settings</NavLink>
  <NavLink href="/members">Members</NavLink>
</Nav>`}
      >
        <div className="w-full overflow-hidden rounded-md border">
          <Nav>
            <NavLink href="#">Overview</NavLink>
            <NavLink href="#">Settings</NavLink>
            <NavLink href="#">Members</NavLink>
          </Nav>
        </div>
      </ComponentPreview>

      {/* Examples */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Multiple links */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            With more links
          </h3>
          <p className="text-xs text-muted-foreground">
            The inner container scrolls horizontally on small screens so no
            links are clipped. Active detection is handled by{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              NavLink
            </code>
            .
          </p>
          <ComponentPreview
            align="start"
            minHeight={80}
            code={`<Nav>
  <NavLink href="/overview">Overview</NavLink>
  <NavLink href="/activity">Activity</NavLink>
  <NavLink href="/settings">Settings</NavLink>
  <NavLink href="/members">Members</NavLink>
  <NavLink href="/billing">Billing</NavLink>
  <NavLink href="/security">Security</NavLink>
</Nav>`}
          >
            <div className="w-full overflow-hidden rounded-md border">
              <Nav>
                <NavLink href="#">Overview</NavLink>
                <NavLink href="#">Activity</NavLink>
                <NavLink href="#">Settings</NavLink>
                <NavLink href="#">Members</NavLink>
                <NavLink href="#">Billing</NavLink>
                <NavLink href="#">Security</NavLink>
              </Nav>
            </div>
          </ComponentPreview>
        </div>

        {/* Composition note */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Layout position
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">Nav</code>{" "}
            is{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              sticky top-0
            </code>{" "}
            by default so it pins below the global{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Header
            </code>{" "}
            when the page scrolls. Place it immediately after the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Header
            </code>{" "}
            in your page layout.
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
