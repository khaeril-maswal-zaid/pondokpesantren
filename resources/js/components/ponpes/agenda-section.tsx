'use client';

import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function AgendaSection({ agendaData }) {
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
        <section ref={sectionRef} id="agenda" className="bg-secondary py-7 md:py-13">
            <div className="container mx-auto px-8">
                <h2 className="mb-6 text-center text-3xl font-bold md:mb-10 md:text-4xl">Agenda Pesantren</h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {agendaData.slice(0, 4).map((agenda, index) => (
                        <div
                            key={index}
                            className="slide-up group relative h-[280px] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={`/storage/${agenda.image}?v=${new Date().getTime()})` || '/placeholder.svg'}
                                    alt={agenda.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
                                <h3 className="mb-3 text-xl font-bold">{agenda.title}</h3>
                                <div className="mb-4 space-y-2">
                                    <div className="flex items-start">
                                        <Calendar className="text-primary-foreground mt-0.5 mr-2 h-4 w-4 opacity-80" />
                                        <span className="text-sm text-gray-200">{agenda.date}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <Clock className="text-primary-foreground mt-0.5 mr-2 h-4 w-4 opacity-80" />
                                        <span className="text-sm text-gray-200">{agenda.time}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <MapPin className="text-primary-foreground mt-0.5 mr-2 h-4 w-4 opacity-80" />
                                        <span className="text-sm text-gray-200">{agenda.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link
                        href="/agenda"
                        className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors"
                    >
                        Lihat Semua Agenda <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
