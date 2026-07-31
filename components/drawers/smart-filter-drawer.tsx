"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/ascendra-ui/shadcn";
import { Button, Item, ItemContent, ItemGroup, ItemTitle, SimpleBadge, Switch } from "@/ascendra-ui";

const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books"];
const activeFilters = ["Electronics", "In Stock", "New"];

export default function SmartFilterDrawer() {
  const [inStock, setInStock] = useState(true);
  const [newOnly, setNewOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Electronics");

  return (
    <Drawer
      onOpenChange={(open) => {
        if (!open) {
          setInStock(true);
          setNewOnly(false);
          setSelectedCategory("Electronics");
        }
      }}
    >
      <DrawerTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          Filter Results
          <SimpleBadge variant="default">3</SimpleBadge>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left px-6 pt-4 pb-3 gap-1">
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>
            Refine your results by category, availability, and condition.
          </DrawerDescription>
          <div className="flex flex-wrap gap-2 pt-1">
            {activeFilters.map((f) => (
              <SimpleBadge key={f} variant="secondary">
                {f}
              </SimpleBadge>
            ))}
          </div>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground">Category</p>
              <ItemGroup>
                {categories.map((cat) => (
                  <Item
                    key={cat}
                    className={`cursor-pointer hover:bg-muted/60 ${
                      selectedCategory === cat ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <ItemContent>
                      <ItemTitle className="font-normal">{cat}</ItemTitle>
                    </ItemContent>
                    {selectedCategory === cat && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                    )}
                  </Item>
                ))}
              </ItemGroup>
            </div>
            <div className="border-t border-border" />
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-muted-foreground">Availability</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">In Stock Only</p>
                  <p className="text-xs text-muted-foreground">Hide out-of-stock items</p>
                </div>
                <Switch checked={inStock} onCheckedChange={setInStock} id="filter-instock" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">New Arrivals</p>
                  <p className="text-xs text-muted-foreground">Items added in the last 30 days</p>
                </div>
                <Switch checked={newOnly} onCheckedChange={setNewOnly} id="filter-new" />
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter className="flex-row items-center justify-end gap-3 border-t border-border px-6 py-4">
          <DrawerClose asChild>
            <Button variant="secondary">Reset</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Apply Filters</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
