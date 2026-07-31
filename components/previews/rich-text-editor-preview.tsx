"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { RichTextEditor } from "@/ascendra-ui";
import { Field, FieldLabel, FieldHint } from "@/ascendra-ui";
import { Button } from "@/ascendra-ui";

const INITIAL_HTML = `<p>This is a <strong>rich text editor</strong> built with <em>Tiptap</em>.</p><ul><li>Bold, italic, strikethrough</li><li>Bulleted and numbered lists</li><li>Link support</li></ul>`;

function ControlledExample() {
  const [html, setHtml] = useState("<p>Start typing your notes here…</p>");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <RichTextEditor
        value={html}
        onChange={setHtml}
        placeholder="Write your notes…"
      />
      <div className="flex items-center gap-2">
        <Button variant="primary" size="sm" onClick={() => setSubmitted(true)}>
          Submit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setHtml("");
            setSubmitted(false);
          }}
        >
          Clear
        </Button>
      </div>
      {submitted && (
        <div className="rounded-lg border bg-muted/30 px-4 py-3">
          <p className="mb-1 text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
            HTML output
          </p>
          <code className="break-all font-mono text-xs text-foreground">
            {html}
          </code>
        </div>
      )}
    </div>
  );
}

export function RichTextEditorDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        align="start"
        code={`import { RichTextEditor } from "@/ascendra-ui";

<RichTextEditor placeholder="Start writing…" />`}
      >
        <div className="w-full">
          <RichTextEditor placeholder="Start writing…" />
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Pre-populated content
          </h3>
          <p className="text-xs text-muted-foreground">
            Pass an HTML string as the initial{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              value
            </code>
            .
          </p>
          <ComponentPreview
            align="start"
            code={`const content = \`<p>This is a <strong>rich text editor</strong>…</p><ul>…</ul>\`;

<RichTextEditor value={content} />`}
          >
            <div className="w-full">
              <RichTextEditor value={INITIAL_HTML} />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Read-only</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              readOnly
            </code>{" "}
            to hide the toolbar and disable editing. Matches the disabled input
            styling.
          </p>
          <ComponentPreview
            align="start"
            code={`<RichTextEditor value={content} readOnly />`}
          >
            <div className="w-full">
              <RichTextEditor value={INITIAL_HTML} readOnly />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Custom min-height
          </h3>
          <p className="text-xs text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              minHeight
            </code>{" "}
            (in px) to expand the writing surface for longer-form content.
          </p>
          <ComponentPreview
            align="start"
            code={`<RichTextEditor placeholder="Detailed description…" minHeight={240} />`}
          >
            <div className="w-full">
              <RichTextEditor
                placeholder="Write a detailed description…"
                minHeight={240}
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Inside Field</h3>
          <p className="text-xs text-muted-foreground">
            Drops into a{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              Field
            </code>{" "}
            wrapper like any other input.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel>Description</FieldLabel>
  <RichTextEditor placeholder="Describe your project…" />
  <FieldHint description="Supports bold, italic, and lists" />
</Field>`}
          >
            <div className="flex flex-col gap-5 w-full">
              <Field>
                <FieldLabel>Description</FieldLabel>
                <RichTextEditor placeholder="Describe your project…" />
                <FieldHint description="Supports bold, italic, and lists" />
              </Field>
              <Field>
                <FieldLabel>
                  Release notes <span className="text-destructive">*</span>
                </FieldLabel>
                <RichTextEditor
                  placeholder="What changed in this release?"
                  minHeight={160}
                />
              </Field>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Controlled — with HTML output
          </h3>
          <p className="text-xs text-muted-foreground">
            <code className="rounded bg-muted px-1 font-mono text-xs">
              onChange
            </code>{" "}
            fires with the full HTML string on every keystroke.
          </p>
          <ComponentPreview
            align="start"
            code={`const [html, setHtml] = useState("");

<RichTextEditor value={html} onChange={setHtml} />`}
          >
            <div className="w-full">
              <ControlledExample />
            </div>
          </ComponentPreview>
        </div>

        <div className="rounded-lg border bg-muted/30 p-5 text-xs leading-relaxed text-muted-foreground">
          <p className="mb-2 font-medium text-foreground">
            Usage with react-hook-form
          </p>
          <pre className="overflow-x-auto rounded bg-muted p-3 font-mono text-[0.6875rem] leading-relaxed">
            {`const { control } = useForm<{ body: string }>();

<Controller
  control={control}
  name="body"
  render={({ field }) => (
    <RichTextEditor
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>`}
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable
          props={[
            {
              name: "value",
              type: "string",
              description: "Controlled HTML content.",
            },
            {
              name: "onChange",
              type: "(html: string) => void",
              description: "Called with full HTML on every change.",
            },
            {
              name: "placeholder",
              type: "string",
              default: "'Write something…'",
              description: "Placeholder text shown in the empty editor.",
            },
            {
              name: "readOnly",
              type: "boolean",
              default: "false",
              description: "Hides toolbar and disables editing.",
            },
            {
              name: "minHeight",
              type: "number",
              default: "120",
              description: "Min height of the editor area in px.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the container.",
            },
          ]}
        />
      </div>
    </div>
  );
}
