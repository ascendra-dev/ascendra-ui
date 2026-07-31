"use client";

import { Button, Item, ItemActions, ItemContent, ItemDescription, ItemTitle, Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetKey, SheetProperties, SheetSection, SheetSectionHeader, SheetTitle, SheetTrigger, SheetValue, SimpleBadge } from "@/ascendra-ui";

const lineItems = [
  { name: "Wireless Noise-Cancelling Headphones", qty: "×1", price: "$249.00" },
  { name: "Laptop Stand Pro (Adjustable)", qty: "×1", price: "$79.00" },
  { name: "USB-C Hub 7-in-1", qty: "×2", price: "$58.00" },
];

export default function OrderDetailsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">View Order</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Order #ORD-5892</SheetTitle>
            <SimpleBadge variant="amber">Processing</SimpleBadge>
          </div>
          <SheetDescription>
            Placed on May 14, 2025 · Web store
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <SheetSection>
            <SheetSectionHeader>Order Info</SheetSectionHeader>
            <SheetProperties>
              <SheetKey>Customer</SheetKey>
              <SheetValue>Marcus Webb</SheetValue>
              <SheetKey>Payment</SheetKey>
              <SheetValue>Visa •••• 4242</SheetValue>
              <SheetKey>Shipping</SheetKey>
              <SheetValue>Standard (5–7 days)</SheetValue>
              <SheetKey>Order Date</SheetKey>
              <SheetValue>May 14, 2025</SheetValue>
            </SheetProperties>
          </SheetSection>
          <SheetSection>
            <SheetSectionHeader>Line Items</SheetSectionHeader>
            {lineItems.map((item) => (
              <Item
                key={item.name}
                className="px-0 pb-0 first-of-type:pt-0 items-end"
              >
                <ItemContent>
                  <ItemTitle className="font-normal">{item.name}</ItemTitle>
                  <ItemDescription className="font-medium">
                    {item.qty}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <span className="text-sm font-medium text-foreground">
                    {item.price}
                  </span>
                </ItemActions>
              </Item>
            ))}
          </SheetSection>
          <SheetSection>
            <SheetSectionHeader>Shipping Address</SheetSectionHeader>
            <div className="flex flex-col gap-0.5 text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Marcus Webb</span>
              <span>412 Oak Street, Apt 3B</span>
              <span>Austin, TX 78701</span>
              <span>United States</span>
            </div>
          </SheetSection>
          <SheetSection className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">$386.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">$12.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span className="text-foreground">$31.84</span>
            </div>
            <div className="mt-1 flex justify-between border-t border-border pt-2 text-sm font-medium">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">$429.84</span>
            </div>
          </SheetSection>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Close</Button>
          </SheetClose>
          <Button>Print Receipt</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
