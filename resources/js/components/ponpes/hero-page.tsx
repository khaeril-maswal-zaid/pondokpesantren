import { usePage } from '@inertiajs/react';
import { useRef } from 'react';

export default function HeroPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const { name } = usePage().props;

    return (
        <div className="min-w-full">
            {/* Header with Parallax */}
            <div ref={headerRef} className="relative h-[400px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/storage/image/assets/hero-3.jpg')",
                        transform: `translateY(${scrollY * 0.1}px)`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
                    <div className="text-primary mb-4 inline-block rounded bg-white px-3 py-1 text-sm font-semibold">Informasi</div>
                    <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">Pendaftaran Santri Baru</h1>
                    <p className="mx-auto max-w-3xl text-center text-xl text-white/90">
                        Pondok Pesantren {name} membuka pendaftaran santri baru untuk tahun ajaran 2023/2024. Silakan ikuti petunjuk pendaftaran di
                        bawah ini.
                    </p>
                </div>
            </div>
        </div>
    );
}
