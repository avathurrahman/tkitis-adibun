import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} — KilatKoding`,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { frontmatter, source } = post;

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:underline mb-8 block"
      >
        ← Kembali ke Blog
      </Link>

      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-3">{frontmatter.title}</h1>
        <p className="text-muted-foreground text-sm">
          {new Date(frontmatter.date).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {frontmatter.author && ` · ${frontmatter.author}`}
          {" · "}
          {frontmatter.readingTime} menit baca
        </p>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex gap-2 mt-3">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-muted px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={source} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>
    </main>
  );
}
