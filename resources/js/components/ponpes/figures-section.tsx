'use client';

import { Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

export default function FiguresSection({ figures }) {
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
                        // Once we've added the classes, we no longer need to observe this element
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' },
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
        <section ref={sectionRef} id="tokoh" className="bg-secondary wave-pattern-top py-20">
            <div className="container mx-auto px-8">
                <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Struktur Pesantren</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {figures.map((figure, index) => (
                        <Card
                            key={index}
                            className="slide-up gap-0 overflow-hidden border-t-4 border-[#051881] py-0 transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="relative w-full overflow-hidden">
                                <img
                                    src={`/storage/${figure.image}?v=${new Date().getTime()})` || '/placeholder.svg'}
                                    alt={figure.name}
                                    className="object-cover"
                                />
                            </div>
                            <CardHeader className="p-4 text-center">
                                <CardTitle className="text-lg">{figure.name}</CardTitle>
                                <CardDescription className="font-medium text-[#051881]">{figure.role}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link
                        href="/struktur"
                        className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors"
                    >
                        Lihat Semua Struktur
                    </Link>
                </div>
            </div>
        </section>
    );
}
