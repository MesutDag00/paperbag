"use client";

export function HeroVideo() {
  return (
    <video
      className="absolute inset-0 w-full h-full object-cover object-right"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
