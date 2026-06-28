"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animation?: "fadeUp" | "slideLeft" | "slideRight";
  delay?: number;
  threshold?: number;
}

const animations: Record<NonNullable<Props["animation"]>, string> = {
  fadeUp:     "heroFadeUp 0.7s ease-out both",
  slideLeft:  "heroSlideLeft 0.7s ease-out both",
  slideRight: "heroSlideRight 0.7s ease-out both",
};

const hiddenStyles: Record<NonNullable<Props["animation"]>, React.CSSProperties> = {
  fadeUp:     { opacity: 0, transform: "translateY(28px)" },
  slideLeft:  { opacity: 0, transform: "translateX(-48px)" },
  slideRight: { opacity: 0, transform: "translateX(48px)" },
};

export function ScrollReveal({
  children,
  className,
  style: extraStyle,
  animation = "fadeUp",
  delay = 0,
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        visible
          ? { ...extraStyle, animation: animations[animation].replace("both", `${delay}s both`) }
          : { ...extraStyle, ...hiddenStyles[animation] }
      }
    >
      {children}
    </div>
  );
}
