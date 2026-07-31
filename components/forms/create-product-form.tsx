"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { BackLink, Card, CardHeader, CardHeaderSubtitle, CardHeaderTitle, CardPanel, CardPanelItem, CardPanelItemCrown, Checkbox, Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, Field, FieldGrid, FieldGroup, FieldHint, FieldLabel, FieldSet, Input, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea, MainContent, PageHeader, PageHeaderGroup, PageMain, PageSubtitle, PageTitle, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SimpleAlert, Switch, TabContent, TabList, Tabs, TabTrigger, UnsavedChangesBar } from "@/ascendra-ui";



// ─── Schema ────────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string(),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string(),
  brand: z.string(),
  status: z.string().min(1, "Status is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(20, "Description must be at least 20 characters"),
  tags: z.string(),
  price: z.string().min(1, "Price is required"),
  compareAtPrice: z.string(),
  costPerItem: z.string(),
  quantity: z.string(),
  lowStockThreshold: z.string(),
  allowBackorders: z.boolean(),
  barcode: z.string(),
  isPhysical: z.boolean(),
  weight: z.string(),
  length: z.string(),
  width: z.string(),
  height: z.string(),
  shippingClass: z.string(),
  countryOfOrigin: z.string(),
  hsTariffCode: z.string(),
  requiresCustoms: z.boolean(),
});

type ProductValues = z.infer<typeof schema>;

// ─── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Clothing",
  "Electronics",
  "Home & Garden",
  "Sports",
  "Books",
  "Other",
];

const BRANDS = ["Ascendra", "NovaBrand", "Apex", "Prime", "CoreLine", "Other"];

const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
];

const SHIPPING_CLASSES = [
  { value: "standard", label: "Standard" },
  { value: "express", label: "Express" },
  { value: "fragile", label: "Fragile" },
  { value: "bulky", label: "Bulky" },
  { value: "digital", label: "Digital" },
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Japan",
  "China",
  "Australia",
  "India",
  "Brazil",
];

// ─── Form ──────────────────────────────────────────────────────────────────────

export default function CreateProductForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [trackInventory, setTrackInventory] = useState(false);
  const [isPhysicalState, setIsPhysicalState] = useState(true);

  const {
    control,
    trigger,
    reset,
    getValues,
    formState: { isDirty, isValid, errors },
  } = useForm<ProductValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      subCategory: "",
      brand: "",
      status: "draft",
      description: "",
      tags: "",
      price: "",
      compareAtPrice: "",
      costPerItem: "",
      quantity: "",
      lowStockThreshold: "",
      allowBackorders: false,
      barcode: "",
      isPhysical: true,
      weight: "",
      length: "",
      width: "",
      height: "",
      shippingClass: "",
      countryOfOrigin: "",
      hsTariffCode: "",
      requiresCustoms: false,
    },
    mode: "onTouched",
  });

  async function handleSave(): Promise<boolean> {
    const ok = await trigger();
    if (!ok) return false;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSaving(false);
    reset(getValues());
    return true;
  }

  return (
    <>
     <BackLink href="/showcase/forms">Forms Gallery</BackLink>

          <PageHeader>
            <PageHeaderGroup>
              <PageTitle>Create Product</PageTitle>
              <PageSubtitle>
                Add a new product to your catalog. Fill in all required fields
                before publishing.
              </PageSubtitle>
            </PageHeaderGroup>
          </PageHeader>

          <PageMain>
            <Tabs defaultValue="details">
              <TabList>
                <TabTrigger value="details">Details</TabTrigger>
                <TabTrigger value="pricing">Pricing &amp; Inventory</TabTrigger>
                <TabTrigger value="shipping">Shipping</TabTrigger>
              </TabList>

              {/* ── Tab: Details ──────────────────────────────────────────── */}
              <TabContent value="details">
                <MainContent>
                  <SimpleAlert>
                    <span>
                      Products in <strong>Draft</strong> status are not visible
                      to customers.
                    </span>
                  </SimpleAlert>

                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>
                        Basic Information
                      </CardHeaderTitle>
                      <CardHeaderSubtitle>
                        Enter the product name, category, and description.
                      </CardHeaderSubtitle>
                    </CardHeader>

                    <CardPanel>
                      {/* Panel Item 1 — Identification */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="product-name">
                                Product Name
                              </FieldLabel>
                              <Controller
                                name="name"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="product-name"
                                    full
                                    placeholder="e.g. Premium Wireless Headphones"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                    aria-invalid={!!errors.name}
                                  />
                                )}
                              />
                              <FieldHint
                                error={errors.name as { message?: string }}
                                mandatory
                              />
                            </Field>
                            <Field>
                              <FieldLabel htmlFor="sku">SKU</FieldLabel>
                              <Controller
                                name="sku"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="sku"
                                    full
                                    placeholder="Auto-generated if left blank"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                  />
                                )}
                              />
                              <FieldHint help="What is SKU, this is the explanation" />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 2 — Classification */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="category">
                                Category
                              </FieldLabel>
                              <Controller
                                name="category"
                                control={control}
                                render={({ field: f }) => (
                                  <Combobox
                                    items={CATEGORIES}
                                    value={f.value}
                                    onValueChange={(v) => f.onChange(v)}
                                  >
                                    <ComboboxInput
                                      id="category"
                                      placeholder="Search category…"
                                      onBlur={f.onBlur}
                                      className="w-full"
                                    />
                                    <ComboboxContent>
                                      <ComboboxList>
                                        <ComboboxEmpty>
                                          No results found.
                                        </ComboboxEmpty>
                                        <ComboboxCollection>
                                          {(c: string) => (
                                            <ComboboxItem key={c} value={c}>
                                              {c}
                                            </ComboboxItem>
                                          )}
                                        </ComboboxCollection>
                                      </ComboboxList>
                                    </ComboboxContent>
                                  </Combobox>
                                )}
                              />
                              <FieldHint
                                error={errors.category as { message?: string }}
                                mandatory
                              />
                            </Field>
                            <Field>
                              <FieldLabel htmlFor="sub-category">
                                Sub-category
                              </FieldLabel>
                              <Controller
                                name="subCategory"
                                control={control}
                                render={({ field: f }) => (
                                  <Input
                                    id="sub-category"
                                    full
                                    placeholder="e.g. Over-ear"
                                    value={f.value}
                                    onChange={f.onChange}
                                    onBlur={f.onBlur}
                                  />
                                )}
                              />
                              <FieldHint />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 3 — Brand & Status */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="brand">Brand</FieldLabel>
                              <Controller
                                name="brand"
                                control={control}
                                render={({ field: f }) => (
                                  <Combobox
                                    items={BRANDS}
                                    value={f.value}
                                    onValueChange={(v) => f.onChange(v)}
                                  >
                                    <ComboboxInput
                                      id="brand"
                                      placeholder="Search brand…"
                                      onBlur={f.onBlur}
                                      className="w-full"
                                    />
                                    <ComboboxContent>
                                      <ComboboxList>
                                        <ComboboxEmpty>
                                          No results found.
                                        </ComboboxEmpty>
                                        <ComboboxCollection>
                                          {(b: string) => (
                                            <ComboboxItem key={b} value={b}>
                                              {b}
                                            </ComboboxItem>
                                          )}
                                        </ComboboxCollection>
                                      </ComboboxList>
                                    </ComboboxContent>
                                  </Combobox>
                                )}
                              />
                              <FieldHint />
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="status">Status</FieldLabel>
                              <Controller
                                name="status"
                                control={control}
                                render={({ field: f }) => (
                                  <Select
                                    value={f.value}
                                    onValueChange={f.onChange}
                                    onOpenChange={(open) => {
                                      if (!open) f.onBlur();
                                    }}
                                  >
                                    <SelectTrigger
                                      id="status"
                                      className="w-full"
                                      aria-invalid={
                                        !!errors.status || undefined
                                      }
                                    >
                                      <SelectValue placeholder="Select status…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {STATUSES.map((s) => (
                                          <SelectItem
                                            key={s.value}
                                            value={s.value}
                                          >
                                            {s.label}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <FieldHint
                                error={errors.status as { message?: string }}
                                mandatory
                              />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 4 — Description */}
                      <CardPanelItem>
                        <Field>
                          <FieldLabel htmlFor="description">
                            Description
                          </FieldLabel>
                          <Controller
                            name="description"
                            control={control}
                            render={({ field: f }) => (
                              <InputGroup>
                                <InputGroupTextarea
                                  id="description"
                                  rows={5}
                                  placeholder="Describe the product in detail…"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                  aria-invalid={!!errors.description}
                                  maxLength={250}
                                />
                              </InputGroup>
                            )}
                          />
                          <FieldHint
                            error={errors.description as { message?: string }}
                            mandatory
                          />
                        </Field>
                      </CardPanelItem>

                      {/* Panel Item 5 — Tags */}
                      <CardPanelItem className="relative">
                        <CardPanelItemCrown variant="default">
                          Specify the relvant for product tags to improve
                          searchability.
                        </CardPanelItemCrown>
                        <Field>
                          <Controller
                            name="tags"
                            control={control}
                            render={({ field: f }) => (
                              <Input
                                id="tags"
                                full
                                placeholder="e.g. wireless, audio, premium"
                                value={f.value}
                                onChange={f.onChange}
                                onBlur={f.onBlur}
                              />
                            )}
                          />
                          <FieldHint description="Comma-separated tags for search and filtering." />
                        </Field>
                      </CardPanelItem>
                    </CardPanel>
                  </Card>
                </MainContent>
              </TabContent>

              {/* ── Tab: Pricing & Inventory ──────────────────────────────── */}
              <TabContent value="pricing">
                <MainContent>
                  {/* Section: Pricing */}
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>Pricing</CardHeaderTitle>
                      <CardHeaderSubtitle>
                        Set the selling price and cost for this product.
                      </CardHeaderSubtitle>
                    </CardHeader>

                    <CardPanel>
                      {/* Panel Item 1 — Price */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="price">Price</FieldLabel>
                              <Controller
                                name="price"
                                control={control}
                                render={({ field: f }) => (
                                  <InputGroup>
                                    <InputGroupAddon align="inline-start">
                                      <InputGroupText>USD</InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput
                                      id="price"
                                      type="number"
                                      placeholder="0.00"
                                      value={f.value}
                                      onChange={f.onChange}
                                      onBlur={f.onBlur}
                                      aria-invalid={!!errors.price || undefined}
                                    />
                                  </InputGroup>
                                )}
                              />
                              <FieldHint
                                error={errors.price as { message?: string }}
                                mandatory
                              />
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="compare-at-price">
                                Compare-at Price
                              </FieldLabel>
                              <Controller
                                name="compareAtPrice"
                                control={control}
                                render={({ field: f }) => (
                                  <InputGroup>
                                    <InputGroupAddon align="inline-start">
                                      <InputGroupText>USD</InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput
                                      id="compare-at-price"
                                      type="number"
                                      placeholder="0.00"
                                      value={f.value}
                                      onChange={f.onChange}
                                      onBlur={f.onBlur}
                                    />
                                  </InputGroup>
                                )}
                              />
                              <FieldHint description="Shown as strikethrough to customers." />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 2 — Cost */}
                      <CardPanelItem>
                        <Field>
                          <FieldLabel htmlFor="cost-per-item">
                            Cost Per Item
                          </FieldLabel>
                          <Controller
                            name="costPerItem"
                            control={control}
                            render={({ field: f }) => (
                              <InputGroup className="max-w-48">
                                <InputGroupAddon align="inline-start">
                                  <InputGroupText>USD</InputGroupText>
                                </InputGroupAddon>
                                <InputGroupInput
                                  id="cost-per-item"
                                  type="number"
                                  placeholder="0.00"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                />
                              </InputGroup>
                            )}
                          />
                          <FieldHint description="Used to calculate margin. Not visible to customers." />
                        </Field>
                      </CardPanelItem>
                      <CardPanelItem>
                        <Field>
                          <FieldLabel htmlFor="barcode">
                            Barcode (ISBN, UPC, GTIN)
                          </FieldLabel>
                          <Controller
                            name="barcode"
                            control={control}
                            render={({ field: f }) => (
                              <Input
                                id="barcode"
                                full
                                placeholder="e.g. 978-3-16-148410-0"
                                value={f.value}
                                onChange={f.onChange}
                                onBlur={f.onBlur}
                              />
                            )}
                          />
                          <FieldHint />
                        </Field>
                      </CardPanelItem>
                    </CardPanel>
                  </Card>

                  {/* Section: Inventory (collapsible) */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={trackInventory}
                          onCheckedChange={setTrackInventory}
                        />
                        <CardHeaderTitle>
                          Track inventory
                        </CardHeaderTitle>
                      </div>
                      <CardHeaderSubtitle className="ml-8">
                        Monitor stock levels and get low-stock alerts.
                      </CardHeaderSubtitle>
                    </CardHeader>

                    <CardPanel collapsed={!trackInventory}>
                      <CardPanelItem>
                        <FieldGroup>
                          <FieldSet>
                            <FieldGrid>
                              <Field>
                                <FieldLabel htmlFor="quantity">
                                  Quantity on Hand
                                </FieldLabel>
                                <Controller
                                  name="quantity"
                                  control={control}
                                  render={({ field: f }) => (
                                    <Input
                                      id="quantity"
                                      full
                                      type="number"
                                      placeholder="0"
                                      value={f.value}
                                      onChange={f.onChange}
                                      onBlur={f.onBlur}
                                    />
                                  )}
                                />
                                <FieldHint />
                              </Field>

                              <Field>
                                <FieldLabel htmlFor="low-stock-threshold">
                                  Low-stock Threshold
                                </FieldLabel>
                                <Controller
                                  name="lowStockThreshold"
                                  control={control}
                                  render={({ field: f }) => (
                                    <Input
                                      id="low-stock-threshold"
                                      full
                                      type="number"
                                      placeholder="Alert when stock falls below…"
                                      value={f.value}
                                      onChange={f.onChange}
                                      onBlur={f.onBlur}
                                    />
                                  )}
                                />
                                <FieldHint />
                              </Field>
                            </FieldGrid>
                          </FieldSet>

                          <Controller
                            name="allowBackorders"
                            control={control}
                            render={({ field: f }) => (
                              <Field
                                orientation="horizontal"
                                className="items-baseline"
                              >
                                <Checkbox
                                  id="allow-backorders"
                                  checked={f.value}
                                  onCheckedChange={f.onChange}
                                  onBlur={f.onBlur}
                                />
                                <FieldLabel
                                  htmlFor="allow-backorders"
                                  className="cursor-pointer font-normal"
                                >
                                  Allow backorders
                                </FieldLabel>
                              </Field>
                            )}
                          />
                        </FieldGroup>
                      </CardPanelItem>
                    </CardPanel>
                  </Card>
                </MainContent>
              </TabContent>

              {/* ── Tab: Shipping ─────────────────────────────────────────── */}
              <TabContent value="shipping">
                <MainContent>
                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>
                        Shipping Details
                      </CardHeaderTitle>
                      <CardHeaderSubtitle>
                        Specify shipping dimensions and customs information.
                      </CardHeaderSubtitle>
                    </CardHeader>

                    <CardPanel>
                      {/* Panel Item 3 — Shipping class */}
                      <CardPanelItem>
                        <FieldSet>
                          <FieldGrid>
                            <Field>
                              <FieldLabel htmlFor="shipping-class">
                                Shipping Class
                              </FieldLabel>
                              <Controller
                                name="shippingClass"
                                control={control}
                                render={({ field: f }) => (
                                  <Select
                                    value={f.value}
                                    onValueChange={f.onChange}
                                    onOpenChange={(open) => {
                                      if (!open) f.onBlur();
                                    }}
                                  >
                                    <SelectTrigger
                                      id="shipping-class"
                                      className="w-full"
                                    >
                                      <SelectValue placeholder="Select class…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {SHIPPING_CLASSES.map((s) => (
                                          <SelectItem
                                            key={s.value}
                                            value={s.value}
                                          >
                                            {s.label}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <FieldHint />
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="country-of-origin">
                                Country of Origin
                              </FieldLabel>
                              <Controller
                                name="countryOfOrigin"
                                control={control}
                                render={({ field: f }) => (
                                  <Combobox
                                    items={COUNTRIES}
                                    value={f.value}
                                    onValueChange={(v) => f.onChange(v)}
                                  >
                                    <ComboboxInput
                                      id="country-of-origin"
                                      placeholder="Search country…"
                                      onBlur={f.onBlur}
                                      className="w-full"
                                    />
                                    <ComboboxContent>
                                      <ComboboxList>
                                        <ComboboxEmpty>
                                          No results found.
                                        </ComboboxEmpty>
                                        <ComboboxCollection>
                                          {(c: string) => (
                                            <ComboboxItem key={c} value={c}>
                                              {c}
                                            </ComboboxItem>
                                          )}
                                        </ComboboxCollection>
                                      </ComboboxList>
                                    </ComboboxContent>
                                  </Combobox>
                                )}
                              />
                              <FieldHint />
                            </Field>
                          </FieldGrid>
                        </FieldSet>
                      </CardPanelItem>

                      {/* Panel Item 4 — Customs */}
                      <CardPanelItem>
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="hs-tariff-code">
                              HS Tariff Code
                            </FieldLabel>
                            <Controller
                              name="hsTariffCode"
                              control={control}
                              render={({ field: f }) => (
                                <Input
                                  id="hs-tariff-code"
                                  full
                                  placeholder="e.g. 8518.30"
                                  value={f.value}
                                  onChange={f.onChange}
                                  onBlur={f.onBlur}
                                />
                              )}
                            />
                            <FieldHint />
                          </Field>

                          <Controller
                            name="requiresCustoms"
                            control={control}
                            render={({ field: f }) => (
                              <Field
                                orientation="horizontal"
                                className="items-baseline"
                              >
                                <Checkbox
                                  id="requires-customs"
                                  checked={f.value}
                                  onCheckedChange={f.onChange}
                                  onBlur={f.onBlur}
                                />
                                <FieldLabel
                                  htmlFor="requires-customs"
                                  className="cursor-pointer font-normal"
                                >
                                  Requires customs declaration
                                </FieldLabel>
                              </Field>
                            )}
                          />
                        </FieldGroup>
                      </CardPanelItem>
                    </CardPanel>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardHeaderTitle>
                        Physical Details
                      </CardHeaderTitle>
                      <CardHeaderSubtitle>
                        Specify shipping dimensions and customs information.
                      </CardHeaderSubtitle>
                    </CardHeader>

                    <CardPanel>
                      {/* Panel Item 1 — Physical product toggle */}
                      <CardPanelItem>
                        <Field
                          orientation="horizontal"
                          className="items-center"
                        >
                          <Controller
                            name="isPhysical"
                            control={control}
                            render={({ field: f }) => (
                              <Switch
                                id="is-physical"
                                checked={f.value}
                                onCheckedChange={(v) => {
                                  f.onChange(v);
                                  setIsPhysicalState(v);
                                }}
                              />
                            )}
                          />
                          <FieldLabel
                            htmlFor="is-physical"
                            className="cursor-pointer font-normal"
                          >
                            This is a physical product
                          </FieldLabel>
                        </Field>
                      </CardPanelItem>

                      {/* Panel Item 2 — Weight & Dimensions (shown when physical) */}
                      <CardPanelItem collapsed={!isPhysicalState}>
                        <FieldGroup>
                          <FieldSet>
                            <FieldGrid>
                              <Field>
                                <FieldLabel htmlFor="weight">Weight</FieldLabel>
                                <Controller
                                  name="weight"
                                  control={control}
                                  render={({ field: f }) => (
                                    <InputGroup>
                                      <InputGroupInput
                                        id="weight"
                                        type="number"
                                        placeholder="0.0"
                                        value={f.value}
                                        onChange={f.onChange}
                                        onBlur={f.onBlur}
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <InputGroupText>kg</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  )}
                                />
                                <FieldHint />
                              </Field>
                            </FieldGrid>
                          </FieldSet>

                          <FieldSet>
                            <div className="flex items-center gap-3">
                              <Field>
                                <FieldLabel htmlFor="dim-length">
                                  Length (cm)
                                </FieldLabel>
                                <Controller
                                  name="length"
                                  control={control}
                                  render={({ field: f }) => (
                                    <Input
                                      id="dim-length"
                                      type="number"
                                      placeholder="0"
                                      value={f.value}
                                      onChange={f.onChange}
                                      onBlur={f.onBlur}
                                      className="w-24"
                                    />
                                  )}
                                />
                              </Field>
                              <span className="mt-5 text-muted-foreground">
                                ×
                              </span>
                              <Field>
                                <FieldLabel htmlFor="dim-width">
                                  Width (cm)
                                </FieldLabel>
                                <Controller
                                  name="width"
                                  control={control}
                                  render={({ field: f }) => (
                                    <Input
                                      id="dim-width"
                                      type="number"
                                      placeholder="0"
                                      value={f.value}
                                      onChange={f.onChange}
                                      onBlur={f.onBlur}
                                      className="w-24"
                                    />
                                  )}
                                />
                              </Field>
                              <span className="mt-5 text-muted-foreground">
                                ×
                              </span>
                              <Field>
                                <FieldLabel htmlFor="dim-height">
                                  Height (cm)
                                </FieldLabel>
                                <Controller
                                  name="height"
                                  control={control}
                                  render={({ field: f }) => (
                                    <Input
                                      id="dim-height"
                                      type="number"
                                      placeholder="0"
                                      value={f.value}
                                      onChange={f.onChange}
                                      onBlur={f.onBlur}
                                      className="w-24"
                                    />
                                  )}
                                />
                              </Field>
                            </div>
                            <FieldHint />
                          </FieldSet>
                        </FieldGroup>
                      </CardPanelItem>
                      <CardPanelItem>
                        This is an other panel item that is here to show the
                        spacing between items. It has no content.
                      </CardPanelItem>
                    </CardPanel>
                  </Card>
                </MainContent>
              </TabContent>
            </Tabs>
          </PageMain>

      <UnsavedChangesBar
        isDirty={isDirty}
        isValid={isValid}
        isSaving={isSaving}
        onSave={handleSave}
        onReset={() => reset()}
        onInvalid={() => trigger()}
        className="lg:left-[calc(50%+7rem)]"
      />
    </>
  );
}
