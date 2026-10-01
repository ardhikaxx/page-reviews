import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskName(name: string): string {
  if (!name) return "Anonim";
  return name
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (word.length <= 2) {
        return word[0] + "*";
      }
      if (word.length === 3) {
        return word.slice(0, 1) + "**";
      }
      return word.slice(0, -3) + "***";
    })
    .join(" ");
}
