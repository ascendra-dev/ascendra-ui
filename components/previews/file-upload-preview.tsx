"use client";

import { useState } from "react";
import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { FileUpload } from "@/ascendra-ui";
import type { FileUploadState } from "@/ascendra-ui";
import { Field, FieldLabel, FieldHint } from "@/ascendra-ui";

function SimulatedUpload() {
  const [state, setState] = useState<FileUploadState>("idle");
  const [progress, setProgress] = useState(0);

  function handleFiles() {
    setState("uploading");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setState("success");
          return 100;
        }
        return p + 10;
      });
    }, 200);
  }

  return (
    <FileUpload
      variant="dropzone"
      accept=".pdf,.docx"
      maxSize={5 * 1024 * 1024}
      state={state}
      uploadProgress={state === "uploading" ? progress : undefined}
      onFiles={handleFiles}
    />
  );
}

export function FileUploadDocContent() {
  return (
    <div className="space-y-10">
      <ComponentPreview
        align="start"
        code={`import { FileUpload } from "@/ascendra-ui";

<FileUpload variant="dropzone" />`}
      >
        <div className="w-full max-w-md">
          <FileUpload variant="dropzone" />
        </div>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Dropzone variant</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With restrictions</h3>
          <p className="text-xs text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">accept</code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">maxSize</code>{" "}
            for client-side validation before the upload callback fires.
          </p>
          <ComponentPreview
            align="start"
            code={`<FileUpload
  variant="dropzone"
  accept=".pdf,.docx,.xlsx"
  maxSize={10 * 1024 * 1024}
  multiple
/>`}
          >
            <div className="w-full max-w-md">
              <FileUpload
                variant="dropzone"
                accept=".pdf,.docx,.xlsx"
                maxSize={10 * 1024 * 1024}
                multiple
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Controlled states</h3>
          <p className="text-xs text-muted-foreground">
            All five states rendered statically. Pass{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">state</code>{" "}
            to drive the appearance externally.
          </p>
          <ComponentPreview
            align="start"
            code={`<FileUpload variant="dropzone" state="dragover" />
<FileUpload variant="dropzone" state="uploading" uploadProgress={60} />
<FileUpload variant="dropzone" state="success" />
<FileUpload variant="dropzone" state="error" errorMessage="File too large." />`}
          >
            <div className="grid w-full max-w-2xl grid-cols-2 gap-4">
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Drag-over</p>
                <FileUpload variant="dropzone" state="dragover" />
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Uploading 60%</p>
                <FileUpload variant="dropzone" state="uploading" uploadProgress={60} />
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Success</p>
                <FileUpload variant="dropzone" state="success" />
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Error</p>
                <FileUpload
                  variant="dropzone"
                  state="error"
                  errorMessage="document.pdf exceeds max size of 5.0 MB."
                />
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Simulated upload</h3>
          <p className="text-xs text-muted-foreground">
            Click or drag a file — progress animates then resolves to success.
          </p>
          <ComponentPreview
            align="start"
            code={`const [state, setState] = useState<FileUploadState>("idle");
const [progress, setProgress] = useState(0);

<FileUpload
  state={state}
  uploadProgress={state === "uploading" ? progress : undefined}
  onFiles={handleFiles}
/>`}
          >
            <div className="w-full max-w-md">
              <SimulatedUpload />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Disabled</h3>
          <ComponentPreview
            align="start"
            code={`<FileUpload variant="dropzone" disabled />`}
          >
            <div className="w-full max-w-md">
              <FileUpload variant="dropzone" disabled />
            </div>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-8">
        <SectionHeader>Button variant</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Single & multiple</h3>
          <p className="text-xs text-muted-foreground">
            Compact inline trigger. Good for form fields where space is limited.
          </p>
          <ComponentPreview
            align="start"
            code={`<FileUpload variant="button" accept=".pdf" maxSize={5 * 1024 * 1024} />
<FileUpload variant="button" multiple />
<FileUpload variant="button" state="error" errorMessage="Only .pdf files accepted." />
<FileUpload variant="button" disabled />`}
          >
            <div className="flex flex-col gap-3">
              <FileUpload variant="button" accept=".pdf" maxSize={5 * 1024 * 1024} />
              <FileUpload variant="button" multiple />
              <FileUpload variant="button" state="error" errorMessage="Only .pdf files are accepted." />
              <FileUpload variant="button" disabled />
            </div>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-8">
        <SectionHeader>Inline variant</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Chips-style multi-file</h3>
          <p className="text-xs text-muted-foreground">
            Files appear as removable tags. Ideal for multi-file form rows.
          </p>
          <ComponentPreview
            align="start"
            code={`<FileUpload variant="inline" multiple />
<FileUpload variant="inline" multiple state="error" errorMessage="Max 3 files." />
<FileUpload variant="inline" multiple disabled />`}
          >
            <div className="flex flex-col gap-3">
              <FileUpload variant="inline" multiple />
              <FileUpload
                variant="inline"
                multiple
                state="error"
                errorMessage="Maximum 3 files allowed."
              />
              <FileUpload variant="inline" multiple disabled />
            </div>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-8">
        <SectionHeader>Inside Field</SectionHeader>

        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            All three variants drop into the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">Field</code>{" "}
            compound component like any other input.
          </p>
          <ComponentPreview
            align="start"
            code={`<Field>
  <FieldLabel>Attachment</FieldLabel>
  <FileUpload variant="button" accept=".pdf,.docx" />
  <FieldHint description="PDF or Word doc, max 10 MB" />
</Field>`}
          >
            <div className="flex flex-col gap-5 w-full max-w-md">
              <Field>
                <FieldLabel>Attachment</FieldLabel>
                <FileUpload variant="button" accept=".pdf,.docx" maxSize={10 * 1024 * 1024} />
                <FieldHint description="PDF or Word doc, max 10 MB" />
              </Field>
              <Field>
                <FieldLabel>Supporting documents</FieldLabel>
                <FileUpload variant="inline" multiple accept=".pdf,.jpg,.png" />
                <FieldHint description="Multiple files allowed" />
              </Field>
              <Field>
                <FieldLabel>Cover image</FieldLabel>
                <FileUpload variant="dropzone" accept="image/*" />
              </Field>
            </div>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Props</SectionHeader>
        <PropsTable
          props={[
            { name: "variant", type: "'dropzone' | 'button' | 'inline'", default: "'dropzone'", description: "Layout variant." },
            { name: "accept", type: "string", description: "Comma-separated accepted file extensions or MIME types (e.g. '.pdf,.docx')." },
            { name: "maxSize", type: "number", description: "Max file size in bytes. Validated client-side." },
            { name: "multiple", type: "boolean", default: "false", description: "Allow selecting multiple files." },
            { name: "state", type: "'idle' | 'dragover' | 'uploading' | 'success' | 'error'", default: "'idle'", description: "Controlled state override." },
            { name: "uploadProgress", type: "number", description: "Progress 0–100 shown during uploading state." },
            { name: "errorMessage", type: "string", description: "Error text displayed in error state." },
            { name: "onFiles", type: "(files: File[]) => void", description: "Called with validated file array when files are selected." },
            { name: "disabled", type: "boolean", default: "false", description: "Disables all interactions." },
          ]}
        />
      </div>
    </div>
  );
}
