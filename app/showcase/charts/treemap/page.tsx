"use client";

import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { Treemap, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, SimpleBadge } from "@/ascendra-ui";

// ─── Data ─────────────────────────────────────────────────────────────────────

const basicData = [
  { name: "Marketing", size: 4200 },
  { name: "Engineering", size: 8700 },
  { name: "Sales", size: 5100 },
  { name: "Support", size: 2300 },
  { name: "Design", size: 1900 },
  { name: "Finance", size: 3400 },
  { name: "Operations", size: 2800 },
  { name: "HR", size: 1500 },
];

const nestedData = [
  {
    name: "Product",
    children: [
      { name: "Mobile", size: 3800 },
      { name: "Web", size: 5200 },
      { name: "API", size: 2600 },
    ],
  },
  {
    name: "Revenue",
    children: [
      { name: "Enterprise", size: 7400 },
      { name: "SMB", size: 4100 },
      { name: "Consumer", size: 2200 },
    ],
  },
  {
    name: "Ops",
    children: [
      { name: "Infra", size: 3100 },
      { name: "Support", size: 1800 },
    ],
  },
];

const labelData = [
  { name: "Node.js", size: 3200 },
  { name: "Python", size: 5600 },
  { name: "Go", size: 2800 },
  { name: "Rust", size: 1400 },
  { name: "TypeScript", size: 4100 },
  { name: "Java", size: 3700 },
  { name: "C#", size: 2500 },
  { name: "Ruby", size: 1100 },
  { name: "Swift", size: 1800 },
];

// ─── Colors ───────────────────────────────────────────────────────────────────

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
];

// ─── Custom content renderers ─────────────────────────────────────────────────

function BasicContent(props: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  index?: number;
}) {
  const { x = 0, y = 0, width = 0, height = 0, name, index = 0 } = props;
  if (width < 30 || height < 20) return null;
  return (
    <g>
      <rect
        x={x + 1}
        y={y + 1}
        width={width - 2}
        height={height - 2}
        style={{
          fill: CHART_COLORS[index % CHART_COLORS.length],
          opacity: 0.85,
        }}
        rx={3}
      />
      {width > 50 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fill: "#fff", fontSize: 11, fontWeight: 500 }}
        >
          {name}
        </text>
      )}
    </g>
  );
}

function NestedContent(props: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  depth?: number;
  index?: number;
  root?: { name: string };
}) {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    name,
    depth = 0,
    index = 0,
  } = props;
  if (width < 10 || height < 10) return null;
  const isParent = depth === 1;
  return (
    <g>
      <rect
        x={x + 1}
        y={y + 1}
        width={width - 2}
        height={height - 2}
        style={{
          fill: isParent
            ? "var(--muted)"
            : CHART_COLORS[index % CHART_COLORS.length],
          stroke: "var(--background)",
          strokeWidth: 2,
          opacity: isParent ? 0.4 : 0.82,
        }}
        rx={3}
      />
      {width > 50 && height > 24 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fill: isParent ? "var(--muted-foreground)" : "#fff",
            fontSize: isParent ? 10 : 11,
            fontWeight: isParent ? 400 : 500,
          }}
        >
          {name}
        </text>
      )}
    </g>
  );
}

function LabelContent(props: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  size?: number;
  index?: number;
}) {
  const { x = 0, y = 0, width = 0, height = 0, name, size, index = 0 } = props;
  if (width < 40 || height < 28) return null;
  return (
    <g>
      <rect
        x={x + 1}
        y={y + 1}
        width={width - 2}
        height={height - 2}
        style={{
          fill: CHART_COLORS[index % CHART_COLORS.length],
          opacity: 0.8,
        }}
        rx={3}
      />
      <text
        x={x + width / 2}
        y={y + height / 2 - 6}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fill: "#fff", fontSize: 11, fontWeight: 600 }}
      >
        {name}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 8}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fill: "rgba(255,255,255,0.75)", fontSize: 10 }}
      >
        {((size ?? 0) / 1000).toFixed(1)}k
      </text>
    </g>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function TreemapChartsPage() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <Link
        href="/showcase/charts"
        className="text-muted-foreground hover:text-foreground mb-8 flex w-fit items-center gap-1.5 text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
      >
        <LuArrowLeft className="size-3 stroke-2" />
        Chart Gallery
      </Link>

      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Charts
        </div>
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          Treemap
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Hierarchical data visualised as nested rectangles — cell area encodes
          value, making dominant categories immediately visible without reading
          numbers.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1 — Basic Treemap */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Basic Treemap</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Department headcount — each rectangle area is proportional to
                  team size. Engineering and Sales dominate at a glance.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="default" className="shrink-0 mt-px">
                Basic
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={basicData}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    content={<BasicContent />}
                  />
                </ResponsiveContainer>
              </div>
            </div>
          </CardPanel>
        </Card>

        {/* 2 — Nested Treemap */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>Nested Treemap</CardHeaderTitle>
                <CardHeaderSubtitle>
                  Two-level hierarchy showing business units (parent) and their
                  sub-teams (children). Parent tiles act as grouping containers.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="blue" className="shrink-0 mt-px">
                Nested
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={nestedData}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    content={<NestedContent />}
                  />
                </ResponsiveContainer>
              </div>
            </div>
          </CardPanel>
        </Card>

        {/* 3 — Treemap with Labels */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardHeaderTitle>
                  Treemap with Labels
                </CardHeaderTitle>
                <CardHeaderSubtitle>
                  Programming language usage — each cell shows the name and
                  usage count. Custom content renderer centres both the label
                  and value inside each tile.
                </CardHeaderSubtitle>
              </div>
              <SimpleBadge variant="green" className="shrink-0 mt-px">
                Labels
              </SimpleBadge>
            </div>
          </CardHeader>
          <CardPanel>
            <div className="p-5">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={labelData}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    content={<LabelContent />}
                  />
                </ResponsiveContainer>
              </div>
            </div>
          </CardPanel>
        </Card>
      </div>
    </div>
  );
}
