"use client";

import { useState } from "react";
import { LuCheck } from "react-icons/lu";
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/ascendra-ui/shadcn";
import { Button, Input, Item, ItemContent, ItemDescription, ItemGroup, ItemTitle, NameAvatar } from "@/ascendra-ui";

const members = [
  { name: "Sarah Mitchell", role: "Senior Product Designer" },
  { name: "David Chen", role: "Product Manager" },
  { name: "Priya Nair", role: "UX Researcher" },
  { name: "Tom Reyes", role: "Front-end Engineer" },
  { name: "Yuki Tanaka", role: "QA Engineer" },
  { name: "Alice Chen", role: "Backend Engineer" },
];

export default function AssignTaskDrawer() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Drawer
      onOpenChange={(open) => {
        if (!open) {
          setQuery("");
          setSelected(null);
        }
      }}
    >
      <DrawerTrigger asChild>
        <Button variant="secondary">Assign To</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left px-6 pt-4 pb-3 gap-1">
          <DrawerTitle>Assign Task</DrawerTitle>
          <DrawerDescription>Select a team member to assign this task.</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Search by name or role…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ItemGroup>
              {filtered.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">No members found.</p>
              ) : (
                filtered.map((m) => (
                  <Item
                    key={m.name}
                    variant={selected === m.name ? "muted" : "default"}
                    className="cursor-pointer hover:bg-muted/60"
                    onClick={() => setSelected(m.name)}
                  >
                    <NameAvatar name={m.name} size={28} href="#" className="shrink-0" />
                    <ItemContent>
                      <ItemTitle>{m.name}</ItemTitle>
                      <ItemDescription>{m.role}</ItemDescription>
                    </ItemContent>
                    {selected === m.name && (
                      <LuCheck className="ml-auto size-4 shrink-0 text-primary" />
                    )}
                  </Item>
                ))
              )}
            </ItemGroup>
          </div>
        </div>
        <DrawerFooter className="flex-row items-center justify-end gap-3 border-t border-border px-6 py-4">
          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button disabled={!selected}>Confirm Assignment</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
