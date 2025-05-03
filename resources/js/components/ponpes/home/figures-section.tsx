'use client';

import imagePleacholder from '@/assets/placeholder.svg';
import { useEffect, useRef } from 'react';

const figures = [
    {
        name: 'KH. Ahmad Zaid',
        role: 'Pendiri & Pengasuh',
        image: '/placeholder.svg?height=400&width=400',
    },
    {
        name: 'Ustadz Mahmud Hasan',
        role: 'Kepala Madrasah',
        image: '/placeholder.svg?height=400&width=400',
    },
    {
        name: 'Ustadzah Fatimah',
        role: 'Kepala Asrama Putri',
        image: '/placeholder.svg?height=400&width=400',
    },
    {
        name: 'Ustadz Abdul Karim',
        role: 'Kepala Tahfidz',
        image: '/placeholder.svg?height=400&width=400',
    },
];

export default function FiguresSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const elements = entry.target.querySelectorAll('.slide-up');
                        elements.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.add('visible');
                            }, index * 100);
                        });
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

    return (
        <section ref={sectionRef} id="tokoh" className="bg-secondary min-w-full py-20">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Struktur Pesantren</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {figures.map((figure, index) => (
                        <div
                            key={index}
                            className="slide-up overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <img src={imagePleacholder} alt="" className="object-cover" />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-bold">{figure.name}</h3>
                                <p className="text-gray-600">{figure.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
