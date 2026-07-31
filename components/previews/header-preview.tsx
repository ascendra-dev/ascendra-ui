"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Header, HeaderActions, HeaderChevron, HeaderLink, HeaderLinks, HeaderSlash } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["header"];

export function HeaderDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        minHeight={80}
        code={`import { Header, HeaderLink, HeaderSlash, HeaderChevron, HeaderActions, HeaderLinks } from "@/ascendra-ui";

<Header>
  <HeaderLinks>
    <HeaderLink href="#">Dashboard</HeaderLink>
  </HeaderLinks>
</Header>`}
      >
        <div className="w-full overflow-hidden rounded-lg border">
          <Header>
            <HeaderLinks>
              <HeaderLink href="#">Dashboard</HeaderLink>
            </HeaderLinks>
          </Header>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Breadcrumb with Slash
          </h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              HeaderSlash
            </code>{" "}
            between links to compose a breadcrumb trail.
          </p>
          <ComponentPreview
            minHeight={80}
            code={`<Header>
  <HeaderLinks>
    <HeaderLink href="#">Ascendra</HeaderLink>
    <HeaderSlash />
    <HeaderLink href="#">Parents</HeaderLink>
    <HeaderSlash />
    <HeaderLink href="#">Ahmed Khan</HeaderLink>
  </HeaderLinks>
</Header>`}
          >
            <div className="w-full overflow-hidden rounded-lg border">
              <Header>
                <HeaderLinks>
                  <HeaderLink href="#">Ascendra</HeaderLink>
                  <HeaderSlash />
                  <HeaderLink href="#">Parents</HeaderLink>
                  <HeaderSlash />
                  <HeaderLink href="#">Ahmed Khan</HeaderLink>
                </HeaderLinks>
              </Header>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            With Chevron and Actions
          </h3>
          <p className="text-xs text-muted-foreground">
            Add{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              HeaderChevron
            </code>{" "}
            for a switcher toggle and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              HeaderActions
            </code>{" "}
            for right-side content.
          </p>
          <ComponentPreview
            minHeight={80}
            code={`<Header>
  <HeaderLinks>
    <HeaderLink href="#">Ascendra Pay</HeaderLink>
    <HeaderChevron />
    <HeaderSlash />
    <HeaderLink href="#">Settings</HeaderLink>
  </HeaderLinks>
  <HeaderActions>
    <span className="text-xs text-muted-foreground">Admin</span>
  </HeaderActions>
</Header>`}
          >
            <div className="w-full overflow-hidden rounded-lg border">
              <Header>
                <HeaderLinks>
                  <HeaderLink href="#">Ascendra Pay</HeaderLink>
                  <HeaderChevron />
                  <HeaderSlash />
                  <HeaderLink href="#">Settings</HeaderLink>
                </HeaderLinks>
                <HeaderActions>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </HeaderActions>
              </Header>
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
