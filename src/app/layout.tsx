// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Byte Battle",
  description: "Fast paced coding contest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        {/* Moving grid - single instance for entire app */}
        <div className="moving-grid" aria-hidden="true" />

        {/* subtle vignette on top of grid */}
        <div className="grid-vignette" aria-hidden="true" />

        {/* main page content goes here — ensure it uses .with-grid-content or z-10 */}
        <div className="with-grid-content">{children}</div>
      </body>
    </html>
  );
}
