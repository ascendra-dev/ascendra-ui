"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { ColorTile, ColorTileTitle, ColorTileSubTitle } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["color-tile"];

export function ColorTileDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <ComponentPreview
        code={`import { ColorTile, ColorTileTitle, ColorTileSubTitle } from "@/ascendra-ui";

<ColorTile variant="emerald" className="w-28">
  <ColorTileTitle>SDG 13</ColorTileTitle>
  <ColorTileSubTitle>Climate Action</ColorTileSubTitle>
</ColorTile>`}
      >
        <ColorTile variant="emerald" className="w-28">
          <ColorTileTitle>SDG 13</ColorTileTitle>
          <ColorTileSubTitle>Climate Action</ColorTileSubTitle>
        </ColorTile>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* All variants */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Variants</h3>
          <p className="text-xs text-muted-foreground">
            Sixteen solid-color variants. Each uses white text on a full-saturation background.
          </p>
          <ComponentPreview
            code={`<ColorTile variant="primary">
  <ColorTileTitle>primary</ColorTileTitle>
</ColorTile>
<ColorTile variant="gray">
  <ColorTileTitle>gray</ColorTileTitle>
</ColorTile>
{/* …all 16 variants */}`}
          >
            <div className="flex flex-wrap gap-2">
              {(
                [
                  "primary","gray","green","emerald","blue","sky",
                  "orange","amber","yellow","red","rose","violet",
                  "pink","indigo","teal","cyan",
                ] as const
              ).map((v) => (
                <ColorTile key={v} variant={v} className="w-20">
                  <ColorTileTitle>{v}</ColorTileTitle>
                </ColorTile>
              ))}
            </div>
          </ComponentPreview>
        </div>

        {/* Title only */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Title Only</h3>
          <p className="text-xs text-muted-foreground">
            Use just <code className="rounded bg-muted px-1 font-mono text-xs">ColorTileTitle</code> for compact single-line indicators such as priority codes.
          </p>
          <ComponentPreview
            code={`<ColorTile variant="red" className="w-14">
  <ColorTileTitle>P1</ColorTileTitle>
</ColorTile>
<ColorTile variant="orange" className="w-14">
  <ColorTileTitle>P2</ColorTileTitle>
</ColorTile>
<ColorTile variant="amber" className="w-14">
  <ColorTileTitle>P3</ColorTileTitle>
</ColorTile>
<ColorTile variant="gray" className="w-14">
  <ColorTileTitle>P4</ColorTileTitle>
</ColorTile>`}
          >
            <ColorTile variant="red"    className="w-14"><ColorTileTitle>P1</ColorTileTitle></ColorTile>
            <ColorTile variant="orange" className="w-14"><ColorTileTitle>P2</ColorTileTitle></ColorTile>
            <ColorTile variant="amber"  className="w-14"><ColorTileTitle>P3</ColorTileTitle></ColorTile>
            <ColorTile variant="gray"   className="w-14"><ColorTileTitle>P4</ColorTileTitle></ColorTile>
          </ComponentPreview>
        </div>

        {/* SDG alignment grid */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">SDG Alignment Grid</h3>
          <p className="text-xs text-muted-foreground">
            The canonical use case — a colour-coded classification grid for UN Sustainable Development Goals or any labelled category set.
          </p>
          <ComponentPreview
            code={`<div className="grid grid-cols-3 gap-3 w-72">
  <ColorTile variant="green">
    <ColorTileTitle>SDG 3</ColorTileTitle>
    <ColorTileSubTitle>Good Health</ColorTileSubTitle>
  </ColorTile>
  <ColorTile variant="orange">
    <ColorTileTitle>SDG 5</ColorTileTitle>
    <ColorTileSubTitle>Gender Equality</ColorTileSubTitle>
  </ColorTile>
  {/* …more tiles */}
</div>`}
          >
            <div className="grid grid-cols-3 gap-3" style={{ width: "18rem" }}>
              <ColorTile variant="green">
                <ColorTileTitle>SDG 3</ColorTileTitle>
                <ColorTileSubTitle>Good Health</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="orange">
                <ColorTileTitle>SDG 5</ColorTileTitle>
                <ColorTileSubTitle>Gender Equality</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="yellow">
                <ColorTileTitle>SDG 7</ColorTileTitle>
                <ColorTileSubTitle>Clean Energy</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="rose">
                <ColorTileTitle>SDG 8</ColorTileTitle>
                <ColorTileSubTitle>Decent Work</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="pink">
                <ColorTileTitle>SDG 10</ColorTileTitle>
                <ColorTileSubTitle>Reduced Inequality</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="amber">
                <ColorTileTitle>SDG 12</ColorTileTitle>
                <ColorTileSubTitle>Responsible Cons.</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="emerald">
                <ColorTileTitle>SDG 13</ColorTileTitle>
                <ColorTileSubTitle>Climate Action</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="blue">
                <ColorTileTitle>SDG 16</ColorTileTitle>
                <ColorTileSubTitle>Strong Institutions</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="sky">
                <ColorTileTitle>SDG 17</ColorTileTitle>
                <ColorTileSubTitle>Partnerships</ColorTileSubTitle>
              </ColorTile>
            </div>
          </ComponentPreview>
        </div>

        {/* Project phase indicators */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Project Phase Indicators</h3>
          <p className="text-xs text-muted-foreground">
            Use in a horizontal strip to show pipeline stages or sprint phases.
          </p>
          <ComponentPreview
            code={`<ColorTile variant="violet" className="w-24">
  <ColorTileTitle>Phase 1</ColorTileTitle>
  <ColorTileSubTitle>Discovery</ColorTileSubTitle>
</ColorTile>
<ColorTile variant="blue" className="w-24">
  <ColorTileTitle>Phase 2</ColorTileTitle>
  <ColorTileSubTitle>Design</ColorTileSubTitle>
</ColorTile>
{/* …more phases */}`}
          >
            <div className="flex flex-wrap gap-3">
              <ColorTile variant="violet"  className="w-24">
                <ColorTileTitle>Phase 1</ColorTileTitle>
                <ColorTileSubTitle>Discovery</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="blue"    className="w-24">
                <ColorTileTitle>Phase 2</ColorTileTitle>
                <ColorTileSubTitle>Design</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="indigo"  className="w-24">
                <ColorTileTitle>Phase 3</ColorTileTitle>
                <ColorTileSubTitle>Build</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="teal"    className="w-24">
                <ColorTileTitle>Phase 4</ColorTileTitle>
                <ColorTileSubTitle>QA</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="emerald" className="w-24">
                <ColorTileTitle>Phase 5</ColorTileTitle>
                <ColorTileSubTitle>Launch</ColorTileSubTitle>
              </ColorTile>
            </div>
          </ComponentPreview>
        </div>

        {/* Risk classification */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Risk Classification</h3>
          <p className="text-xs text-muted-foreground">
            Severity tiles for security, audit, and compliance reports.
          </p>
          <ComponentPreview
            code={`<ColorTile variant="red" className="w-24">
  <ColorTileTitle>CRIT</ColorTileTitle>
  <ColorTileSubTitle>Critical</ColorTileSubTitle>
</ColorTile>
<ColorTile variant="orange" className="w-24">
  <ColorTileTitle>HIGH</ColorTileTitle>
  <ColorTileSubTitle>High</ColorTileSubTitle>
</ColorTile>
{/* …more levels */}`}
          >
            <div className="flex flex-wrap gap-3">
              <ColorTile variant="red"    className="w-24">
                <ColorTileTitle>CRIT</ColorTileTitle>
                <ColorTileSubTitle>Critical</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="orange" className="w-24">
                <ColorTileTitle>HIGH</ColorTileTitle>
                <ColorTileSubTitle>High</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="amber"  className="w-24">
                <ColorTileTitle>MED</ColorTileTitle>
                <ColorTileSubTitle>Medium</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="green"  className="w-24">
                <ColorTileTitle>LOW</ColorTileTitle>
                <ColorTileSubTitle>Low</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="gray"   className="w-24">
                <ColorTileTitle>INFO</ColorTileTitle>
                <ColorTileSubTitle>Informational</ColorTileSubTitle>
              </ColorTile>
            </div>
          </ComponentPreview>
        </div>

        {/* ESG pillars */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">ESG Pillar Tags</h3>
          <p className="text-xs text-muted-foreground">
            Wide tiles with custom padding — override sizing via <code className="rounded bg-muted px-1 font-mono text-xs">className</code>. Children can be any element, not just the provided sub-components.
          </p>
          <ComponentPreview
            code={`<ColorTile variant="emerald" className="w-32 py-4">
  <ColorTileTitle>E</ColorTileTitle>
  <ColorTileSubTitle>Environmental</ColorTileSubTitle>
</ColorTile>
<ColorTile variant="blue" className="w-32 py-4">
  <ColorTileTitle>S</ColorTileTitle>
  <ColorTileSubTitle>Social</ColorTileSubTitle>
</ColorTile>
<ColorTile variant="violet" className="w-32 py-4">
  <ColorTileTitle>G</ColorTileTitle>
  <ColorTileSubTitle>Governance</ColorTileSubTitle>
</ColorTile>`}
          >
            <div className="flex gap-4">
              <ColorTile variant="emerald" className="w-32 py-4">
                <ColorTileTitle>E</ColorTileTitle>
                <ColorTileSubTitle>Environmental</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="blue"    className="w-32 py-4">
                <ColorTileTitle>S</ColorTileTitle>
                <ColorTileSubTitle>Social</ColorTileSubTitle>
              </ColorTile>
              <ColorTile variant="violet"  className="w-32 py-4">
                <ColorTileTitle>G</ColorTileTitle>
                <ColorTileSubTitle>Governance</ColorTileSubTitle>
              </ColorTile>
            </div>
          </ComponentPreview>
        </div>

        {/* Custom children */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Custom Children</h3>
          <p className="text-xs text-muted-foreground">
            Because <code className="rounded bg-muted px-1 font-mono text-xs">ColorTile</code> is a plain wrapper, you can pass any markup — icons, badges, or fully custom layouts.
          </p>
          <ComponentPreview
            code={`<ColorTile variant="cyan" className="w-28 gap-2">
  <span className="text-2xl font-black">42</span>
  <ColorTileSubTitle>open issues</ColorTileSubTitle>
</ColorTile>

<ColorTile variant="rose" className="w-28 gap-2">
  <span className="text-2xl font-black">↑ 18%</span>
  <ColorTileSubTitle>vs last month</ColorTileSubTitle>
</ColorTile>`}
          >
            <ColorTile variant="cyan" className="w-28 gap-2">
              <span className="text-2xl font-black">42</span>
              <ColorTileSubTitle>open issues</ColorTileSubTitle>
            </ColorTile>
            <ColorTile variant="rose" className="w-28 gap-2">
              <span className="text-2xl font-black">↑ 18%</span>
              <ColorTileSubTitle>vs last month</ColorTileSubTitle>
            </ColorTile>
          </ComponentPreview>
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
