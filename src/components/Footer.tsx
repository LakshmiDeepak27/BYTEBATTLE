// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-12 py-6 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
        © {new Date().getFullYear()} Byte Battle — Built with ❤️
      </div>
    </footer>
  );
}
