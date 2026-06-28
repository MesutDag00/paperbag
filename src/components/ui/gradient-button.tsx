import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode, MouseEventHandler } from "react";

interface GradientButtonProps {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function GradientButton({ href, onClick, children, className, size = "md" }: GradientButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center font-semibold text-white rounded-full transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
    "bg-gradient-to-br from-[#9B2FC9] to-[#F5A623]",
    size === "sm" && "h-10 px-5 text-sm",
    size === "md" && "h-12 px-7 text-[15px]",
    size === "lg" && "h-14 px-9 text-base",
    className
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  );
}
