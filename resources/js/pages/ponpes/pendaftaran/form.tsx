import FormPendaftaranSantri from '@/components/ponpes/formpendaftaran/form-pendaftaran-santrix';
import HeroPage from '@/components/ponpes/hero-page';
import PonpesLayout from '@/layouts/ponpes-layout';
import { Head } from '@inertiajs/react';

import { useRef } from 'react';

export default function Form() {
    const headerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Head title="Pendaftaran Santri Baru" />
            <PonpesLayout>
                <main className="pb-16">
                    <HeroPage />
                    <FormPendaftaranSantri />
                </main>
            </PonpesLayout>
        </>
    );
}
