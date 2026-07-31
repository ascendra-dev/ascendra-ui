"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { PaginationButton } from "@/ascendra-ui";
import { registry } from "@/lib/registry";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronFirst,
  LuChevronLast,
} from "react-icons/lu";

const meta = registry["pagination-button"];

export function PaginationButtonDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { PaginationButton } from "@/ascendra-ui";

<PaginationButton>
  <LuChevronLeft />
</PaginationButton>`}
      >
        <PaginationButton>
          <LuChevronLeft />
        </PaginationButton>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Full Pagination Bar
          </h3>
          <p className="text-xs text-muted-foreground">
            Compose into a complete pagination control group with prev/next and
            first/last buttons.
          </p>
          <ComponentPreview
            code={`<div className="flex items-center gap-2">
  <PaginationButton>
    <LuChevronFirst />
  </PaginationButton>
  <PaginationButton>
    <LuChevronLeft />
  </PaginationButton>
  <span className="text-xs font-medium text-foreground px-1">1 / 4</span>
  <PaginationButton>
    <LuChevronRight />
  </PaginationButton>
  <PaginationButton>
    <LuChevronLast />
  </PaginationButton>
</div>`}
          >
            <div className="flex items-center gap-2">
              <PaginationButton>
                <LuChevronFirst />
              </PaginationButton>
              <PaginationButton>
                <LuChevronLeft />
              </PaginationButton>
              <span className="text-xs font-medium text-foreground px-1">
                1 / 4
              </span>
              <PaginationButton>
                <LuChevronRight />
              </PaginationButton>
              <PaginationButton>
                <LuChevronLast />
              </PaginationButton>
            </div>
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
