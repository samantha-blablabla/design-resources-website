import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DesignHub V2 - The Ultimate Design Resource Collection',
  description: 'Curated design resources with physics-based interactions',
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#060606] text-white antialiased">{children}</body>
    </html>
  );
}
