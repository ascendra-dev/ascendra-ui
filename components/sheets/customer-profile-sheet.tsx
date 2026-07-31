"use client";

import { Button, Item, ItemActions, ItemContent, ItemTitle, NameAvatar, Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetKey, SheetProperties, SheetSection, SheetSectionHeader, SheetTitle, SheetTrigger, SheetValue, SimpleBadge, StatusDot } from "@/ascendra-ui";

const recentActivity = [
  { event: "Upgraded to Pro plan", time: "3 days ago" },
  { event: "Opened support ticket #TKT-1042", time: "5 days ago" },
  { event: "Added 3 team members", time: "2 weeks ago" },
  { event: "Created project: Atlas Redesign", time: "1 month ago" },
];

export default function CustomerProfileSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">View Customer</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-3">
            <NameAvatar name="James Hartwell" size={36} href="#" />
            <div>
              <div className="flex items-center gap-2">
                <SheetTitle>James Hartwell</SheetTitle>
                <SimpleBadge variant="green">Pro</SimpleBadge>
              </div>
              <SheetDescription>Acme Corporation · Owner</SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <SheetBody>
          <SheetSection>
            <SheetSectionHeader>Contact</SheetSectionHeader>
            <SheetProperties keyWidth="120px">
              <SheetKey>Email</SheetKey>
              <SheetValue className="truncate">j.hartwell@acme.com</SheetValue>
              <SheetKey>Phone</SheetKey>
              <SheetValue>+1 (312) 555-0117</SheetValue>
              <SheetKey>Location</SheetKey>
              <SheetValue>Chicago, IL</SheetValue>
            </SheetProperties>
          </SheetSection>
          <SheetSection>
            <SheetSectionHeader>Account</SheetSectionHeader>
            <SheetProperties keyWidth="120px">
              <SheetKey>Plan</SheetKey>
              <SheetValue>Pro (Annual)</SheetValue>
              <SheetKey>Customer since</SheetKey>
              <SheetValue>Jan 2023</SheetValue>
              <SheetKey>ARR</SheetKey>
              <SheetValue className="font-medium">$2,400</SheetValue>
              <SheetKey>Seats</SheetKey>
              <SheetValue>12 / 20</SheetValue>
              <SheetKey>Status</SheetKey>
              <SheetValue className="flex items-center gap-1.5">
                <StatusDot variant="emerald" />
                <span>Active</span>
              </SheetValue>
            </SheetProperties>
          </SheetSection>
          <SheetSection>
            <SheetSectionHeader>Recent Activity</SheetSectionHeader>
            {recentActivity.map((item) => (
              <Item key={item.event} className="px-0 pb-0 first-of-type:pt-0">
                <ItemContent>
                  <ItemTitle>{item.event}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </ItemActions>
              </Item>
            ))}
          </SheetSection>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Close</Button>
          </SheetClose>
          <Button>Edit Customer</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
