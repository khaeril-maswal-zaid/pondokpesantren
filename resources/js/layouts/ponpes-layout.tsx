import Footer from '@/components/ponpes/footer';
import Navbar from '@/components/ponpes/navbar';
import { ThemeProvider } from '@/components/ponpes/theme-provider';

import type React from 'react';

export default function PonpesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Navbar />
            {children}
            <Footer />
        </ThemeProvider>
    );
}
