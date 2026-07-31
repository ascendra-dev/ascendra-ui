"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronDown, LuCode, LuEye, LuShieldCheck } from "react-icons/lu";

import { AsideContent, BackLink, Button, Card, CardFooter, CardFooterIcon, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, CardPanelItem, CardPanelItemCrown, CardPanelItemGroup, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, MainContent, PageHeader, PageHeaderAction, PageHeaderGroup, PageMain, PageSubtitle, PageTitle, PageWrapper, SimpleAlert, Switch, TabContent, TabList, Tabs, TabTrigger } from "@/ascendra-ui";



import { cn } from "@/ascendra-ui/shadcn";
import { CodeBlock } from "@/components/code-block";

// ─── Guide primitives ─────────────────────────────────────────────────────────

function GuideSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-3 pb-3">
          <h2 className="text-sm font-semibold whitespace-nowrap">{title}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
}

function Variant({
  label,
  note,
  noPad,
  code,
  children,
}: {
  label: string;
  note?: string;
  noPad?: boolean;
  code?: string;
  children: React.ReactNode;
}) {
  const [view, setView] = useState<"preview" | "code">("preview");

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground/70">
          {label}
        </p>
        {note && <p className="text-muted-foreground text-xs mt-0.5">{note}</p>}
      </div>
      <div className="overflow-hidden rounded-xl border">
        {code && (
          <div className="flex items-center gap-0.5 border-b bg-muted/60 px-3 py-1.5">
            {(["preview", "code"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setView(tab)}
                className={cn(
                  "rounded-sm px-2.5 py-1 text-xs font-medium capitalize transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  view === tab
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
        {view === "code" && code ? (
          <CodeBlock
            code={code}
            className="[&>div]:rounded-none [&>div]:border-0"
          />
        ) : (
          <div className={cn(!noPad && "p-6")}>{children}</div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LayoutGuidePage() {
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [asideDimmed, setAsideDimmed] = useState(false);

  return (
    <>
      {/* Breadcrumb */}
      <p className="mb-8 text-xs text-muted-foreground">
        <Link href="/showcase" className="hover:text-foreground transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Overview
        </Link>
        <span className="mx-1.5">/</span>
        Layout
        <span className="mx-1.5">/</span>
        Layout Guide
      </p>

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">Layout System</h1>
        <p className="text-muted-foreground text-sm">
          A composition guide showing how Ascendra&apos;s layout components
          assemble into full pages. These patterns are the canonical structure
          for all new pages, including forms.
        </p>
      </div>

      {/* ── 1. Back Link ──────────────────────────────────────────────────── */}
      <GuideSection
        title="Back Link"
        description="Sub-pages that navigate up to a parent use a back link placed above the page header. Use the BackLink component with the parent page's label."
      >
        <Variant
          label="Standard back link"
          code={`import { BackLink } from "@/ascendra-ui";

<BackLink href="/settings">Settings</BackLink>`}
        >
          <BackLink href="#">Settings</BackLink>
        </Variant>
      </GuideSection>

      {/* ── 2. Page Header ────────────────────────────────────────────────── */}
      <GuideSection
        title="Page Header"
        description="PageHeader sits at the top of every page and handles alignment between the title group and any header-level actions. Add flex-nowrap to prevent line-wrapping on constrained screens."
      >
        <Variant
          label="Title only"
          code={`import { PageHeader } from "@/ascendra-ui";

<PageHeader>
  <PageTitle>API Keys</PageTitle>
</PageHeader>`}
        >
          <PageHeader>
            <PageTitle>API Keys</PageTitle>
          </PageHeader>
        </Variant>

        <Variant
          label="Title + description"
          code={`import { PageHeader } from "@/ascendra-ui";

<PageHeader>
  <PageHeaderGroup>
    <PageTitle>Settings</PageTitle>
    <PageSubtitle>
      Manage your account preferences and security settings
    </PageSubtitle>
  </PageHeaderGroup>
</PageHeader>`}
        >
          <PageHeader>
            <PageHeaderGroup>
              <PageTitle>Settings</PageTitle>
              <PageSubtitle>
                Manage your account preferences and security settings
              </PageSubtitle>
            </PageHeaderGroup>
          </PageHeader>
        </Variant>

        <Variant
          label="Title + action"
          code={`import { PageHeader } from "@/ascendra-ui";

<PageHeader>
  <PageTitle>Team Members</PageTitle>
  <PageHeaderAction>
    <Button>Invite member</Button>
  </PageHeaderAction>
</PageHeader>`}
        >
          <PageHeader>
            <PageTitle>Team Members</PageTitle>
            <PageHeaderAction>
              <Button>Invite member</Button>
            </PageHeaderAction>
          </PageHeader>
        </Variant>

        <Variant
          label="Title + description + action"
          code={`import { PageHeader } from "@/ascendra-ui";

<PageHeader>
  <PageHeaderGroup>
    <PageTitle>Connections</PageTitle>
    <PageSubtitle>
      Manage integrations connected to your workspace
    </PageSubtitle>
  </PageHeaderGroup>
  <PageHeaderAction>
    <Button>Add connection</Button>
  </PageHeaderAction>
</PageHeader>`}
        >
          <PageHeader>
            <PageHeaderGroup>
              <PageTitle>Connections</PageTitle>
              <PageSubtitle>
                Manage integrations connected to your workspace
              </PageSubtitle>
            </PageHeaderGroup>
            <PageHeaderAction>
              <Button>Add connection</Button>
            </PageHeaderAction>
          </PageHeader>
        </Variant>

        <Variant
          label="Title + description + dropdown action"
          code={`import { LuChevronDown, LuEye, LuCode } from "react-icons/lu";

<PageHeader>
  <PageHeaderGroup>
    <PageTitle>Authentication</PageTitle>
    <PageSubtitle>Configure sign-in methods for your users</PageSubtitle>
  </PageHeaderGroup>
  <PageHeaderAction>
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="group">
        <Button variant="secondary">
          Preview
          <LuChevronDown className="text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align="end">
        <DropdownMenuItem>
          <LuEye /> Preview sign-up flow
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LuCode /> Sample user object
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </PageHeaderAction>
</PageHeader>`}
        >
          <PageHeader>
            <PageHeaderGroup>
              <PageTitle>Authentication</PageTitle>
              <PageSubtitle>
                Configure sign-in methods for your users
              </PageSubtitle>
            </PageHeaderGroup>
            <PageHeaderAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="group">
                  <Button variant="secondary">
                    Preview
                    <LuChevronDown className="text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={8}
                  align="end"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <DropdownMenuItem>
                    <LuEye /> Preview sign-up flow
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LuCode /> Sample user object
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </PageHeaderAction>
          </PageHeader>
        </Variant>
      </GuideSection>

      {/* ── 3. Page Structure ─────────────────────────────────────────────── */}
      <GuideSection
        title="Page Structure"
        description="The standard full-page composition tree: (BackLink) → PageHeader → PageMain → PageWrapper → PageContent body → MainContent → sections. PageWrapper renders the horizontal rule that separates the header from the content area. For tabbed pages, replace PageWrapper with Tabs — the TabList provides the divider."
      >
        <Variant
          label="Standard — back link + header + sections"
          noPad
          code={`import { BackLink } from "@/ascendra-ui";

export default function Page() {
  return (
    <div>
      <BackLink href="/overview">Overview</BackLink>
      <div className="mt-4">
        <PageHeader>
          <PageHeaderGroup>
            <PageTitle>Team Settings</PageTitle>
            <PageSubtitle>
              Configure preferences and access for your team
            </PageSubtitle>
          </PageHeaderGroup>
        </PageHeader>
      </div>
      <PageMain>
        <PageWrapper>
          <div className="mt-8 px-6 pb-6 flex flex-col gap-6">
            <MainContent>
              <Card>
                <CardHeader>
                  <CardHeaderTitle>General</CardHeaderTitle>
                  <CardHeaderSubtitle>
                    Basic team information
                  </CardHeaderSubtitle>
                </CardHeader>
                <CardPanel>
                  <CardPanelItem>
                    {/* Fields go here */}
                  </CardPanelItem>
                </CardPanel>
              </Card>
            </MainContent>
          </div>
        </PageWrapper>
      </PageMain>
    </div>
  );
}`}
        >
          <div className="px-6 pt-6 pb-0">
            <BackLink href="#">Overview</BackLink>
            <div className="mt-4">
              <PageHeader>
                <PageHeaderGroup>
                  <PageTitle>Team Settings</PageTitle>
                  <PageSubtitle>
                    Configure preferences and access for your team
                  </PageSubtitle>
                </PageHeaderGroup>
              </PageHeader>
            </div>
          </div>
          <PageMain>
            <PageWrapper>
              <div className="mt-8 px-6 pb-6 flex flex-col gap-6">
                <MainContent>
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>General</CardHeaderTitle>
                      <CardHeaderSubtitle>
                        Basic team information
                      </CardHeaderSubtitle>
                    </CardHeader>
                    <CardPanel>
                      <CardPanelItem>
                        <p className="text-sm text-muted-foreground">
                          Panel items go here
                        </p>
                      </CardPanelItem>
                    </CardPanel>
                  </Card>
                </MainContent>
              </div>
            </PageWrapper>
          </PageMain>
        </Variant>

        <Variant
          label="With tabs — header + tab bar + per-tab content"
          note="TabContent carries the same mt-8 spacing as PageContent, so PageContent is not needed inside each tab."
          noPad
          code={`import { PageHeader } from "@/ascendra-ui";

export default function Page() {
  return (
    <div>
      <div className="px-6 pt-6 pb-0">
        <PageHeader>
          <PageHeaderGroup>
            <PageTitle>User Profile</PageTitle>
            <PageSubtitle>
              Manage your personal information and preferences
            </PageSubtitle>
          </PageHeaderGroup>
        </PageHeader>
      </div>
      <PageMain className="p-6">
        <Tabs defaultValue="general">
          <TabList>
            <TabTrigger value="general">General</TabTrigger>
            <TabTrigger value="security">Security</TabTrigger>
            <TabTrigger value="notifications" dirty>
              Notifications
            </TabTrigger>
          </TabList>
          <TabContent value="general">
            <MainContent>
              <Card>
                <CardHeader>
                  <CardHeaderTitle>
                    Personal details
                  </CardHeaderTitle>
                </CardHeader>
              </Card>
            </MainContent>
          </TabContent>
        </Tabs>
      </PageMain>
    </div>
  );
}`}
        >
          <div className="px-6 pt-6 pb-0">
            <PageHeader>
              <PageHeaderGroup>
                <PageTitle>User Profile</PageTitle>
                <PageSubtitle>
                  Manage your personal information and preferences
                </PageSubtitle>
              </PageHeaderGroup>
            </PageHeader>
          </div>
          <PageMain className="p-6">
            <Tabs defaultValue="general">
              <TabList>
                <TabTrigger value="general">General</TabTrigger>
                <TabTrigger value="security">Security</TabTrigger>
                <TabTrigger value="notifications" dirty>
                  Notifications
                </TabTrigger>
              </TabList>
              <TabContent value="general">
                <MainContent>
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>
                        Personal details
                      </CardHeaderTitle>
                    </CardHeader>
                    <CardPanel>
                      <CardPanelItem>
                        <p className="text-sm text-muted-foreground">
                          Fields here
                        </p>
                      </CardPanelItem>
                    </CardPanel>
                  </Card>
                </MainContent>
              </TabContent>
              <TabContent value="security">
                <MainContent>
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>
                        Password &amp; 2FA
                      </CardHeaderTitle>
                    </CardHeader>
                  </Card>
                </MainContent>
              </TabContent>
              <TabContent value="notifications">
                <MainContent>
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>
                        Notification preferences
                      </CardHeaderTitle>
                    </CardHeader>
                  </Card>
                </MainContent>
              </TabContent>
            </Tabs>
          </PageMain>
        </Variant>
      </GuideSection>

      {/* ── 4. Content Sections ───────────────────────────────────────────── */}
      <GuideSection
        title="Content Sections"
        description="Card is the primary content container — a muted rounded card that groups related settings. Stack multiple sections inside MainContent. Use CardFooter for inline notes, and SimpleAlert above the section stack for page-level notices."
      >
        <Variant
          label="Header only"
          code={`import { Card } from "@/ascendra-ui";

<Card>
  <CardHeader>
    <CardHeaderTitle>Section title</CardHeaderTitle>
    <CardHeaderSubtitle>
      Optional subtitle that describes the section purpose
    </CardHeaderSubtitle>
  </CardHeader>
</Card>`}
        >
          <Card>
            <CardHeader>
              <CardHeaderTitle>Section title</CardHeaderTitle>
              <CardHeaderSubtitle>
                Optional subtitle that describes the section purpose
              </CardHeaderSubtitle>
            </CardHeader>
          </Card>
        </Variant>

        <Variant
          label="Header + footer"
          code={`import { LuInfo } from "react-icons/lu";

<Card>
  <CardHeader>
    <CardHeaderTitle>Email authentication</CardHeaderTitle>
    <CardHeaderSubtitle>
      Allow users to sign in with their email address
    </CardHeaderSubtitle>
  </CardHeader>
  <CardFooter>
    <CardFooterIcon />
    Footer text for additional context, caveats, or related links.
  </CardFooter>
</Card>`}
        >
          <Card>
            <CardHeader>
              <CardHeaderTitle>
                Email authentication
              </CardHeaderTitle>
              <CardHeaderSubtitle>
                Allow users to sign in with their email address
              </CardHeaderSubtitle>
            </CardHeader>
            <CardFooter>
              <CardFooterIcon />
              Footer text for additional context, caveats, or related links.
            </CardFooter>
          </Card>
        </Variant>

        <Variant
          label="Alert above sections"
          note="SimpleAlert goes inside MainContent, above the section stack — not inside a Card."
          code={`import { SimpleAlert } from "@/ascendra-ui";

<MainContent>
  <SimpleAlert>
    You are viewing a read-only snapshot. Contact your admin to make changes.
  </SimpleAlert>
  <Card>
    <CardHeader>
      <CardHeaderTitle>Permissions</CardHeaderTitle>
    </CardHeader>
  </Card>
</MainContent>`}
        >
          <div className="flex flex-col gap-6">
            <SimpleAlert>
              You are viewing a read-only snapshot. Contact your admin to make
              changes.
            </SimpleAlert>
            <Card>
              <CardHeader>
                <CardHeaderTitle>Permissions</CardHeaderTitle>
              </CardHeader>
            </Card>
          </div>
        </Variant>

        <Variant
          label="Multiple sections (stacked)"
          code={`import { MainContent } from "@/ascendra-ui";

<MainContent>
  <Card>
    <CardHeader>
      <CardHeaderTitle>Account details</CardHeaderTitle>
    </CardHeader>
  </Card>
  <Card>
    <CardHeader>
      <CardHeaderTitle>Billing</CardHeaderTitle>
    </CardHeader>
  </Card>
  <Card danger>
    <CardHeader>
      <CardHeaderTitle>Danger zone</CardHeaderTitle>
      <CardHeaderSubtitle>
        Irreversible actions — proceed with care
      </CardHeaderSubtitle>
    </CardHeader>
  </Card>
</MainContent>`}
        >
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardHeaderTitle>Account details</CardHeaderTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardHeaderTitle>Billing</CardHeaderTitle>
              </CardHeader>
            </Card>
            <Card danger>
              <CardHeader>
                <CardHeaderTitle>Danger zone</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Irreversible actions — proceed with care
                </CardHeaderSubtitle>
              </CardHeader>
            </Card>
          </div>
        </Variant>

        <Variant
          label="Collapseable section"
          note='Pass collapseable="expanded" or collapseable="collapsed" to Card. State is managed internally — the header renders a minimize/maximize toggle. Add hasError to draw a destructive outline when collapsed fields have validation errors.'
          code={`import { Card } from "@/ascendra-ui";

// Starts expanded
<Card collapseable="expanded">
  <CardHeader>
    <CardHeaderTitle>Notification preferences</CardHeaderTitle>
    <CardHeaderSubtitle>
      Choose when and how you receive notifications
    </CardHeaderSubtitle>
  </CardHeader>
  <CardPanel>
    <CardPanelItem>Panel content</CardPanelItem>
  </CardPanel>
</Card>

// Starts collapsed
<Card collapseable="collapsed">
  <CardHeader>
    <CardHeaderTitle>Advanced settings</CardHeaderTitle>
  </CardHeader>
  <CardPanel>
    <CardPanelItem>Panel content</CardPanelItem>
  </CardPanel>
</Card>

// With validation error outline (when collapsed fields fail submit)
<Card collapseable="expanded" hasError={!!errors.notificationEmail}>
  ...
</Card>`}
        >
          <div className="flex flex-col gap-4">
            <Card collapseable="expanded">
              <CardHeader>
                <CardHeaderTitle>
                  Notification preferences
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Choose when and how you receive notifications
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <CardPanelItem>
                  <p className="text-sm text-muted-foreground">
                    Panel content goes here
                  </p>
                </CardPanelItem>
              </CardPanel>
            </Card>
            <Card collapseable="collapsed">
              <CardHeader>
                <CardHeaderTitle>
                  Advanced settings
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  These settings are collapsed by default
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <CardPanelItem>
                  <p className="text-sm text-muted-foreground">
                    Panel content goes here
                  </p>
                </CardPanelItem>
              </CardPanel>
            </Card>
            <Card collapseable="collapsed" hasError>
              <CardHeader>
                <CardHeaderTitle>Billing details</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Collapsed with a validation error outline
                </CardHeaderSubtitle>
              </CardHeader>
              <CardPanel>
                <CardPanelItem>
                  <p className="text-sm text-muted-foreground">
                    Panel content goes here
                  </p>
                </CardPanelItem>
              </CardPanel>
            </Card>
          </div>
        </Variant>
      </GuideSection>

      {/* ── 5. Section Panels ─────────────────────────────────────────────── */}
      <GuideSection
        title="Section Panels"
        description="CardPanel renders the white card that lives inside a section. CardPanelItem is each row within that card, separated by a top border (the first item has no border). Use CardPanelItemGroup to manage vertical spacing between elements within an item. Panels can animate to zero height when collapsed."
      >
        <Variant
          label="Single panel item"
          code={`import { Card } from "@/ascendra-ui";

<Card>
  <CardHeader>
    <CardHeaderTitle>Account deletion</CardHeaderTitle>
  </CardHeader>
  <CardPanel>
    <CardPanelItem>
      Allow users to delete their accounts from the profile page
    </CardPanelItem>
  </CardPanel>
</Card>`}
        >
          <Card>
            <CardHeader>
              <CardHeaderTitle>Account deletion</CardHeaderTitle>
            </CardHeader>
            <CardPanel>
              <CardPanelItem>
                Allow users to delete their accounts from the profile page
              </CardPanelItem>
            </CardPanel>
          </Card>
        </Variant>

        <Variant
          label="Multiple panel items"
          code={`import { Card } from "@/ascendra-ui";

<Card>
  <CardHeader>
    <CardHeaderTitle>Password policy</CardHeaderTitle>
  </CardHeader>
  <CardPanel>
    <CardPanelItem>
      Require a minimum of 8 characters
    </CardPanelItem>
    <CardPanelItem className="relative">
      <CardPanelItemCrown variant={"default"}>
        Authenticator application must be enabled to generate backup codes
      </CardPanelItemCrown>
      Reject known compromised passwords
    </CardPanelItem>
    <CardPanelItem>
      <Button variant="secondary">Apply to existing users</Button>
    </CardPanelItem>
  </CardPanel>
</Card>`}
        >
          <Card>
            <CardHeader>
              <CardHeaderTitle>Password policy</CardHeaderTitle>
            </CardHeader>
            <CardPanel>
              <CardPanelItem>
                Require a minimum of 8 characters
              </CardPanelItem>
              <CardPanelItem className="relative">
                <CardPanelItemCrown variant={"default"}>
                  Authenticator application must be enabled to generate backup
                  codes
                </CardPanelItemCrown>
                Reject known compromised passwords
              </CardPanelItem>
              <CardPanelItem>
                <Button variant="secondary">Apply to existing users</Button>
              </CardPanelItem>
            </CardPanel>
          </Card>
        </Variant>

        <Variant
          label="PanelItemGroup"
          note="Wraps multiple elements inside a single panel item and adds consistent vertical spacing between them."
          code={`import { SimpleAlert } from "@/ascendra-ui";

<Card>
  <CardHeader>
    <CardHeaderTitle>Sign-up restrictions</CardHeaderTitle>
  </CardHeader>
  <CardPanel>
    <CardPanelItem>
      <CardPanelItemGroup>
        <p className="text-sm">
          Restrict sign-up to specific email domains
        </p>
        <SimpleAlert>
          Existing users outside the allowed domains retain their access.
        </SimpleAlert>
      </CardPanelItemGroup>
    </CardPanelItem>
  </CardPanel>
</Card>`}
        >
          <Card>
            <CardHeader>
              <CardHeaderTitle>
                Sign-up restrictions
              </CardHeaderTitle>
            </CardHeader>
            <CardPanel>
              <CardPanelItem>
                <CardPanelItemGroup>
                  <p className="text-sm">
                    Restrict sign-up to specific email domains
                  </p>
                  <SimpleAlert>
                    Existing users outside the allowed domains retain their
                    access.
                  </SimpleAlert>
                </CardPanelItemGroup>
              </CardPanelItem>
            </CardPanel>
          </Card>
        </Variant>

        <Variant
          label="Collapsible panel"
          note="Pair a Switch in the section header with the collapsed prop on CardPanel. The footer border hides automatically when the panel is open."
          code={`"use client";
import { useState } from "react";
import { LuShieldCheck } from "react-icons/lu";

export function CollapsibleSection() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Switch
            checked={!collapsed}
            onClick={() => setCollapsed((prev) => !prev)}
          />
          <CardHeaderTitle>Email sign-up</CardHeaderTitle>
        </div>
        <CardHeaderSubtitle className="ml-8">
          Allow users to register with an email address and password
        </CardHeaderSubtitle>
      </CardHeader>
      <CardPanel collapsed={collapsed}>
        <CardPanelItem>
          Minimum password length: 8 characters
        </CardPanelItem>
        <CardPanelItem>
          Reject known compromised passwords
        </CardPanelItem>
      </CardPanel>
      <CardFooter>
        <CardFooterIcon icon={LuShieldCheck} />
        These settings apply to new sign-ups only.
      </CardFooter>
    </Card>
  );
}`}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Switch
                  checked={!panelCollapsed}
                  onClick={() => setPanelCollapsed((prev) => !prev)}
                />
                <CardHeaderTitle>Email sign-up</CardHeaderTitle>
              </div>
              <CardHeaderSubtitle className="ml-8">
                Allow users to register with an email address and password
              </CardHeaderSubtitle>
            </CardHeader>
            <CardPanel collapsed={panelCollapsed}>
              <CardPanelItem>
                Minimum password length: 8 characters
              </CardPanelItem>
              <CardPanelItem>
                Reject known compromised passwords
              </CardPanelItem>
            </CardPanel>
            <CardFooter>
              <CardFooterIcon icon={LuShieldCheck} />
              These settings apply to new sign-ups only.
            </CardFooter>
          </Card>
        </Variant>
      </GuideSection>

      {/* ── 6. Two-column layout ──────────────────────────────────────────── */}
      <GuideSection
        title="Two-column layout"
        description="Place AsideContent after MainContent to create a sticky contextual sidebar. On small screens both columns stack. The dimmed prop fades the aside and makes it inert — useful when sidebar content reflects state from a disabled section above."
      >
        <Variant
          label="MainContent + AsideContent"
          noPad
          code={`import { MainContent } from "@/ascendra-ui";

<div className="flex flex-col items-start gap-8 sm:flex-row">
  <MainContent>
    <Card>
      <CardHeader>
        <CardHeaderTitle>Password sign-in</CardHeaderTitle>
        <CardHeaderSubtitle>
          Require users to authenticate with a password
        </CardHeaderSubtitle>
      </CardHeader>
      <CardPanel>
        <CardPanelItem>
          Minimum password length: 8 characters
        </CardPanelItem>
        <CardPanelItem>
          Reject known compromised passwords
        </CardPanelItem>
      </CardPanel>
    </Card>
  </MainContent>
  <AsideContent dimmed={dimmed}>
    {/* Sidebar content */}
  </AsideContent>
</div>`}
        >
          <div className="flex items-center justify-end gap-2 border-b px-4 py-3">
            <span className="text-xs text-muted-foreground">Dimmed aside</span>
            <Switch
              checked={asideDimmed}
              onClick={() => setAsideDimmed((prev) => !prev)}
            />
          </div>
          <div className="flex flex-col items-start gap-8 p-6 sm:flex-row">
            <MainContent>
              <Card>
                <CardHeader>
                  <CardHeaderTitle>
                    Password sign-in
                  </CardHeaderTitle>
                  <CardHeaderSubtitle>
                    Require users to authenticate with a password
                  </CardHeaderSubtitle>
                </CardHeader>
                <CardPanel>
                  <CardPanelItem>
                    Minimum password length: 8 characters
                  </CardPanelItem>
                  <CardPanelItem>
                    Reject known compromised passwords
                  </CardPanelItem>
                </CardPanel>
              </Card>
            </MainContent>
            <AsideContent dimmed={asideDimmed}>
              <div className="flex min-w-48 flex-col gap-3 text-sm">
                <div className="border-border border-b pb-3">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Min. password length
                  </p>
                  <p>8 characters</p>
                </div>
                <div className="border-border border-b pb-3">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Compromised passwords
                  </p>
                  <p>Rejected</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Password rules
                  </p>
                  <p>None</p>
                </div>
              </div>
            </AsideContent>
          </div>
        </Variant>
      </GuideSection>

      {/* ── Page Container ────────────────────────────────────────────────── */}
      <GuideSection
        title="Page Container"
        description="The .app-container CSS class applies responsive horizontal padding and a max-width cap. Use it on the outermost div of any full-viewport-width page that lives outside the showcase sidebar layout — for example a marketing page, a public-facing route, or a standalone dashboard that doesn't share the sidebar chrome."
      >
        <Variant
          label="app-container"
          code={`// Defined in globals.css — no import needed
// Mobile: 1.5rem (24px) horizontal padding
// Tablet/desktop (md+): 2.5rem (40px) horizontal padding
// max-width: 72rem (max-w-6xl)

<div className="app-container">
  <BackLink href="/dashboard">Dashboard</BackLink>
  <PageHeader>
    <PageTitle>Report</PageTitle>
  </PageHeader>
  <PageMain>
    {/* page content */}
  </PageMain>
</div>`}
        >
          <div className="rounded border bg-muted/40 px-6 py-4 text-sm text-muted-foreground">
            <p className="font-mono text-xs mb-2 text-foreground">
              .app-container
            </p>
            <p>
              Applies{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                w-[calc(100%-var(--app-layout-spacing))]
              </code>{" "}
              with{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                mx-auto max-w-6xl
              </code>
              .
            </p>
            <p className="mt-1">
              Responsive spacing:{" "}
              <strong className="text-foreground">24px</strong> mobile →{" "}
              <strong className="text-foreground">40px</strong> tablet/desktop.
            </p>
          </div>
        </Variant>
      </GuideSection>
    </>
  );
}
