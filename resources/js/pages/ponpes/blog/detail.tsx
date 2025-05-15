'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/ponpes-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Calendar, ChevronUp, Eye, Facebook, Linkedin, MessageCircle, Share2, Tag, Twitter, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function BlogDetail({ article, relatedPosts, kategory, countKategory, tagsRandom }) {
    const { name } = usePage().props;

    const [scrollY, setScrollY] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            setShowBackToTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
    };

    const shareOnTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`,
            '_blank',
        );
    };

    const shareOnLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(news.title)}`,
            '_blank',
        );
    };

    const shareOnWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${news.title} - ${window.location.href}`)}`, '_blank');
    };

    return (
        <>
            <Head title="Pendaftaran Santri Baru" />
            <Layout>
                <main className="pb-16">
                    {/* Hero Section - Tetap sama seperti sebelumnya */}
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
                            <div className="text-primary mb-4 inline-block rounded bg-white px-3 py-1 text-sm font-semibold">Blog Pesantren</div>
                            <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">Artikel & Berita</h1>
                            <p className="max-w-3xl text-center text-xl text-white/90">
                                "Menuntut ilmu adalah kewajiban bagi setiap muslim dan muslimah"
                            </p>
                        </div>
                    </div>

                    <div className="container mx-auto mt-8 px-4 md:px-8">
                        {/* Breadcrumb */}
                        <div className="mb-6">
                            <Link href="/blog" className="text-primary flex items-center hover:underline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                <span>Kembali ke Blog</span>
                            </Link>
                        </div>

                        {/* Main Content Layout */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                            {/* Main Content - Article */}
                            <div className="lg:col-span-8" ref={contentRef}>
                                {/* Article Header */}
                                <div className="mb-8">
                                    <Badge className="bg-primary hover:bg-primary/90 mb-4">{article?.category}</Badge>
                                    <h1 className="mb-4 text-3xl font-bold md:text-4xl">{article.title}</h1>

                                    {/* Article Meta */}
                                    <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Calendar className="text-primary mr-2 h-4 w-4" />
                                            <span>{article.created_at}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <User className="text-primary mr-2 h-4 w-4" />
                                            <span>{article.author.name}</span>
                                        </div>

                                        <div className="flex items-center">
                                            <Eye className="text-primary mr-2 h-4 w-4" />
                                            <span>{article.visit} kali dilihat</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Featured Image */}
                                <div className="mb-8 overflow-hidden rounded-lg shadow-md">
                                    <img
                                        src={`/storage/${article.picture1}` || '/placeholder.svg'}
                                        alt={article.title}
                                        width={1200}
                                        height={600}
                                        className="h-auto w-full"
                                    />
                                </div>

                                {/* Table of Contents */}
                                <div className="mb-8 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                    <h3 className="mb-2 font-bold text-gray-700">Daftar Isi</h3>
                                    <ul className="space-y-1">
                                        {article.body1.match(/<h3>(.*?)<\/h3>/g)?.map((match, index) => {
                                            const title = match.replace(/<h3>|<\/h3>/g, '').trim();
                                            const anchor = title.toLowerCase().replace(/\s+/g, '-');
                                            return (
                                                <li key={index} className="text-primary hover:underline">
                                                    <a href={`#${anchor}`} className="flex items-center">
                                                        <span className="mr-2">•</span>
                                                        <span>{title}</span>
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {/* Article Content */}
                                <article className="prose prose-blue lg:prose-lg max-w-none">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: article.body1.replace(/<h3>(.*?)<\/h3>/g, (match, title) => {
                                                const anchor = title.toLowerCase().replace(/\s+/g, '-');
                                                return `<h3 id="${anchor}">${title}</h3>`;
                                            }),
                                        }}
                                    />
                                </article>

                                {/* Tags */}
                                <div className="mt-8 flex flex-wrap items-center gap-2">
                                    <Tag className="h-5 w-5 text-gray-600" />
                                    {article.tags.map((tag, index) => (
                                        <Link
                                            key={index}
                                            href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="hover:bg-primary rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:text-white"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>

                                {/* Share Buttons */}
                                <div className="mt-8 border-t border-b py-4">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span className="flex items-center font-medium">
                                            <Share2 className="text-primary mr-2 h-5 w-5" /> Bagikan Artikel:
                                        </span>

                                        <button
                                            onClick={shareOnFacebook}
                                            className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700"
                                            aria-label="Share on Facebook"
                                        >
                                            <Facebook className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={shareOnTwitter}
                                            className="rounded-full bg-sky-500 p-2 text-white hover:bg-sky-600"
                                            aria-label="Share on Twitter"
                                        >
                                            <Twitter className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={shareOnLinkedIn}
                                            className="rounded-full bg-blue-700 p-2 text-white hover:bg-blue-800"
                                            aria-label="Share on LinkedIn"
                                        >
                                            <Linkedin className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={shareOnWhatsApp}
                                            className="rounded-full bg-green-500 p-2 text-white hover:bg-green-600"
                                            aria-label="Share on WhatsApp"
                                        >
                                            <MessageCircle className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={copyToClipboard}
                                            className="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
                                        >
                                            {copied ? 'Tersalin!' : 'Salin Tautan'}
                                        </button>
                                    </div>
                                </div>

                                {/* Author Bio */}
                                <div className="mt-8 rounded-lg border border-gray-100 bg-gray-50 p-6">
                                    <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage src={article.author?.image || '/placeholder.svg'} alt={article.title} />
                                            <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="mb-1 text-xl font-bold">{article.author.name}</h3>
                                            <p className="text-primary mb-3 text-sm">Penulis</p>
                                            <p className="text-gray-600">Penulis artikel di Pondok Pesantren {name}.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Post Navigation */}
                                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {article.prevPost && (
                                        <Link
                                            href={`/blog/${article.prevPost.slug}`}
                                            className="flex items-center rounded-lg border p-4 transition-colors hover:bg-gray-50"
                                        >
                                            <div>
                                                <div className="mb-1 flex items-center text-sm text-gray-500">
                                                    <ArrowLeft className="mr-1 h-4 w-4" /> Artikel Sebelumnya
                                                </div>
                                                <div className="font-medium">{article.prevPost.title}</div>
                                            </div>
                                        </Link>
                                    )}

                                    {article.nextPost && (
                                        <Link
                                            href={`/blog/${article.nextPost.slug}`}
                                            className="flex items-center justify-end rounded-lg border p-4 text-right transition-colors hover:bg-gray-50"
                                        >
                                            <div>
                                                <div className="mb-1 flex items-center justify-end text-sm text-gray-500">
                                                    Artikel Berikutnya <ArrowRight className="ml-1 h-4 w-4" />
                                                </div>
                                                <div className="font-medium">{article.nextPost.title}</div>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-24 space-y-8">
                                    {/* Related Posts */}
                                    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                                        <div className="border-b bg-gray-50 p-4">
                                            <h3 className="text-lg font-bold">Artikel Terkait</h3>
                                        </div>
                                        <div className="divide-y">
                                            {relatedPosts.map((post, index) => (
                                                <div key={index} className="p-4 transition-colors hover:bg-gray-50">
                                                    <Link href={`/blog/${post.slug}`} className="group">
                                                        <div className="flex gap-3">
                                                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                                                                <img
                                                                    src={`/storage/${post.picture1}` || '/placeholder.svg'}
                                                                    alt={post.title}
                                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <Badge className="mb-1 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800">
                                                                    {post?.category}
                                                                </Badge>
                                                                <h4 className="group-hover:text-primary line-clamp-2 font-medium transition-colors">
                                                                    {post.title}
                                                                </h4>
                                                                <div className="mt-1 flex items-center text-xs text-gray-500">
                                                                    <Calendar className="mr-1 h-3 w-3" />
                                                                    {post.created_at}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Categories */}
                                    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                                        <div className="border-b bg-gray-50 p-4">
                                            <h3 className="text-lg font-bold">Kategori</h3>
                                        </div>
                                        <div className="p-4">
                                            <div className="space-y-2">
                                                {countKategory.map((count, i) => (
                                                    <Link
                                                        href="/category/artikel"
                                                        className="flex items-center justify-between rounded p-2 hover:bg-gray-50"
                                                    >
                                                        <span className="hover:text-primary">{kategory[i]}</span>
                                                        <Badge variant="outline">{count}</Badge>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Popular Tags */}
                                    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                                        <div className="border-b bg-gray-50 p-4">
                                            <h3 className="text-lg font-bold">Tag Populer</h3>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex flex-wrap gap-2">
                                                {tagsRandom.map((tag) => (
                                                    <Link
                                                        href="/tag/pendidikan-islam"
                                                        className="hover:bg-primary rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:text-white"
                                                    >
                                                        {tag}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subscribe */}
                                    <div className="bg-primary overflow-hidden rounded-lg text-white shadow-sm">
                                        <div className="p-6">
                                            <h3 className="mb-2 text-lg font-bold">Berlangganan Update</h3>
                                            <p className="mb-4 text-sm text-white/80">
                                                Dapatkan artikel dan berita terbaru dari Pondok Pesantren {name} langsung ke email Anda.
                                            </p>
                                            <div className="space-y-2">
                                                <input
                                                    type="email"
                                                    placeholder="Email Anda"
                                                    className="w-full rounded bg-gray-50 px-3 py-2 text-sm text-gray-800"
                                                />
                                                <Button className="text-primary w-full bg-white hover:bg-white/90">Berlangganan</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to Top Button */}
                    {showBackToTop && (
                        <button
                            onClick={scrollToTop}
                            className="bg-primary hover:bg-primary/90 fixed right-8 bottom-8 z-50 rounded-full p-3 text-white shadow-lg transition-colors"
                            aria-label="Kembali ke atas"
                        >
                            <ChevronUp className="h-5 w-5" />
                        </button>
                    )}
                </main>
            </Layout>
        </>
    );
}
