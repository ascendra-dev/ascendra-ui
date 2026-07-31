"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/ascendra-ui/shadcn";
import { BubbleBadge, Button, StatusDot } from "@/ascendra-ui";

const initialNotifications = [
  {
    id: 1,
    title: "Sarah Mitchell commented on your task",
    body: "Looks great! Just a small tweak needed on the header spacing.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "New team member added",
    body: "Yuki Tanaka has joined the Atlas Dashboard project.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "Milestone completed",
    body: "Wireframes & Prototyping milestone marked as done.",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: 4,
    title: "Invoice INV-2025-089 is overdue",
    body: "The invoice was due on May 15. Please follow up with the client.",
    time: "1 day ago",
    unread: true,
  },
  {
    id: 5,
    title: "Support ticket TKT-1042 updated",
    body: "Raj Patel changed the status to In Progress.",
    time: "2 days ago",
    unread: false,
  },
];

export default function NotificationCenterDrawer() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <Drawer
      direction="right"
      onOpenChange={(open) => {
        if (!open) setNotifications(initialNotifications);
      }}
    >
      <DrawerTrigger asChild>
        <Button variant="secondary" className="relative">
          Notifications
          {unreadCount > 0 && (
            <BubbleBadge color="red" size="sm" className="ml-1" />
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <p className="text-sm font-medium text-foreground">Notifications</p>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <div className="flex flex-col divide-y divide-border">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="flex gap-3 px-0 py-4"
              >
                <div className="mt-1.5 shrink-0">
                  {n.unread ? (
                    <StatusDot variant="primary" />
                  ) : (
                    <StatusDot variant="gray" />
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className={`text-sm leading-snug ${n.unread ? "font-medium text-foreground" : "font-normal text-muted-foreground"}`}>
                    {n.title}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {n.body}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground/70">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter className="border-t border-border px-6 py-4">
          <DrawerClose asChild>
            <Button variant="secondary" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
