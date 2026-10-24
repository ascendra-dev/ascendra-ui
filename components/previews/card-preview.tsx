"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { CodeBlock } from "../code-block";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { cn } from "@/ascendra-ui/shadcn";
import { type AccentColor, type BgStyle, type BgTo, type BorderSide, type BorderStroke, Button, Card, CardFooter, CardFooterIcon, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardList, CardListItem, CardListLink, CardPanel, CardPanelField, CardPanelItem, CardPanelItemCrown, CardPanelItemGroup, CardTable, DataTableEmptyBody, Input, SimpleBadge, Table, TableBody, TableCell, TableHead, TableHeader, TableHeaderRow, TableRow } from "@/ascendra-ui";
import { InfoIcon, TriangleAlertIcon } from "lucide-react";


// ─── Card list / card table samples ──────────────────────────────────────────

const SOURCES = [
  { route: "POST /payments", count: 1284, share: 1 },
  { route: "GET /invoices", count: 902, share: 0.7 },
  { route: "POST /login", count: 611, share: 0.48 },
  { route: "GET /customers", count: 340, share: 0.26 },
  { route: "POST /refunds", count: 211, share: 0.16 },
  { route: "GET /reports", count: 98, share: 0.08 },
  { route: "DELETE /cards", count: 41, share: 0.03 },
];

function SampleCardList() {
  return (
    <Card collapseable="expanded">
      <CardHeader>
        <CardHeaderTitle>Rejections by route</CardHeaderTitle>
        <CardHeaderSubtitle>Past 7 days · most first</CardHeaderSubtitle>
      </CardHeader>
      <CardPanel>
        <CardList columns="auto auto 1fr" visibleRows={5}>
          {SOURCES.map((r) => (
            <CardListItem key={r.route}>
              <CardListLink href="#">
                <SimpleBadge>{r.route}</SimpleBadge>
              </CardListLink>
              <span className="text-right font-mono tabular-nums">{r.count.toLocaleString()}</span>
              <span className="bg-primary/15 block h-1.5 rounded-full">
                <span className="bg-primary block h-full rounded-full" style={{ width: `${r.share * 100}%` }} />
              </span>
            </CardListItem>
          ))}
        </CardList>
      </CardPanel>
      <CardFooter>
        <CardFooterIcon />
        <span>Each row opens Rejections filtered to that route.</span>
      </CardFooter>
    </Card>
  );
}

function SampleCardListEmpty() {
  return (
    <Card collapseable="expanded">
      <CardHeader>
        <CardHeaderTitle>Top sources</CardHeaderTitle>
        <CardHeaderSubtitle>Past 24 hours</CardHeaderSubtitle>
      </CardHeader>
      <CardPanel>
        <DataTableEmptyBody isLoading={false} isEmpty title="No rejections" description="Nothing hit a limit — try a longer period." className="h-40" />
      </CardPanel>
    </Card>
  );
}

const LOCKS = [
  { job: "invoice-reminders", holder: "worker-3", since: "2 min ago", state: "held" },
  { job: "nightly-export", holder: "worker-1", since: "41 min ago", state: "stale" },
  { job: "audit-pruner", holder: "worker-2", since: "6 s ago", state: "held" },
];

function SampleCardTable() {
  return (
    <Card collapseable="expanded">
      <CardHeader>
        <CardHeaderTitle>Locks</CardHeaderTitle>
        <CardHeaderSubtitle>Who holds which job right now</CardHeaderSubtitle>
      </CardHeader>
      <CardTable>
        <Table>
          <TableHeader>
            <TableHeaderRow>
              <TableHead>Job</TableHead>
              <TableHead>Holder</TableHead>
              <TableHead>Since</TableHead>
              <TableHead className="text-right">State</TableHead>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {LOCKS.map((l) => (
              <TableRow key={l.job}>
                <TableCell className="font-mono text-xs">{l.job}</TableCell>
                <TableCell>{l.holder}</TableCell>
                <TableCell className="text-muted-foreground">{l.since}</TableCell>
                <TableCell className="text-right">
                  <SimpleBadge variant={l.state === "stale" ? "orange" : "green"}>{l.state}</SimpleBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardTable>
      <CardFooter>
        <CardFooterIcon />
        <span>A stale lock is released when its holder stops renewing it.</span>
      </CardFooter>
    </Card>
  );
}

// ─── Reusable sample content ──────────────────────────────────────────────────

function SampleItems() {
  return (
    <>
      <CardPanelItem>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">School Name</span>
          <span className="text-sm text-muted-foreground">Beacon Academy</span>
        </div>
      </CardPanelItem>
      <CardPanelItem>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Contact Email</span>
          <span className="text-sm text-muted-foreground">
            admin@beacon.edu.pk
          </span>
        </div>
      </CardPanelItem>
      <CardPanelItem>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Phone</span>
          <span className="text-sm text-muted-foreground">+92 300 0000000</span>
        </div>
      </CardPanelItem>
    </>
  );
}

// ─── Playground ──────────────────────────────────────────────────────────────

const ACCENT_COLORS: AccentColor[] = [
  "orange", "blue", "amber", "teal", "indigo", "purple", "red", "slate",
];
const COLOR_SWATCH: Record<AccentColor, string> = {
  orange: "bg-orange-500", blue: "bg-blue-500", amber: "bg-amber-500",
  teal: "bg-teal-500", indigo: "bg-indigo-500", purple: "bg-purple-500",
  red: "bg-red-500", slate: "bg-slate-500",
};

const BORDER_SIDES: BorderSide[] = ["t", "l", "r", "b", "all"];
const BORDER_SIDE_LABEL: Record<BorderSide, string> = {
  t: "Top", l: "Left", r: "Right", b: "Bottom", all: "All",
};
const BORDER_STROKES: BorderStroke[] = [1, 2, 3];
const BG_STYLES: BgStyle[] = ["linear", "radial", "conic", "solid"];
const BG_TOS: BgTo[] = ["transparent", "white", "black", ...ACCENT_COLORS];

type BorderState = { enabled: boolean; side: BorderSide; stroke: BorderStroke; color: AccentColor };
type BgState = { enabled: boolean; style: BgStyle; side: BorderSide; color: AccentColor; to: BgTo };

function Pill({ active, onClick, children, className }: {
  active: boolean; onClick: () => void; children: React.ReactNode; className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-md px-2.5 py-1 text-xs font-medium transition-colors border",
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-background text-muted-foreground border-border hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

function ControlRow({ children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

function generateCardCode(cardBorder: BorderState, panelBorder: BorderState, panelBg: BgState): string {
  const cb = cardBorder.enabled
    ? ` border={{ side: "${cardBorder.side}", stroke: ${cardBorder.stroke}, color: "${cardBorder.color}" }}`
    : "";
  const pb = panelBorder.enabled
    ? `border={{ side: "${panelBorder.side}", stroke: ${panelBorder.stroke}, color: "${panelBorder.color}" }}`
    : "";
  const bg = panelBg.enabled
    ? `bg={{ style: "${panelBg.style}", side: "${panelBg.side}", color: "${panelBg.color}", to: "${panelBg.to}" }}`
    : "";
  const panelAttrs = [pb, bg].filter(Boolean).join("\n      ");
  const panelLine = panelAttrs ? `\n      ${panelAttrs}` : "";

  return `<Card${cb}>
  <CardHeader>
    <CardHeaderTitle>School Information</CardHeaderTitle>
    <CardHeaderSubtitle>Your school details visible to parents.</CardHeaderSubtitle>
  </CardHeader>
  <CardPanel${panelLine}${panelAttrs ? "\n    " : ""}>
    <CardPanelItem>...</CardPanelItem>
    <CardPanelItem>...</CardPanelItem>
  </CardPanel>
</Card>`;
}

function PlaygroundCard({ cardBorder, panelBorder, panelBg }: {
  cardBorder: BorderState; panelBorder: BorderState; panelBg: BgState;
}) {
  return (
    <Card border={cardBorder.enabled ? cardBorder : undefined}>
      <CardHeader>
        <CardHeaderTitle>School Information</CardHeaderTitle>
        <CardHeaderSubtitle>Your school details visible to parents.</CardHeaderSubtitle>
      </CardHeader>
      <CardPanel
        border={panelBorder.enabled ? panelBorder : undefined}
        bg={panelBg.enabled ? panelBg : undefined}
      >
        <SampleItems />
      </CardPanel>
    </Card>
  );
}

function CardAccentPlayground() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [cardBorder, setCardBorder] = useState<BorderState>({
    enabled: true, side: "t", stroke: 3, color: "orange",
  });
  const [panelBorder, setPanelBorder] = useState<BorderState>({
    enabled: false, side: "t", stroke: 3, color: "blue",
  });
  const [panelBg, setPanelBg] = useState<BgState>({
    enabled: true, style: "linear", side: "b", color: "blue", to: "transparent",
  });

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b bg-muted/60">
        {(["preview", "code"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-xs font-medium capitalize transition-colors",
              activeTab === tab
                ? "text-foreground border-b-2 border-foreground -mb-px bg-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "preview" && (
        <div className="flex flex-col lg:flex-row">
          {/* Controls */}
          <div className="w-full lg:w-63 shrink-0 border-b lg:border-b-0 lg:border-r divide-y bg-muted/10">
            {/* Card Border */}
            <div className="p-3 space-y-3">
              <Pill active={cardBorder.enabled} onClick={() => setCardBorder((s) => ({ ...s, enabled: !s.enabled }))}>
                {cardBorder.enabled ? "✓ " : ""}Card Border
              </Pill>
              {cardBorder.enabled && (
                <div className="space-y-2">
                  <ControlRow label="Side">
                    {BORDER_SIDES.map((s) => (
                      <Pill key={s} active={cardBorder.side === s} onClick={() => setCardBorder((st) => ({ ...st, side: s }))}>
                        {BORDER_SIDE_LABEL[s]}
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Stroke">
                    {BORDER_STROKES.map((n) => (
                      <Pill key={n} active={cardBorder.stroke === n} onClick={() => setCardBorder((st) => ({ ...st, stroke: n }))}>
                        {n}px
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Color">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c}
                        title={c}
                        onClick={() => setCardBorder((st) => ({ ...st, color: c }))}
                        className={cn(
                          "h-5 w-5 rounded border-2 transition-all",
                          COLOR_SWATCH[c],
                          cardBorder.color === c ? "border-foreground scale-110" : "border-transparent",
                        )}
                      />
                    ))}
                  </ControlRow>
                </div>
              )}
            </div>

            {/* Panel Border */}
            <div className="p-3 space-y-3">
              <Pill active={panelBorder.enabled} onClick={() => setPanelBorder((s) => ({ ...s, enabled: !s.enabled }))}>
                {panelBorder.enabled ? "✓ " : ""}Panel Border
              </Pill>
              {panelBorder.enabled && (
                <div className="space-y-2">
                  <ControlRow label="Side">
                    {BORDER_SIDES.map((s) => (
                      <Pill key={s} active={panelBorder.side === s} onClick={() => setPanelBorder((st) => ({ ...st, side: s }))}>
                        {BORDER_SIDE_LABEL[s]}
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Stroke">
                    {BORDER_STROKES.map((n) => (
                      <Pill key={n} active={panelBorder.stroke === n} onClick={() => setPanelBorder((st) => ({ ...st, stroke: n }))}>
                        {n}px
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Color">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c}
                        title={c}
                        onClick={() => setPanelBorder((st) => ({ ...st, color: c }))}
                        className={cn(
                          "h-5 w-5 rounded border-2 transition-all",
                          COLOR_SWATCH[c],
                          panelBorder.color === c ? "border-foreground scale-110" : "border-transparent",
                        )}
                      />
                    ))}
                  </ControlRow>
                </div>
              )}
            </div>

            {/* Panel Background */}
            <div className="p-3 space-y-3">
              <Pill active={panelBg.enabled} onClick={() => setPanelBg((s) => ({ ...s, enabled: !s.enabled }))}>
                {panelBg.enabled ? "✓ " : ""}Panel Background
              </Pill>
              {panelBg.enabled && (
                <div className="space-y-2">
                  <ControlRow label="Style">
                    {BG_STYLES.map((s) => (
                      <Pill key={s} active={panelBg.style === s} onClick={() => setPanelBg((st) => ({ ...st, style: s }))}>
                        {s}
                      </Pill>
                    ))}
                  </ControlRow>
                  {panelBg.style === "linear" && (
                    <ControlRow label="Side">
                      {BORDER_SIDES.map((s) => (
                        <Pill key={s} active={panelBg.side === s} onClick={() => setPanelBg((st) => ({ ...st, side: s }))}>
                          {BORDER_SIDE_LABEL[s]}
                        </Pill>
                      ))}
                    </ControlRow>
                  )}
                  <ControlRow label="Color">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c}
                        title={c}
                        onClick={() => setPanelBg((st) => ({ ...st, color: c }))}
                        className={cn(
                          "h-5 w-5 rounded border-2 transition-all",
                          COLOR_SWATCH[c],
                          panelBg.color === c ? "border-foreground scale-110" : "border-transparent",
                        )}
                      />
                    ))}
                  </ControlRow>
                  {panelBg.style !== "solid" && (
                    <ControlRow label="To">
                      <div className="flex flex-wrap gap-1">
                        {BG_TOS.map((t) => (
                          <button
                            key={t}
                            onClick={() => setPanelBg((st) => ({ ...st, to: t }))}
                            className={cn(
                              "flex h-5 items-center rounded border-2 px-1 text-[9px] font-medium transition-all",
                              t === "transparent" && "bg-transparent text-muted-foreground",
                              t === "white" && "bg-white text-black",
                              t === "black" && "bg-black text-white",
                              t !== "transparent" && t !== "white" && t !== "black" &&
                                cn(COLOR_SWATCH[t as AccentColor], "text-white"),
                              panelBg.to === t ? "border-foreground scale-110" : "border-transparent",
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </ControlRow>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Live preview */}
          <div className="flex-1 min-w-0 p-4">
            <PlaygroundCard cardBorder={cardBorder} panelBorder={panelBorder} panelBg={panelBg} />
          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="p-4">
          <CodeBlock label="Generated code" code={generateCardCode(cardBorder, panelBorder, panelBg)} />
        </div>
      )}
    </div>
  );
}

// ─── Doc Content ─────────────────────────────────────────────────────────────

export function CardDocContent() {
  const [itemCollapsed, setItemCollapsed] = useState(false);
  const [fieldCollapsed, setFieldCollapsed] = useState(false);
  const [nudgeKey, setNudgeKey] = useState(0);

  return (
    <div className="space-y-10">
      {/* ── Hero ── */}
      <ComponentPreview
        align="start"
        code={`import { Card, CardHeader, CardHeaderTitle, CardHeaderSubtitle, CardPanel, CardFooter } from "@/ascendra-ui";

<Card>
  <CardHeader>
    <CardHeaderTitle>School Information</CardHeaderTitle>
    <CardHeaderSubtitle>Your school details visible to parents.</CardHeaderSubtitle>
  </CardHeader>
  <CardPanel>
    <CardPanelItem>...</CardPanelItem>
    <CardPanelItem>...</CardPanelItem>
  </CardPanel>
  <CardFooter>
    <Button size="sm" variant="secondary">Edit</Button>
  </CardFooter>
</Card>`}
      >
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardHeaderTitle>School Information</CardHeaderTitle>
              <CardHeaderSubtitle>
                Your school details visible to parents.
              </CardHeaderSubtitle>
            </CardHeader>
            <CardPanel>
              <SampleItems />
            </CardPanel>
            <CardFooter>
              <Button size="sm" variant="secondary">
                Edit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </ComponentPreview>

      {/* ── Examples ── */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Card list */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Card list</h3>
          <p className="text-xs text-muted-foreground">
            A one-list section — <code className="rounded bg-muted px-1 font-mono text-xs">CardList</code> in a
            CardPanel. <code className="rounded bg-muted px-1 font-mono text-xs">columns</code> lines each row&apos;s
            children up like table cells; <code className="rounded bg-muted px-1 font-mono text-xs">visibleRows</code>{" "}
            shows that many, then scrolls; <code className="rounded bg-muted px-1 font-mono text-xs">CardListLink</code>{" "}
            makes the whole row a link. Rows have the table&apos;s hover and separators.
          </p>
          <ComponentPreview
            align="start"
            code={`<Card collapseable="expanded">
  <CardHeader>
    <CardHeaderTitle>Rejections by route</CardHeaderTitle>
    <CardHeaderSubtitle>Past 7 days · most first</CardHeaderSubtitle>
  </CardHeader>
  <CardPanel>
    <CardList columns="auto auto 1fr" visibleRows={5}>
      {rows.map((r) => (
        <CardListItem key={r.route}>
          <CardListLink href={r.href}><SimpleBadge>{r.route}</SimpleBadge></CardListLink>
          <span className="text-right font-mono tabular-nums">{r.count}</span>
          <ShareBar share={r.share} />
        </CardListItem>
      ))}
    </CardList>
  </CardPanel>
  <CardFooter>…</CardFooter>
</Card>`}
          >
            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
              <SampleCardList />
              <SampleCardListEmpty />
            </div>
          </ComponentPreview>
        </div>

        {/* Card table */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Card with a table</h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">CardTable</code> in place of the CardPanel: the
            card&apos;s header above, the table&apos;s own column header and rows, a CardFooter below. It folds with
            the card.
          </p>
          <ComponentPreview
            align="start"
            code={`<Card collapseable="expanded">
  <CardHeader>
    <CardHeaderTitle>Locks</CardHeaderTitle>
    <CardHeaderSubtitle>Who holds which job right now</CardHeaderSubtitle>
  </CardHeader>
  <CardTable>
    <Table>
      <TableHeader>…</TableHeader>
      <TableBody>…</TableBody>
    </Table>
  </CardTable>
  <CardFooter>…</CardFooter>
</Card>`}
          >
            <div className="w-full">
              <SampleCardTable />
            </div>
          </ComponentPreview>
        </div>

        {/* Collapseable */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Collapseable Panel
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              collapseable=&quot;expanded&quot;
            </code>{" "}
            or{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              collapseable=&quot;collapsed&quot;
            </code>{" "}
            to{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Card
            </code>
            . A click anywhere on the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              CardHeader
            </code>{" "}
            folds it, and a chevron says which way. Add{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">maximizable</code> for a maximize toggle: at rest
            it's the only icon (the chevron fades in on hover, and stays on touch), the card fills the screen over a
            light overlay, Esc or a click outside brings it back, a list or table shows every row and a chart takes the
            card's height. Maximized is for reading — a row or chart link that would leave the page brings the card
            back first, then marks the row.
          </p>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Initially expanded
            </p>
            <ComponentPreview
              align="start"
              code={`<Card collapseable="expanded" maximizable>
  <CardHeader>
    <CardHeaderTitle>Notifications</CardHeaderTitle>
    <CardHeaderSubtitle>Manage your alert preferences.</CardHeaderSubtitle>
  </CardHeader>
  <CardPanel>
    <CardPanelItem>...</CardPanelItem>
  </CardPanel>
  <CardFooter>...</CardFooter>
</Card>`}
            >
              <div className="w-full">
                <Card collapseable="expanded" maximizable>
                  <CardHeader>
                    <CardHeaderTitle>Notifications</CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Manage your alert preferences.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel>
                    <SampleItems />
                  </CardPanel>
                  <CardFooter>
                    <CardFooterIcon icon={InfoIcon} />
                    Click the header to collapse.
                  </CardFooter>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Initially collapsed
            </p>
            <ComponentPreview
              align="start"
              code={`<Card collapseable="collapsed">
  <CardHeader>
    <CardHeaderTitle>Security Settings</CardHeaderTitle>
    <CardHeaderSubtitle>Configure 2FA and login alerts.</CardHeaderSubtitle>
  </CardHeader>
  <CardPanel>
    <CardPanelItem>...</CardPanelItem>
  </CardPanel>
</Card>`}
            >
              <div className="w-full">
                <Card collapseable="collapsed">
                  <CardHeader>
                    <CardHeaderTitle>Security Settings</CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Configure 2FA and login alerts.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel>
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* Danger */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Danger Variant
          </h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              danger
            </code>{" "}
            for destructive settings like account deletion.
          </p>
          <ComponentPreview
            align="start"
            code={`<Card danger>
  <CardHeader>
    <CardHeaderTitle>Danger Zone</CardHeaderTitle>
    <CardHeaderSubtitle>Irreversible actions for your account.</CardHeaderSubtitle>
  </CardHeader>
  <CardFooter>
    <Button size="sm" variant="destructive">Delete Account</Button>
  </CardFooter>
</Card>`}
          >
            <div className="w-full">
              <Card danger>
                <CardHeader>
                  <CardHeaderTitle>Danger Zone</CardHeaderTitle>
                  <CardHeaderSubtitle>
                    Irreversible actions for your account.
                  </CardHeaderSubtitle>
                </CardHeader>
                <CardFooter>
                  <Button size="sm" variant="destructive">
                    Delete Account
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>
        </div>

        {/* Inverse Theme */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Inverse Theme
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              inverse
            </code>{" "}
            to render the card in the opposite theme. In light mode the card
            appears dark; in dark mode it appears light. All semantic tokens and
            child components flip automatically — no extra props needed anywhere
            else.
          </p>
          <ComponentPreview
            align="start"
            code={`<Card inverse>
  <CardHeader>
    <CardHeaderTitle>School Information</CardHeaderTitle>
    <CardHeaderSubtitle>Your school details visible to parents.</CardHeaderSubtitle>
  </CardHeader>
  <CardPanel>
    <CardPanelItem>...</CardPanelItem>
  </CardPanel>
  <CardFooter>
    <Button size="sm" variant="secondary">Edit</Button>
  </CardFooter>
</Card>`}
          >
            <div className="w-full">
              <Card inverse>
                <CardHeader>
                  <CardHeaderTitle>School Information</CardHeaderTitle>
                  <CardHeaderSubtitle>
                    Your school details visible to parents.
                  </CardHeaderSubtitle>
                </CardHeader>
                <CardPanel>
                  <SampleItems />
                </CardPanel>
                <CardFooter>
                  <Button size="sm" variant="secondary">
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>
        </div>

        {/* Card — Border */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Card — Border</h3>
          <p className="text-xs text-muted-foreground">
            Pass a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              border
            </code>{" "}
            object to add an accent edge on the outer{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Card
            </code>
            . Supports{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              side
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              stroke
            </code>
            , and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              color
            </code>
            .
          </p>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Top · orange · stroke 3 (defaults)
            </p>
            <ComponentPreview
              align="start"
              code={`<Card border={{ side: "t", stroke: 3, color: "orange" }}>
  ...
</Card>`}
            >
              <div className="w-full">
                <Card border={{ side: "t", stroke: 3, color: "orange" }}>
                  <CardHeader>
                    <CardHeaderTitle>Profile</CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Your personal information.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel>
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Left · blue · stroke 2
            </p>
            <ComponentPreview
              align="start"
              code={`<Card border={{ side: "l", stroke: 2, color: "blue" }}>
  ...
</Card>`}
            >
              <div className="w-full">
                <Card border={{ side: "l", stroke: 2, color: "blue" }}>
                  <CardHeader>
                    <CardHeaderTitle>Profile</CardHeaderTitle>
                  </CardHeader>
                  <CardPanel>
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          {/* All 8 colors */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              All 8 accent colors (top border, stroke 3)
            </p>
            <ComponentPreview
              align="start"
              code={`<Card border={{ color: "orange" }}>...</Card>
<Card border={{ color: "blue" }}>...</Card>
<Card border={{ color: "amber" }}>...</Card>
<Card border={{ color: "teal" }}>...</Card>
<Card border={{ color: "indigo" }}>...</Card>
<Card border={{ color: "purple" }}>...</Card>
<Card border={{ color: "red" }}>...</Card>
<Card border={{ color: "slate" }}>...</Card>`}
            >
              <div className="grid w-full grid-cols-2 gap-3">
                {(
                  [
                    "orange",
                    "blue",
                    "amber",
                    "teal",
                    "indigo",
                    "purple",
                    "red",
                    "slate",
                  ] as const
                ).map((color) => (
                  <div key={color} className="space-y-1">
                    <p className="text-xs text-muted-foreground capitalize">
                      {color}
                    </p>
                    <Card border={{ color }}>
                      <CardHeader>
                        <CardHeaderTitle>Profile</CardHeaderTitle>
                      </CardHeader>
                      <CardPanel>
                        <CardPanelItem>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground">
                              School
                            </span>
                            <SimpleBadge variant="green">Active</SimpleBadge>
                          </div>
                        </CardPanelItem>
                      </CardPanel>
                    </Card>
                  </div>
                ))}
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* CardPanel — Border */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardPanel — Border
          </h3>
          <p className="text-xs text-muted-foreground">
            The{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              border
            </code>{" "}
            prop on{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              CardPanel
            </code>{" "}
            accents the inner panel card.
          </p>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Left · indigo · stroke 3
            </p>
            <ComponentPreview
              align="start"
              code={`<Card>
  <CardHeader>...</CardHeader>
  <CardPanel border={{ side: "l", stroke: 3, color: "indigo" }}>
    ...
  </CardPanel>
</Card>`}
            >
              <div className="w-full">
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Billing</CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Current plan and payment method.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel border={{ side: "l", stroke: 3, color: "indigo" }}>
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Top · amber · stroke 2
            </p>
            <ComponentPreview
              align="start"
              code={`<CardPanel border={{ side: "t", stroke: 2, color: "amber" }}>
  ...
</CardPanel>`}
            >
              <div className="w-full">
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Billing</CardHeaderTitle>
                  </CardHeader>
                  <CardPanel border={{ side: "t", stroke: 2, color: "amber" }}>
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* CardPanel — Background */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardPanel — Background Gradient
          </h3>
          <p className="text-xs text-muted-foreground">
            The{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">bg</code>{" "}
            prop paints a gradient on the inner panel. Configure{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              style
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              side
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              color
            </code>
            , and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">to</code>.
          </p>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Linear · bottom · orange → transparent (defaults)
            </p>
            <ComponentPreview
              align="start"
              code={`<CardPanel bg={{ style: "linear", side: "b", color: "orange", to: "transparent" }}>
  ...
</CardPanel>`}
            >
              <div className="w-full">
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Profile</CardHeaderTitle>
                  </CardHeader>
                  <CardPanel
                    bg={{
                      style: "linear",
                      side: "b",
                      color: "orange",
                      to: "transparent",
                    }}
                  >
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Radial · purple → transparent
            </p>
            <ComponentPreview
              align="start"
              code={`<CardPanel bg={{ style: "radial", color: "purple" }}>
  ...
</CardPanel>`}
            >
              <div className="w-full">
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Profile</CardHeaderTitle>
                  </CardHeader>
                  <CardPanel bg={{ style: "radial", color: "purple" }}>
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          {/* All 8 colors */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              All 8 accent colors (linear, side b, to transparent)
            </p>
            <ComponentPreview
              align="start"
              code={`<CardPanel bg={{ color: "orange" }}>...</CardPanel>
<CardPanel bg={{ color: "blue" }}>...</CardPanel>
<CardPanel bg={{ color: "amber" }}>...</CardPanel>
<CardPanel bg={{ color: "teal" }}>...</CardPanel>
<CardPanel bg={{ color: "indigo" }}>...</CardPanel>
<CardPanel bg={{ color: "purple" }}>...</CardPanel>
<CardPanel bg={{ color: "red" }}>...</CardPanel>
<CardPanel bg={{ color: "slate" }}>...</CardPanel>`}
            >
              <div className="grid w-full grid-cols-2 gap-3">
                {(
                  [
                    "orange",
                    "blue",
                    "amber",
                    "teal",
                    "indigo",
                    "purple",
                    "red",
                    "slate",
                  ] as const
                ).map((color) => (
                  <div key={color} className="space-y-1">
                    <p className="text-xs text-muted-foreground capitalize">
                      {color}
                    </p>
                    <Card>
                      <CardHeader>
                        <CardHeaderTitle>Profile</CardHeaderTitle>
                      </CardHeader>
                      <CardPanel bg={{ color }}>
                        <CardPanelItem>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground">
                              Status
                            </span>
                            <SimpleBadge variant="green">Active</SimpleBadge>
                          </div>
                        </CardPanelItem>
                      </CardPanel>
                    </Card>
                  </div>
                ))}
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* CardPanel — Combined */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardPanel — Combined Border &amp; Background
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              border
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">bg</code>{" "}
            can be used together on the same{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              CardPanel
            </code>
            .
          </p>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Left border · teal + teal gradient
            </p>
            <ComponentPreview
              align="start"
              code={`<CardPanel
  border={{ side: "l", stroke: 3, color: "teal" }}
  bg={{ color: "teal" }}
>
  ...
</CardPanel>`}
            >
              <div className="w-full">
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Integration</CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Connected apps and webhooks.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel
                    border={{ side: "l", stroke: 3, color: "teal" }}
                    bg={{ color: "teal" }}
                  >
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Card top border · orange + CardPanel radial orange gradient
            </p>
            <ComponentPreview
              align="start"
              code={`<Card border={{ side: "t", color: "orange" }}>
  <CardHeader>...</CardHeader>
  <CardPanel bg={{ style: "radial", color: "orange" }}>
    ...
  </CardPanel>
</Card>`}
            >
              <div className="w-full">
                <Card border={{ side: "t", color: "orange" }}>
                  <CardHeader>
                    <CardHeaderTitle>Billing</CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Subscription and invoices.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel bg={{ style: "radial", color: "orange" }}>
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* Card — All-sides border */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Card — All-sides Border
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              side: &quot;all&quot;
            </code>{" "}
            to draw a full-perimeter accent border. Useful for selected,
            highlighted, or info-box cards.
          </p>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              All sides · teal · stroke 1
            </p>
            <ComponentPreview
              align="start"
              code={`<Card border={{ side: "all", stroke: 1, color: "teal" }}>
  ...
</Card>`}
            >
              <div className="w-full">
                <Card border={{ side: "all", stroke: 1, color: "teal" }}>
                  <CardHeader>
                    <CardHeaderTitle>Integration Active</CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Connected and syncing in real time.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel>
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              All 8 accent colors (all sides, stroke 1)
            </p>
            <ComponentPreview
              align="start"
              code={`<Card border={{ side: "all", stroke: 1, color: "orange" }}>...</Card>
<Card border={{ side: "all", stroke: 1, color: "blue" }}>...</Card>
...`}
            >
              <div className="grid w-full grid-cols-2 gap-3">
                {(
                  [
                    "orange",
                    "blue",
                    "amber",
                    "teal",
                    "indigo",
                    "purple",
                    "red",
                    "slate",
                  ] as const
                ).map((color) => (
                  <div key={color} className="space-y-1">
                    <p className="text-xs text-muted-foreground capitalize">
                      {color}
                    </p>
                    <Card border={{ side: "all", stroke: 1, color }}>
                      <CardHeader>
                        <CardHeaderTitle>Profile</CardHeaderTitle>
                      </CardHeader>
                      <CardPanel>
                        <CardPanelItem>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground">
                              Status
                            </span>
                            <SimpleBadge variant="green">Active</SimpleBadge>
                          </div>
                        </CardPanelItem>
                      </CardPanel>
                    </Card>
                  </div>
                ))}
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* CardPanel — Solid Background */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardPanel — Solid Background
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              bg=&#123;&#123; style: &quot;solid&quot;, color: &quot;…&quot; &#125;&#125;
            </code>{" "}
            for a flat tinted background with no gradient. More predictable than
            linear/radial for dense content.
          </p>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Solid · indigo
            </p>
            <ComponentPreview
              align="start"
              code={`<CardPanel bg={{ style: "solid", color: "indigo" }}>
  ...
</CardPanel>`}
            >
              <div className="w-full">
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Plan Details</CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Your current subscription.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel bg={{ style: "solid", color: "indigo" }}>
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              All 8 accent colors (solid)
            </p>
            <ComponentPreview
              align="start"
              code={`<CardPanel bg={{ style: "solid", color: "orange" }}>...</CardPanel>
<CardPanel bg={{ style: "solid", color: "blue" }}>...</CardPanel>
...`}
            >
              <div className="grid w-full grid-cols-2 gap-3">
                {(
                  [
                    "orange",
                    "blue",
                    "amber",
                    "teal",
                    "indigo",
                    "purple",
                    "red",
                    "slate",
                  ] as const
                ).map((color) => (
                  <div key={color} className="space-y-1">
                    <p className="text-xs text-muted-foreground capitalize">
                      {color}
                    </p>
                    <Card>
                      <CardHeader>
                        <CardHeaderTitle>Profile</CardHeaderTitle>
                      </CardHeader>
                      <CardPanel bg={{ style: "solid", color }}>
                        <CardPanelItem>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground">
                              Status
                            </span>
                            <SimpleBadge variant="green">Active</SimpleBadge>
                          </div>
                        </CardPanelItem>
                      </CardPanel>
                    </Card>
                  </div>
                ))}
              </div>
            </ComponentPreview>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Combined: all-sides border + solid background
            </p>
            <ComponentPreview
              align="start"
              code={`<Card border={{ side: "all", stroke: 1, color: "teal" }}>
  <CardHeader>...</CardHeader>
  <CardPanel bg={{ style: "solid", color: "teal" }}>
    ...
  </CardPanel>
</Card>`}
            >
              <div className="w-full">
                <Card border={{ side: "all", stroke: 1, color: "teal" }}>
                  <CardHeader>
                    <CardHeaderTitle>Integration Active</CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Connected and syncing in real time.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel bg={{ style: "solid", color: "teal" }}>
                    <SampleItems />
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* CardPanelItem — Collapse */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardPanelItem — Collapse
          </h3>
          <p className="text-xs text-muted-foreground">
            Each{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              CardPanelItem
            </code>{" "}
            accepts a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              collapsed
            </code>{" "}
            prop. When true the row animates to zero height via{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              grid-rows
            </code>{" "}
            and is marked{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              inert
            </code>
            .
          </p>
          <ComponentPreview
            align="start"
            code={`const [collapsed, setCollapsed] = useState(false);

<Card>
  <CardHeader>
    <CardHeaderTitle>Settings</CardHeaderTitle>
  </CardHeader>
  <CardPanel>
    <CardPanelItem>Always visible</CardPanelItem>
    <CardPanelItem collapsed={collapsed}>Toggleable row</CardPanelItem>
    <CardPanelItem>Always visible</CardPanelItem>
  </CardPanel>
  <CardFooter>
    <Button size="sm" variant="secondary" onClick={() => setCollapsed(v => !v)}>
      Toggle middle row
    </Button>
  </CardFooter>
</Card>`}
          >
            <div className="w-full">
              <Card>
                <CardHeader>
                  <CardHeaderTitle>Settings</CardHeaderTitle>
                  <CardHeaderSubtitle>
                    Middle row can be toggled.
                  </CardHeaderSubtitle>
                </CardHeader>
                <CardPanel>
                  <CardPanelItem>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">
                        School Name
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Beacon Academy
                      </span>
                    </div>
                  </CardPanelItem>
                  <CardPanelItem collapsed={itemCollapsed}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">
                        Contact Email
                      </span>
                      <span className="text-sm text-muted-foreground">
                        admin@beacon.edu.pk
                      </span>
                    </div>
                  </CardPanelItem>
                  <CardPanelItem>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Phone</span>
                      <span className="text-sm text-muted-foreground">
                        +92 300 0000000
                      </span>
                    </div>
                  </CardPanelItem>
                </CardPanel>
                <CardFooter>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setItemCollapsed((v) => !v)}
                  >
                    {itemCollapsed ? "Show" : "Hide"} middle row
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>
        </div>

        {/* CardPanelItemGroup */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardPanelItemGroup
          </h3>
          <p className="text-xs text-muted-foreground">
            Wrap multiple related inputs inside a single{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              CardPanelItem
            </code>{" "}
            using{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              CardPanelItemGroup
            </code>{" "}
            to add vertical spacing between them.
          </p>
          <ComponentPreview
            align="start"
            code={`<CardPanel>
  <CardPanelItem>
    <CardPanelItemGroup>
      <div>First Name</div>
      <div>Last Name</div>
      <div>Email</div>
    </CardPanelItemGroup>
  </CardPanelItem>
</CardPanel>`}
          >
            <div className="w-full">
              <Card>
                <CardHeader>
                  <CardHeaderTitle>Personal Details</CardHeaderTitle>
                  <CardHeaderSubtitle>
                    All fields grouped in one item.
                  </CardHeaderSubtitle>
                </CardHeader>
                <CardPanel>
                  <CardPanelItem>
                    <CardPanelItemGroup>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">
                          First Name
                        </span>
                        <Input placeholder="John" full />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">
                          Last Name
                        </span>
                        <Input placeholder="Doe" full />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">
                          Email
                        </span>
                        <Input placeholder="john@example.com" full />
                      </div>
                    </CardPanelItemGroup>
                  </CardPanelItem>
                </CardPanel>
                <CardFooter>
                  <Button size="sm">Save</Button>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>
        </div>

        {/* CardPanelItemCrown */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardPanelItemCrown
          </h3>
          <p className="text-xs text-muted-foreground">
            Renders a floating label above a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              CardPanelItem
            </code>{" "}
            with a dashed top border. Add{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              className=&quot;relative&quot;
            </code>{" "}
            to the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              CardPanelItem
            </code>{" "}
            and place the crown as its first child. Note: crowns are not
            suitable on the first item — the dashed border would have nothing to
            sit on.
          </p>

          {/* Variants */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              All variants
            </p>
            <ComponentPreview
              align="start"
              code={`// variant: "default" | "secondary" | "destructive" | "success" | "warning"
// Crown is not suitable on the first item — skip it there.

<CardPanel>
  {/* First item — no crown */}
  <CardPanelItem>
    ...content...
  </CardPanelItem>

  {/* Subsequent items — add className="relative" and crown as first child */}
  <CardPanelItem className="relative">
    <CardPanelItemCrown variant="secondary">Secondary</CardPanelItemCrown>
    ...content...
  </CardPanelItem>

  <CardPanelItem className="relative">
    <CardPanelItemCrown variant="warning">Warning</CardPanelItemCrown>
    ...content...
  </CardPanelItem>
</CardPanel>`}
            >
              <div className="w-full">
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Status Sections</CardHeaderTitle>
                  </CardHeader>
                  <CardPanel>
                    {(
                      [
                        "default",
                        "secondary",
                        "destructive",
                        "success",
                        "warning",
                      ] as const
                    ).map((variant, index) =>
                      index === 0 ? (
                        <CardPanelItem key={variant}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground">
                              School Name
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Beacon Academy
                            </span>
                          </div>
                        </CardPanelItem>
                      ) : (
                        <CardPanelItem key={variant} className="relative">
                          <CardPanelItemCrown variant={variant}>
                            {variant.charAt(0).toUpperCase() + variant.slice(1)}
                          </CardPanelItemCrown>
                          <div className="flex items-center justify-between pt-3">
                            <span className="text-sm text-foreground">
                              School Name
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Beacon Academy
                            </span>
                          </div>
                        </CardPanelItem>
                      )
                    )}
                  </CardPanel>
                </Card>
              </div>
            </ComponentPreview>
          </div>

          {/* Nudge */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Nudge animation
            </p>
            <p className="text-xs text-muted-foreground">
              Set{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                nudge
              </code>{" "}
              to animate the crown label with an attention pulse. Use{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                nudgeVariant
              </code>{" "}
              to pick the highlight color.
            </p>
            <ComponentPreview
              align="start"
              code={`<CardPanel>
  {/* First item — no crown */}
  <CardPanelItem>
    <div className="flex items-center justify-between">
      <span>Plan expires</span>
      <SimpleBadge variant="amber">Jun 30 2026</SimpleBadge>
    </div>
  </CardPanelItem>

  {/* Subsequent items — crown with nudge */}
  <CardPanelItem className="relative">
    <CardPanelItemCrown nudge nudgeVariant="warning">Action Required</CardPanelItemCrown>
    <div className="flex items-center justify-between pt-3">
      <span>Outstanding balance</span>
      <SimpleBadge variant="red">PKR 4,500</SimpleBadge>
    </div>
  </CardPanelItem>
</CardPanel>`}
            >
              <div className="w-full">
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>Payment</CardHeaderTitle>
                    <CardHeaderSubtitle>
                      Your subscription needs attention.
                    </CardHeaderSubtitle>
                  </CardHeader>
                  <CardPanel>
                    <CardPanelItem>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">
                          Plan expires
                        </span>
                        <SimpleBadge variant="amber">Jun 30 2026</SimpleBadge>
                      </div>
                    </CardPanelItem>
                    <CardPanelItem className="relative">
                      <CardPanelItemCrown
                        key={nudgeKey}
                        nudge
                        nudgeVariant="destructive"
                      >
                        Overdue
                      </CardPanelItemCrown>
                      <div className="flex items-center justify-between pt-3">
                        <span className="text-sm text-foreground">
                          Outstanding balance
                        </span>
                        <SimpleBadge variant="red">PKR 4,500</SimpleBadge>
                      </div>
                    </CardPanelItem>
                  </CardPanel>
                  <CardFooter className="justify-between">
                    <div className="flex items-center gap-1.5">
                      <CardFooterIcon icon={TriangleAlertIcon} />
                      Resolve the overdue balance to keep your account active.
                    </div>
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => setNudgeKey((k) => k + 1)}
                    >
                      Play nudge
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* CardPanelField */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardPanelField
          </h3>
          <p className="text-xs text-muted-foreground">
            A collapsible field wrapper for toggling sections of a form inside a
            panel item. Uses the same{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              grid-rows
            </code>{" "}
            animation as{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              CardPanelItem
            </code>
            .
          </p>
          <ComponentPreview
            align="start"
            code={`const [fieldCollapsed, setFieldCollapsed] = useState(false);

<CardPanel>
  <CardPanelItem>
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium">Advanced Options</span>
      <Button size="xs" variant="ghost" onClick={() => setFieldCollapsed(v => !v)}>
        {fieldCollapsed ? "Show" : "Hide"}
      </Button>
    </div>
    <CardPanelField collapsed={fieldCollapsed}>
      <div className="space-y-3 pb-1">
        <Input placeholder="Custom domain" full />
        <Input placeholder="Webhook URL" full />
      </div>
    </CardPanelField>
  </CardPanelItem>
</CardPanel>`}
          >
            <div className="w-full">
              <Card>
                <CardHeader>
                  <CardHeaderTitle>Advanced Configuration</CardHeaderTitle>
                  <CardHeaderSubtitle>
                    Optional fields that can be hidden.
                  </CardHeaderSubtitle>
                </CardHeader>
                <CardPanel>
                  <CardPanelItem>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-foreground">
                        Advanced Options
                      </span>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => setFieldCollapsed((v) => !v)}
                      >
                        {fieldCollapsed ? "Show" : "Hide"}
                      </Button>
                    </div>
                    <CardPanelField collapsed={fieldCollapsed}>
                      <div className="space-y-3 pb-1">
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">
                            Custom Domain
                          </span>
                          <Input placeholder="school.example.com" full />
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">
                            Webhook URL
                          </span>
                          <Input
                            placeholder="https://hooks.example.com/..."
                            full
                          />
                        </div>
                      </div>
                    </CardPanelField>
                  </CardPanelItem>
                </CardPanel>
                <CardFooter>
                  <CardFooterIcon />
                  Fields animate in/out with a grid-rows transition.
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>
        </div>

        {/* CardFooter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardFooter &amp; CardFooterIcon
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              CardFooter
            </code>{" "}
            sits below the panel with a top border that disappears when a panel
            is expanded.{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              CardFooterIcon
            </code>{" "}
            is a small helper that renders a leading icon.
          </p>
          <ComponentPreview
            align="start"
            code={`<CardFooter>
  <CardFooterIcon icon={InfoIcon} />
  Only the school admin can update these details.
</CardFooter>

<CardFooter>
  <Button size="sm" variant="secondary">Cancel</Button>
  <Button size="sm">Save Changes</Button>
</CardFooter>`}
          >
            <div className="w-full space-y-3">
              <Card>
                <CardHeader>
                  <CardHeaderTitle>School Info</CardHeaderTitle>
                </CardHeader>
                <CardPanel>
                  <CardPanelItem>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Name</span>
                      <span className="text-sm text-muted-foreground">
                        Beacon Academy
                      </span>
                    </div>
                  </CardPanelItem>
                </CardPanel>
                <CardFooter>
                  <CardFooterIcon icon={InfoIcon} />
                  Only the school admin can update these details.
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardHeaderTitle>Edit Profile</CardHeaderTitle>
                </CardHeader>
                <CardPanel>
                  <CardPanelItem>
                    <Input placeholder="Display name" full />
                  </CardPanelItem>
                </CardPanel>
                <CardFooter className="gap-2">
                  <Button size="sm" variant="secondary">
                    Cancel
                  </Button>
                  <Button size="sm">Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>
        </div>
        {/* Accent Styles Playground */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Accent Styles — Border &amp; Background
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">Card</code>{" "}
            accepts a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">border</code>{" "}
            prop.{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">CardPanel</code>{" "}
            accepts both{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">border</code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">bg</code>.
            Toggle each option below and see the result live.
          </p>
          <CardAccentPlayground />
        </div>
      </div>

      {/* ── Props ── */}
      <div className="space-y-8">
        <SectionHeader>Props</SectionHeader>

        {/* Card */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Card</h3>
          <PropsTable
            props={[
              {
                name: "danger",
                type: "boolean",
                default: "false",
                description: "Applies red danger styling.",
              },
              {
                name: "collapseable",
                type: "'expanded' | 'collapsed'",
                description:
                  "Enables collapse. 'expanded' starts open, 'collapsed' starts closed.",
              },
              {
                name: "hasError",
                type: "boolean",
                default: "false",
                description:
                  "When collapsed and true, shows a destructive outline ring.",
              },
              {
                name: "step",
                type: "number",
                description:
                  "Stepper step index — integrates with StepperProvider.",
              },
              {
                name: "border",
                type: "BorderConfig",
                description: "Optional accent border on the outer card.",
              },
              {
                name: "inverse",
                type: "boolean",
                default: "false",
                description:
                  "Renders the card in the opposite theme (dark in light mode, light in dark mode).",
              },
            ]}
          />
        </div>

        {/* CardPanel */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">CardPanel</h3>
          <PropsTable
            props={[
              {
                name: "collapsed",
                type: "boolean",
                description:
                  "Manual collapse override. Defaults to the Card context state.",
              },
              {
                name: "border",
                type: "BorderConfig",
                description: "Optional accent border on the inner panel card.",
              },
              {
                name: "bg",
                type: "BgConfig",
                description:
                  "Optional gradient background on the inner panel card.",
              },
            ]}
          />
        </div>

        {/* CardPanelItem */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">CardPanelItem</h3>
          <PropsTable
            props={[
              {
                name: "collapsed",
                type: "boolean",
                description:
                  "Collapses the item to zero height via grid-rows animation.",
              },
            ]}
          />
        </div>

        {/* CardPanelField */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardPanelField
          </h3>
          <PropsTable
            props={[
              {
                name: "collapsed",
                type: "boolean",
                description:
                  "Collapses the field wrapper to zero height. No border; lighter than CardPanelItem.",
              },
            ]}
          />
        </div>

        {/* CardPanelItemCrown */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardPanelItemCrown
          </h3>
          <PropsTable
            props={[
              {
                name: "variant",
                type: "'default' | 'secondary' | 'destructive' | 'success' | 'warning'",
                default: "'default'",
                description: "Color of the dashed crown badge.",
              },
              {
                name: "nudge",
                type: "boolean",
                default: "false",
                description: "Applies an attention-pulse animation.",
              },
              {
                name: "nudgeVariant",
                type: "'default' | 'secondary' | 'destructive' | 'success' | 'warning'",
                default: "'warning'",
                description: "Color override when nudge is active.",
              },
            ]}
          />
        </div>

        {/* CardFooterIcon */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            CardFooterIcon
          </h3>
          <PropsTable
            props={[
              {
                name: "icon",
                type: "IconType",
                default: "InfoIcon",
                description: "Icon component to render.",
              },
            ]}
          />
        </div>

        {/* BorderConfig */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">BorderConfig</h3>
          <PropsTable
            props={[
              {
                name: "side",
                type: "'t' | 'l' | 'r' | 'b' | 'all'",
                default: "'t'",
                description: "Which side the border appears on. Use 'all' for a full-perimeter border.",
              },
              {
                name: "stroke",
                type: "1 | 2 | 3",
                default: "3",
                description: "Border thickness in px.",
              },
              {
                name: "color",
                type: "'blue' | 'amber' | 'purple' | 'red' | 'teal' | 'orange' | 'indigo' | 'slate'",
                default: "'orange'",
                description: "Accent color at 60% opacity.",
              },
            ]}
          />
        </div>

        {/* BgConfig */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">BgConfig</h3>
          <PropsTable
            props={[
              {
                name: "style",
                type: "'linear' | 'radial' | 'conic' | 'solid'",
                default: "'linear'",
                description: "Background style. 'solid' applies a flat tinted background with no gradient; side and to are ignored.",
              },
              {
                name: "side",
                type: "'t' | 'l' | 'r' | 'b'",
                default: "'b'",
                description: "Gradient direction (linear only).",
              },
              {
                name: "color",
                type: "'blue' | 'amber' | 'purple' | 'red' | 'teal' | 'orange' | 'indigo' | 'slate'",
                default: "'orange'",
                description: "Start color at 7% opacity.",
              },
              {
                name: "to",
                type: "'transparent' | 'white' | 'black' | AccentColor",
                default: "'transparent'",
                description:
                  "End stop color. Accent colors resolve to 500/60 opacity.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
