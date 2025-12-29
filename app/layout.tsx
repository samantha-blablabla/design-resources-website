import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'DesignHub - Curated Design Resources',
    description: 'A beautiful collection of design resources, inspiration, and tips for designers.',
    keywords: ['design', 'resources', 'inspiration', 'UI', 'UX', 'tools'],
    authors: [{ name: 'DesignHub' }],
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
