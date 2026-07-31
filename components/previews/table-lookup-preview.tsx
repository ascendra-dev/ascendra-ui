"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { TableLookup, type TableLookupColumn } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["table-lookup"];

// ─── Port example data type ───────────────────────────────────────────────────

type Port = {
  code: string;
  name: string;
  country: string;
  type: "Sea" | "Air" | "Rail" | "Road";
  description: string;
};

const portColumns: TableLookupColumn<Port>[] = [
  { key: "code", label: "Code", width: 80, searchable: true },
  { key: "name", label: "Port Name", width: 120, searchable: true },
  { key: "country", label: "Country", searchable: true },
  { key: "type", label: "Type" },
  { key: "description", label: "Description", width: 200 },
];

const ALL_PORTS: Port[] = [
  {
    code: "SGSIN",
    name: "Port of Singapore",
    country: "Singapore",
    type: "Sea",
    description: "Largest transshipment hub in Asia",
  },
  {
    code: "CNSHA",
    name: "Port of Shanghai",
    country: "China",
    type: "Sea",
    description: "World's busiest container port",
  },
  {
    code: "NLRTM",
    name: "Port of Rotterdam",
    country: "Netherlands",
    type: "Sea",
    description: "Largest port in Europe",
  },
  {
    code: "USLAX",
    name: "Port of Los Angeles",
    country: "United States",
    type: "Sea",
    description: "Busiest container port in the US",
  },
  {
    code: "AEDXB",
    name: "Port of Jebel Ali",
    country: "UAE",
    type: "Sea",
    description: "Largest port in the Middle East",
  },
  {
    code: "DEHAM",
    name: "Port of Hamburg",
    country: "Germany",
    type: "Sea",
    description: "Germany's largest seaport",
  },
  {
    code: "GBFXT",
    name: "Port of Felixstowe",
    country: "United Kingdom",
    type: "Sea",
    description: "UK's busiest container port",
  },
  {
    code: "JPYOK",
    name: "Port of Yokohama",
    country: "Japan",
    type: "Sea",
    description: "Major gateway port in Japan",
  },
  {
    code: "KRPUS",
    name: "Port of Busan",
    country: "South Korea",
    type: "Sea",
    description: "Fifth busiest container port globally",
  },
  {
    code: "BEANR",
    name: "Port of Antwerp",
    country: "Belgium",
    type: "Sea",
    description: "Second busiest port in Europe",
  },
  {
    code: "USSEA",
    name: "Port of Seattle",
    country: "United States",
    type: "Sea",
    description: "Northwest US gateway port",
  },
  {
    code: "MYPKG",
    name: "Port Klang",
    country: "Malaysia",
    type: "Sea",
    description: "Malaysia's principal port",
  },
  {
    code: "HKHKG",
    name: "Port of Hong Kong",
    country: "Hong Kong",
    type: "Sea",
    description: "Major transshipment port in Asia",
  },
  {
    code: "INMAA",
    name: "Chennai Port",
    country: "India",
    type: "Sea",
    description: "Major port on India's east coast",
  },
  {
    code: "ZAPTR",
    name: "Port Elizabeth",
    country: "South Africa",
    type: "Sea",
    description: "Key container terminal in South Africa",
  },
  {
    code: "GBLON",
    name: "Heathrow Airport",
    country: "United Kingdom",
    type: "Air",
    description: "Busiest air cargo hub in the UK",
  },
  {
    code: "USJFK",
    name: "John F. Kennedy Airport",
    country: "United States",
    type: "Air",
    description: "Major international air cargo hub",
  },
  {
    code: "DEDUS",
    name: "Düsseldorf Airport",
    country: "Germany",
    type: "Air",
    description: "Primary cargo airport for western Germany",
  },
  {
    code: "FRCLY",
    name: "Paris Charles de Gaulle",
    country: "France",
    type: "Air",
    description: "France's largest air cargo gateway",
  },
  {
    code: "CNPEK",
    name: "Beijing Capital Airport",
    country: "China",
    type: "Air",
    description: "Major hub for north China air cargo",
  },
  {
    code: "DEFRA",
    name: "Frankfurt Rail Hub",
    country: "Germany",
    type: "Rail",
    description: "Central European rail freight hub",
  },
  {
    code: "PLWAW",
    name: "Warsaw Rail Terminal",
    country: "Poland",
    type: "Rail",
    description: "Gateway for New Silk Road rail freight",
  },
  {
    code: "GBMAN",
    name: "Manchester Inland Port",
    country: "United Kingdom",
    type: "Road",
    description: "Major inland distribution centre",
  },
  {
    code: "FRPAR",
    name: "Paris Rungis Hub",
    country: "France",
    type: "Road",
    description: "Europe's largest wholesale road hub",
  },
];

const mockOnSearch = async (query: string, field?: string): Promise<Port[]> => {
  await new Promise((r) => setTimeout(r, 3000));
  if (!query.trim()) return ALL_PORTS;
  const q = query.toLowerCase();
  return ALL_PORTS.filter((p) => {
    const col = field as keyof Port | undefined;
    if (col && col in p) return String(p[col]).toLowerCase().includes(q);
    return (
      p.code.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q)
    );
  });
};

// ─── Previews ─────────────────────────────────────────────────────────────────

function SingleModePreview() {
  const [value, setValue] = useState<Port | null>(null);
  return (
    <div className="w-64">
      <TableLookup<Port>
        columns={portColumns}
        valueKey="code"
        labelKey="name"
        mode="single"
        placeholder="Select port…"
        value={value}
        onChange={(v) => setValue(v as Port | null)}
        onSearch={mockOnSearch}
      />
    </div>
  );
}

function MultiModePreview() {
  const [value, setValue] = useState<Port[] | null>(null);
  return (
    <div className="w-80">
      <TableLookup<Port>
        columns={portColumns}
        valueKey="code"
        labelKey="name"
        mode="multiple"
        placeholder="Select ports…"
        value={value}
        onChange={(v) => setValue(v as Port[] | null)}
        onSearch={mockOnSearch}
      />
    </div>
  );
}

function DisabledPreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-56">
        <TableLookup<Port>
          columns={portColumns}
          valueKey="code"
          labelKey="name"
          mode="single"
          placeholder="Select port…"
          disabled
          onSearch={mockOnSearch}
        />
      </div>
      <div className="w-64">
        <TableLookup<Port>
          columns={portColumns}
          valueKey="code"
          labelKey="name"
          mode="multiple"
          placeholder="Select ports…"
          disabled
          onSearch={mockOnSearch}
        />
      </div>
    </div>
  );
}

function InvalidPreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-56">
        <TableLookup<Port>
          columns={portColumns}
          valueKey="code"
          labelKey="name"
          mode="single"
          placeholder="Select port…"
          invalid
          onSearch={mockOnSearch}
        />
      </div>
      <div className="w-64">
        <TableLookup<Port>
          columns={portColumns}
          valueKey="code"
          labelKey="name"
          mode="multiple"
          placeholder="Select ports…"
          invalid
          onSearch={mockOnSearch}
        />
      </div>
    </div>
  );
}

// ─── Doc export ───────────────────────────────────────────────────────────────

export function TableLookupDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero preview */}
      <ComponentPreview
        code={`import { TableLookup } from "@/ascendra-ui";

const columns = [
  { key: "code",    label: "Code",      width: 80,  searchable: true },
  { key: "name",    label: "Port Name", width: 120, searchable: true },
  { key: "country", label: "Country",               searchable: true },
  { key: "type",    label: "Type" },
];

const [value, setValue] = useState<Port | null>(null);

<TableLookup<Port>
  columns={columns}
  valueKey="code"
  labelKey="name"
  mode="single"
  placeholder="Select port…"
  value={value}
  onChange={(v) => setValue(v as Port | null)}
  onSearch={onSearch}
/>`}
      >
        <SingleModePreview />
      </ComponentPreview>

      {/* Examples */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Multiple selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Multiple selection
          </h3>
          <p className="text-xs text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              mode=&quot;multiple&quot;
            </code>{" "}
            to accumulate selections as removable chips in the trigger. The
            dialog stays open between picks so you can select multiple rows in
            one session.
          </p>
          <ComponentPreview
            code={`<TableLookup<Port>
  columns={columns}
  valueKey="code"
  labelKey="name"
  mode="multiple"
  placeholder="Select ports…"
  value={value}
  onChange={(v) => setValue(v as Port[] | null)}
  onSearch={onSearch}
/>`}
          >
            <MultiModePreview />
          </ComponentPreview>
        </div>

        {/* Disabled */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Disabled</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              disabled
            </code>{" "}
            to prevent the dialog from opening. Applies to both single and
            multiple modes — chips remain visible but the remove button is
            inactive.
          </p>
          <ComponentPreview
            code={`<TableLookup<Port>
  columns={columns}
  valueKey="code"
  labelKey="name"
  disabled
  onSearch={onSearch}
/>`}
          >
            <DisabledPreview />
          </ComponentPreview>
        </div>
      </div>

      {/* Invalid state */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Invalid state</h3>
        <p className="text-xs text-muted-foreground">
          Pass{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">
            invalid
          </code>{" "}
          to apply a destructive outline to the trigger, signalling a validation
          error. Works for both single and multiple modes.
        </p>
        <ComponentPreview
          code={`<TableLookup<Port>
  columns={columns}
  valueKey="code"
  labelKey="name"
  invalid
  onSearch={onSearch}
/>`}
        >
          <InvalidPreview />
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
