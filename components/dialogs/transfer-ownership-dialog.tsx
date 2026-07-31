"use client";

import { useState } from "react";
import { Button, Checkbox, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/ascendra-ui";

export default function TransferOwnershipDialog() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <Dialog onOpenChange={() => setAcknowledged(false)}>
      <DialogTrigger asChild>
        <Button variant="secondary">Transfer Ownership</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Ownership</DialogTitle>
          <DialogDescription>
            Transferring ownership is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-muted-foreground mb-4">
            You are about to transfer ownership of{" "}
            <span className="font-medium text-foreground">Acme Workspace</span>{" "}
            to{" "}
            <span className="font-medium text-foreground">Sarah Johnson</span>.
            Once transferred, Sarah will become the sole owner and you will be
            downgraded to an admin.
          </p>
          <div className="border-border flex items-baseline gap-2.5 border-t pt-4">
            <Checkbox
              id="transfer-ack"
              checked={acknowledged}
              onCheckedChange={(v) => setAcknowledged(v === true)}
            />
            <label
              htmlFor="transfer-ack"
              className="text-muted-foreground cursor-pointer text-sm leading-snug"
            >
              I understand I will lose owner privileges and this action cannot
              be reversed.
            </label>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={!acknowledged}>Transfer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
