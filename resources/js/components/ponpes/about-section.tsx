'use client';

import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection({ about }) {
    const { name } = usePage().props;

    const sectionRef = useRef<HTMLElement>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        // Once we've added the class, we no longer need to observe this element
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} id="tentang" className="wave-pattern relative py-20 opacity-0">
            <div className="relative z-10 container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">Tentang Pondok Pesantren {name}</h2>
                    <p className="mx-auto max-w-3xl text-gray-600">
                        Lembaga pendidikan Islam yang mengintegrasikan nilai-nilai tradisional dengan pendidikan modern untuk mencetak generasi
                        berakhlak mulia.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
                    <div
                        className="relative col-span-1 h-full overflow-hidden rounded-lg shadow-lg md:col-span-5"
                        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
                    >
                        <img src={`/storage/${about?.image}`} alt="Pondok Pesantren Al-Zaid" className="h-full object-cover" />
                        <div className="bg-primary/20 absolute inset-0"></div>
                    </div>

                    <div className="col-span-1 rounded-lg bg-white p-6 shadow-md md:col-span-7">
                        <h3 className="mb-4 text-xl font-bold">Sejarah Singkat</h3>
                        <p className="mb-4 text-gray-700">
                            Pondok Pesantren Al-Zaid didirikan pada tahun 1985 oleh KH. Ahmad Zaid dengan visi mencetak generasi yang berilmu,
                            berakhlak mulia, dan bermanfaat bagi umat. Pesantren kami menggabungkan pendidikan Islam tradisional dengan pendidikan
                            modern untuk mempersiapkan santri menghadapi tantangan zaman.
                        </p>
                        <p className="mb-4 text-gray-700">
                            Nilai-nilai yang kami pegang teguh adalah keikhlasan, kesederhanaan, kemandirian, ukhuwah Islamiyah, dan kebebasan yang
                            bertanggung jawab. Kami percaya bahwa pendidikan yang baik harus menyeimbangkan aspek intelektual, spiritual, dan sosial.
                        </p>
                        <p className="text-gray-700">
                            Selama lebih dari tiga dekade, Pondok Pesantren Al-Zaid telah melahirkan ribuan alumni yang tersebar di berbagai bidang
                            dan profesi, memberikan kontribusi positif bagi masyarakat dan bangsa.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
