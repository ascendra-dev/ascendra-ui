import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardHeaderSubtitle,
  CardHeaderTitle,
  PageHeader,
  PageMain,
  PageSubtitle,
  PageTitle,
  SimpleBadge,
} from "@/ascendra-ui";
import { LuFolderTree, LuRefreshCw } from "react-icons/lu";

export default function StarterPage() {
  return (
    <PageMain>
      <PageHeader>
        <div>
          <PageTitle>Welcome to your app</PageTitle>
          <PageSubtitle>Scaffolded from Ascendra UI</PageSubtitle>
        </div>
        <Button asChild variant="secondary">
          <Link href="https://github.com/zakashah/ascendra-ui" target="_blank" rel="noreferrer">
            View the source library
          </Link>
        </Button>
      </PageHeader>

      <div className="max-w-3xl space-y-10">
        <section id="welcome" className="scroll-mt-20 space-y-4">
          <h2 className="text-lg font-medium">Welcome</h2>
          <p className="text-sm text-muted-foreground">
            This page, its sidebar, and this whole <code className="rounded bg-muted px-1 font-mono">/starter</code> route
            are built entirely from real Ascendra UI components — <code className="rounded bg-muted px-1 font-mono">PageLayout</code>,{" "}
            <code className="rounded bg-muted px-1 font-mono">Card</code>, <code className="rounded bg-muted px-1 font-mono">SideBar</code>,{" "}
            same as everything else in <code className="rounded bg-muted px-1 font-mono">ascendra-ui/</code>. It&apos;s a working
            example, not a mockup — read its source at{" "}
            <code className="rounded bg-muted px-1 font-mono">app/starter/page.tsx</code> to see the patterns in context.
          </p>
          <p className="text-sm text-muted-foreground">
            Delete this route whenever you&apos;re ready — it&apos;s a demo, not a dependency.
          </p>
        </section>

        <section id="structure" className="scroll-mt-20 space-y-4">
          <div className="flex items-center gap-2">
            <LuFolderTree className="size-4 text-muted-foreground" />
            <h2 className="text-lg font-medium">Project structure</h2>
          </div>
          <Card>
            <CardHeader>
              <CardHeaderTitle>What&apos;s yours vs. what&apos;s managed</CardHeaderTitle>
              <CardHeaderSubtitle>
                Only <code className="rounded bg-muted px-1 font-mono">ascendra-ui/</code> is ever touched by tooling again.
              </CardHeaderSubtitle>
            </CardHeader>
            <div className="grid gap-3 px-6 pb-6 text-sm sm:grid-cols-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs">
                  ascendra-ui/ <SimpleBadge variant="secondary">managed</SimpleBadge>
                </div>
                <p className="text-xs text-muted-foreground">
                  The component library and its docs. Replaced wholesale by <code>ascendra.js update</code> — never edit it directly.
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs">
                  app/ <SimpleBadge variant="secondary">yours</SimpleBadge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your routes. <code>app/layout.tsx</code> and <code>app/globals.css</code> already wire up theming and providers.
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs">
                  components/, hooks/, lib/ <SimpleBadge variant="secondary">yours</SimpleBadge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Empty on purpose — your custom components, hooks, and config live here.
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs">
                  providers/, utils/ <SimpleBadge variant="secondary">yours</SimpleBadge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your React context providers and pure utility functions.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section id="docs" className="scroll-mt-20 space-y-4">
          <h2 className="text-lg font-medium">Where the docs live</h2>
          <p className="text-sm text-muted-foreground">
            Before building any UI, check these two files — they&apos;re what your AI assistant reads too:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <code className="rounded bg-muted px-1 font-mono">ascendra-ui/docs/ui-reference.md</code> — every component,
              its props, and its import path.
            </li>
            <li>
              <code className="rounded bg-muted px-1 font-mono">ascendra-ui/docs/showcase-reference.md</code> — page
              patterns, layout guidance, and design tokens.
            </li>
            <li>
              <code className="rounded bg-muted px-1 font-mono">CLAUDE.md</code> — project conventions for Claude Code,
              already tailored to this stack.
            </li>
          </ul>
        </section>

        <section id="update" className="scroll-mt-20 space-y-4">
          <div className="flex items-center gap-2">
            <LuRefreshCw className="size-4 text-muted-foreground" />
            <h2 className="text-lg font-medium">Staying updated</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            There&apos;s no version to track — updating just replaces the library folder with whatever is current on the
            public repo&apos;s default branch. Run this right here, any time:
          </p>
          <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-xs">
            <code>npm run ascendra-ui:update</code>
          </pre>
          <p className="text-sm text-muted-foreground">
            This replaces <code className="rounded bg-muted px-1 font-mono">ascendra-ui/</code> (docs included) and nothing
            else. If the update adds a new dependency, install it yourself — check the library&apos;s{" "}
            <code className="rounded bg-muted px-1 font-mono">package.json</code> against your own.
          </p>
        </section>
      </div>
    </PageMain>
  );
}
