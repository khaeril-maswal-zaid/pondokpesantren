'use client';

import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';

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
                <div className="mb-3 text-center md:mb-12">
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
                        <img
                            src={`/storage/${about?.picture1}?v=${new Date().getTime()})`}
                            alt="Pondok Pesantren Al-Zaid"
                            className="h-full object-cover"
                        />
                        <div className="bg-primary/20 absolute inset-0"></div>
                    </div>

                    <div className="col-span-1 rounded-lg bg-white p-6 shadow-md md:col-span-7">
                        <h3 className="mb-4 text-xl font-bold">{about?.title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: about?.body1 }} className="mb-3 line-clamp-9" />
                        <Link href={`blog/${about.slug}`} className="col-span-1">
                            <Button variant={'default'}>Lihat selengkapnya</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
