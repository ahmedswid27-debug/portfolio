import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CasePage from "@/components/folio/CasePage";
import { CASE_SLUGS, getCase } from "@/data/cases";

type P = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => CASE_SLUGS.map((slug) => ({ slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = getCase("ar", (await params).slug);
  if (!c) return {};
  return { title: `${c.title} — أحمد سويد`, description: c.card, alternates: { canonical: `/work/${c.slug}`, languages: { en: `/en/work/${c.slug}` } } };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  if (!getCase("ar", slug)) notFound();
  return <CasePage lang="ar" slug={slug} />;
}
