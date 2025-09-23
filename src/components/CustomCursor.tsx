// "use client";

// import { useEffect, useState } from "react";

// export default function ColorfulCursor() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [colorIndex, setColorIndex] = useState(0);
//   const [isBlack, setIsBlack] = useState(true); // track black or white bg

//   // Colors to cycle through smoothly for glow
//   const colors = [
//     "#c47a7aff", // red
//     "#d75b03ff", // orange
//     "#69d0e4ff", // yellow
//     "#ecf006ff", // green
//     "#3b82f6",   // blue
//     "#8b5cf6",   // violet
//   ];

//   useEffect(() => {
//     const updatePosition = (e: MouseEvent) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", updatePosition);
//     return () => window.removeEventListener("mousemove", updatePosition);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setColorIndex((prev) => (prev + 1) % colors.length);
//     }, 600);
//     return () => clearInterval(interval);
//   }, []);

//   // Toggle cursor bg color on click
//   useEffect(() => {
//     const handleClick = () => {
//       setIsBlack((prev) => !prev);
//     };
//     window.addEventListener("click", handleClick);
//     return () => window.removeEventListener("click", handleClick);
//   }, []);

//   const bgColor = isBlack ? "black" : "white";
//   const borderColor = "white";

//   return (
//     <>
//       {/* Hide default cursor */}
//       <style>{`body, * { cursor: none !important; }`}</style>

//       {/* Cursor circle */}
//       <div
//         style={{
//           position: "fixed",
//           top: position.y - 15,
//           left: position.x - 15,
//           width: 25,
//           height: 25,
//           borderRadius: "38%",
//           pointerEvents: "none",
//           backgroundColor: bgColor,
//           border: `3px solid ${borderColor}`,
//           transition:
//             "background-color 0.5s ease, border-color 0.5s ease, transform 0.1s ease",
//           transform: "translate3d(0, 0, 0)",
//           zIndex: 9999,
//           mixBlendMode: "difference",
//           boxShadow: `0 0 8px ${colors[colorIndex]}`,
//         }}
//       />
//     </>
//   );
// }


"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`body, * { cursor: none !important; }`}</style>

      {/* Custom arrow cursor */}
      <div
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: 20,
          height: 28,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-0%, -0%)", // aligns arrow tip with pointer
        }}
      >
        <svg
          width="20"
          height="28"
          viewBox="0 0 20 28"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0,0 0,28 20,14" />
        </svg>
      </div>
    </>
  );
}
