"use client";

import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/ascendra-ui";

export default function DeleteRecordDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Record</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Record</DialogTitle>
          <DialogDescription>
            <span className="font-medium text-foreground">Invoice #INV-2024-089</span> will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-muted-foreground">
            Once deleted, this record and all associated line items, attachments,
            and audit history will be gone forever. This action cannot be undone.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
