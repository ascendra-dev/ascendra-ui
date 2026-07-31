"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { CodeBlock } from "../code-block";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { cn } from "@/ascendra-ui/shadcn";
import { type AccentColor, type BgStyle, type BgTo, type BorderSide, type BorderStroke, EmptyBody, SimpleBadge, Table, TableBody, TableCell, TableHead, TableHeader, TableHeaderRow, TableRow, TableWrapper } from "@/ascendra-ui";

// ─── Shared sample rows ──────────────────────────────────────────────────────

function SampleRows() {
  return (
    <>
      <TableRow>
        <TableCell>Ahmed Khan</TableCell>
        <TableCell>INV-001</TableCell>
        <TableCell>PKR 12,000</TableCell>
        <TableCell>
          <SimpleBadge variant="green">Paid</SimpleBadge>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Sara Ali</TableCell>
        <TableCell>INV-002</TableCell>
        <TableCell>PKR 8,500</TableCell>
        <TableCell>
          <SimpleBadge variant="amber">Pending</SimpleBadge>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Usman Raza</TableCell>
        <TableCell>INV-003</TableCell>
        <TableCell>PKR 15,000</TableCell>
        <TableCell>
          <SimpleBadge variant="red">Overdue</SimpleBadge>
        </TableCell>
      </TableRow>
    </>
  );
}

function SampleHeaders() {
  return (
    <TableHeaderRow>
      <TableHead>Client</TableHead>
      <TableHead>Invoice</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Status</TableHead>
    </TableHeaderRow>
  );
}

// ─── Playground ──────────────────────────────────────────────────────────────

const ACCENT_COLORS: AccentColor[] = [
  "orange", "blue", "amber", "teal", "indigo", "purple", "red", "slate",
];
const COLOR_SWATCH: Record<AccentColor, string> = {
  orange: "bg-orange-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  teal: "bg-teal-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  slate: "bg-slate-500",
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

function generateCode(wrapperBorder: BorderState, bodyBorder: BorderState, bodyBg: BgState): string {
  const wb = wrapperBorder.enabled
    ? ` border={{ side: "${wrapperBorder.side}", stroke: ${wrapperBorder.stroke}, color: "${wrapperBorder.color}" }}`
    : "";
  const bb = bodyBorder.enabled
    ? `border={{ side: "${bodyBorder.side}", stroke: ${bodyBorder.stroke}, color: "${bodyBorder.color}" }}`
    : "";
  const bg = bodyBg.enabled
    ? `bg={{ style: "${bodyBg.style}", side: "${bodyBg.side}", color: "${bodyBg.color}", to: "${bodyBg.to}" }}`
    : "";
  const bodyAttrs = [bb, bg].filter(Boolean).join("\n      ");
  const bodyLine = bodyAttrs ? `\n      ${bodyAttrs}` : "";

  return `<TableWrapper${wb}>
  <Table>
    <TableHeader>
      <TableHeaderRow>...</TableHeaderRow>
    </TableHeader>
    <TableBody${bodyLine}${bodyAttrs ? "\n    " : ""}>
      <TableRow>...</TableRow>
    </TableBody>
  </Table>
</TableWrapper>`;
}

function PlaygroundTable({ wrapperBorder, bodyBorder, bodyBg }: {
  wrapperBorder: BorderState; bodyBorder: BorderState; bodyBg: BgState;
}) {
  return (
    <TableWrapper border={wrapperBorder.enabled ? wrapperBorder : undefined}>
      <Table>
        <TableHeader>
          <SampleHeaders />
        </TableHeader>
        <TableBody
          border={bodyBorder.enabled ? bodyBorder : undefined}
          bg={bodyBg.enabled ? bodyBg : undefined}
        >
          <SampleRows />
        </TableBody>
      </Table>
    </TableWrapper>
  );
}

function TableAccentPlayground() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [wrapperBorder, setWrapperBorder] = useState<BorderState>({
    enabled: true, side: "t", stroke: 3, color: "orange",
  });
  const [bodyBorder, setBodyBorder] = useState<BorderState>({
    enabled: false, side: "t", stroke: 3, color: "blue",
  });
  const [bodyBg, setBodyBg] = useState<BgState>({
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
            {/* Wrapper Border */}
            <div className="p-3 space-y-3">
              <Pill active={wrapperBorder.enabled} onClick={() => setWrapperBorder((s) => ({ ...s, enabled: !s.enabled }))}>
                {wrapperBorder.enabled ? "✓ " : ""}Wrapper Border
              </Pill>
              {wrapperBorder.enabled && (
                <div className="space-y-2">
                  <ControlRow label="Side">
                    {BORDER_SIDES.map((s) => (
                      <Pill key={s} active={wrapperBorder.side === s} onClick={() => setWrapperBorder((st) => ({ ...st, side: s }))}>
                        {BORDER_SIDE_LABEL[s]}
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Stroke">
                    {BORDER_STROKES.map((n) => (
                      <Pill key={n} active={wrapperBorder.stroke === n} onClick={() => setWrapperBorder((st) => ({ ...st, stroke: n }))}>
                        {n}px
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Color">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c}
                        title={c}
                        onClick={() => setWrapperBorder((st) => ({ ...st, color: c }))}
                        className={cn(
                          "h-5 w-5 rounded border-2 transition-all",
                          COLOR_SWATCH[c],
                          wrapperBorder.color === c ? "border-foreground scale-110" : "border-transparent",
                        )}
                      />
                    ))}
                  </ControlRow>
                </div>
              )}
            </div>

            {/* Body Border */}
            <div className="p-3 space-y-3">
              <Pill active={bodyBorder.enabled} onClick={() => setBodyBorder((s) => ({ ...s, enabled: !s.enabled }))}>
                {bodyBorder.enabled ? "✓ " : ""}Body Border
              </Pill>
              {bodyBorder.enabled && (
                <div className="space-y-2">
                  <ControlRow label="Side">
                    {BORDER_SIDES.map((s) => (
                      <Pill key={s} active={bodyBorder.side === s} onClick={() => setBodyBorder((st) => ({ ...st, side: s }))}>
                        {BORDER_SIDE_LABEL[s]}
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Stroke">
                    {BORDER_STROKES.map((n) => (
                      <Pill key={n} active={bodyBorder.stroke === n} onClick={() => setBodyBorder((st) => ({ ...st, stroke: n }))}>
                        {n}px
                      </Pill>
                    ))}
                  </ControlRow>
                  <ControlRow label="Color">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c}
                        title={c}
                        onClick={() => setBodyBorder((st) => ({ ...st, color: c }))}
                        className={cn(
                          "h-5 w-5 rounded border-2 transition-all",
                          COLOR_SWATCH[c],
                          bodyBorder.color === c ? "border-foreground scale-110" : "border-transparent",
                        )}
                      />
                    ))}
                  </ControlRow>
                </div>
              )}
            </div>

            {/* Body Background */}
            <div className="p-3 space-y-3">
              <Pill active={bodyBg.enabled} onClick={() => setBodyBg((s) => ({ ...s, enabled: !s.enabled }))}>
                {bodyBg.enabled ? "✓ " : ""}Body Background
              </Pill>
              {bodyBg.enabled && (
                <div className="space-y-2">
                  <ControlRow label="Style">
                    {BG_STYLES.map((s) => (
                      <Pill key={s} active={bodyBg.style === s} onClick={() => setBodyBg((st) => ({ ...st, style: s }))}>
                        {s}
                      </Pill>
                    ))}
                  </ControlRow>
                  {bodyBg.style === "linear" && (
                    <ControlRow label="Side">
                      {BORDER_SIDES.map((s) => (
                        <Pill key={s} active={bodyBg.side === s} onClick={() => setBodyBg((st) => ({ ...st, side: s }))}>
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
                        onClick={() => setBodyBg((st) => ({ ...st, color: c }))}
                        className={cn(
                          "h-5 w-5 rounded border-2 transition-all",
                          COLOR_SWATCH[c],
                          bodyBg.color === c ? "border-foreground scale-110" : "border-transparent",
                        )}
                      />
                    ))}
                  </ControlRow>
                  {bodyBg.style !== "solid" && (
                    <ControlRow label="To">
                      <div className="flex flex-wrap gap-1">
                        {BG_TOS.map((t) => (
                          <button
                            key={t}
                            onClick={() => setBodyBg((st) => ({ ...st, to: t }))}
                            className={cn(
                              "flex h-5 items-center rounded border-2 px-1 text-[9px] font-medium transition-all",
                              t === "transparent" && "bg-transparent text-muted-foreground",
                              t === "white" && "bg-white text-black",
                              t === "black" && "bg-black text-white",
                              t !== "transparent" && t !== "white" && t !== "black" &&
                                cn(COLOR_SWATCH[t as AccentColor], "text-white"),
                              bodyBg.to === t ? "border-foreground scale-110" : "border-transparent",
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
            <PlaygroundTable wrapperBorder={wrapperBorder} bodyBorder={bodyBorder} bodyBg={bodyBg} />
          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="p-4">
          <CodeBlock label="Generated code" code={generateCode(wrapperBorder, bodyBorder, bodyBg)} />
        </div>
      )}
    </div>
  );
}

// ─── Doc Content ────────────────────────────────────────────────────────────

export function TableDocContent() {
  return (
    <div className="space-y-10">

      {/* ── Hero ── */}
      <ComponentPreview
        align="start"
        code={`import {
  Table, TableWrapper, TableHeader, TableHeaderRow,
  TableBody, TableRow, TableHead, TableCell,
} from "@/ascendra-ui";

<TableWrapper>
  <Table>
    <TableHeader>
      <TableHeaderRow>
        <TableHead>Client</TableHead>
        <TableHead>Invoice</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Status</TableHead>
      </TableHeaderRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Ahmed Khan</TableCell>
        <TableCell>INV-001</TableCell>
        <TableCell>PKR 12,000</TableCell>
        <TableCell><SimpleBadge variant="green">Paid</SimpleBadge></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableWrapper>`}
      >
        <div className="w-full">
          <TableWrapper>
            <Table>
              <TableHeader>
                <SampleHeaders />
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Ahmed Khan</TableCell>
                  <TableCell>INV-001</TableCell>
                  <TableCell>PKR 12,000</TableCell>
                  <TableCell>
                    <SimpleBadge variant="green">Paid</SimpleBadge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableWrapper>
        </div>
      </ComponentPreview>

      {/* ── Examples ── */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Multi-Row */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Multi-Row</h3>
          <p className="text-xs text-muted-foreground">
            Row separators are applied automatically; the last row has no border.
          </p>
          <ComponentPreview
            align="start"
            code={`<TableWrapper>
  <Table>
    <TableHeader>
      <TableHeaderRow>
        <TableHead>Client</TableHead>
        <TableHead>Invoice</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Status</TableHead>
      </TableHeaderRow>
    </TableHeader>
    <TableBody>
      <TableRow>...</TableRow>
      <TableRow>...</TableRow>
      <TableRow>...</TableRow>
    </TableBody>
  </Table>
</TableWrapper>`}
          >
            <div className="w-full">
              <TableWrapper>
                <Table>
                  <TableHeader>
                    <SampleHeaders />
                  </TableHeader>
                  <TableBody>
                    <SampleRows />
                  </TableBody>
                </Table>
              </TableWrapper>
            </div>
          </ComponentPreview>
        </div>

        {/* Empty State */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Empty State</h3>
          <p className="text-xs text-muted-foreground">
            Replace <code className="rounded bg-muted px-1 font-mono text-xs">TableBody</code> with{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">EmptyBody</code> when there is no data.
          </p>
          <ComponentPreview
            align="start"
            code={`<TableWrapper>
  <Table>
    <TableHeader>
      <TableHeaderRow>...</TableHeaderRow>
    </TableHeader>
  </Table>
  <EmptyBody>
    <div className="px-6 py-12 text-center text-sm text-muted-foreground">
      No records found.
    </div>
  </EmptyBody>
</TableWrapper>`}
          >
            <div className="w-full">
              <TableWrapper>
                <Table>
                  <TableHeader>
                    <SampleHeaders />
                  </TableHeader>
                </Table>
                <EmptyBody>
                  <div className="px-6 py-12 text-center text-sm text-muted-foreground">
                    No records found.
                  </div>
                </EmptyBody>
              </TableWrapper>
            </div>
          </ComponentPreview>
        </div>

        {/* ── TableWrapper — Border ── */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            TableWrapper — Border
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">border</code>{" "}
            object to add an accent border to the outer wrapper. Configure{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">side</code>,{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">stroke</code>, and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">color</code>.
          </p>

          {/* top / orange — default */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Top border · orange · stroke 3 (defaults)
            </p>
            <ComponentPreview
              align="start"
              code={`<TableWrapper border={{ side: "t", stroke: 3, color: "orange" }}>
  ...
</TableWrapper>`}
            >
              <div className="w-full">
                <TableWrapper border={{ side: "t", stroke: 3, color: "orange" }}>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* left / blue / stroke 2 */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Left border · blue · stroke 2
            </p>
            <ComponentPreview
              align="start"
              code={`<TableWrapper border={{ side: "l", stroke: 2, color: "blue" }}>
  ...
</TableWrapper>`}
            >
              <div className="w-full">
                <TableWrapper border={{ side: "l", stroke: 2, color: "blue" }}>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* bottom / teal / stroke 1 */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Bottom border · teal · stroke 1
            </p>
            <ComponentPreview
              align="start"
              code={`<TableWrapper border={{ side: "b", stroke: 1, color: "teal" }}>
  ...
</TableWrapper>`}
            >
              <div className="w-full">
                <TableWrapper border={{ side: "b", stroke: 1, color: "teal" }}>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* all / purple / stroke 2 */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              All sides · purple · stroke 2
            </p>
            <ComponentPreview
              align="start"
              code={`<TableWrapper border={{ side: "all", stroke: 2, color: "purple" }}>
  ...
</TableWrapper>`}
            >
              <div className="w-full">
                <TableWrapper border={{ side: "all", stroke: 2, color: "purple" }}>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* Color palette grid */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              All 8 accent colors (top border, stroke 3)
            </p>
            <ComponentPreview
              align="start"
              code={`// All available color values:
<TableWrapper border={{ color: "orange" }}>...</TableWrapper>
<TableWrapper border={{ color: "blue" }}>...</TableWrapper>
<TableWrapper border={{ color: "amber" }}>...</TableWrapper>
<TableWrapper border={{ color: "teal" }}>...</TableWrapper>
<TableWrapper border={{ color: "indigo" }}>...</TableWrapper>
<TableWrapper border={{ color: "purple" }}>...</TableWrapper>
<TableWrapper border={{ color: "red" }}>...</TableWrapper>
<TableWrapper border={{ color: "slate" }}>...</TableWrapper>`}
            >
              <div className="grid w-full grid-cols-2 gap-3">
                {(["orange", "blue", "amber", "teal", "indigo", "purple", "red", "slate"] as const).map(
                  (color) => (
                    <div key={color} className="space-y-1">
                      <p className="text-xs text-muted-foreground capitalize">{color}</p>
                      <TableWrapper border={{ color }}>
                        <Table>
                          <TableHeader>
                            <TableHeaderRow>
                              <TableHead>Client</TableHead>
                              <TableHead>Status</TableHead>
                            </TableHeaderRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Ahmed Khan</TableCell>
                              <TableCell>
                                <SimpleBadge variant="green">Paid</SimpleBadge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Sara Ali</TableCell>
                              <TableCell>
                                <SimpleBadge variant="amber">Pending</SimpleBadge>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableWrapper>
                    </div>
                  )
                )}
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* ── TableBody — Border ── */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            TableBody — Border
          </h3>
          <p className="text-xs text-muted-foreground">
            The <code className="rounded bg-muted px-1 font-mono text-xs">border</code> prop on{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">TableBody</code> applies to the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">::before</code> pseudo-element that
            forms the card background, giving the body panel its own accent edge.
          </p>

          {/* left / indigo */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Left border · indigo · stroke 3
            </p>
            <ComponentPreview
              align="start"
              code={`<TableWrapper>
  <Table>
    <TableHeader>...</TableHeader>
    <TableBody border={{ side: "l", stroke: 3, color: "indigo" }}>
      ...
    </TableBody>
  </Table>
</TableWrapper>`}
            >
              <div className="w-full">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody border={{ side: "l", stroke: 3, color: "indigo" }}>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* top / amber / stroke 2 */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Top border · amber · stroke 2
            </p>
            <ComponentPreview
              align="start"
              code={`<TableBody border={{ side: "t", stroke: 2, color: "amber" }}>
  ...
</TableBody>`}
            >
              <div className="w-full">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody border={{ side: "t", stroke: 2, color: "amber" }}>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* right / red */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Right border · red · stroke 1
            </p>
            <ComponentPreview
              align="start"
              code={`<TableBody border={{ side: "r", stroke: 1, color: "red" }}>
  ...
</TableBody>`}
            >
              <div className="w-full">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody border={{ side: "r", stroke: 1, color: "red" }}>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* all / teal / stroke 2 */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              All sides · teal · stroke 2
            </p>
            <ComponentPreview
              align="start"
              code={`<TableBody border={{ side: "all", stroke: 2, color: "teal" }}>
  ...
</TableBody>`}
            >
              <div className="w-full">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody border={{ side: "all", stroke: 2, color: "teal" }}>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* ── TableBody — Background ── */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            TableBody — Background
          </h3>
          <p className="text-xs text-muted-foreground">
            The <code className="rounded bg-muted px-1 font-mono text-xs">bg</code> prop paints a background
            onto the <code className="rounded bg-muted px-1 font-mono text-xs">::before</code> panel. Configure{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">style</code> (gradient type or solid),{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">side</code> (direction),{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">color</code>, and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">to</code> (end stop).
          </p>

          {/* linear to-b orange (defaults) */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Linear · bottom · orange → transparent (defaults)
            </p>
            <ComponentPreview
              align="start"
              code={`<TableBody bg={{ style: "linear", side: "b", color: "orange", to: "transparent" }}>
  ...
</TableBody>`}
            >
              <div className="w-full">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody bg={{ style: "linear", side: "b", color: "orange", to: "transparent" }}>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* linear to-t / blue */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Linear · top · blue → transparent
            </p>
            <ComponentPreview
              align="start"
              code={`<TableBody bg={{ side: "t", color: "blue" }}>
  ...
</TableBody>`}
            >
              <div className="w-full">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody bg={{ side: "t", color: "blue" }}>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* radial / purple */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Radial · purple → transparent
            </p>
            <ComponentPreview
              align="start"
              code={`<TableBody bg={{ style: "radial", color: "purple" }}>
  ...
</TableBody>`}
            >
              <div className="w-full">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody bg={{ style: "radial", color: "purple" }}>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* solid / teal */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Solid · teal
            </p>
            <ComponentPreview
              align="start"
              code={`<TableBody bg={{ style: "solid", color: "teal" }}>
  ...
</TableBody>`}
            >
              <div className="w-full">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody bg={{ style: "solid", color: "teal" }}>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* Color palette grid */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              All 8 accent colors (linear, side b, to transparent)
            </p>
            <ComponentPreview
              align="start"
              code={`<TableBody bg={{ color: "orange" }}>...</TableBody>
<TableBody bg={{ color: "blue" }}>...</TableBody>
<TableBody bg={{ color: "amber" }}>...</TableBody>
<TableBody bg={{ color: "teal" }}>...</TableBody>
<TableBody bg={{ color: "indigo" }}>...</TableBody>
<TableBody bg={{ color: "purple" }}>...</TableBody>
<TableBody bg={{ color: "red" }}>...</TableBody>
<TableBody bg={{ color: "slate" }}>...</TableBody>`}
            >
              <div className="grid w-full grid-cols-2 gap-3">
                {(["orange", "blue", "amber", "teal", "indigo", "purple", "red", "slate"] as const).map(
                  (color) => (
                    <div key={color} className="space-y-1">
                      <p className="text-xs text-muted-foreground capitalize">{color}</p>
                      <TableWrapper>
                        <Table>
                          <TableHeader>
                            <TableHeaderRow>
                              <TableHead>Client</TableHead>
                              <TableHead>Status</TableHead>
                            </TableHeaderRow>
                          </TableHeader>
                          <TableBody bg={{ color }}>
                            <TableRow>
                              <TableCell>Ahmed Khan</TableCell>
                              <TableCell>
                                <SimpleBadge variant="green">Paid</SimpleBadge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Sara Ali</TableCell>
                              <TableCell>
                                <SimpleBadge variant="amber">Pending</SimpleBadge>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableWrapper>
                    </div>
                  )
                )}
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* ── Border + Background Combined ── */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Combined — Border &amp; Background
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">border</code> and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">bg</code> can be used together on the
            same <code className="rounded bg-muted px-1 font-mono text-xs">TableBody</code>.
          </p>

          {/* left teal border + teal bg */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Left border · teal + teal gradient
            </p>
            <ComponentPreview
              align="start"
              code={`<TableBody
  border={{ side: "l", stroke: 3, color: "teal" }}
  bg={{ color: "teal" }}
>
  ...
</TableBody>`}
            >
              <div className="w-full">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody
                      border={{ side: "l", stroke: 3, color: "teal" }}
                      bg={{ color: "teal" }}
                    >
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* TableWrapper border + TableBody bg */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              TableWrapper top border · orange + TableBody orange gradient
            </p>
            <ComponentPreview
              align="start"
              code={`<TableWrapper border={{ side: "t", color: "orange" }}>
  <Table>
    <TableHeader>...</TableHeader>
    <TableBody bg={{ color: "orange", side: "t" }}>
      ...
    </TableBody>
  </Table>
</TableWrapper>`}
            >
              <div className="w-full">
                <TableWrapper border={{ side: "t", color: "orange" }}>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody bg={{ color: "orange", side: "t" }}>
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* indigo left border + indigo bg on TableBody */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              Left border · indigo + radial indigo gradient
            </p>
            <ComponentPreview
              align="start"
              code={`<TableBody
  border={{ side: "l", stroke: 2, color: "indigo" }}
  bg={{ style: "radial", color: "indigo" }}
>
  ...
</TableBody>`}
            >
              <div className="w-full">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody
                      border={{ side: "l", stroke: 2, color: "indigo" }}
                      bg={{ style: "radial", color: "indigo" }}
                    >
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>

          {/* all border + solid bg */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium">
              All sides border · amber + solid amber background
            </p>
            <ComponentPreview
              align="start"
              code={`<TableBody
  border={{ side: "all", stroke: 2, color: "amber" }}
  bg={{ style: "solid", color: "amber" }}
>
  ...
</TableBody>`}
            >
              <div className="w-full">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <SampleHeaders />
                    </TableHeader>
                    <TableBody
                      border={{ side: "all", stroke: 2, color: "amber" }}
                      bg={{ style: "solid", color: "amber" }}
                    >
                      <SampleRows />
                    </TableBody>
                  </Table>
                </TableWrapper>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* ── Accent Styles Playground ── */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Accent Styles — Border &amp; Background
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">TableWrapper</code>{" "}
            accepts a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">border</code>{" "}
            prop.{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">TableBody</code>{" "}
            accepts both{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">border</code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">bg</code>.
            Toggle each option below and see the result live.
          </p>
          <TableAccentPlayground />
        </div>
      </div>

      {/* ── Props ── */}
      <div className="space-y-8">
        <SectionHeader>Props</SectionHeader>

        {/* Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Table</h3>
          <PropsTable
            props={[
              { name: "scrollable", type: "boolean", default: "false", description: "Enables scroll on the table container." },
              { name: "vertical", type: "boolean", default: "false", description: "Enables vertical (y-axis) scroll." },
              { name: "horizontal", type: "boolean", default: "true", description: "Enables horizontal (x-axis) scroll." },
              { name: "height", type: "number", description: "Max height in px when vertical scroll is enabled." },
              { name: "minHeight", type: "number", description: "Minimum height in px for the table container." },
            ]}
          />
        </div>

        {/* TableWrapper */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">TableWrapper</h3>
          <PropsTable
            props={[
              { name: "border", type: "BorderConfig", description: "Optional accent border on the outer wrapper. Omit to render without a border." },
            ]}
          />
        </div>

        {/* TableBody */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">TableBody</h3>
          <PropsTable
            props={[
              { name: "border", type: "BorderConfig", description: "Optional accent border applied to the ::before panel element." },
              { name: "bg", type: "BgConfig", description: "Optional background on the ::before panel element. Removes the solid bg-background when set." },
            ]}
          />
        </div>

        {/* BorderConfig */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">BorderConfig</h3>
          <PropsTable
            props={[
              { name: "side", type: "'t' | 'l' | 'r' | 'b' | 'all'", default: "'t'", description: "Which side the border appears on. t = top, l = left, r = right, b = bottom, all = all sides." },
              { name: "stroke", type: "1 | 2 | 3", default: "3", description: "Border thickness. 1 = 1px, 2 = 2px, 3 = 3px." },
              { name: "color", type: "'blue' | 'amber' | 'purple' | 'red' | 'teal' | 'orange' | 'indigo' | 'slate'", default: "'orange'", description: "Accent color of the border at 60% opacity." },
            ]}
          />
        </div>

        {/* BgConfig */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">BgConfig</h3>
          <PropsTable
            props={[
              { name: "style", type: "'linear' | 'radial' | 'conic' | 'solid'", default: "'linear'", description: "Background type. solid applies a flat color; linear/radial/conic apply a gradient." },
              { name: "side", type: "'t' | 'l' | 'r' | 'b' | 'all'", default: "'b'", description: "Gradient direction (only meaningful for linear). t = top, b = bottom, l = left, r = right." },
              { name: "color", type: "'blue' | 'amber' | 'purple' | 'red' | 'teal' | 'orange' | 'indigo' | 'slate'", default: "'orange'", description: "Start color of the gradient at 7% opacity (or the solid fill color)." },
              { name: "to", type: "'transparent' | 'white' | 'black' | AccentColor", default: "'transparent'", description: "End stop color for gradients. Accent colors resolve to 500/60 opacity. Ignored when style is solid." },
            ]}
          />
        </div>
      </div>

    </div>
  );
}
