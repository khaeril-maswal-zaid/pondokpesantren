'use client';

import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import * as Icons from 'lucide-react';

function getIconComponent(name) {
    const LucideIcon = Icons[name];
    return LucideIcon ? <LucideIcon className="text-primary mr-3 h-5 w-5" /> : null;
}

export default function LocationSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const { contact, name } = usePage().props;
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

    // Calculate parallax effect based on section position
    const getParallaxOffset = () => {
        if (!sectionRef.current) return 0;
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const relativeScroll = Math.max(0, scrollY - sectionTop + 500);
        return relativeScroll * 0.1;
    };

    const parallaxOffset = getParallaxOffset();

    return (
        <section ref={sectionRef} id="lokasi" className="relative overflow-hidden py-9 opacity-0 md:py-20">
            <div
                className="from-primary/5 to-primary/10 absolute inset-0 -z-10 bg-gradient-to-b"
                style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
            ></div>
            <div className="container mx-auto px-8">
                <h2
                    className="mb-7 text-center text-3xl font-bold md:mb-12 md:text-4xl"
                    style={{ transform: `translateY(${parallaxOffset * -0.2}px)` }}
                >
                    Lokasi Pesantren
                </h2>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div
                        className="h-[400px] overflow-hidden rounded-lg shadow-md lg:col-span-2"
                        style={{ transform: `translateY(${parallaxOffset * -0.1}px)` }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1326.67951652233!2d120.29554077929251!3d-5.47866863896147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbc079964c7e369%3A0x8470e7622335bf39!2sPondok%20Pesantren%20Ubay%20Bin%20Ka&#39;ab!5e1!3m2!1sid!2sid!4v1746855818626!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Lokasi Pondok Pesantren ${name}`}
                        ></iframe>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-md" style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}>
                        <h3 className="mb-4 text-xl font-bold">Informasi Kontak</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="mt-1 mb-4">{getIconComponent('MapPin')}</div>
                                <p>Jln. Poros Manyampa - Palangisan Kalikia, Desa Manyampa Kec. Ujung Loe Kab. Bulukumba</p>
                            </div>
                            {contact.map((item) => (
                                <div className="flex items-center">
                                    <div className="">{getIconComponent(item.icon)}</div>
                                    <p>{item.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Button
                                className="bg-primary hover:bg-primary/90 w-full"
                                onClick={() => window.open('https://maps.google.com', '_blank')}
                            >
                                Lihat di Google Maps
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
