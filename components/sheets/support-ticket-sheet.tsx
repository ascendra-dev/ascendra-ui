"use client";

import { Button, NameAvatar, Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetKey, SheetProperties, SheetSection, SheetSectionHeader, SheetTitle, SheetTrigger, SheetValue, SimpleBadge, StatusDot } from "@/ascendra-ui";

const activity = [
  {
    actor: "Alice Chen",
    time: "2h ago",
    action: "Added a comment",
    detail:
      "Reproduced on v3.12.1. Occurs when the session token expires mid-upload. Assigning to backend team.",
  },
  {
    actor: "Raj Patel",
    time: "5h ago",
    action: "Changed status",
    detail: "Status updated from Open → In Progress.",
  },
  {
    actor: "Marcus Webb",
    time: "1d ago",
    action: "Opened ticket",
    detail:
      "File uploads fail silently after 15 minutes of inactivity. No error message is displayed to the user.",
  },
];

export default function SupportTicketSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open Ticket</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <div className="flex items-start justify-between gap-3">
            <SheetTitle>File upload fails after session timeout</SheetTitle>
            <SimpleBadge variant="red" className="mt-0.5 shrink-0">
              Critical
            </SimpleBadge>
          </div>
          <SheetDescription>
            TKT-1042 · Reported by Marcus Webb
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <SheetSection>
            <SheetProperties keyWidth="120px">
              <SheetKey>Priority</SheetKey>
              <SheetValue className="flex items-center gap-1.5">
                <StatusDot variant="rose" />
                <span>Critical</span>
              </SheetValue>
              <SheetKey>Status</SheetKey>
              <SheetValue className="flex items-center gap-1.5">
                <StatusDot variant="amber" />
                <span>In Progress</span>
              </SheetValue>
              <SheetKey>Assignee</SheetKey>
              <SheetValue>Raj Patel</SheetValue>
              <SheetKey>Team</SheetKey>
              <SheetValue>Backend</SheetValue>
              <SheetKey>Created</SheetKey>
              <SheetValue>May 26, 2025</SheetValue>
              <SheetKey>Last updated</SheetKey>
              <SheetValue>2 hours ago</SheetValue>
            </SheetProperties>
          </SheetSection>
          <SheetSection>
            <SheetSectionHeader>Activity</SheetSectionHeader>
            <div className="flex flex-col gap-5">
              {activity.map((item) => (
                <div key={item.time} className="flex gap-3">
                  <NameAvatar
                    name={item.actor}
                    size={28}
                    href="#"
                    className="mt-0.5 shrink-0"
                  />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-sm font-medium text-foreground">
                        {item.actor}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.action}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SheetSection>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Close</Button>
          </SheetClose>
          <Button>Mark as Resolved</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
