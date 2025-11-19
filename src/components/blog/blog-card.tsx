import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt?: string | null;
  featuredImageUrl?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  readingTime?: number;
  className?: string;
}

export const BlogCard = ({
  slug,
  title,
  excerpt,
  featuredImageUrl,
  category,
  publishedAt,
  readingTime,
  className,
}: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <Card
        className={cn(
          "group transition-all hover:shadow-lg hover:scale-[1.02]",
          className
        )}
      >
        {featuredImageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
            <Image
              src={featuredImageUrl}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <div className="mb-2 flex items-center gap-2">
            {category && (
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            )}
            {publishedAt && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {format(new Date(publishedAt), "MMM dd, yyyy")}
              </div>
            )}
            {readingTime && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {readingTime} min read
              </div>
            )}
          </div>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          {excerpt && (
            <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
};

