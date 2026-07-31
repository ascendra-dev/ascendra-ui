"use client";

import { useState } from "react";
import {
  LuLink,
  LuMail,
  LuSlack,
  LuFileText,
  LuTable,
  LuExternalLink,
  LuCheck,
} from "react-icons/lu";
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/ascendra-ui/shadcn";
import { Button } from "@/ascendra-ui";

const destinations = [
  { id: "link", label: "Copy Link", icon: LuLink },
  { id: "email", label: "Send Email", icon: LuMail },
  { id: "slack", label: "Share to Slack", icon: LuSlack },
  { id: "pdf", label: "Export PDF", icon: LuFileText },
  { id: "csv", label: "Export CSV", icon: LuTable },
  { id: "browser", label: "Open in Browser", icon: LuExternalLink },
];

export default function ShareSheetDrawer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Share</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left px-6 pt-4 pb-3 gap-1">
          <DrawerTitle>Share</DrawerTitle>
          <DrawerDescription>Choose how to share this item.</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="grid grid-cols-3 gap-4">
            {destinations.map(({ id, label, icon: Icon }) => {
              const isCopy = id === "link";
              const isActive = isCopy && copied;

              return (
                <DrawerClose key={id} asChild={!isCopy}>
                  <button
                    onClick={isCopy ? handleCopy : undefined}
                    className="flex flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors ${
                        isActive
                          ? "border-primary/20 bg-primary/10"
                          : "border-border bg-muted/40"
                      }`}
                    >
                      {isActive ? (
                        <LuCheck className="size-5 text-primary" />
                      ) : (
                        <Icon className="size-5 text-muted-foreground" />
                      )}
                    </div>
                    <span className="text-center text-xs text-muted-foreground leading-snug">
                      {isActive ? "Copied!" : label}
                    </span>
                  </button>
                </DrawerClose>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
