import PonpesLayout from '@/layouts/ponpes-layout';

import AboutSection from '@/components/ponpes/home/about-section';
import BlogSection from '@/components/ponpes/home/blog-section';
import FiguresSection from '@/components/ponpes/home/figures-section';
import HeroCarousel from '@/components/ponpes/home/hero-carousel';
import LocationSection from '@/components/ponpes/home/location-section';
import ProgramsSection from '@/components/ponpes/home/programs-section';
import StatsOverlay from '@/components/ponpes/home/stats-overlay';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <PonpesLayout>
                <main className="flex min-h-screen flex-col items-center justify-between">
                    <div className="relative w-full">
                        <HeroCarousel />
                        <StatsOverlay />
                    </div>
                    <AboutSection />
                    <FiguresSection />
                    <ProgramsSection />
                    <BlogSection />
                    <LocationSection />
                </main>
            </PonpesLayout>
        </>
    );
}
