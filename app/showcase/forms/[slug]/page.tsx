import { notFound } from "next/navigation";
import { getFormBySlug, formsConfig } from "@/lib/forms-config";
import { FormComingSoon } from "@/components/forms/form-coming-soon";

// ─── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return formsConfig.map((f) => ({ slug: f.slug }));
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function FormPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const form = getFormBySlug(slug);
  if (!form) notFound();

  // Each built form exports a default component named after its slug.
  // Until it's built we fall back to the coming-soon placeholder.
  let FormComponent: React.ComponentType | null = null;
  try {
    const mod = await import(`@/components/forms/${slug}-form`);
    FormComponent = mod.default ?? null;
  } catch {
    // form not yet built
  }

  if (!FormComponent) {
    return <FormComingSoon form={form} />;
  }

  return <FormComponent />;
}
