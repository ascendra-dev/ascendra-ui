"use client";

import { useState } from "react";
import { Button, Checkbox, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/ascendra-ui";

const features = [
  "Unlimited team members and workspaces",
  "Advanced analytics and custom dashboards",
  "Priority support with a 4-hour SLA",
];

export default function UpgradeRequiredDialog() {
  const [dontShow, setDontShow] = useState(false);

  return (
    <Dialog onOpenChange={() => setDontShow(false)}>
      <DialogTrigger asChild>
        <Button variant="secondary">Try Premium Feature</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Premium Feature</DialogTitle>
          <DialogDescription>
            Upgrade your plan to unlock this and other advanced features.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ul className="mb-4 space-y-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>
          <div className="border-border flex items-baseline gap-2 border-t pt-4">
            <Checkbox
              id="dont-show-upgrade"
              checked={dontShow}
              onCheckedChange={(v) => setDontShow(v === true)}
            />
            <label
              htmlFor="dont-show-upgrade"
              className="text-muted-foreground cursor-pointer text-sm"
            >
              Do not show this message again
            </label>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Upgrade Plan</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
