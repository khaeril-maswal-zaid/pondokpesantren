'use client';

import imagePleacholder from '@/assets/placeholder.svg';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Calendar, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const blogPosts = [
    {
        title: 'Peringatan Maulid Nabi Muhammad SAW 1445 H',
        excerpt:
            'Laporan kegiatan peringatan Maulid Nabi Muhammad SAW yang diselenggarakan di Pondok Pesantren Al-Zaid dengan berbagai rangkaian acara dan ceramah.',
        image: '/placeholder.svg?height=400&width=600',
        date: '12 Janury 2026',
        category: 'Kegiatan',
    },
    {
        title: 'Keutamaan Menuntut Ilmu dalam Islam',
        excerpt:
            "Pembahasan tentang keutamaan menuntut ilmu dalam Islam berdasarkan Al-Qur'an dan Hadits serta pandangan para ulama. Pembahasan tentang keutamaan menuntut ilmu dalam Islam berdasarkan Al-Qur'an dan Hadits serta pandangan para ulama.Pembahasan tentang keutamaan menuntut ilmu dalam Islam berdasarkan Al-Qur'an dan Hadits serta pandangan para ulama.",
        image: '/placeholder.svg?height=400&width=600',
        date: '12 Janury 2026',
        category: 'Artikel',
    },
    {
        title: "Prestasi Santri dalam Musabaqah Tilawatil Qur'an",
        excerpt: "Berita tentang prestasi membanggakan yang diraih oleh santri Al-Zaid dalam ajang Musabaqah Tilawatil Qur'an tingkat provinsi.",
        image: '/placeholder.svg?height=400&width=600',
        date: '12 Janury 2026',
        category: 'Prestasi',
    },
    {
        title: 'Tips Menjaga Kesehatan Selama Bulan Ramadhan',
        excerpt: 'Artikel kesehatan tentang cara menjaga kondisi tubuh tetap prima selama menjalankan ibadah puasa di bulan Ramadhan.',
        image: '/placeholder.svg?height=400&width=600',
        date: '12 Janury 2026',
        category: 'Kesehatan',
    },
    {
        title: 'Tips Menjaga Kesehatan Selama Bulan Ramadhan',
        excerpt: 'Artikel kesehatan tentang cara menjaga kondisi tubuh tetap prima selama menjalankan ibadah puasa di bulan Ramadhan.',
        image: '/placeholder.svg?height=400&width=600',
        date: '12 Janury 2026',
        category: 'Kesehatan',
    },
    {
        title: 'Tips Menjaga Kesehatan Selama Bulan Ramadhan',
        excerpt: 'Artikel kesehatan tentang cara menjaga kondisi tubuh tetap prima selama menjalankan ibadah puasa di bulan Ramadhan.',
        image: '/placeholder.svg?height=400&width=600',
        date: '12 Janury 2026',
        category: 'Kesehatan',
    },
];

export default function BlogSection() {
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
        <>
            {/* Blog Posts */}
            <section className="min-w-full bg-emerald-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-emerald-800">Blog Pesantren</h2>
                        <div className="mx-auto mb-4 h-1 w-24 bg-emerald-600"></div>
                        <p className="mx-auto max-w-2xl text-gray-600">Artikel dan berita terbaru dari kegiatan pesantren kami.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {blogPosts.map((post, index) => (
                            <Card key={index} className="overflow-hidden border-0 pt-0 shadow-md">
                                <div className="relative h-60 w-full overflow-hidden bg-gray-500">
                                    <img src={imagePleacholder} alt={post.title} className="object-cover" />
                                    <div className="bg-primary absolute top-10 rounded-e-sm px-2 py-1 text-xs font-semibold text-white">
                                        {post.category}
                                    </div>
                                </div>
                                <CardContent className="p-7 pt-0">
                                    <p className="mb-2 text-sm text-emerald-600">
                                        <Calendar className="inline pb-1" /> {post.date}
                                    </p>
                                    <h3 className="mb-2 text-xl font-bold text-emerald-800">{post.title}</h3>
                                    <p className="mb-4 line-clamp-5 text-gray-600">{post.excerpt}</p>
                                    <Link href="#" className="inline-flex items-center font-medium text-emerald-600 hover:text-emerald-700">
                                        Baca Selengkapnya <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Button variant={'default'} className="bg-emerald-600 hover:bg-emerald-700">
                            Lihat Semua Artikel
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
