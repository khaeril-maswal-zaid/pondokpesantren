'use client';

import { Button } from '@/components/ui/button';
import Layout from '@/layouts/ponpes-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function AgendaPage({ allAgendaData, strukturSlides }) {
    const { name } = usePage().props;
    const [scrollY, setScrollY] = useState(0);
    const [activeYear, setActiveYear] = useState(new Date().getFullYear().toString());
    const [currentSlide, setCurrentSlide] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);

    // Get available years
    const availableYears = Object.keys(allAgendaData);

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

    // Get current year's agenda
    const currentYearAgenda = allAgendaData[activeYear] || [];

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
                            <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">Agenda Pesantren</h1>
                            <p className="max-w-3xl text-center text-xl text-white/90">
                                Jadwal kegiatan dan acara yang akan diselenggarakan di Pondok Pesantren Al-Zaid dalam beberapa bulan ke depan
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
                            {/* Main Content - Agenda */}
                            <div className="lg:col-span-2">
                                {/* Year Navigation */}
                                <div className="mb-8 overflow-x-auto">
                                    <div className="flex min-w-max space-x-2">
                                        {availableYears.map((year) => (
                                            <Button
                                                key={year}
                                                variant={activeYear === year ? 'default' : 'outline'}
                                                className={activeYear === year ? 'bg-primary' : ''}
                                                onClick={() => setActiveYear(year)}
                                            >
                                                {year}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Agenda List */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {currentYearAgenda.length > 0 ? (
                                        currentYearAgenda.map((agenda, index) => (
                                            <div
                                                key={index}
                                                className="border-primary relative rounded-lg border-l-4 bg-white/30 bg-cover bg-center p-6 shadow-md transition-all duration-300 hover:shadow-lg"
                                                style={{
                                                    backgroundImage: `url(${`/storage/${agenda.image}`})`,
                                                }}
                                            >
                                                {/* overlay (opsional) untuk membuat teks lebih terbaca */}
                                                <div className="absolute inset-0 rounded-lg bg-black/40"></div>

                                                {/* konten di atas overlay */}
                                                <div className="relative z-10">
                                                    <h3 className="mb-3 text-xl font-bold text-white">{agenda.title}</h3>
                                                    <div className="mb-4 space-y-2 text-white">
                                                        <div className="flex items-start">
                                                            <Calendar className="mt-0.5 mr-2 h-5 w-5" />
                                                            <span>{agenda.date}</span>
                                                        </div>
                                                        <div className="flex items-start">
                                                            <Clock className="mt-0.5 mr-2 h-5 w-5" />
                                                            <span>{agenda.time}</span>
                                                        </div>
                                                        <div className="flex items-start">
                                                            <MapPin className="mt-0.5 mr-2 h-5 w-5" />
                                                            <span>{agenda.location}</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-white">{agenda.description}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full rounded-lg bg-gray-50 py-12 text-center">
                                            <h3 className="mb-2 text-xl font-bold">Tidak ada agenda untuk tahun ini</h3>
                                            <p className="text-gray-600">Silakan pilih tahun lain atau kembali lagi nanti</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar - Struktur Slider */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 rounded-lg bg-white shadow-md">
                                    <h3 className="p-6 pb-4 text-xl font-bold">Struktur Pesantren</h3>

                                    {/* Struktur Slider */}
                                    <div className="relative h-[500px] overflow-hidden">
                                        {strukturSlides.map((slide, index) => (
                                            <div
                                                key={index}
                                                className={`absolute inset-0 transition-opacity duration-1000 ${
                                                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            >
                                                <div className="relative h-full w-full">
                                                    <img src={slide.image || '/placeholder.svg'} alt={slide.role} className="object-cover" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                                    <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                                                        <h4 className="mb-2 text-lg font-bold">{slide.role}</h4>
                                                        <p className="text-sm text-white/90">{slide.keterangan}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Navigation Buttons */}
                                        <button
                                            onClick={() => setCurrentSlide((prev) => (prev === 0 ? strukturSlides.length - 1 : prev - 1))}
                                            className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
                                            aria-label="Previous slide"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={() => setCurrentSlide((prev) => (prev === strukturSlides.length - 1 ? 0 : prev + 1))}
                                            className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
                                            aria-label="Next slide"
                                        >
                                            <ChevronRight size={24} />
                                        </button>

                                        {/* Slider Indicators */}
                                        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
                                            {strukturSlides.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentSlide(index)}
                                                    className={`h-2 w-2 rounded-full transition-colors ${
                                                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                                                    }`}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 pt-4">
                                        <p className="mb-4 text-sm text-gray-600">
                                            Pondok Pesantren {name} dikelola oleh para pengasuh dan ustadz/ustadzah yang berpengalaman dan memiliki
                                            kompetensi di bidangnya masing-masing.
                                        </p>
                                        <Link href={route('struktur.cards')}>
                                            <Button className="bg-primary hover:bg-primary/90 w-full">Lihat Struktur Lengkap</Button>
                                        </Link>
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
