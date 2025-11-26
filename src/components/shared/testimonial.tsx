import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
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
    <Card
      className={cn(
        "border-0 bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Quote Icon & Rating */}
          <div className="flex items-center justify-between">
            <Quote className="h-6 w-6 text-gray-200 sm:h-8 sm:w-8" />
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5 sm:h-4 sm:w-4",
                    i < rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            &ldquo;{comment}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 border-t pt-3 sm:pt-4">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="bg-gray-100 text-xs font-medium text-gray-600 sm:text-sm">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-gray-900 sm:text-base">
                {name}
              </p>
              {role && (
                <p className="text-xs text-gray-500 sm:text-sm">{role}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
