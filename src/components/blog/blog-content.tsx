"use client";

import * as React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { cn } from "@/lib/utils";

interface BlogContentProps {
  content: string;
  className?: string;
}

export const BlogContent = ({ content, className }: BlogContentProps) => {
  const [mdxSource, setMdxSource] = React.useState<MDXRemoteSerializeResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const compileMDX = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const serialized = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeHighlight,
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                  properties: {
                    className: ["anchor"],
                  },
                },
              ],
            ],
          },
        });
        
        setMdxSource(serialized);
      } catch (err) {
        console.error("Error compiling MDX:", err);
        setError("Failed to render content");
      } finally {
        setIsLoading(false);
      }
    };

    if (content) {
      compileMDX();
    }
  }, [content]);

  if (isLoading) {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-muted rounded w-full mb-4"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>
    );
  }

  if (error || !mdxSource) {
    return (
      <div
        className={cn(
          "prose prose-lg max-w-none dark:prose-invert",
          "prose-headings:font-bold prose-headings:text-foreground",
          "prose-p:text-foreground prose-p:leading-relaxed",
          "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
          className
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div
      className={cn(
        "prose prose-lg max-w-none dark:prose-invert",
        "prose-headings:font-bold prose-headings:text-foreground",
        "prose-p:text-foreground prose-p:leading-relaxed",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
        "prose-pre:bg-muted prose-pre:border",
        "prose-img:rounded-lg prose-img:border",
        "prose-ul:list-disc prose-ol:list-decimal",
        "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4",
        className
      )}
    >
      <MDXRemote {...mdxSource} />
    </div>
  );
};

