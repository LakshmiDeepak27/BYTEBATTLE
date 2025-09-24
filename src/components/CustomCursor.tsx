"use client";
import { useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style>{`body, * { cursor: none !important; }`}</style>
      <div
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: 20,
          height: 28,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-0%, -0%)",
        } as React.CSSProperties}
      >
        <svg width="20" height="28" viewBox="0 0 20 28" fill="black" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,0 0,28 20,14" />
        </svg>
      </div>
    </>
  );
}
