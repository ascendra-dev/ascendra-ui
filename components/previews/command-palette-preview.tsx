"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { CommandPalette, useCommandPalette } from "@/ascendra-ui";
import type { CommandPaletteGroup } from "@/ascendra-ui";
import { Button } from "@/ascendra-ui";
import {
  FileText,
  Settings,
  Users,
  BarChart2,
  Plus,
  Search,
  Trash2,
  LogOut,
} from "lucide-react";

const GROUPS: CommandPaletteGroup[] = [
  {
    label: "Navigation",
    items: [
      { id: "dashboard", label: "Go to Dashboard", icon: BarChart2, onSelect: () => {} },
      { id: "users", label: "Go to Users", icon: Users, onSelect: () => {} },
      { id: "reports", label: "Go to Reports", icon: FileText, onSelect: () => {} },
    ],
  },
  {
    label: "Actions",
    items: [
      { id: "new-doc", label: "New Document", icon: Plus, shortcut: "⌘N", onSelect: () => {} },
      { id: "search", label: "Search Everything", icon: Search, shortcut: "⌘F", onSelect: () => {} },
      { id: "settings", label: "Open Settings", icon: Settings, shortcut: "⌘,", onSelect: () => {} },
    ],
  },
];

const DANGER_GROUPS: CommandPaletteGroup[] = [
  {
    label: "Danger Zone",
    items: [
      { id: "delete", label: "Delete Account", icon: Trash2, onSelect: () => {} },
      { id: "logout", label: "Sign Out", icon: LogOut, onSelect: () => {} },
    ],
  },
];

function PaletteDemo() {
  const { open, setOpen } = useCommandPalette();
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Open palette <kbd className="ml-1.5 rounded bg-muted px-1 font-mono text-[0.6875rem] text-muted-foreground">⌘K</kbd>
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={GROUPS}
        placeholder="Search commands…"
      />
    </>
  );
}

export function CommandPaletteDocContent() {
  const [dangerOpen, setDangerOpen] = useState(false);

  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { CommandPalette, useCommandPalette } from "@/ascendra-ui";

function App() {
  const [open, setOpen] = useState(false);
  useCommandPalette(setOpen); // registers ⌘K / Ctrl+K

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open ⌘K</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={groups}
      />
    </>
  );
}`}
      >
        <PaletteDemo />
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Custom groups</h3>
          <p className="text-xs text-muted-foreground">
            Pass any{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">groups</code>{" "}
            array. Each group has a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">label</code>{" "}
            and an{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">items</code>{" "}
            array. Items support{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">icon</code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">shortcut</code>.
          </p>
          <ComponentPreview
            code={`const groups = [
  {
    label: "Navigation",
    items: [
      { id: "dashboard", label: "Go to Dashboard", icon: LuChartBar, onSelect: () => {} },
    ],
  },
  {
    label: "Actions",
    items: [
      { id: "new-doc", label: "New Document", icon: LuPlus, shortcut: "⌘N", onSelect: () => {} },
    ],
  },
];`}
          >
            <p className="text-xs text-muted-foreground">
              Click "Open palette" above — it uses two groups with six items total.
            </p>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Danger zone palette</h3>
          <p className="text-xs text-muted-foreground">
            Any content can be passed — destructive actions palette shown below.
          </p>
          <ComponentPreview
            code={`<Button variant="destructive" onClick={() => setOpen(true)}>
  Danger Actions
</Button>
<CommandPalette
  open={open}
  onOpenChange={setOpen}
  groups={dangerGroups}
  placeholder="Type a danger action…"
/>`}
          >
            <>
              <Button variant="destructive" size="sm" onClick={() => setDangerOpen(true)}>
                Danger Actions
              </Button>
              <CommandPalette
                open={dangerOpen}
                onOpenChange={setDangerOpen}
                groups={DANGER_GROUPS}
                placeholder="Type a danger action…"
                emptyMessage="No matching actions."
              />
            </>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable
          props={[
            { name: "open", type: "boolean", description: "Controlled open state." },
            { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when open state changes." },
            { name: "groups", type: "CommandPaletteGroup[]", description: "Array of grouped command items." },
            { name: "placeholder", type: "string", default: "'Search commands…'", description: "Search input placeholder." },
            { name: "emptyMessage", type: "string", default: "'No results found.'", description: "Message shown when no items match." },
          ]}
        />
      </div>
    </div>
  );
}
