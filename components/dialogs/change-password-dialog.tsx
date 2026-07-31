"use client";

import { useState } from "react";
import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Field, FieldGrid, FieldLabel, Input } from "@/ascendra-ui";

export default function ChangePasswordDialog() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const canSubmit = current.trim() && next.trim() && next === confirm;

  return (
    <Dialog onOpenChange={() => { setCurrent(""); setNext(""); setConfirm(""); }}>
      <DialogTrigger asChild>
        <Button variant="secondary">Change Password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <FieldGrid className="gap-4">
            <Field>
              <FieldLabel htmlFor="pwd-current">Current password</FieldLabel>
              <Input
                id="pwd-current"
                type="password"
                placeholder="••••••••"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="pwd-new">New password</FieldLabel>
              <Input
                id="pwd-new"
                type="password"
                placeholder="••••••••"
                value={next}
                onChange={(e) => setNext(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="pwd-confirm">Confirm new password</FieldLabel>
              <Input
                id="pwd-confirm"
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </Field>
          </FieldGrid>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={!canSubmit}>Update Password</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
