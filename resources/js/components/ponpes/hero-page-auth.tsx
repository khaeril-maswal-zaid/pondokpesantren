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
                        backgroundImage: "url('/storage/image/assets/hero-3b.jpg')",
                        transform: `translateY(${scrollY * 0.1}px)`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-black/57"></div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
                    <h1 className="mb-4 text-center text-2xl font-bold text-white md:text-5xl">Panel Dashboard Admin</h1>
                    <p className="mx-auto max-w-3xl text-center text-lg text-white/90 md:text-xl">
                        Panel ini digunakan untuk mengelola seluruh data dan aktivitas di sistem Pondok Pesantren {name}. Silakan login untuk
                        mengakses fitur-fitur admin.
                    </p>
                </div>
            </div>
        </div>
    );
}
