"use client";

import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/ascendra-ui";

const highlights = [
  "Automatically summarise data from any connected source.",
  "Schedule reports to land in your inbox every Monday.",
  "Export to PDF, CSV, or share a live link with your team.",
];

export default function FeatureAnnouncementDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">What&apos;s New</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Introducing Smart Reports</DialogTitle>
          <DialogDescription>
            Now available on all plans — no upgrade required.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-muted-foreground mb-4">
            Smart Reports turns your raw data into polished, shareable summaries
            in seconds. Here&apos;s what you can do with it:
          </p>
          <ul className="space-y-2.5">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Maybe Later</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Explore Feature</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
