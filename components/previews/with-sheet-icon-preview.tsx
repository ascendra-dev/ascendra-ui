"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  IdText,
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
  WithSheetIcon,
} from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["with-sheet-icon"];

const rows = [
  { id: "evt_01", actor: "Amina Raza", correlationId: "6f1c2a9e-4b7d-4e21-9a3f-0c8d5e7b1a42" },
  { id: "evt_02", actor: "Bilal Khan", correlationId: "9d4e7b10-2c6a-4f8e-b1d3-5a7c9e0f2b64" },
];

export function WithSheetIconDocContent() {
  // One demo sheet for every example — what opened it is shown in its title.
  const [opened, setOpened] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { WithSheetIcon } from "@/ascendra-ui";

<button type="button" onClick={openActorSheet}>
  <WithSheetIcon>Amina Raza</WithSheetIcon>
</button>`}
      >
        <button
          type="button"
          className="cursor-pointer text-sm hover:underline"
          onClick={() => setOpened("Amina Raza")}
        >
          <WithSheetIcon>Amina Raza</WithSheetIcon>
        </button>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Display only
          </h3>
          <p className="text-xs text-muted-foreground">
            The icon only signals that a click opens a sheet — it adds no
            click, label or tooltip. Put it inside your own{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              button
            </code>
            , which owns the click. Tab to the button: the icon also shows
            while it&apos;s keyboard-focused.
          </p>
          <ComponentPreview
            code={`<button type="button" onClick={openTraceSheet}>
  <WithSheetIcon>
    <IdText value={correlationId} copyable={false} showTooltip={false} />
  </WithSheetIcon>
</button>`}
          >
            <button
              type="button"
              className="cursor-pointer text-sm hover:underline"
              onClick={() => setOpened(rows[0].correlationId)}
            >
              <WithSheetIcon>
                <IdText
                  value={rows[0].correlationId}
                  copyable={false}
                  showTooltip={false}
                />
              </WithSheetIcon>
            </button>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            A table cell
          </h3>
          <p className="text-xs text-muted-foreground">
            The case that motivated it: a table where cells open different
            sheets. The icon shows only for the hovered cell, not the whole
            row — with several of these per row, a row-wide reveal would light
            them all up at once.
          </p>
          <ComponentPreview
            code={`<SimpleTableCell>
  <button type="button" onClick={() => openActorSheet(row.actor)}>
    <WithSheetIcon>{row.actor}</WithSheetIcon>
  </button>
</SimpleTableCell>`}
          >
            <SimpleTable>
              <SimpleTableHeader>
                <SimpleTableHead>Event</SimpleTableHead>
                <SimpleTableHead>Actor</SimpleTableHead>
                <SimpleTableHead>Correlation</SimpleTableHead>
              </SimpleTableHeader>
              <SimpleTableBody>
                {rows.map((row) => (
                  <SimpleTableRow key={row.id}>
                    <SimpleTableCell>{row.id}</SimpleTableCell>
                    <SimpleTableCell>
                      <button
                        type="button"
                        className="cursor-pointer hover:underline"
                        onClick={() => setOpened(row.actor)}
                      >
                        <WithSheetIcon>{row.actor}</WithSheetIcon>
                      </button>
                    </SimpleTableCell>
                    <SimpleTableCell>
                      <button
                        type="button"
                        className="cursor-pointer hover:underline"
                        onClick={() => setOpened(row.correlationId)}
                      >
                        <WithSheetIcon>
                          <IdText
                            value={row.correlationId}
                            copyable={false}
                            showTooltip={false}
                          />
                        </WithSheetIcon>
                      </button>
                    </SimpleTableCell>
                  </SimpleTableRow>
                ))}
              </SimpleTableBody>
            </SimpleTable>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>

      {opened && (
        <Sheet open onOpenChange={(open) => !open && setOpened(null)}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Demo sheet</SheetTitle>
              <SheetDescription>Opened from {opened}</SheetDescription>
            </SheetHeader>
            <SheetBody />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
