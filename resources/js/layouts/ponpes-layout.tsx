import Footer from '@/components/ponpes/footer';
import Navbar from '@/components/ponpes/navbar';
// import { Amiri, Poppins } from 'next/font/google';
import type React from 'react';

const poppins = 'Poppins';
const amiri = 'Amiri';

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
