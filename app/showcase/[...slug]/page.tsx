import { notFound } from "next/navigation";
import Link from "next/link";
import { registry } from "@/lib/registry";
import { navConfig } from "@/lib/nav-config";
import { docComponents } from "@/lib/doc-components";
import { PropsTable } from "@/components/props-table";
import { SectionHeader } from "@/components/section-header";
import { ImportChip } from "@/components/import-chip";

function findCategory(fullSlug: string) {
  return navConfig.find((c) => c.items.some((i) => i.slug === fullSlug))?.title ?? null;
}

export async function generateStaticParams() {
  return navConfig
    .flatMap((c) => c.items)
    .filter((item) => item.slug !== "")
    .map((item) => ({ slug: item.slug.split('/') }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const component = slug[slug.length - 1];
  const fullSlug = slug.join('/');
  const meta = registry[component];

  if (!meta) notFound();

  const DocContent = docComponents[component];
  const category = findCategory(fullSlug);
  const importStatement = `import { ${meta.importNames.join(", ")} } from "${meta.importPath}"`;

  return (
    <>
      {/* Breadcrumb */}
      {category && (
        <p className="mb-8 text-xs text-muted-foreground">
          <Link href="/showcase" className="hover:text-foreground transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Overview
          </Link>
          <span className="mx-1.5">/</span>
          {category}
          <span className="mx-1.5">/</span>
          {meta.name}
        </p>
      )}

      {/* Component heading */}
      <div className="mb-6">
        <h1 className="text-foreground mb-1.5 text-2xl font-semibold tracking-tight">
          {meta.name}
        </h1>
        <p className="text-muted-foreground text-sm">{meta.description}</p>
      </div>

      {/* Import chip */}
      <div className="mb-8">
        <ImportChip importStatement={importStatement} />
      </div>

      {/* Doc content or coming-soon placeholder */}
      {DocContent ? (
        <DocContent />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-10 text-center">
            <p className="text-foreground text-sm font-medium">
              Live preview coming soon
            </p>
            <p className="text-muted-foreground text-xs">
              Import from{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 font-mono">
                {meta.importPath}
              </code>
            </p>
          </div>
          {meta.props && meta.props.length > 0 && (
            <div className="space-y-4">
              <SectionHeader>Props</SectionHeader>
              <PropsTable props={meta.props} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
