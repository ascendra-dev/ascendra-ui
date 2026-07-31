"use client";

import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/ascendra-ui";

export default function ArchiveProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Archive Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archive Project</DialogTitle>
          <DialogDescription>
            This project will be hidden from your active workspace.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "No new activity, tasks, or comments can be added.",
              "Team members will lose access to the project board.",
              "All data is preserved and the project can be restored at any time.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                {item}
              </li>
            ))}
          </ul>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Archive</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
