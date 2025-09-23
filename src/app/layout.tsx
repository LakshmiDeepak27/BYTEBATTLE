import './globals.css';

export const metadata = {
  title: 'Byte Battle',
  description: 'Byte Battle - The ultimate college coding contest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
