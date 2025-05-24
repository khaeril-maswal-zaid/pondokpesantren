import Footer from '@/components/ponpes/footer';
import Navbar from '@/components/ponpes/navbar';
import type React from 'react';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
