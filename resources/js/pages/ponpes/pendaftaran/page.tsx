'use client';

import HeroPage from '@/components/ponpes/hero-page';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/ponpes-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Calendar, CheckCircle, FileText, HelpCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export default function PendaftaranPage({ persyaratanUmum, steps, persyaratanKhusus, dokumenWajib, dokumenTambahan, faq, jadwal, jadwalMasuk }) {
    const sectionRefs = {
        syarat: useRef<HTMLElement>(null),
        dokumen: useRef<HTMLElement>(null),
        alur: useRef<HTMLElement>(null),
        jadwal: useRef<HTMLElement>(null),
    };
    const headerRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        // Once we've added the class, we no longer need to observe this element
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 },
        );

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs).forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { name } = usePage().props;

    return (
        <>
            <Head title="Pendaftaran Santri Baru" />
            <Layout>
                <main className="pb-16">
                    <HeroPage />

                    <div className="container mx-auto mt-16 px-5">
                        {/* Syarat Pendaftaran */}
                        <section ref={sectionRefs.syarat} id="syarat" className="mb-16 opacity-0">
                            <div className="rounded-lg bg-white p-3 shadow-md md:p-8">
                                <div className="mb-6 flex items-center">
                                    <div className="bg-primary/10 mr-4 rounded-full p-3">
                                        <CheckCircle className="text-primary h-8 w-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold md:text-3xl">Syarat Pendaftaran</h2>
                                </div>

                                <div className="grid gap-8 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-4 text-xl font-bold">Persyaratan Umum</h3>
                                        <ul className="space-y-3">
                                            {persyaratanUmum.map((value, index) => (
                                                <li className="flex items-start" key={index}>
                                                    <span className="bg-primary me-3 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                        {index + 1}
                                                    </span>
                                                    <span>{value.point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="mb-4 text-xl font-bold">Persyaratan Khusus</h3>
                                        <ul className="space-y-3">
                                            {persyaratanKhusus.map((value, index) => (
                                                <li className="flex items-start" key={index}>
                                                    <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                        {index + 1}
                                                    </span>
                                                    <span>{value.point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Dokumen Pendaftaran */}
                        <section ref={sectionRefs.dokumen} id="dokumen" className="mb-16 opacity-0">
                            <div className="rounded-lg bg-white p-3 shadow-md md:p-8">
                                <div className="mb-6 flex items-center">
                                    <div className="bg-primary/10 mr-4 rounded-full p-3">
                                        <FileText className="text-primary h-8 w-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold md:text-3xl">Dokumen Pendaftaran</h2>
                                </div>

                                <div className="grid gap-8 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-4 text-xl font-bold">Dokumen Wajib</h3>
                                        <ul className="space-y-3">
                                            {dokumenWajib.map((value, index) => (
                                                <li className="flex items-start">
                                                    <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                        {index + 1}
                                                    </span>
                                                    <span>{value.point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="mb-4 text-xl font-bold">Dokumen Tambahan</h3>
                                        <ul className="space-y-3">
                                            {dokumenTambahan.map((value, index) => (
                                                <li className="flex items-start" key={index}>
                                                    <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                        {index + 1}
                                                    </span>
                                                    <span>{value.point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Alur Pendaftaran */}
                        <section ref={sectionRefs.alur} id="alur" className="mb-16 opacity-0">
                            <div className="rounded-lg bg-white p-3 shadow-md md:p-8">
                                <div className="mb-6 flex items-center">
                                    <div className="bg-primary/10 mr-4 rounded-full p-3">
                                        <ArrowRight className="text-primary h-8 w-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold md:text-3xl">Alur Pendaftaran</h2>
                                </div>

                                <div className="relative">
                                    {/* Desktop Timeline */}
                                    <div className="hidden md:block">
                                        <div className="bg-primary absolute left-1/2 -ml-0.5 h-full w-1"></div>
                                        <div className="grid grid-cols-2 gap-5">
                                            {steps.map((step, idx) => {
                                                const isRight = idx % 2 === 0;
                                                const content = (
                                                    <div className={`mx-2 w-5/6 ${isRight ? 'pr-8 text-right' : 'pl-8 text-left'}`} key={idx}>
                                                        <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                                                        <p className="text-gray-600">{step.description.replace('{name}', name)}</p>
                                                    </div>
                                                );

                                                return (
                                                    <React.Fragment key={step.id}>
                                                        {isRight ? (
                                                            <>
                                                                <div className="relative flex justify-end">
                                                                    {content}
                                                                    <div className="bg-primary absolute top-0 right-0 ms-4 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                                        {idx + 1}
                                                                    </div>
                                                                </div>
                                                                <div />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div />
                                                                <div className="relative flex">
                                                                    {content}
                                                                    <div className="bg-primary absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                                        {idx + 1}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Mobile Timeline */}
                                    <div className="space-y-8 md:hidden">
                                        {steps.map((value, index) => (
                                            <div className="relative pl-10">
                                                <div className="bg-primary absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                    {index + 1}
                                                </div>
                                                <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
                                                <p className="text-gray-600">{value.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Jadwal Pendaftaran */}
                        <section ref={sectionRefs.jadwal} id="jadwal" className="mb-16 opacity-0">
                            <div className="rounded-lg bg-white p-3 shadow-md md:p-8">
                                <div className="mb-6 flex items-center">
                                    <div className="bg-primary/10 mr-4 rounded-full p-3">
                                        <Calendar className="text-primary h-8 w-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold md:text-3xl">Jadwal Pendaftaran</h2>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="bg-primary border p-3 text-white">Kegiatan</th>
                                                <th className="bg-primary border p-3 text-white">Gelombang 1</th>
                                                <th className="bg-primary border p-3 text-white">Gelombang 2</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {jadwal.map((value, index) => (
                                                <tr key={index}>
                                                    <td className="border p-3 font-medium">{value.activity_name}</td>
                                                    <td className="border p-3">{value.gel1}</td>
                                                    <td className="border p-3">{value.gel2}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className="border p-3 font-medium"> {jadwalMasuk.activity_name}</td>
                                                <td className="border p-3" colSpan={2}>
                                                    {jadwalMasuk.gel1}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-6 text-gray-600">
                                    <p>
                                        <strong>Catatan:</strong>
                                    </p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5">
                                        <li>Pendaftaran ditutup jika kuota sudah terpenuhi</li>
                                        <li>Biaya pendaftaran tidak dapat dikembalikan dengan alasan apapun</li>
                                        <li>Peserta tes seleksi wajib hadir 30 menit sebelum tes dimulai</li>
                                        <li>Peserta yang tidak melakukan registrasi ulang sesuai jadwal dianggap mengundurkan diri</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* FAQ */}
                        <section className="mb-16">
                            <div className="rounded-lg bg-white p-8 shadow-md">
                                <div className="mb-6 flex items-center">
                                    <div className="bg-primary/10 mr-4 rounded-full p-3">
                                        <HelpCircle className="text-primary h-8 w-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold md:text-3xl">Pertanyaan Umum</h2>
                                </div>

                                <Accordion type="single" collapsible className="w-full">
                                    {faq.map((Value, index) => (
                                        <AccordionItem value={`item-x${index}`} key={index}>
                                            <AccordionTrigger>{Value.title}</AccordionTrigger>
                                            <AccordionContent>
                                                <div dangerouslySetInnerHTML={{ __html: Value.description }} />
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </section>

                        {/* CTA with Parallax */}
                        <div className="relative mt-16 overflow-hidden rounded-xl py-20 text-center">
                            <div
                                className="from-primary/80 absolute inset-0 z-10 bg-gradient-to-r to-green-600/80"
                                style={{
                                    backgroundImage: `url('/storage/image/assets/hero-3b.jpg')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundAttachment: 'fixed',
                                }}
                            ></div>
                            <div className="absolute inset-0 z-20 bg-black/60"></div>
                            <div className="relative z-30">
                                <h2
                                    className="mb-4 text-2xl font-bold text-white md:text-3xl"
                                    // style={{ transform: `translateY(${scrollY * 0.03}px)` }}
                                >
                                    Siap Bergabung dengan Kami?
                                </h2>
                                <p
                                    className="mx-auto mb-8 max-w-2xl text-white/90"
                                    //  style={{ transform: `translateY(${scrollY * 0.02}px)` }}
                                >
                                    Jadilah bagian dari keluarga besar Pondok Pesantren {name} dan raih masa depan cemerlang dengan pendidikan Islam
                                    yang berkualitas.
                                </p>
                                <Link href={route('santri-baru.create')}>
                                    <Button
                                        className="text-primary rounded-lg bg-white px-8 py-6 text-lg hover:bg-white/90"
                                        style={{ transform: `translateY(${scrollY * 0.01}px)` }}
                                    >
                                        Daftar Sekarang
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
}
