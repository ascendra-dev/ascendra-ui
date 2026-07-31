"use client";

import { Button, Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle, NameAvatar, Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetKey, SheetProperties, SheetSection, SheetSectionHeader, SheetSubHeader, SheetTabContent, SheetTabList, SheetTabs, SheetTabTrigger, SheetTitle, SheetTrigger, SheetValue, SimpleBadge, StatusDot } from "@/ascendra-ui";

const milestones = [
  { name: "Discovery & Research", status: "done", date: "Apr 10" },
  { name: "Wireframes & Prototyping", status: "done", date: "Apr 30" },
  { name: "High-fidelity Designs", status: "current", date: "May 28" },
  { name: "Developer Handoff", status: "upcoming", date: "Jun 10" },
];

const members = [
  { name: "Sarah Mitchell", role: "Design Lead" },
  { name: "David Chen", role: "Product Manager" },
  { name: "Priya Nair", role: "UX Researcher" },
  { name: "Tom Reyes", role: "Front-end Engineer" },
  { name: "Yuki Tanaka", role: "QA Engineer" },
];

const milestoneStatus = {
  done: { dot: "emerald" as const },
  current: { dot: "amber" as const },
  upcoming: { dot: "gray" as const },
};

export default function ProjectOverviewSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">View Project</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetTabs defaultTab="overview">
          <SheetHeader>
            <div className="flex items-start justify-between gap-3">
              <SheetTitle>Atlas Dashboard Redesign</SheetTitle>
              <SimpleBadge variant="blue" className="mt-0.5 shrink-0">
                Active
              </SimpleBadge>
            </div>
            <SheetDescription>Product Design · Q2 2025</SheetDescription>
          </SheetHeader>
          <SheetSubHeader>
            <SheetTabList>
              <SheetTabTrigger value="overview">Overview</SheetTabTrigger>
              <SheetTabTrigger value="members">Members</SheetTabTrigger>
            </SheetTabList>
          </SheetSubHeader>
          <SheetBody>
            <SheetTabContent value="overview">
              <SheetSection>
                <SheetProperties>
                  <SheetKey>Owner</SheetKey>
                  <SheetValue>David Chen</SheetValue>
                  <SheetKey>Status</SheetKey>
                  <SheetValue className="flex items-center gap-1.5">
                    <StatusDot variant="emerald" />
                    <span>On Track</span>
                  </SheetValue>
                  <SheetKey>Start Date</SheetKey>
                  <SheetValue>Apr 1, 2025</SheetValue>
                  <SheetKey>Target</SheetKey>
                  <SheetValue>Jun 15, 2025</SheetValue>
                  <SheetKey>Budget</SheetKey>
                  <SheetValue>$48,000</SheetValue>
                  <SheetKey>Team Size</SheetKey>
                  <SheetValue>5 members</SheetValue>
                </SheetProperties>
              </SheetSection>
              <SheetSection>
                <SheetSectionHeader>Milestones</SheetSectionHeader>
                {milestones.map((m) => (
                  <Item key={m.name} className="px-0 first-of-type:pt-0">
                    <ItemContent>
                      <div className="flex items-center gap-2">
                        <StatusDot
                          variant={
                            milestoneStatus[
                              m.status as keyof typeof milestoneStatus
                            ].dot
                          }
                        />
                        <ItemTitle>{m.name}</ItemTitle>
                      </div>
                    </ItemContent>
                    <ItemActions>
                      <span className="text-xs text-muted-foreground">
                        {m.date}
                      </span>
                    </ItemActions>
                  </Item>
                ))}
              </SheetSection>
            </SheetTabContent>
            <SheetTabContent value="members">
              <SheetSection>
                <SheetSectionHeader>Team ({members.length})</SheetSectionHeader>
                <ItemGroup>
                  {members.map((m) => (
                    <Item key={m.name} variant="outline">
                      <NameAvatar
                        name={m.name}
                        size={28}
                        href="#"
                        className="shrink-0"
                      />
                      <ItemContent>
                        <ItemTitle>{m.name}</ItemTitle>
                        <ItemDescription>{m.role}</ItemDescription>
                      </ItemContent>
                    </Item>
                  ))}
                </ItemGroup>
              </SheetSection>
            </SheetTabContent>
          </SheetBody>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="secondary">Close</Button>
            </SheetClose>
            <Button>Open Project</Button>
          </SheetFooter>
        </SheetTabs>
      </SheetContent>
    </Sheet>
  );
}
