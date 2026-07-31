"use client";

import { LuPackage } from "react-icons/lu";
import { Button, Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetKey, SheetProperties, SheetSection, SheetSectionHeader, SheetTitle, SheetTrigger, SheetValue, SimpleBadge, StatusDot } from "@/ascendra-ui";

const tags = ["Electronics", "Audio", "Wireless", "Premium"];

export default function ProductDetailsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">View Product</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <div className="flex items-start justify-between gap-3">
            <SheetTitle>Pro Wireless Headphones</SheetTitle>
            <SimpleBadge variant="green" className="mt-0.5 shrink-0">
              In Stock
            </SimpleBadge>
          </div>
          <SheetDescription>
            SKU: HDN-PRO-BLK-001 · Audio Equipment
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <SheetSection className="flex flex-col gap-5">
            <div className="flex h-40 w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/40">
              <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                <LuPackage className="size-8 stroke-1" />
                <span className="text-xs">Product image</span>
              </div>
            </div>
            <SheetProperties keyWidth="130px">
              <SheetKey>Category</SheetKey>
              <SheetValue>Audio Equipment</SheetValue>
              <SheetKey>Price</SheetKey>
              <SheetValue className="font-medium">$249.00</SheetValue>
              <SheetKey>Stock</SheetKey>
              <SheetValue className="flex items-center gap-1.5">
                <StatusDot variant="emerald" />
                <span>142 units</span>
              </SheetValue>
              <SheetKey>Weight</SheetKey>
              <SheetValue>250g</SheetValue>
              <SheetKey>Connectivity</SheetKey>
              <SheetValue>Bluetooth 5.3</SheetValue>
              <SheetKey>Battery Life</SheetKey>
              <SheetValue>30 hours</SheetValue>
              <SheetKey>Vendor</SheetKey>
              <SheetValue>SoundWave Inc.</SheetValue>
              <SheetKey>Added</SheetKey>
              <SheetValue>Feb 12, 2025</SheetValue>
            </SheetProperties>
          </SheetSection>
          <SheetSection>
            <SheetSectionHeader>Tags</SheetSectionHeader>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <SimpleBadge key={tag} variant="secondary">
                  {tag}
                </SimpleBadge>
              ))}
            </div>
          </SheetSection>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Close</Button>
          </SheetClose>
          <Button>Edit Product</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
