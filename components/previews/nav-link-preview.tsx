"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { NavLink, NavLinkBadge } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["nav-link"];

export function NavLinkDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { NavLink, NavLinkBadge } from "@/ascendra-ui";

<NavLink href="/parents" exact>Parents</NavLink>`}
      >
        <div className="border-b pb-1">
          <NavLink href="#" exact>
            Parents
          </NavLink>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Active vs Inactive
          </h3>
          <p className="text-xs text-muted-foreground">
            Active state is controlled by the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              exact
            </code>{" "}
            prop (static demo — in production, active state is derived from the
            current pathname).
          </p>
          <ComponentPreview
            code={`<NavLink href="#" exact>Overview</NavLink>
<NavLink href="#">Parents</NavLink>
<NavLink href="#">Invoices</NavLink>`}
          >
            <div className="flex items-center gap-1 border-b pb-1">
              <NavLink href="#" exact>
                Overview
              </NavLink>
              <NavLink href="#">Parents</NavLink>
              <NavLink href="#">Invoices</NavLink>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            With NavLinkBadge
          </h3>
          <p className="text-xs text-muted-foreground">
            Attach a dashed badge to flag new or beta features.
          </p>
          <ComponentPreview
            code={`<NavLink href="#">
  Analytics
  <NavLinkBadge>New</NavLinkBadge>
</NavLink>`}
          >
            <div className="border-b pb-1">
              <NavLink href="#">
                Analytics
                <NavLinkBadge>New</NavLinkBadge>
              </NavLink>
            </div>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
