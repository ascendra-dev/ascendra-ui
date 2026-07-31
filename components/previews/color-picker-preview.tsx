"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { ColorPicker } from "@/ascendra-ui";
import { Field, FieldLabel, FieldHint } from "@/ascendra-ui";

const CHART_PRESETS = ["#2563eb", "#16a34a", "#d97706", "#dc2626", "#7c3aed", "#0891b2"];
const BRAND_PRESETS = ["#111827", "#1d4ed8", "#2563eb", "#3b82f6", "#93c5fd"];

function ColorSwatch({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="size-5 rounded-md border border-foreground/10 shadow-sm shrink-0"
        style={{ backgroundColor: color }}
      />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-foreground">{label}</span>
        <span className="font-mono text-[0.6875rem] text-muted-foreground">{color}</span>
      </div>
    </div>
  );
}

export function ColorPickerDocContent() {
  const [primary, setPrimary] = useState("#2563eb");
  const [secondary, setSecondary] = useState("#16a34a");
  const [accent, setAccent] = useState("#d97706");

  const [brandColor, setBrandColor] = useState("#1d4ed8");
  const [chartColor, setChartColor] = useState("#2563eb");
  const [swatchOnly, setSwatchOnly] = useState("#7c3aed");

  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { ColorPicker } from "@/ascendra-ui";

const [color, setColor] = useState("#2563eb");

<ColorPicker value={color} onChange={setColor} />`}
      >
        <div className="flex items-center gap-3">
          <ColorPicker value={primary} onChange={setPrimary} />
          <ColorSwatch label="Primary" color={primary} />
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Preset-only mode</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">presetsOnly</code>{" "}
            to hide the HSL sliders and hex input — just the swatch grid.
          </p>
          <ComponentPreview
            code={`<ColorPicker value={color} onChange={setColor} presetsOnly />`}
          >
            <div className="flex items-center gap-3">
              <ColorPicker value={swatchOnly} onChange={setSwatchOnly} presetsOnly />
              <ColorSwatch label="Selected" color={swatchOnly} />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Custom preset palette</h3>
          <p className="text-xs text-muted-foreground">
            Pass a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">presets</code>{" "}
            array to replace the default 30-color grid — useful for brand-approved color sets.
          </p>
          <ComponentPreview
            code={`const BRAND = ["#111827", "#1d4ed8", "#2563eb", "#3b82f6", "#93c5fd"];
const CHART = ["#2563eb", "#16a34a", "#d97706", "#dc2626", "#7c3aed", "#0891b2"];

<ColorPicker presets={BRAND} value={brand} onChange={setBrand} />
<ColorPicker presets={CHART} value={chart} onChange={setChart} presetsOnly />`}
          >
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Brand palette</p>
                <div className="flex items-center gap-3">
                  <ColorPicker value={brandColor} onChange={setBrandColor} presets={BRAND_PRESETS} />
                  <ColorSwatch label="Brand color" color={brandColor} />
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Chart colors only</p>
                <div className="flex items-center gap-3">
                  <ColorPicker
                    value={chartColor}
                    onChange={setChartColor}
                    presets={CHART_PRESETS}
                    presetsOnly
                  />
                  <ColorSwatch label="Chart series" color={chartColor} />
                </div>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Multiple pickers — theme builder</h3>
          <p className="text-xs text-muted-foreground">
            Compose multiple pickers together. The live gradient below updates as you change each color.
          </p>
          <ComponentPreview
            align="start"
            code={`<ColorPicker value={primary}   onChange={setPrimary} />
<ColorPicker value={secondary} onChange={setSecondary} />
<ColorPicker value={accent}    onChange={setAccent} />`}
          >
            <div className="rounded-lg border bg-muted/20 p-5 flex flex-col gap-5 w-full max-w-sm">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Primary",   value: primary,   onChange: setPrimary },
                  { label: "Secondary", value: secondary, onChange: setSecondary },
                  { label: "Accent",    value: accent,    onChange: setAccent },
                ].map(({ label, value, onChange }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">{label}</span>
                    <div className="flex items-center gap-2">
                      <ColorPicker value={value} onChange={onChange} />
                      <span className="font-mono text-xs text-foreground">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="h-7 rounded-md shadow-inner"
                style={{ background: `linear-gradient(to right, ${primary}, ${secondary}, ${accent})` }}
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Disabled</h3>
          <ComponentPreview
            code={`<ColorPicker value="#6b7280" disabled />`}
          >
            <ColorPicker value="#6b7280" disabled />
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Inside Field</h3>
          <p className="text-xs text-muted-foreground">
            Pair with a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">Field</code>{" "}
            wrapper for form use.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel>Brand color</FieldLabel>
  <div className="flex items-center gap-2 py-1">
    <ColorPicker value={color} onChange={setColor} />
    <span className="font-mono text-sm">{color}</span>
  </div>
</Field>`}
          >
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <Field>
                <FieldLabel>Brand color</FieldLabel>
                <div className="flex items-center gap-2 py-1">
                  <ColorPicker value={brandColor} onChange={setBrandColor} />
                  <span className="font-mono text-sm text-foreground">{brandColor}</span>
                </div>
              </Field>
              <Field>
                <FieldLabel>Chart series color</FieldLabel>
                <div className="flex items-center gap-2 py-1">
                  <ColorPicker
                    value={chartColor}
                    onChange={setChartColor}
                    presets={CHART_PRESETS}
                    presetsOnly
                  />
                  <span className="font-mono text-sm text-foreground">{chartColor}</span>
                </div>
                <FieldHint description="Used in report visualisations" />
              </Field>
            </div>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable
          props={[
            { name: "value", type: "string", default: "'#2563eb'", description: "Controlled hex color value (6-digit, e.g. #2563eb)." },
            { name: "onChange", type: "(hex: string) => void", description: "Called with the new hex value when the user changes the color." },
            { name: "presets", type: "string[]", description: "Array of hex preset swatches. Defaults to a 30-color palette." },
            { name: "presetsOnly", type: "boolean", default: "false", description: "Hide sliders and hex input — show only the preset grid." },
            { name: "disabled", type: "boolean", default: "false", description: "Prevents opening the picker." },
            { name: "className", type: "string", description: "Additional CSS classes on the trigger button." },
          ]}
        />
      </div>
    </div>
  );
}
