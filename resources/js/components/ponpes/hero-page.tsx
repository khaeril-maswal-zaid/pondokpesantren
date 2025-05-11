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
                        backgroundImage: `url('/storage/image/assets/hero-3.jpg?v=${new Date().getTime()})`,
                        transform: `translateY(${scrollY * 0.1}px)`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-black/57"></div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
                    <span className="mt-4 inline-block py-1 text-xl font-semibold text-white md:text-3xl">Informasi</span>
                    <h1 className="mb-4 text-center text-2xl font-bold text-white md:text-5xl">Pendaftaran Santri Baru</h1>
                    <p className="mx-auto max-w-3xl text-center text-lg text-white/90 md:text-xl">
                        Pondok Pesantren {name} membuka pendaftaran santri/ santriwati baru untuk tahun ajaran 2025/2026. Silakan ikuti petunjuk
                        pendaftaran di bawah ini.
                    </p>
                </div>
            </div>
        </div>
    );
}
