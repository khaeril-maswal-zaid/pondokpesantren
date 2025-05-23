'use client';

import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useEffect, useRef } from 'react';

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
        <section ref={sectionRef} id="blog" className="bg-secondary py-14 md:py-15">
            <div className="container mx-auto px-8">
                <h2 className="mb-7 text-center text-3xl font-bold md:mb-12 md:text-4xl">Blog Pesantren</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {blogPosts.map((post, index) => (
                        <div
                            key={index}
                            className="slide-up overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2"
                        >
                            <div className="relative">
                                <img
                                    src={`/storage/${post.picture1}?v=${new Date().getTime()})` || '/placeholder.svg'}
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
                                <Link href={`/blog/${post.slug}`} className="text-primary flex items-center text-sm font-medium hover:underline">
                                    Baca selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link
                        href={route('blog.cards')}
                        className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors"
                    >
                        Lihat Semua Artikel
                    </Link>
                </div>
            </div>
        </section>
    );
}
