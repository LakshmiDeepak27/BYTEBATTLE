"use client";
import { useState } from "react";

export default function InteractiveGrid() {
  const [collapsed, setCollapsed] = useState(false);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // Ignore clicks/touches on buttons or interactive elements
    if (target.closest("button, a, input, textarea, select")) return;

    setCollapsed(true);

    // Reset after animation
    setTimeout(() => setCollapsed(false), 800);
  };

  return (
    <div
      className={`absolute inset-0 transition-all duration-700`}
      onClick={handleBackgroundClick}
      onTouchStart={handleBackgroundClick}
    >
      <div
        className={`w-full h-full bg-gray-900 grid gap-2 p-2`}
        style={{
          gridTemplateColumns: "repeat(10, 1fr)",
          gridTemplateRows: "repeat(10, 1fr)",
          transform: collapsed ? "scale(0.8) rotate(-5deg)" : "scale(1) rotate(0deg)",
          opacity: collapsed ? 0.5 : 1,
        }}
      >
        {Array.from({ length: 100 }).map((_, idx) => (
          <div key={idx} className="bg-gray-700 border border-gray-600 rounded-sm" />
        ))}
      </div>
    </div>
  );
}
