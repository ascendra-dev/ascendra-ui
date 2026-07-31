"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Button, Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetSubFooter, SheetSubHeader, SheetTitle, SheetTrigger } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["sheet"];

export function SheetDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import {
  Sheet, SheetTrigger, SheetContent, SheetHeader,
  SheetTitle, SheetDescription, SheetBody, SheetFooter, SheetClose,
} from "@/ascendra-ui";

<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Add Parent</SheetTitle>
      <SheetDescription>Fill in the details to create a new parent record.</SheetDescription>
    </SheetHeader>
    <SheetBody>
      <p className="text-sm text-muted-foreground">Form fields go here.</p>
    </SheetBody>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="secondary">Cancel</Button>
      </SheetClose>
      <Button>Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button>Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Parent</SheetTitle>
              <SheetDescription>
                Fill in the details to create a new parent record.
              </SheetDescription>
            </SheetHeader>
            <SheetSubHeader>this is sub header</SheetSubHeader>
            <SheetBody>
              <p className="text-muted-foreground text-sm">
                Form fields go here.
              </p>
            </SheetBody>
            <SheetSubFooter>this is sub footer</SheetSubFooter>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="secondary">Cancel</Button>
              </SheetClose>
              <Button>Save</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-foreground text-sm font-medium">Sides</h3>
          <p className="text-muted-foreground text-xs">
            The sheet can open from any edge of the screen.
          </p>
          <ComponentPreview
            code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">Right (default)</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader><SheetTitle>Right Sheet</SheetTitle></SheetHeader>
    <SheetBody><p className="text-sm text-muted-foreground">Slides in from the right.</p></SheetBody>
  </SheetContent>
</Sheet>

<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">Left</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader><SheetTitle>Left Sheet</SheetTitle></SheetHeader>
    <SheetBody><p className="text-sm text-muted-foreground">Slides in from the left.</p></SheetBody>
  </SheetContent>
</Sheet>

<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">Bottom</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader><SheetTitle>Bottom Sheet</SheetTitle></SheetHeader>
    <SheetBody><p className="text-sm text-muted-foreground">Slides up from the bottom.</p></SheetBody>
  </SheetContent>
</Sheet>`}
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary">Right (default)</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Right Sheet</SheetTitle>
                </SheetHeader>
                <SheetBody>
                  <p className="text-muted-foreground text-sm">
                    Slides in from the right.
                  </p>
                </SheetBody>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary">Left</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Left Sheet</SheetTitle>
                </SheetHeader>
                <SheetBody>
                  <p className="text-muted-foreground text-sm">
                    Slides in from the left.
                  </p>
                </SheetBody>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary">Bottom</Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Bottom Sheet</SheetTitle>
                </SheetHeader>
                <SheetBody>
                  <p className="text-muted-foreground text-sm">
                    Slides up from the bottom.
                  </p>
                </SheetBody>
              </SheetContent>
            </Sheet>
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
