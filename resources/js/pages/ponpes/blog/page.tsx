'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Image, Link, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const blogPosts = [
    {
        title: 'Peringatan Maulid Nabi Muhammad SAW 1445 H',
        excerpt:
            'Laporan kegiatan peringatan Maulid Nabi Muhammad SAW yang diselenggarakan di Pondok Pesantren Al-Zaid dengan berbagai rangkaian acara dan ceramah.',
        image: '/placeholder.svg?height=400&width=600',
        category: 'Kegiatan',
        date: '12 Oktober 2023',
        slug: 'peringatan-maulid-nabi-muhammad-saw-1445-h',
    },
    {
        title: 'Keutamaan Menuntut Ilmu dalam Islam',
        excerpt: "Pembahasan tentang keutamaan menuntut ilmu dalam Islam berdasarkan Al-Qur'an dan Hadits serta pandangan para ulama.",
        image: '/placeholder.svg?height=400&width=600',
        category: 'Artikel',
        date: '5 Oktober 2023',
        slug: 'keutamaan-menuntut-ilmu-dalam-islam',
    },
    {
        title: "Prestasi Santri dalam Musabaqah Tilawatil Qur'an",
        excerpt: "Berita tentang prestasi membanggakan yang diraih oleh santri Al-Zaid dalam ajang Musabaqah Tilawatil Qur'an tingkat provinsi.",
        image: '/placeholder.svg?height=400&width=600',
        category: 'Prestasi',
        date: '20 September 2023',
        slug: 'prestasi-santri-dalam-musabaqah-tilawatil-quran',
    },
    {
        title: 'Tips Menjaga Kesehatan Selama Bulan Ramadhan',
        excerpt: 'Artikel kesehatan tentang cara menjaga kondisi tubuh tetap prima selama menjalankan ibadah puasa di bulan Ramadhan.',
        image: '/placeholder.svg?height=400&width=600',
        category: 'Kesehatan',
        date: '15 September 2023',
        slug: 'tips-menjaga-kesehatan-selama-bulan-ramadhan',
    },
    {
        title: 'Kunjungan Dinas Pendidikan ke Pesantren Al-Zaid',
        excerpt: 'Laporan kunjungan Dinas Pendidikan dalam rangka evaluasi dan pengembangan program pendidikan di Pesantren Al-Zaid.',
        image: '/placeholder.svg?height=400&width=600',
        category: 'Kegiatan',
        date: '10 September 2023',
        slug: 'kunjungan-dinas-pendidikan-ke-pesantren-al-zaid',
    },
    {
        title: 'Persiapan Ujian Akhir Semester Ganjil',
        excerpt: 'Informasi tentang persiapan dan jadwal pelaksanaan Ujian Akhir Semester Ganjil untuk santri Pesantren Al-Zaid.',
        image: '/placeholder.svg?height=400&width=600',
        category: 'Pengumuman',
        date: '5 September 2023',
        slug: 'persiapan-ujian-akhir-semester-ganjil',
    },
];

const categories = [
    { name: 'Semua', slug: 'semua' },
    { name: 'Kegiatan', slug: 'kegiatan' },
    { name: 'Artikel', slug: 'artikel' },
    { name: 'Prestasi', slug: 'prestasi' },
    { name: 'Pengumuman', slug: 'pengumuman' },
    { name: 'Kesehatan', slug: 'kesehatan' },
];

export default function BlogPage() {
    const [scrollY, setScrollY] = useState(0);
    const [activeCategory, setActiveCategory] = useState('semua');
    const [searchQuery, setSearchQuery] = useState('');
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory = activeCategory === 'semua' || post.category.toLowerCase() === activeCategory;
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                    <div className="text-primary mb-4 inline-block rounded bg-white px-3 py-1 text-sm font-semibold">Artikel</div>
                    <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">Blog Pesantren</h1>
                    <p className="mb-8 max-w-3xl text-center text-xl text-white/90">
                        Berita, artikel, dan informasi terkini seputar kegiatan dan perkembangan di Pondok Pesantren Al-Zaid
                    </p>
                    <div className="relative w-full max-w-md">
                        <Input
                            type="text"
                            placeholder="Cari artikel..."
                            className="rounded-full py-2 pr-4 pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-8 px-8">
                {/* Categories */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category.slug}
                                variant={activeCategory === category.slug ? 'default' : 'outline'}
                                className={activeCategory === category.slug ? 'bg-primary' : ''}
                                onClick={() => setActiveCategory(category.slug)}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Blog Posts */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredPosts.map((post, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2"
                            >
                                <div className="relative">
                                    <Image
                                        src={post.image || '/placeholder.svg'}
                                        alt={post.title}
                                        width={600}
                                        height={400}
                                        className="h-48 w-full object-cover"
                                    />
                                    <div className="bg-primary absolute top-2 left-2 rounded px-2 py-1 text-xs font-semibold text-white">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="mb-2 text-sm text-gray-500">{post.date}</div>
                                    <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
                                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
                                    <Link href={`/blog/${post.slug}`} className="text-primary flex items-center text-sm font-medium hover:underline">
                                        Baca selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <h3 className="mb-2 text-xl font-bold">Tidak ada artikel yang ditemukan</h3>
                        <p className="text-gray-600">Coba gunakan kata kunci pencarian yang berbeda atau pilih kategori lain</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                    <div className="flex space-x-2">
                        <Button variant="outline" disabled>
                            Sebelumnya
                        </Button>
                        <Button variant="default" className="bg-primary">
                            1
                        </Button>
                        <Button variant="outline">2</Button>
                        <Button variant="outline">3</Button>
                        <Button variant="outline">Selanjutnya</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
