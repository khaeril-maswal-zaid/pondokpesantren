'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Clock, Image, Link, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Data agenda pesantren
const allAgendaData = {
    'Oktober 2023': [
        {
            title: 'Peringatan Maulid Nabi Muhammad SAW',
            date: '12 Oktober 2023',
            time: '18:30 - 21:30 WIB',
            location: 'Masjid Pesantren Al-Zaid',
            description: 'Peringatan Maulid Nabi Muhammad SAW dengan pembacaan maulid Al-Barzanji dan tausiyah dari KH. Ahmad Zaid.',
        },
        {
            title: 'Ujian Tengah Semester Ganjil',
            date: '16-21 Oktober 2023',
            time: '07:30 - 12:30 WIB',
            location: 'Ruang Kelas Madrasah',
            description: 'Pelaksanaan Ujian Tengah Semester Ganjil untuk seluruh santri Madrasah Tsanawiyah dan Aliyah.',
        },
        {
            title: 'Seminar Pendidikan Islam di Era Digital',
            date: '28 Oktober 2023',
            time: '08:00 - 12:00 WIB',
            location: 'Aula Utama Pesantren',
            description: 'Seminar dengan pembicara Dr. H. Abdul Karim, M.Pd.I tentang tantangan dan peluang pendidikan Islam di era digital.',
        },
        {
            title: "Khataman Al-Qur'an Bulanan",
            date: '30 Oktober 2023',
            time: '13:00 - 15:30 WIB',
            location: 'Masjid Pesantren Al-Zaid',
            description: "Khataman Al-Qur'an bulanan yang diikuti oleh seluruh santri dan dipimpin oleh Ustadz H. Zainuddin, Lc.",
        },
    ],
    'November 2023': [
        {
            title: 'Pelatihan Kaligrafi',
            date: '5 November 2023',
            time: '14:00 - 16:00 WIB',
            location: 'Ruang Seni Pesantren',
            description:
                'Pelatihan kaligrafi untuk santri yang berminat, dibimbing oleh Ustadz Ahmad Fauzi yang merupakan juara kaligrafi tingkat nasional.',
        },
        {
            title: 'Pengajian Rutin Masyarakat',
            date: '10 November 2023',
            time: '19:30 - 21:00 WIB',
            location: 'Masjid Pesantren Al-Zaid',
            description: "Pengajian rutin bulanan untuk masyarakat sekitar dengan tema 'Membangun Keluarga Sakinah' oleh KH. Muhammad Hasan.",
        },
        {
            title: 'Lomba Pidato Tiga Bahasa',
            date: '18-19 November 2023',
            time: '08:00 - 16:00 WIB',
            location: 'Aula Utama Pesantren',
            description:
                'Lomba pidato dalam tiga bahasa (Indonesia, Arab, dan Inggris) antar santri untuk mengasah kemampuan berbahasa dan public speaking.',
        },
        {
            title: 'Bakti Sosial di Desa Sekitar',
            date: '25 November 2023',
            time: '07:00 - 12:00 WIB',
            location: 'Desa Sukamaju',
            description:
                'Kegiatan bakti sosial berupa pembagian sembako, pemeriksaan kesehatan gratis, dan bimbingan keagamaan untuk masyarakat desa sekitar.',
        },
    ],
    'Desember 2023': [
        {
            title: 'Persiapan Ujian Akhir Semester',
            date: '1-7 Desember 2023',
            time: '19:30 - 21:30 WIB',
            location: 'Ruang Kelas Madrasah',
            description: 'Bimbingan belajar tambahan untuk persiapan Ujian Akhir Semester Ganjil yang akan dilaksanakan minggu berikutnya.',
        },
        {
            title: 'Ujian Akhir Semester Ganjil',
            date: '11-16 Desember 2023',
            time: '07:30 - 12:30 WIB',
            location: 'Ruang Kelas Madrasah',
            description: 'Pelaksanaan Ujian Akhir Semester Ganjil untuk seluruh santri Madrasah Tsanawiyah dan Aliyah.',
        },
        {
            title: 'Penerimaan Rapor dan Pertemuan Wali Santri',
            date: '23 Desember 2023',
            time: '08:00 - 12:00 WIB',
            location: 'Aula Utama Pesantren',
            description: 'Penerimaan rapor semester ganjil dan pertemuan dengan wali santri untuk evaluasi perkembangan santri.',
        },
        {
            title: 'Libur Semester Ganjil',
            date: '24 Desember 2023 - 7 Januari 2024',
            time: '-',
            location: '-',
            description: 'Libur semester ganjil bagi seluruh santri. Santri diperbolehkan pulang ke rumah masing-masing.',
        },
    ],
    'Januari 2024': [
        {
            title: 'Kembali ke Pesantren',
            date: '7 Januari 2024',
            time: '08:00 - 16:00 WIB',
            location: 'Pesantren Al-Zaid',
            description: 'Batas waktu kembali ke pesantren bagi seluruh santri setelah libur semester ganjil.',
        },
        {
            title: 'Pembukaan Semester Genap',
            date: '8 Januari 2024',
            time: '07:30 - 09:00 WIB',
            location: 'Lapangan Pesantren',
            description: 'Upacara pembukaan semester genap tahun ajaran 2023/2024 dan pengarahan dari pimpinan pesantren.',
        },
        {
            title: 'Workshop Pengembangan Kurikulum',
            date: '13-14 Januari 2024',
            time: '08:00 - 16:00 WIB',
            location: 'Aula Utama Pesantren',
            description:
                'Workshop pengembangan kurikulum untuk seluruh ustadz dan ustadzah dengan menghadirkan pakar pendidikan dari Kementerian Agama.',
        },
        {
            title: 'Peringatan Tahun Baru Islam 1445 H',
            date: '20 Januari 2024',
            time: '19:30 - 21:30 WIB',
            location: 'Masjid Pesantren Al-Zaid',
            description: 'Peringatan tahun baru Islam 1445 H dengan doa akhir dan awal tahun serta tausiyah dari KH. Ahmad Zaid.',
        },
    ],
};

// Data struktur untuk slider
const strukturSlides = [
    {
        image: '/placeholder.svg?height=600&width=800',
        title: 'Struktur Pimpinan',
        description: 'KH. Ahmad Zaid sebagai pendiri dan pengasuh utama Pondok Pesantren Al-Zaid',
    },
    {
        image: '/placeholder.svg?height=600&width=800',
        title: 'Struktur Madrasah',
        description: 'Sistem pendidikan formal di bawah kepemimpinan Ustadz Dr. Mahmud Hasan',
    },
    {
        image: '/placeholder.svg?height=600&width=800',
        title: 'Struktur Kesantrian',
        description: 'Pengelolaan asrama dan kesejahteraan santri oleh tim kesantrian',
    },
];

export default function AgendaPage() {
    const [scrollY, setScrollY] = useState(0);
    const [activeMonth, setActiveMonth] = useState('Oktober 2023');
    const [currentSlide, setCurrentSlide] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);

    // Get available months
    const availableMonths = Object.keys(allAgendaData);

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

    // Get current month's agenda
    const currentMonthAgenda = allAgendaData[activeMonth] || [];

    return (
        <main className="pb-16">
            {/* Hero Section */}
            <div ref={headerRef} className="relative h-[400px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/placeholder.svg?height=800&width=1920')",
                        transform: `translateY(${scrollY * 0.1}px)`,
                    }}
                ></div>
                <div className="bg-primary/70 absolute inset-0"></div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
                    <div className="text-primary mb-4 inline-block rounded bg-white px-3 py-1 text-sm font-semibold">Kegiatan</div>
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
                        {/* Month Navigation */}
                        <div className="mb-8 overflow-x-auto">
                            <div className="flex min-w-max space-x-2">
                                {availableMonths.map((month) => (
                                    <Button
                                        key={month}
                                        variant={activeMonth === month ? 'default' : 'outline'}
                                        className={activeMonth === month ? 'bg-primary' : ''}
                                        onClick={() => setActiveMonth(month)}
                                    >
                                        {month}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Agenda List */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {currentMonthAgenda.length > 0 ? (
                                currentMonthAgenda.map((agenda, index) => (
                                    <div
                                        key={index}
                                        className="border-primary rounded-lg border-l-4 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
                                    >
                                        <h3 className="mb-3 text-xl font-bold">{agenda.title}</h3>
                                        <div className="mb-4 space-y-2">
                                            <div className="flex items-start">
                                                <Calendar className="text-primary mt-0.5 mr-2 h-5 w-5" />
                                                <span>{agenda.date}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <Clock className="text-primary mt-0.5 mr-2 h-5 w-5" />
                                                <span>{agenda.time}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <MapPin className="text-primary mt-0.5 mr-2 h-5 w-5" />
                                                <span>{agenda.location}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600">{agenda.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full rounded-lg bg-gray-50 py-12 text-center">
                                    <h3 className="mb-2 text-xl font-bold">Tidak ada agenda untuk bulan ini</h3>
                                    <p className="text-gray-600">Silakan pilih bulan lain atau kembali lagi nanti</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Struktur Slider */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-lg bg-white shadow-md">
                            <h3 className="p-6 pb-4 text-xl font-bold">Struktur Pesantren</h3>

                            {/* Struktur Slider */}
                            <div className="relative h-[400px] overflow-hidden">
                                {strukturSlides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-1000 ${
                                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <div className="relative h-full w-full">
                                            <Image src={slide.image || '/placeholder.svg'} alt={slide.title} fill className="object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                            <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                                                <h4 className="mb-2 text-lg font-bold">{slide.title}</h4>
                                                <p className="text-sm text-white/90">{slide.description}</p>
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
                                    Pondok Pesantren Al-Zaid dikelola oleh para pengasuh dan ustadz/ustadzah yang berpengalaman dan memiliki
                                    kompetensi di bidangnya masing-masing.
                                </p>
                                <Link href="/struktur">
                                    <Button className="bg-primary hover:bg-primary/90 w-full">Lihat Struktur Lengkap</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
