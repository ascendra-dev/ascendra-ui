"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle, NameAvatar, RowActionButton } from "@/ascendra-ui";
import { LuUser, LuSettings, LuBell, LuTrash2 } from "react-icons/lu";
import { registry } from "@/lib/registry";

const meta = registry["item"];

export function ItemDocContent() {
  return (
    <div className="space-y-10">
      {/* Hero preview */}
      <ComponentPreview
        align="start"
        code={`import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription } from "@/ascendra-ui";

<Item>
  <ItemMedia variant="icon">
    <LuUser />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Jane Doe</ItemTitle>
    <ItemDescription>jane@example.com</ItemDescription>
  </ItemContent>
</Item>`}
      >
        <div className="w-full max-w-sm">
          <Item>
            <ItemMedia variant="icon">
              <LuUser />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Jane Doe</ItemTitle>
              <ItemDescription>jane@example.com</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </ComponentPreview>

      {/* Examples */}
      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        {/* Variants */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Variants</h3>
          <p className="text-xs text-muted-foreground">
            Three border styles: borderless default, outlined, and muted
            background.
          </p>
          <ComponentPreview
            align="start"
            code={`<ItemGroup>
  <Item variant="default">...</Item>
  <Item variant="outline">...</Item>
  <Item variant="muted">...</Item>
</ItemGroup>`}
          >
            <div className="w-full max-w-sm">
              <ItemGroup>
                {(
                  [
                    ["default", "Default variant"],
                    ["outline", "Outline variant"],
                    ["muted", "Muted variant"],
                  ] as const
                ).map(([variant, label]) => (
                  <Item key={variant} variant={variant}>
                    <ItemContent>
                      <ItemTitle>{label}</ItemTitle>
                    </ItemContent>
                  </Item>
                ))}
              </ItemGroup>
            </div>
          </ComponentPreview>
        </div>

        {/* Sizes */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Sizes</h3>
          <ComponentPreview
            align="start"
            code={`<Item size="default">Default</Item>
<Item size="sm">Small</Item>
<Item size="xs">Extra small</Item>`}
          >
            <div className="w-full max-w-sm">
              <ItemGroup>
                {(["default", "sm", "xs"] as const).map((size) => (
                  <Item key={size} variant="outline" size={size}>
                    <ItemContent>
                      <ItemTitle>
                        {size === "default"
                          ? "Default"
                          : size === "sm"
                            ? "Small"
                            : "Extra small"}
                      </ItemTitle>
                    </ItemContent>
                  </Item>
                ))}
              </ItemGroup>
            </div>
          </ComponentPreview>
        </div>

        {/* With avatar and actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            With avatar and actions
          </h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              ItemActions
            </code>{" "}
            to add trailing controls like{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              RowActionButton
            </code>
            .
          </p>
          <ComponentPreview
            align="start"
            code={`<ItemGroup>
  <Item variant="outline">
    <ItemMedia>
      <NameAvatar name="Alice Martin" />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Alice Martin</ItemTitle>
      <ItemDescription>alice@example.com</ItemDescription>
    </ItemContent>
    <ItemActions>
      <RowActionButton opaque><LuTrash2 /></RowActionButton>
    </ItemActions>
  </Item>
</ItemGroup>`}
          >
            <div className="w-full max-w-sm">
              <ItemGroup>
                {[
                  { name: "Alice Martin", email: "alice@example.com" },
                  { name: "Bob Chen", email: "bob@example.com" },
                  { name: "Clara Osei", email: "clara@example.com" },
                ].map((user) => (
                  <Item key={user.email} variant="outline">
                    <ItemMedia>
                      <NameAvatar name={user.name} href="#" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{user.name}</ItemTitle>
                      <ItemDescription>{user.email}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <RowActionButton opaque>
                        <LuTrash2 />
                      </RowActionButton>
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            </div>
          </ComponentPreview>
        </div>

        {/* List with separators */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            With separators
          </h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              ItemSeparator
            </code>{" "}
            between groups within a list.
          </p>
          <ComponentPreview
            align="start"
            code={`<ItemGroup>
  <Item>...</Item>
  <Item>...</Item>
  <ItemSeparator />
  <Item>...</Item>
</ItemGroup>`}
          >
            <div className="w-full max-w-sm">
              <ItemGroup>
                <Item>
                  <ItemMedia variant="icon">
                    <LuUser />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Account</ItemTitle>
                    <ItemDescription>Manage your account details</ItemDescription>
                  </ItemContent>
                </Item>
                <Item>
                  <ItemMedia variant="icon">
                    <LuBell />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Notifications</ItemTitle>
                    <ItemDescription>Configure alerts and emails</ItemDescription>
                  </ItemContent>
                </Item>
                <ItemSeparator />
                <Item>
                  <ItemMedia variant="icon">
                    <LuSettings />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Settings</ItemTitle>
                    <ItemDescription>App preferences</ItemDescription>
                  </ItemContent>
                </Item>
              </ItemGroup>
            </div>
          </ComponentPreview>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
