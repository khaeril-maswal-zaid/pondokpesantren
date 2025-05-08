import AboutSection from '@/components/ponpes/about-section';
import AgendaSection from '@/components/ponpes/agenda-section';
import BlogSection from '@/components/ponpes/blog-section';
import FiguresSection from '@/components/ponpes/figures-section';
import HeroCarousel from '@/components/ponpes/hero-carousel';
import LocationSection from '@/components/ponpes/location-section';
import ProgramsSection from '@/components/ponpes/programs-section';
import StatsOverlay from '@/components/ponpes/stats-overlay';
import Layout from '@/layouts/ponpes-layout';

export default function Home({ heros, about, figures, programs, agenda, blogs }) {
    return (
        <>
            <Layout>
                <main className="flex min-h-screen flex-col items-center justify-between">
                    <div className="relative w-full">
                        <HeroCarousel slides={heros} />
                        <StatsOverlay />
                    </div>
                    <AboutSection about={about} />
                    <FiguresSection figures={figures} />
                    <ProgramsSection programs={programs} />
                    <AgendaSection agendaData={agenda} />
                    <BlogSection blogPosts={blogs} />
                    <LocationSection />
                </main>
            </Layout>
        </>
    );
}
