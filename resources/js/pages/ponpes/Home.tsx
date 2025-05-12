import AboutSection from '@/components/ponpes/about-section';
import AgendaSection from '@/components/ponpes/agenda-section';
import BlogSection from '@/components/ponpes/blog-section';
import FiguresSection from '@/components/ponpes/figures-section';
import HeroCarousel from '@/components/ponpes/hero-carousel';
import LocationSection from '@/components/ponpes/location-section';
import ProgramsSection from '@/components/ponpes/programs-section';
import StatsOverlay from '@/components/ponpes/stats-overlay';
import Layout from '@/layouts/ponpes-layout';
import { Head } from '@inertiajs/react';

export default function Home({ heros, stats, about, figures, programs, agenda, blogs }) {
    return (
        <>
            <Head title="Home" />
            <Layout>
                <main className="flex min-h-screen flex-col items-center justify-between">
                    <div className="relative w-full">
                        <HeroCarousel slides={heros} />
                        <StatsOverlay stats={stats} />
                    </div>
                    <AboutSection about={about} />
                    <FiguresSection figures={figures} />
                    <ProgramsSection programs={programs} />
                    <hr className="border-2 border-amber-300" />
                    <AgendaSection agendaData={agenda} />
                    <BlogSection blogPosts={blogs} />
                    <LocationSection />
                </main>
            </Layout>
        </>
    );
}
