import FormPendaftaranSantri from '@/components/ponpes/formpendaftaran/form-pendaftaran-santri';
import HeroCarousel from '@/components/ponpes/home/hero-carousel';
import StatsOverlay from '@/components/ponpes/home/stats-overlay';
import PonpesLayout from '@/layouts/ponpes-layout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Pendaftaran Santri Baru" />
            <PonpesLayout>
                <div className="relative mb-5 w-full">
                    <HeroCarousel />
                    <StatsOverlay />
                </div>
                <main className="animate-fade-in mx-auto max-w-3xl px-6 py-16">
                    <p className="mb-4 text-center text-lg text-gray-600 dark:text-gray-300">Penerimaan Santri / Santriwati Baru</p>
                    <h1 className="mb-16 text-center text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Pondok Pesantren Al-Zaid
                    </h1>
                    <FormPendaftaranSantri />
                </main>
            </PonpesLayout>
        </>
    );
}
