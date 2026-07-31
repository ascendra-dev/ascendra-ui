"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  SideBarMenu,
  SideBarMenuContent,
  SideBarMenuHeader,
  SideBarMenuItem,
  SideBarMenuSet,
  SideBarMenuSetTitle,
} from "@/ascendra-ui";
import { SidebarSearch } from "@/components/sidebar-search";
import { registry } from "@/lib/registry";
import { LuUsers, LuFileText, LuLayoutDashboard } from "react-icons/lu";

const meta = registry["sidebar-menu"];

export function SidebarMenuDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        align="start"
        code={`import {
  SideBarMenu, SideBarMenuHeader, SideBarMenuContent,
  SideBarMenuItem, SideBarMenuSet, SideBarMenuSetTitle,
} from "@/ascendra-ui";

<SideBarMenu basePath="/merchant">
  <SideBarMenuHeader icon={LuUsers}>Parents</SideBarMenuHeader>
  <SideBarMenuContent>
    <SideBarMenuItem path="/merchant/parents">All Parents</SideBarMenuItem>
    <SideBarMenuItem path="/merchant/parents/new">Add Parent</SideBarMenuItem>
  </SideBarMenuContent>
</SideBarMenu>`}
      >
        <div className="w-52 rounded-lg border bg-background p-2">
          <SideBarMenu basePath="/showcase">
            <SideBarMenuHeader icon={LuUsers}>Parents</SideBarMenuHeader>
            <SideBarMenuContent>
              <SideBarMenuItem path="/showcase/parents">
                All Parents
              </SideBarMenuItem>
              <SideBarMenuItem path="/showcase/parents/new">
                Add Parent
              </SideBarMenuItem>
            </SideBarMenuContent>
          </SideBarMenu>
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Grouped Menu Sets
          </h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              SideBarMenuSet
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              SideBarMenuSetTitle
            </code>{" "}
            to group related menus under a heading.
          </p>
          <ComponentPreview
            align="start"
            code={`<div className="flex flex-col gap-0.5">
  <SideBarMenuSet>
    <SideBarMenuSetTitle>Main</SideBarMenuSetTitle>
    <SideBarMenuItem path="/dashboard" icon={LuLayoutDashboard}>
      Dashboard
    </SideBarMenuItem>
  </SideBarMenuSet>

  <SideBarMenuSet>
    <SideBarMenuSetTitle>Management</SideBarMenuSetTitle>
    <SideBarMenu basePath="/merchant/parents">
      <SideBarMenuHeader icon={LuUsers}>Parents</SideBarMenuHeader>
      <SideBarMenuContent>
        <SideBarMenuItem path="/merchant/parents">All Parents</SideBarMenuItem>
        <SideBarMenuItem path="/merchant/parents/new">Add Parent</SideBarMenuItem>
      </SideBarMenuContent>
    </SideBarMenu>
    <SideBarMenu basePath="/merchant/invoices">
      <SideBarMenuHeader icon={LuFileText}>Invoices</SideBarMenuHeader>
      <SideBarMenuContent>
        <SideBarMenuItem path="/merchant/invoices">All Invoices</SideBarMenuItem>
      </SideBarMenuContent>
    </SideBarMenu>
  </SideBarMenuSet>
</div>`}
          >
            <div className="w-52 rounded-lg border bg-background p-2">
              <div className="flex flex-col gap-0.5">
                <SideBarMenuSet>
                  <SideBarMenuSetTitle>Main</SideBarMenuSetTitle>
                  <SideBarMenuItem
                    path="/showcase/dashboard"
                    icon={LuLayoutDashboard}
                  >
                    Dashboard
                  </SideBarMenuItem>
                </SideBarMenuSet>
                <SideBarMenuSet>
                  <SideBarMenuSetTitle>Management</SideBarMenuSetTitle>
                  <SideBarMenu basePath="/showcase/parents">
                    <SideBarMenuHeader icon={LuUsers}>
                      Parents
                    </SideBarMenuHeader>
                    <SideBarMenuContent>
                      <SideBarMenuItem path="/showcase/parents">
                        All Parents
                      </SideBarMenuItem>
                      <SideBarMenuItem path="/showcase/parents/new">
                        Add Parent
                      </SideBarMenuItem>
                    </SideBarMenuContent>
                  </SideBarMenu>
                  <SideBarMenu basePath="/showcase/invoices">
                    <SideBarMenuHeader icon={LuFileText}>
                      Invoices
                    </SideBarMenuHeader>
                    <SideBarMenuContent>
                      <SideBarMenuItem path="/showcase/invoices">
                        All Invoices
                      </SideBarMenuItem>
                    </SideBarMenuContent>
                  </SideBarMenu>
                </SideBarMenuSet>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Sidebar Search
          </h3>
          <p className="text-xs text-muted-foreground">
            Wrap your sidebar menu in{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              SidebarSearch
            </code>{" "}
            to add a search input that filters items directly from the children
            tree — no separate data config required.
          </p>
          <ComponentPreview
            align="start"
            code={`import { SidebarSearch } from "@/components/sidebar-search";

<SidebarSearch>
  <SideBarMenuSet>
    <SideBarMenuSetTitle>Management</SideBarMenuSetTitle>
    <SideBarMenu basePath="/merchant/parents">
      <SideBarMenuHeader icon={LuUsers}>Parents</SideBarMenuHeader>
      <SideBarMenuContent>
        <SideBarMenuItem path="/merchant/parents">All Parents</SideBarMenuItem>
        <SideBarMenuItem path="/merchant/parents/new">Add Parent</SideBarMenuItem>
      </SideBarMenuContent>
    </SideBarMenu>
    <SideBarMenu basePath="/merchant/invoices">
      <SideBarMenuHeader icon={LuFileText}>Invoices</SideBarMenuHeader>
      <SideBarMenuContent>
        <SideBarMenuItem path="/merchant/invoices">All Invoices</SideBarMenuItem>
      </SideBarMenuContent>
    </SideBarMenu>
  </SideBarMenuSet>
</SidebarSearch>`}
          >
            <div className="w-64 rounded-lg border bg-background overflow-hidden">
              <SidebarSearch>
                <div className="pb-2 pt-4">
                  <SideBarMenuSet>
                    <SideBarMenuSetTitle>Management</SideBarMenuSetTitle>
                    <SideBarMenu basePath="/showcase/parents">
                      <SideBarMenuHeader icon={LuUsers}>
                        Parents
                      </SideBarMenuHeader>
                      <SideBarMenuContent>
                        <SideBarMenuItem path="/showcase/parents">
                          All Parents
                        </SideBarMenuItem>
                        <SideBarMenuItem path="/showcase/parents/new">
                          Add Parent
                        </SideBarMenuItem>
                      </SideBarMenuContent>
                    </SideBarMenu>
                    <SideBarMenu basePath="/showcase/invoices">
                      <SideBarMenuHeader icon={LuFileText}>
                        Invoices
                      </SideBarMenuHeader>
                      <SideBarMenuContent>
                        <SideBarMenuItem path="/showcase/invoices">
                          All Invoices
                        </SideBarMenuItem>
                      </SideBarMenuContent>
                    </SideBarMenu>
                  </SideBarMenuSet>
                </div>
              </SidebarSearch>
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
