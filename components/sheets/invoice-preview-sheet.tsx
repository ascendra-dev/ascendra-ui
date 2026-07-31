"use client";

import { LuCircleAlert } from "react-icons/lu";
import { Button, Item, ItemActions, ItemContent, ItemDescription, ItemTitle, Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetKey, SheetProperties, SheetSection, SheetSectionHeader, SheetTitle, SheetTrigger, SheetValue, SimpleAlert, SimpleBadge } from "@/ascendra-ui";

const lineItems = [
  {
    desc: "Product Design Retainer (April)",
    qty: "1 item",
    amount: "$3,500.00",
  },
  { desc: "UX Research — User Interviews", qty: "8 hrs", amount: "$960.00" },
  { desc: "Prototype Delivery (v2)", qty: "1 item", amount: "$540.00" },
];

export default function InvoicePreviewSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Preview Invoice</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>INV-2025-089</SheetTitle>
            <SimpleBadge variant="red">Overdue</SimpleBadge>
          </div>
          <SheetDescription>
            Issued May 1, 2025 · Due May 15, 2025
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <SheetSection className="flex flex-col gap-5">
            <SimpleAlert variant="destructive" icon={LuCircleAlert}>
              This invoice is 12 days overdue. A late fee of $50 may apply.
            </SimpleAlert>
            <div>
              <SheetSectionHeader>Bill To</SheetSectionHeader>
              <div className="flex flex-col gap-0.5 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Acme Corporation
                </span>
                <span>James Hartwell</span>
                <span>j.hartwell@acme.com</span>
              </div>
            </div>
          </SheetSection>
          <SheetSection>
            <SheetProperties>
              <SheetKey>Invoice #</SheetKey>
              <SheetValue>INV-2025-089</SheetValue>
              <SheetKey>Issue Date</SheetKey>
              <SheetValue>May 1, 2025</SheetValue>
              <SheetKey>Due Date</SheetKey>
              <SheetValue className="font-medium text-negative">
                May 15, 2025
              </SheetValue>
              <SheetKey>Payment Method</SheetKey>
              <SheetValue>Bank Transfer</SheetValue>
            </SheetProperties>
          </SheetSection>
          <SheetSection>
            <SheetSectionHeader>Line Items</SheetSectionHeader>
            {lineItems.map((item) => (
              <Item key={item.desc} className="px-0 pb-0 first-of-type:pt-0 items-end">
                <ItemContent>
                  <ItemTitle className="font-normal">{item.desc}</ItemTitle>
                  <ItemDescription className="font-medium">{item.qty}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <span className="text-sm font-medium text-foreground">
                    {item.amount}
                  </span>
                </ItemActions>
              </Item>
            ))}
          </SheetSection>
          <SheetSection className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">$5,000.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (8%)</span>
              <span className="text-foreground">$400.00</span>
            </div>
            <div className="mt-1 flex justify-between border-t border-border pt-2 text-sm font-semibold">
              <span className="text-foreground">Total Due</span>
              <span className="text-foreground">$5,400.00</span>
            </div>
          </SheetSection>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Download PDF</Button>
          </SheetClose>
          <Button>Send Reminder</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
