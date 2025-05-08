'use client';

import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useEffect, useRef } from 'react';

const blogPosts = [
    {
        title: 'Peringatan Maulid Nabi Muhammad SAW 1445 H',
        excerpt:
            'Laporan kegiatan peringatan Maulid Nabi Muhammad SAW yang diselenggarakan di Pondok Pesantren Al-Zaid dengan berbagai rangkaian acara dan ceramah.',
        image: '/placeholder.svg?height=400&width=600',
        category: 'Kegiatan',
    },
    {
        title: 'Keutamaan Menuntut Ilmu dalam Islam',
        excerpt: "Pembahasan tentang keutamaan menuntut ilmu dalam Islam berdasarkan Al-Qur'an dan Hadits serta pandangan para ulama.",
        image: '/placeholder.svg?height=400&width=600',
        category: 'Artikel',
    },
    {
        title: "Prestasi Santri dalam Musabaqah Tilawatil Qur'an",
        excerpt: "Berita tentang prestasi membanggakan yang diraih oleh santri Al-Zaid dalam ajang Musabaqah Tilawatil Qur'an tingkat provinsi.",
        image: '/placeholder.svg?height=400&width=600',
        category: 'Prestasi',
    },
    {
        title: 'Tips Menjaga Kesehatan Selama Bulan Ramadhan',
        excerpt: 'Artikel kesehatan tentang cara menjaga kondisi tubuh tetap prima selama menjalankan ibadah puasa di bulan Ramadhan.',
        image: '/placeholder.svg?height=400&width=600',
        category: 'Kesehatan',
    },
];

export default function BlogSection({ blogPosts }) {
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
        <section ref={sectionRef} id="blog" className="bg-secondary py-20">
            <div className="container mx-auto px-8">
                <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Blog Pesantren</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {blogPosts.map((post, index) => (
                        <div
                            key={index}
                            className="slide-up overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2"
                        >
                            <div className="relative">
                                <img
                                    src={`/storage/${post.picture1}` || '/placeholder.svg'}
                                    alt={post.title}
                                    width={600}
                                    height={400}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="bg-primary absolute top-2 left-2 rounded px-2 py-1 text-xs font-semibold text-white">
                                    {post.category || 'Berita'}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="mb-2 flex items-center text-sm text-gray-500">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    <span>{post.created_at || '15 September 2023'}</span>
                                </div>
                                <h3 className="mb-2 text-lg font-bold">{post.title}</h3>
                                <p className="mb-4 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
                                <Link
                                    href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-primary flex items-center text-sm font-medium hover:underline"
                                >
                                    Baca selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link
                        href="#"
                        className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors"
                    >
                        Lihat Semua Artikel
                    </Link>
                </div>
            </div>
        </section>
    );
}
