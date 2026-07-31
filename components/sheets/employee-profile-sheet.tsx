"use client";

import { useState } from "react";
import { Button, Item, ItemContent, ItemDescription, ItemGroup, ItemTitle, NameAvatar, Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetKey, SheetProperties, SheetSection, SheetSectionHeader, SheetSubHeader, SheetTabContent, SheetTabList, SheetTabs, SheetTabTrigger, SheetTitle, SheetTrigger, SheetValue, Switch } from "@/ascendra-ui";

const experience = [
  {
    role: "Senior Product Designer",
    company: "Nexus Technologies",
    period: "2021 – Present",
  },
  {
    role: "Product Designer",
    company: "Wavefront Studio",
    period: "2018 – 2021",
  },
  { role: "UX Designer", company: "Bright Labs", period: "2015 – 2018" },
];

export default function EmployeeProfileSheet() {
  const [isActive, setIsActive] = useState(true);

  return (
    <Sheet onOpenChange={() => setIsActive(true)}>
      <SheetTrigger asChild>
        <Button variant="secondary">View Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTabs defaultTab="overview">
          <SheetHeader>
            <div className="flex items-center gap-3">
              <NameAvatar name="Sarah Mitchell" size={36} href="#" />
              <div>
                <SheetTitle>Sarah Mitchell</SheetTitle>
                <SheetDescription>
                  Senior Product Designer · Design
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
          <SheetSubHeader>
            <SheetTabList>
              <SheetTabTrigger value="overview">Overview</SheetTabTrigger>
              <SheetTabTrigger value="experience">Experience</SheetTabTrigger>
            </SheetTabList>
          </SheetSubHeader>
          <SheetBody>
            <SheetTabContent value="overview">
              <SheetSection>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Employment Status
                  </p>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={isActive}
                      onCheckedChange={setIsActive}
                      id="emp-status"
                    />
                    <label
                      htmlFor="emp-status"
                      className="cursor-pointer text-sm text-muted-foreground"
                    >
                      {isActive ? "Active" : "Inactive"}
                    </label>
                  </div>
                </div>
              </SheetSection>
              <SheetSection>
                <SheetSectionHeader>Employment</SheetSectionHeader>
                <SheetProperties>
                  <SheetKey>Department</SheetKey>
                  <SheetValue>Product Design</SheetValue>
                  <SheetKey>Location</SheetKey>
                  <SheetValue>San Francisco, CA</SheetValue>
                  <SheetKey>Start Date</SheetKey>
                  <SheetValue>Mar 12, 2021</SheetValue>
                  <SheetKey>Manager</SheetKey>
                  <SheetValue>David Chen</SheetValue>
                  <SheetKey>Employee ID</SheetKey>
                  <SheetValue>EMP-0842</SheetValue>
                </SheetProperties>
              </SheetSection>
              <SheetSection>
                <SheetSectionHeader>Contact</SheetSectionHeader>
                <SheetProperties>
                  <SheetKey>Email</SheetKey>
                  <SheetValue className="truncate">
                    sarah.m@company.com
                  </SheetValue>
                  <SheetKey>Phone</SheetKey>
                  <SheetValue>+1 (415) 555-0183</SheetValue>
                </SheetProperties>
              </SheetSection>
              <SheetSection>
                <SheetSectionHeader>Bio</SheetSectionHeader>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Sarah is a seasoned product designer with 10+ years of
                  experience across B2B SaaS and consumer products. She leads
                  design systems and mentors junior designers on the team.
                </p>
              </SheetSection>
            </SheetTabContent>
            <SheetTabContent value="experience">
              <SheetSection>
                <SheetSectionHeader>Work History</SheetSectionHeader>
                <ItemGroup>
                  {experience.map((job) => (
                    <Item key={job.role} variant="outline">
                      <ItemContent>
                        <ItemTitle>{job.role}</ItemTitle>
                        <ItemDescription>{job.company}</ItemDescription>
                      </ItemContent>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {job.period}
                      </span>
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
            <Button>Edit Profile</Button>
          </SheetFooter>
        </SheetTabs>
      </SheetContent>
    </Sheet>
  );
}
