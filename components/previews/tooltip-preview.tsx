"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/ascendra-ui/shadcn";
import { Button } from "@/ascendra-ui";
import {
  LuInfo,
  LuSettings,
  LuTrash2,
  LuCopy,
} from "react-icons/lu";

export function TooltipDocContent() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-10">
        <ComponentPreview
          code={`import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/ascendra-ui/shadcn";

<TooltipProvider delayDuration={200}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Save changes</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Save changes</TooltipContent>
          </Tooltip>
        </ComponentPreview>

        <div className="space-y-8">
          <SectionHeader>Examples</SectionHeader>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Placement</h3>
            <p className="text-xs text-muted-foreground">
              Use the{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">side</code>{" "}
              prop on{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">TooltipContent</code>{" "}
              to control which side the tooltip appears on.
            </p>
            <ComponentPreview
              code={`<Tooltip>
  <TooltipTrigger asChild><Button>Top</Button></TooltipTrigger>
  <TooltipContent side="top">Top tooltip</TooltipContent>
</Tooltip>
<Tooltip>
  <TooltipTrigger asChild><Button>Right</Button></TooltipTrigger>
  <TooltipContent side="right">Right tooltip</TooltipContent>
</Tooltip>
<Tooltip>
  <TooltipTrigger asChild><Button>Bottom</Button></TooltipTrigger>
  <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
</Tooltip>
<Tooltip>
  <TooltipTrigger asChild><Button>Left</Button></TooltipTrigger>
  <TooltipContent side="left">Left tooltip</TooltipContent>
</Tooltip>`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="sm">Top</Button>
                </TooltipTrigger>
                <TooltipContent side="top">Top tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="sm">Right</Button>
                </TooltipTrigger>
                <TooltipContent side="right">Right tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="sm">Bottom</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="sm">Left</Button>
                </TooltipTrigger>
                <TooltipContent side="left">Left tooltip</TooltipContent>
              </Tooltip>
            </ComponentPreview>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Icon buttons</h3>
            <p className="text-xs text-muted-foreground">
              Tooltips are especially useful on icon-only buttons to communicate their action.
            </p>
            <ComponentPreview
              code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon" variant="ghost"><LuInfo /></Button>
  </TooltipTrigger>
  <TooltipContent>More info</TooltipContent>
</Tooltip>`}
            >
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost"><LuInfo className="size-4" /></Button>
                  </TooltipTrigger>
                  <TooltipContent>More info</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost"><LuSettings className="size-4" /></Button>
                  </TooltipTrigger>
                  <TooltipContent>Settings</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost"><LuCopy className="size-4" /></Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy to clipboard</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
                      <LuTrash2 className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
              </div>
            </ComponentPreview>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Disabled element</h3>
            <p className="text-xs text-muted-foreground">
              Wrap a disabled element in a{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">span</code>{" "}
              to make the trigger pointer-events work.
            </p>
            <ComponentPreview
              code={`<Tooltip>
  <TooltipTrigger asChild>
    <span className="cursor-not-allowed">
      <Button disabled>Submit</Button>
    </span>
  </TooltipTrigger>
  <TooltipContent>Complete all required fields first</TooltipContent>
</Tooltip>`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-not-allowed">
                    <Button disabled>Submit</Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>Complete all required fields first</TooltipContent>
              </Tooltip>
            </ComponentPreview>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Rich content</h3>
            <p className="text-xs text-muted-foreground">
              <code className="rounded bg-muted px-1 font-mono text-xs">TooltipContent</code>{" "}
              accepts any children — compose multi-line descriptions when needed.
            </p>
            <ComponentPreview
              code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary">Pro feature</Button>
  </TooltipTrigger>
  <TooltipContent className="max-w-xs">
    <p className="font-medium">Advanced Reporting</p>
    <p className="text-xs opacity-80 mt-0.5">
      Export detailed analytics as PDF or CSV. Available on Pro and above.
    </p>
  </TooltipContent>
</Tooltip>`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="sm">Pro feature</Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="font-medium">Advanced Reporting</p>
                  <p className="text-xs opacity-80 mt-0.5">
                    Export detailed analytics as PDF or CSV. Available on Pro and above.
                  </p>
                </TooltipContent>
              </Tooltip>
            </ComponentPreview>
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeader>Props</SectionHeader>
          <PropsTable
            props={[
              { name: "side", type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: "Which side the tooltip appears on." },
              { name: "sideOffset", type: "number", default: "4", description: "Distance in px between the trigger and the tooltip." },
              { name: "align", type: "'start' | 'center' | 'end'", default: "'center'", description: "Alignment of the tooltip relative to the trigger." },
              { name: "delayDuration", type: "number", default: "700", description: "Milliseconds to wait before showing. Set on TooltipProvider." },
            ]}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
