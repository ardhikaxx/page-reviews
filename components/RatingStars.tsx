"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export default function RatingStars({
  rating,
  maxRating = 5,
  interactive = false,
  onRatingChange,
  className,
}: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= rating;

        return (
          <button
            key={starValue}
            type={interactive ? "button" : undefined}
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(starValue)}
            className={cn(
              "focus:outline-none transition-colors",
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
            )}
            aria-label={`Rating ${starValue} dari ${maxRating}`}
          >
            <Star
              className={cn(
                "w-5 h-5",
                isActive
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
