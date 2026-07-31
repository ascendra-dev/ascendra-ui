"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Button, Checkbox, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["dialog"];

export function DialogDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose,
} from "@/ascendra-ui";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>Are you sure you want to proceed?</DialogDescription>
    </DialogHeader>
    <DialogBody>
      <p className="text-muted-foreground">
        This will update the record immediately.
      </p>
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                Are you sure you want to proceed?
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p className="text-muted-foreground">
                This will update the record immediately.
              </p>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">
            Destructive Action
          </h3>
          <p className="text-muted-foreground text-xs">
            Use a destructive button in the footer for irreversible operations.
          </p>
          <ComponentPreview
            code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Parent</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Parent</DialogTitle>
      <DialogDescription>
        This will permanently delete Ahmed Khan and all associated students.
      </DialogDescription>
    </DialogHeader>
    <DialogBody>
      <p className="text-muted-foreground">
        This action cannot be undone. All invoice data will be lost.
      </p>
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Parent</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Parent</DialogTitle>
                  <DialogDescription>
                    This will permanently delete Ahmed Khan and all associated
                    students.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody>
                  <p className="text-muted-foreground">
                    This action cannot be undone. All invoice data will be lost.
                  </p>
                </DialogBody>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">
            With Inner Section
          </h3>
          <p className="text-muted-foreground text-xs">
            Use a{" "}
            <code className="bg-muted rounded px-1 font-mono text-xs">div</code>{" "}
            with a top separator inside{" "}
            <code className="bg-muted rounded px-1 font-mono text-xs">
              DialogBody
            </code>{" "}
            for optional content like a checkbox row.
          </p>
          <ComponentPreview
            code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="secondary">Premium Feature</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Premium feature</DialogTitle>
    </DialogHeader>
    <DialogBody>
      <p className="text-muted-foreground">
        Premium features are free to enable on development instances for
        developing and testing purposes.
      </p>
      <div className="border-border flex items-baseline gap-2 border-t pt-4 mt-4">
        <Checkbox id="dont-show" />
        <label htmlFor="dont-show" className="text-sm text-muted-foreground cursor-pointer">
          Do not show this message again
        </label>
      </div>
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
      <Button>Okay</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Premium Feature</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Premium feature</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <p className="text-muted-foreground">
                    Premium features are free to enable on development instances
                    for developing and testing purposes.
                  </p>
                  <div className="border-border flex items-baseline gap-2 border-t pt-4 mt-4">
                    <Checkbox id="dont-show" />
                    <label
                      htmlFor="dont-show"
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
                  <Button>Okay</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">Header Only</h3>
          <p className="text-muted-foreground text-xs">
            Header + footer with no body — the bottom border and rounding come
            from the header itself.
          </p>
          <ComponentPreview
            code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="secondary">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Session Expired</DialogTitle>
      <DialogDescription>Please sign in again to continue.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
      <Button>Continue</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Open</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Session Expired</DialogTitle>
                  <DialogDescription>
                    Please sign in again to continue.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button>Continue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
