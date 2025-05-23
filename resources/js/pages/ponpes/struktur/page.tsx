'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layouts/ponpes-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, UserIcon as Female, UserIcon as Male } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface StrukturMember {
    name: string;
    role: string;
    image?: string;
    bio: string;
    gender: string;
}

// Member card component to avoid repetition
function MemberCard({ member, key }: { member: StrukturMember }) {
    return (
        <div key={key} className="overflow-hidden rounded-lg bg-white shadow shadow-blue-300 transition-transform duration-300 hover:-translate-y-2">
            <div className="relative w-full">
                <img src={`/storage/${member.image}` || '/storage/image/assets/custom-struktur.jpg'} alt={member.name} className="object-cover" />
            </div>
            <div className="p-4">
                <h3 className="mb-1 line-clamp-1 text-center font-bold">{member.name}</h3>
                <p className="text-primary mb-3 text-center text-sm font-medium">{member.role}</p>
                <p className="line-clamp-3 text-center text-sm text-gray-600">{member.bio}</p>
            </div>
        </div>
    );
}

export default function StrukturPage({ strukturData }) {
    const { name } = usePage().props;
    const [scrollY, setScrollY] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);

    // // Calculate total pages
    // const totalPages = Math.ceil(strukturData.length / itemsPerPage);

    // // Get current items
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = strukturData.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [activeTab, setActiveTab] = useState('Laki-Laki');

    return (
        <>
            <Head title="Struktur" />
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
                            <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">Struktur Pesantren</h1>
                            <p className="max-w-3xl text-center text-xl text-white/90">
                                Mengenal lebih dekat para pengasuh, ustadz, dan ustadzah yang mendedikasikan diri untuk pendidikan di Pondok Pesantren
                                {name}
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
                                Pondok Pesantren {name} dikelola oleh para pengasuh dan ustadz/ustadzah yang berpengalaman dan memiliki kompetensi di
                                bidangnya masing-masing. Mereka berdedikasi untuk memberikan pendidikan terbaik bagi para santri.
                            </p>
                        </div>

                        {/* Main Content with Sidebar */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Main Content - Struktur Cards */}
                            <div className="lg:col-span-2">
                                {/* Navigation Tabs */}
                                <Tabs defaultValue="Laki-laki" className="mb-8" onValueChange={setActiveTab}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="Laki-laki" className="flex items-center justify-center gap-2">
                                            <Male className="h-4 w-4" />
                                            <span>Putra</span>
                                        </TabsTrigger>
                                        <TabsTrigger value="Perempuan" className="flex items-center justify-center gap-2">
                                            <Female className="h-4 w-4" />
                                            <span>Putri</span>
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="Laki-laki" className="mt-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                            {strukturData.data
                                                .filter((member) => member.gender === 'Laki-laki')
                                                .map((member, index) => (
                                                    <MemberCard key={index} member={member} />
                                                ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="Perempuan" className="mt-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                            {strukturData.data
                                                .filter((member) => member.gender === 'Perempuan')
                                                .map((member, index) => (
                                                    <MemberCard key={index} member={member} />
                                                ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>

                            {/* Sidebar - Bagan Struktur */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 rounded-lg bg-white p-6 shadow-md">
                                    {/* <h3 className="mb-4 text-xl font-bold">Bagan Struktur Organisasi</h3> */}
                                    <div className="relative w-full overflow-hidden rounded-lg border border-gray-200">
                                        <img
                                            src="/storage/image/assets/bagan.jpg"
                                            alt="Bagan Struktur Organisasi Pesantren Al-Zaid"
                                            className="object-contain"
                                        />
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600">
                                        Bagan struktur organisasi Pondok Pesantren {name} menunjukkan hierarki dan hubungan antar jabatan dalam
                                        pengelolaan pesantren.
                                    </p>
                                    <div className="mt-6">
                                        <Button className="bg-primary hover:bg-primary/90 w-full">Unduh Bagan Struktur</Button>
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
