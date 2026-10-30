import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CasePage from "@/components/folio/CasePage";
import { CASE_SLUGS, getCase } from "@/data/cases";

type P = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => CASE_SLUGS.map((slug) => ({ slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = getCase("en", (await params).slug);
  if (!c) return {};
  return { title: `${c.title} — Ahmed Swid`, description: c.card, alternates: { canonical: `/en/work/${c.slug}`, languages: { ar: `/work/${c.slug}` } } };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  if (!getCase("en", slug)) notFound();
  return <CasePage lang="en" slug={slug} />;
}
