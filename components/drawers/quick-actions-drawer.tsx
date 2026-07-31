"use client";

import {
  LuPencil,
  LuCopy,
  LuShare2,
  LuArchive,
  LuTrash2,
} from "react-icons/lu";
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/ascendra-ui/shadcn";
import { Button, Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/ascendra-ui";

const actions = [
  { label: "Rename", icon: LuPencil, destructive: false },
  { label: "Duplicate", icon: LuCopy, destructive: false },
  { label: "Share", icon: LuShare2, destructive: false },
  { label: "Archive", icon: LuArchive, destructive: false },
  { label: "Delete", icon: LuTrash2, destructive: true },
];

export default function QuickActionsDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">More Options</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <ItemGroup>
            {actions.map(({ label, icon: Icon, destructive }) => (
              <DrawerClose key={label} asChild>
                <Item
                  asChild={false}
                  variant="default"
                  className={`cursor-pointer hover:bg-muted/60 ${
                    destructive ? "text-negative hover:text-negative" : ""
                  }`}
                >
                  <ItemMedia variant="icon">
                    <Icon
                      className={`size-4 ${destructive ? "text-negative" : "text-muted-foreground"}`}
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle
                      className={destructive ? "text-negative font-normal" : "font-normal"}
                    >
                      {label}
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </DrawerClose>
            ))}
          </ItemGroup>
        </div>
        <DrawerFooter className="flex-row items-center justify-end border-t border-border px-6 py-4">
          <DrawerClose asChild>
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
