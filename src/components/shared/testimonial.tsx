import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialProps {
  name: string;
  role?: string;
  image?: string;
  rating: number;
  comment: string;
  className?: string;
}

export const Testimonial = ({
  name,
  role,
  image,
  rating,
  comment,
  className,
}: TestimonialProps) => {
  return (
    <Card className={cn(className)}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Rating */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>

          {/* Comment */}
          <p className="text-muted-foreground">&ldquo;{comment}&rdquo;</p>

          {/* Author */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{name}</p>
              {role && <p className="text-sm text-muted-foreground">{role}</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

