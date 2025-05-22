'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/layouts/ponpes-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { ArrowLeft, ExternalLink, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Contact channel card component
function ContactChannelCard({ channel }: { channel: (typeof contactChannels)[0] }) {
    function getIconComponent(name, color) {
        const LucideIcon = Icons[name];
        return LucideIcon ? <LucideIcon className="h-6 w-6" style={{ color: color }} /> : null;
    }

    return (
        <Card className="gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-0">
                <a href={channel.link} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 hover:bg-gray-50">
                    <div
                        className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: channel.bgColor }}
                    >
                        {getIconComponent(channel.icon, channel.color)}
                    </div>
                    <div className="min-w-0 flex-grow">
                        <h3 className="font-bold text-gray-900">{channel.name}</h3>
                        <p className="truncate text-sm text-gray-600">{channel.value}</p>
                    </div>
                    <ExternalLink className="h-5 w-5 shrink-0 text-gray-400" />
                </a>
            </CardContent>
        </Card>
    );
}

export default function KontakPage({ strukturSlides, contactChannels }) {
    const { name } = usePage().props;
    const [scrollY, setScrollY] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Auto-rotate struktur slides
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === strukturSlides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="Pendaftaran Santri Baru" />
            <Layout>
                <main className="pb-16">
                    {/* Hero Section */}
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
                            <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">Hubungi Kami</h1>
                            <p className="max-w-3xl text-center text-xl text-white/90">
                                Silakan hubungi kami untuk informasi lebih lanjut tentang Pondok Pesantren {name}
                            </p>
                        </div>
                    </div>

                    <div className="container mx-auto mt-8 px-8">
                        {/* Breadcrumb */}
                        <div className="mb-8">
                            <Link href="/" className="text-primary flex items-center hover:underline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Beranda
                            </Link>
                        </div>

                        {/* Main Content with Sidebar */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <div className="mb-8">
                                    <h3 className="mb-6 text-xl font-bold">Media Sosial & Kontak</h3>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {contactChannels.map((channel, index) => (
                                            <ContactChannelCard key={index} channel={channel} />
                                        ))}
                                    </div>
                                </div>

                                {/* Contact Form */}
                                {/* <div className="mt-12 rounded-lg bg-white p-6 shadow-md">
                                    <h3 className="mb-6 text-xl font-bold">Kirim Pesan</h3>

                                    {submitSuccess ? (
                                        <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-4 text-green-700">
                                            <p className="font-medium">Pesan Anda telah berhasil dikirim!</p>
                                            <p className="mt-1 text-sm">
                                                Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.
                                            </p>
                                        </div>
                                    ) : null}

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                                                    Nama Lengkap
                                                </label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Masukkan nama lengkap"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                                                    Email
                                                </label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Masukkan alamat email"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="mb-1 block text-sm font-medium">
                                                Pesan
                                            </label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Tulis pesan Anda di sini..."
                                                rows={6}
                                                required
                                            />
                                        </div>

                                        <Button type="submit" className="bg-primary hover:bg-primary/90 w-full md:w-auto" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <span className="flex items-center">
                                                    <svg
                                                        className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Mengirim...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Kirim Pesan
                                                </span>
                                            )}
                                        </Button>
                                    </form>
                                </div> */}
                            </div>

                            {/* Sidebar - Struktur Slider */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 rounded-lg bg-white shadow-md">
                                    <div className="rounded-lg bg-white p-6 shadow-md">
                                        <h3 className="mb-4 text-xl font-bold">Informasi Kontak</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="mt-1 mb-4">
                                                    <MapPin className="me-3" />
                                                </div>
                                                <p>Jln. Poros Manyampa - Palangisan Kalikia, Desa Manyampa Kec. Ujung Loe Kab. Bulukumba</p>
                                            </div>
                                        </div>

                                        {/* Map Preview */}
                                        <h3 className="my-4 text-lg font-bold">Lokasi Kami</h3>
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
                                        <Button
                                            className="mt-4 w-full"
                                            onClick={() => window.open('https://maps.app.goo.gl/UMWtAHWVHXUEfJWv8', '_blank')}
                                        >
                                            Lihat di Google Maps
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
}
