"use client";

import { useEffect, useRef } from "react";

function randomPosition() {
  const x = Math.floor(20 + Math.random() * 61);
  const y = Math.floor(20 + Math.random() * 61);

  return `${x}% ${y}%`;
}
export default function FloatingBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.setProperty("--bg-start", randomPosition());
    }
  }, []);

  return (
    <div
      ref={divRef}
      className="bg-[url('/kollage-mama.jpeg')] animate-float w-full min-h-screen"
      style={{ backgroundPosition: "var(--bg-start)" }}
    >
      {children}
    </div>
  );
}
