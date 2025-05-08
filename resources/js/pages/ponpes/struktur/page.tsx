'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Image, Link } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Data struktur pesantren (tanpa kategori)
const strukturData = [
    {
        name: 'KH. Ahmad Zaid',
        role: 'Pendiri & Pengasuh',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Pendiri Pondok Pesantren Al-Zaid pada tahun 1985. Beliau adalah lulusan Universitas Al-Azhar Kairo dan telah mengabdikan hidupnya untuk pendidikan Islam selama lebih dari 40 tahun.',
    },
    {
        name: 'KH. Muhammad Hasan',
        role: 'Pimpinan Pesantren',
        image: '/placeholder.svg?height=400&width=400',
        bio: "Putra sulung KH. Ahmad Zaid yang meneruskan kepemimpinan pesantren sejak tahun 2015. Beliau adalah hafidz Al-Qur'an 30 juz dan lulusan Universitas Islam Madinah.",
    },
    {
        name: 'Nyai Hj. Fatimah Zaid',
        role: 'Pengasuh Pondok Putri',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Istri dari KH. Ahmad Zaid yang berperan penting dalam pengembangan pondok pesantren putri. Beliau adalah lulusan Pondok Pesantren Darussalam Gontor Putri.',
    },
    {
        name: 'Ustadz Dr. Mahmud Hasan',
        role: 'Kepala Madrasah Aliyah',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Lulusan S3 Pendidikan Islam UIN Syarif Hidayatullah Jakarta. Telah mengajar di Pesantren Al-Zaid selama 15 tahun dan menjabat sebagai Kepala Madrasah Aliyah sejak 2018.',
    },
    {
        name: 'Ustadz H. Abdul Karim, M.Pd.I',
        role: 'Kepala Madrasah Tsanawiyah',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Lulusan S2 Pendidikan Islam UIN Sunan Kalijaga Yogyakarta. Beliau adalah alumni Pesantren Al-Zaid angkatan pertama yang kembali mengabdi sejak tahun 2005.',
    },
    {
        name: 'Ustadzah Aisyah Rahmah, M.Pd',
        role: 'Kepala Madrasah Ibtidaiyah',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Lulusan S2 Pendidikan Dasar Universitas Negeri Jakarta. Memiliki pengalaman mengajar selama 12 tahun dan fokus pada pengembangan metode pembelajaran inovatif untuk anak.',
    },
    {
        name: 'Ustadz H. Zainuddin, Lc',
        role: 'Kepala Bidang Tahfidz',
        image: '/placeholder.svg?height=400&width=400',
        bio: "Hafidz Al-Qur'an 30 juz dan lulusan Universitas Al-Azhar Kairo jurusan Tafsir. Beliau telah melahirkan puluhan hafidz Al-Qur'an dari Pesantren Al-Zaid.",
    },
    {
        name: 'Ustadz Ahmad Fauzi, M.Pd',
        role: 'Kepala Bidang Kurikulum',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Lulusan S2 Manajemen Pendidikan Universitas Indonesia. Bertanggung jawab atas pengembangan kurikulum yang mengintegrasikan pendidikan agama dan umum.',
    },
    {
        name: 'Ustadzah Khadijah, M.Hum',
        role: 'Kepala Bidang Bahasa',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Lulusan S2 Linguistik Universitas Gadjah Mada. Mengembangkan program bahasa Arab dan Inggris intensif di Pesantren Al-Zaid.',
    },
    {
        name: 'Ustadz Ridwan, M.Sos',
        role: 'Kepala Bidang Kesantrian',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Lulusan S2 Sosiologi Universitas Indonesia. Bertanggung jawab atas pembinaan karakter dan kedisiplinan santri serta pengembangan bakat dan minat.',
    },
    {
        name: 'Ustadz Hamid Hakim',
        role: 'Kepala Asrama Putra',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Alumni Pesantren Al-Zaid dan lulusan S1 Pendidikan Agama Islam UIN Syarif Hidayatullah Jakarta. Bertanggung jawab atas kesejahteraan dan kedisiplinan santri putra.',
    },
    {
        name: 'Ustadzah Fatimah Azzahra',
        role: 'Kepala Asrama Putri',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Alumni Pesantren Al-Zaid dan lulusan S1 Psikologi Universitas Indonesia. Bertanggung jawab atas kesejahteraan dan kedisiplinan santri putri.',
    },
    {
        name: 'Ustadz Zainal Abidin',
        role: 'Kepala Asrama Tahfidz',
        image: '/placeholder.svg?height=400&width=400',
        bio: "Hafidz Al-Qur'an 30 juz dan lulusan Pesantren Darussalam Gontor. Bertanggung jawab atas program khusus santri penghafal Al-Qur'an.",
    },
    {
        name: 'H. Anwar Sanusi, S.E.',
        role: 'Kepala Tata Usaha',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Lulusan S1 Ekonomi Universitas Indonesia. Bertanggung jawab atas administrasi dan keuangan pesantren sejak tahun 2010.',
    },
    {
        name: 'Hj. Siti Aminah, S.Kom.',
        role: 'Kepala Bagian Pendaftaran',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Lulusan S1 Ilmu Komputer Universitas Gunadarma. Mengelola sistem pendaftaran dan database santri Pesantren Al-Zaid.',
    },
    {
        name: 'Ahmad Syafii, S.E.',
        role: 'Kepala Bagian Keuangan',
        image: '/placeholder.svg?height=400&width=400',
        bio: 'Lulusan S1 Akuntansi Universitas Indonesia. Bertanggung jawab atas pengelolaan keuangan dan pelaporan keuangan pesantren.',
    },
];

export default function StrukturPage() {
    const [scrollY, setScrollY] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const headerRef = useRef<HTMLDivElement>(null);
    const itemsPerPage = 9;

    // Calculate total pages
    const totalPages = Math.ceil(strukturData.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = strukturData.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Pagination handlers
    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        window.scrollTo({ top: headerRef.current?.offsetHeight || 0, behavior: 'smooth' });
    };

    const goToPrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        window.scrollTo({ top: headerRef.current?.offsetHeight || 0, behavior: 'smooth' });
    };

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: headerRef.current?.offsetHeight || 0, behavior: 'smooth' });
    };

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
                    <div className="text-primary mb-4 inline-block rounded bg-white px-3 py-1 text-sm font-semibold">Organisasi</div>
                    <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">Struktur Pesantren</h1>
                    <p className="max-w-3xl text-center text-xl text-white/90">
                        Mengenal lebih dekat para pengasuh, ustadz, dan ustadzah yang mendedikasikan diri untuk pendidikan di Pondok Pesantren Al-Zaid
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

                {/* Intro */}
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className="mb-4 text-2xl font-bold md:text-3xl">Struktur Organisasi Pesantren</h2>
                    <p className="text-gray-600">
                        Pondok Pesantren Al-Zaid dikelola oleh para pengasuh dan ustadz/ustadzah yang berpengalaman dan memiliki kompetensi di
                        bidangnya masing-masing. Mereka berdedikasi untuk memberikan pendidikan terbaik bagi para santri.
                    </p>
                </div>

                {/* Main Content with Sidebar */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content - Struktur Cards */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {currentItems.map((member, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2"
                                >
                                    <div className="relative h-48 w-full">
                                        <Image src={member.image || '/placeholder.svg'} alt={member.name} fill className="object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="mb-1 text-lg font-bold">{member.name}</h3>
                                        <p className="text-primary mb-3 text-sm font-medium">{member.role}</p>
                                        <p className="line-clamp-3 text-sm text-gray-600">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-10 flex justify-center">
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" onClick={goToPrevPage} disabled={currentPage === 1} className="flex items-center">
                                    <ChevronLeft className="mr-1 h-4 w-4" /> Sebelumnya
                                </Button>

                                {/* Page numbers */}
                                <div className="hidden space-x-1 sm:flex">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                        <Button
                                            key={number}
                                            variant={currentPage === number ? 'default' : 'outline'}
                                            className={currentPage === number ? 'bg-primary' : ''}
                                            onClick={() => goToPage(number)}
                                        >
                                            {number}
                                        </Button>
                                    ))}
                                </div>

                                {/* Mobile page indicator */}
                                <div className="text-sm sm:hidden">
                                    <span className="rounded-md bg-gray-100 px-3 py-2">
                                        {currentPage} / {totalPages}
                                    </span>
                                </div>

                                <Button variant="outline" onClick={goToNextPage} disabled={currentPage === totalPages} className="flex items-center">
                                    Selanjutnya <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Bagan Struktur */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-lg bg-white p-6 shadow-md">
                            <h3 className="mb-4 text-xl font-bold">Bagan Struktur Organisasi</h3>
                            <div className="relative h-[600px] w-full overflow-hidden rounded-lg border border-gray-200">
                                <Image
                                    src="/placeholder.svg?height=800&width=600"
                                    alt="Bagan Struktur Organisasi Pesantren Al-Zaid"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="mt-4 text-sm text-gray-600">
                                Bagan struktur organisasi Pondok Pesantren Al-Zaid menunjukkan hierarki dan hubungan antar jabatan dalam pengelolaan
                                pesantren.
                            </p>
                            <div className="mt-6">
                                <Button className="bg-primary hover:bg-primary/90 w-full">Unduh Bagan Struktur</Button>
                            </div>

                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <h4 className="mb-3 font-bold">Informasi Kontak</h4>
                                <p className="mb-2 text-sm text-gray-600">
                                    Untuk informasi lebih lanjut tentang struktur organisasi pesantren, silakan hubungi:
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Email:</span> info@pesantrenalzaid.ac.id
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Telepon:</span> (021) 1234-5678
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
