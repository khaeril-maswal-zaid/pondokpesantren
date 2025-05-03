'use client';

import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function LocationSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
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
        <section ref={sectionRef} id="lokasi" className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Lokasi Pesantren</h2>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="h-[400px] overflow-hidden rounded-lg shadow-md lg:col-span-2">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2904349099224!2d106.8269113!3d-6.2297817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f3a3a35c01%3A0x8fcf5f3a4a0e7c9c!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1651234567890!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Pondok Pesantren Al-Zaid"
                        ></iframe>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h3 className="mb-4 text-xl font-bold">Informasi Kontak</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <MapPin className="text-primary mt-1 mr-3 h-5 w-5" />
                                <p>Jl. Pesantren No. 123, Kelurahan Contoh, Kecamatan Contoh, Kota Contoh, Provinsi Contoh, 12345</p>
                            </div>
                            <div className="flex items-center">
                                <Phone className="text-primary mr-3 h-5 w-5" />
                                <p>(021) 1234-5678</p>
                            </div>
                            <div className="flex items-center">
                                <Mail className="text-primary mr-3 h-5 w-5" />
                                <p>info@pesantrenalzaid.ac.id</p>
                            </div>
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
