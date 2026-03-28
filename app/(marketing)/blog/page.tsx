import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateInJakarta } from "@/lib/format/date";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog — KilatKoding",
  description: "Artikel dan tutorial untuk developer Indonesia.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-muted-foreground mb-8">
        Artikel dan tutorial untuk developer Indonesia.
      </p>
      <Separator className="mb-10" />

      {posts.length === 0 ? (
        <p className="text-muted-foreground">Belum ada artikel.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <Card className="border-border/50 transition-colors group-hover:border-primary/50">
                  <CardHeader className="pb-2">
                    <p className="text-xs text-muted-foreground">
                      {formatDateInJakarta(post.date, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {" · "}
                      {post.readingTime} menit baca
                    </p>
                    <h2 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      {post.description}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
