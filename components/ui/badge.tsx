import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "warning"
    | "success"
    | "pending";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-gray-900 text-gray-50 hover:bg-gray-900/80":
            variant === "default",
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80":
            variant === "secondary",
          "border-transparent bg-[#FFE8EE] text-[#E0556E]":
            variant === "destructive",
          "text-gray-950": variant === "outline",
          "border-transparent bg-[#FFEED8] text-[#E28A2B]":
            variant === "warning",
          "border-transparent bg-[#E6F7F0] text-[#1F8D64]":
            variant === "success",
          "border-transparent bg-[#FFF3E6] text-[#E28A2B]":
            variant === "pending",
        },
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
