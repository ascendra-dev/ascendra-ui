"use client";

import { useState } from "react";
import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Field, FieldLabel, InputGroup, InputGroupTextarea } from "@/ascendra-ui";

export default function AddNoteDialog() {
  const [note, setNote] = useState("");

  return (
    <Dialog onOpenChange={() => setNote("")}>
      <DialogTrigger asChild>
        <Button variant="secondary">Add Note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>
            Notes are visible to all team members on this project.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field>
            <FieldLabel htmlFor="note-input">Note</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                id="note-input"
                rows={4}
                placeholder="Add a note for your team…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </InputGroup>
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={!note.trim()}>Save Note</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
