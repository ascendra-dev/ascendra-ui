"use client";

import { ComponentPreview } from "../component-preview";
import { SectionHeader } from "../section-header";
import { PropsTable } from "../props-table";
import { toast, Button } from "@/ascendra-ui";
import { registry } from "@/lib/registry";

const meta = registry["toasts"];

export function ToastDocContent() {
  function handlePromise() {
    const work = new Promise<{ name: string }>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.3
          ? resolve({ name: "report_Q4_2025.pdf" })
          : reject(new Error("Server timeout"));
      }, 2000);
    });
    toast.promise(work, {
      loading: "Generating report…",
      success: (data) => `${data.name} is ready to download.`,
      error: "Failed to generate report. Please try again.",
    });
  }

  function handleLoadingUpdate() {
    const id = toast.loading("Uploading file…");
    setTimeout(() => {
      toast.success("File uploaded successfully.", { id });
    }, 2000);
  }

  return (
    <div className="space-y-10">
      <ComponentPreview
        code={`import { toast } from "@/ascendra-ui";

toast("Changes auto-saved.");`}
      >
        <Button size="sm" variant="secondary" onClick={() => toast("Changes auto-saved.")}>
          Show toast
        </Button>
      </ComponentPreview>

      <div className="space-y-8">
        <SectionHeader>Examples</SectionHeader>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Variants</h3>
          <p className="text-xs text-muted-foreground">
            Five semantic variants. Use the right one for the right message.
          </p>
          <ComponentPreview
            code={`toast("Changes auto-saved.");
toast.success("Invite sent to alex@example.com.");
toast.error("Payment failed. Check your card details.");
toast.warning("Your trial expires in 3 days.");
toast.info("A new version of the app is available.");`}
          >
            <Button size="sm" variant="secondary" onClick={() => toast("Changes auto-saved.")}>
              Default
            </Button>
            <Button size="sm" variant="secondary" onClick={() => toast.success("Invite sent to alex@example.com.")}>
              Success
            </Button>
            <Button size="sm" variant="secondary" onClick={() => toast.error("Payment failed. Check your card details.")}>
              Error
            </Button>
            <Button size="sm" variant="secondary" onClick={() => toast.warning("Your trial expires in 3 days.")}>
              Warning
            </Button>
            <Button size="sm" variant="secondary" onClick={() => toast.info("A new version of the app is available.")}>
              Info
            </Button>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With Description</h3>
          <p className="text-xs text-muted-foreground">
            Add a second line of supporting detail via the{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">description</code> option.
          </p>
          <ComponentPreview
            code={`toast.success("Record updated.", {
  description: "Your profile information has been saved successfully.",
});

toast.error("Sync failed.", {
  description: "Could not reach the server. Your local changes are preserved.",
});

toast.warning("Storage almost full.", {
  description: "You have used 4.8 GB of your 5 GB plan.",
});`}
          >
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                toast.success("Record updated.", {
                  description: "Your profile information has been saved successfully.",
                })
              }
            >
              Success + description
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                toast.error("Sync failed.", {
                  description: "Could not reach the server. Your local changes are preserved.",
                })
              }
            >
              Error + description
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                toast.warning("Storage almost full.", {
                  description: "You have used 4.8 GB of your 5 GB plan.",
                })
              }
            >
              Warning + description
            </Button>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">With Action</h3>
          <p className="text-xs text-muted-foreground">
            An inline action button for quick recovery or navigation without leaving the current page.
          </p>
          <ComponentPreview
            code={`toast("3 records deleted.", {
  action: {
    label: "Undo",
    onClick: () => toast.success("Deletion reversed."),
  },
});

toast.error("Draft discarded.", {
  description: "Your unsaved changes have been removed.",
  action: {
    label: "Restore",
    onClick: () => toast.success("Draft restored."),
  },
});`}
          >
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                toast("3 records deleted.", {
                  action: {
                    label: "Undo",
                    onClick: () => toast.success("Deletion reversed."),
                  },
                })
              }
            >
              Undo action
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                toast.error("Draft discarded.", {
                  description: "Your unsaved changes have been removed.",
                  action: {
                    label: "Restore",
                    onClick: () => toast.success("Draft restored."),
                  },
                })
              }
            >
              Restore action
            </Button>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Promise</h3>
          <p className="text-xs text-muted-foreground">
            Pass a promise and Sonner handles the loading → success / error lifecycle automatically. 70% chance of success.
          </p>
          <ComponentPreview
            code={`const work = fetch("/api/report");

toast.promise(work, {
  loading: "Generating report…",
  success: (data) => \`\${data.name} is ready to download.\`,
  error: "Failed to generate report. Please try again.",
});`}
          >
            <Button size="sm" variant="secondary" onClick={handlePromise}>
              Generate report (promise)
            </Button>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Loading → Update</h3>
          <p className="text-xs text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">toast.loading()</code>{" "}
            to show a spinner, then resolve it by passing the same{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">id</code> to another toast call.
          </p>
          <ComponentPreview
            code={`const id = toast.loading("Uploading file…");

setTimeout(() => {
  toast.success("File uploaded successfully.", { id });
}, 2000);`}
          >
            <Button size="sm" variant="secondary" onClick={handleLoadingUpdate}>
              Upload file (loading → success)
            </Button>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Duration</h3>
          <p className="text-xs text-muted-foreground">
            Override the default 4 000 ms dismiss timer with any duration in milliseconds.
          </p>
          <ComponentPreview
            code={`toast("Dismissed in 1 s.", { duration: 1000 });
toast("Dismissed in 8 s.", { duration: 8000 });
toast("Stays until closed.", { duration: Infinity });`}
          >
            <Button size="sm" variant="secondary" onClick={() => toast("Dismissed in 1 s.", { duration: 1000 })}>
              1 second
            </Button>
            <Button size="sm" variant="secondary" onClick={() => toast("Dismissed in 8 s.", { duration: 8000 })}>
              8 seconds
            </Button>
            <Button size="sm" variant="secondary" onClick={() => toast("This toast stays until you close it.", { duration: Infinity })}>
              Persistent
            </Button>
          </ComponentPreview>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Dismiss All</h3>
          <p className="text-xs text-muted-foreground">
            Programmatically dismiss every visible toast — useful on navigation or modal close.
          </p>
          <ComponentPreview
            code={`toast("Toast 1");
toast.warning("Toast 2");
toast.error("Toast 3");

toast.dismiss(); // clears all`}
          >
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                toast("Toast 1 — waiting to be dismissed.");
                toast.warning("Toast 2 — waiting to be dismissed.");
                toast.error("Toast 3 — waiting to be dismissed.");
              }}
            >
              Show 3 toasts
            </Button>
            <Button size="sm" variant="secondary" onClick={() => toast.dismiss()}>
              Dismiss all
            </Button>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader>Options</SectionHeader>
        <PropsTable props={meta.props ?? []} />
      </div>
    </div>
  );
}
