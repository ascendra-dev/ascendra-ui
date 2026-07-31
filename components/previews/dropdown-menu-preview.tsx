"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/ascendra-ui";
import { registry } from "@/lib/registry";
import { LuPencil, LuTrash2, LuEye, LuEllipsis } from "react-icons/lu";

const meta = registry["dropdown-menu"];

export function DropdownMenuDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
  DropdownMenuCheckboxItem, DropdownMenuShortcut,
} from "@/ascendra-ui";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>View</DropdownMenuItem>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            With Icons and Shortcuts
          </h3>
          <p className="text-xs text-muted-foreground">
            Add icons and keyboard shortcut hints to menu items.
          </p>
          <ComponentPreview
            code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Invoice #INV-042</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <LuEye /> View
      <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <LuPencil /> Edit
      <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <LuTrash2 /> Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Invoice #INV-042</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LuEye /> View
                  <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LuPencil /> Edit
                  <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LuTrash2 /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Checkbox Items
          </h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              DropdownMenuCheckboxItem
            </code>{" "}
            for multi-select filter menus.
          </p>
          <ComponentPreview
            code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Columns</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked>Name</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>Amount</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Due Date</DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Columns</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Name
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Amount
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Due Date</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Sub-menu</h3>
          <p className="text-xs text-muted-foreground">
            Nest additional options inside a sub-menu trigger.
          </p>
          <ComponentPreview
            code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button size="icon" variant="ghost">
      <LuEllipsis />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>View details</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Change status</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
        <DropdownMenuItem>Mark as Overdue</DropdownMenuItem>
        <DropdownMenuItem>Mark as Draft</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <LuEllipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Change status</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Overdue</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Draft</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
