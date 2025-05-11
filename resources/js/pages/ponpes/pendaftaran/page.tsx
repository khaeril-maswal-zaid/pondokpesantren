'use client';

import HeroPage from '@/components/ponpes/hero-page';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/ponpes-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Calendar, CheckCircle, FileText, HelpCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function PendaftaranPage() {
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
                                            <li className="flex items-start">
                                                <span className="bg-primary me-3 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    1
                                                </span>
                                                <span>Beragama Islam</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary me-3 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    2
                                                </span>
                                                <span>Lulus SD/MI untuk jenjang MTs atau lulus SMP/MTs untuk jenjang MA</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary me-3 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    3
                                                </span>
                                                <span>Berusia maksimal 13 tahun untuk jenjang MTs atau 16 tahun untuk jenjang MA</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary me-3 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    4
                                                </span>
                                                <span>Sehat jasmani dan rohani</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary me-3 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    5
                                                </span>
                                                <span>Mendapat izin dari orang tua/wali</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="mb-4 text-xl font-bold">Persyaratan Khusus</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    1
                                                </span>
                                                <span>Mampu membaca Al-Qur'an</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    2
                                                </span>
                                                <span>Memiliki hafalan minimal 1 juz Al-Qur'an (untuk program tahfidz)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    3
                                                </span>
                                                <span>Lulus tes seleksi masuk yang meliputi tes tulis, tes baca Al-Qur'an, dan wawancara</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    4
                                                </span>
                                                <span>Bersedia mematuhi seluruh peraturan pesantren</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    5
                                                </span>
                                                <span>Bersedia tinggal di asrama pesantren</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    6
                                                </span>
                                                <span>Bersedia untuk tidak pindah sekolah selama minimal 3 tahun</span>
                                            </li>
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
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    1
                                                </span>
                                                <span>Fotokopi ijazah dan SKHUN terakhir yang dilegalisir (3 lembar)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    2
                                                </span>
                                                <span>Fotokopi rapor 2 semester terakhir yang dilegalisir (2 lembar)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    3
                                                </span>
                                                <span>Fotokopi akta kelahiran (3 lembar)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    4
                                                </span>
                                                <span>Fotokopi Kartu Keluarga (3 lembar)</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="mb-4 text-xl font-bold">Dokumen Tambahan</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    1
                                                </span>
                                                <span>Surat pernyataan kesanggupan mematuhi peraturan (bermaterai)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    2
                                                </span>
                                                <span>Fotokopi piagam prestasi (jika ada)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full px-2 text-sm font-bold text-white">
                                                    3
                                                </span>
                                                <span>Surat rekomendasi dari sekolah/madrasah asal (jika ada)</span>
                                            </li>
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
                                        <div className="grid grid-cols-2 gap-8">
                                            {/* Step 1 */}
                                            <div className="relative">
                                                <div className="flex justify-end">
                                                    <div className="w-5/6 pr-8">
                                                        <h3 className="mb-2 text-right text-xl font-bold">Pendaftaran Online</h3>
                                                        <p className="text-right text-gray-600">
                                                            Calon santri melakukan pendaftaran online melalui website resmi Pondok Pesantren {name}
                                                            dan mengisi formulir dengan lengkap.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-primary absolute top-0 right-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                    1
                                                </div>
                                            </div>
                                            <div className=""></div>

                                            {/* Step 2 */}
                                            <div className=""></div>
                                            <div className="relative">
                                                <div className="flex">
                                                    <div className="w-5/6 pl-8">
                                                        <h3 className="mb-2 text-xl font-bold">Pembayaran Biaya Pendaftaran</h3>
                                                        <p className="text-gray-600">
                                                            Melakukan pembayaran biaya pendaftaran sebesar Rp 300.000 melalui transfer bank ke
                                                            rekening resmi pesantren.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-primary absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                    2
                                                </div>
                                            </div>

                                            {/* Step 3 */}
                                            <div className="relative">
                                                <div className="flex justify-end">
                                                    <div className="w-5/6 pr-8">
                                                        <h3 className="mb-2 text-right text-xl font-bold">Verifikasi Dokumen</h3>
                                                        <p className="text-right text-gray-600">
                                                            Menyerahkan berkas pendaftaran lengkap ke panitia untuk diverifikasi. Dokumen dapat
                                                            dikirim secara online atau diserahkan langsung.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-primary absolute top-0 right-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                    3
                                                </div>
                                            </div>
                                            <div className=""></div>

                                            {/* Step 4 */}
                                            <div className=""></div>
                                            <div className="relative">
                                                <div className="flex">
                                                    <div className="w-5/6 pl-8">
                                                        <h3 className="mb-2 text-xl font-bold">Tes Seleksi</h3>
                                                        <p className="text-gray-600">
                                                            Mengikuti tes seleksi yang meliputi tes tulis (pengetahuan umum dan agama), tes baca
                                                            Al-Qur'an, dan wawancara.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-primary absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                    4
                                                </div>
                                            </div>

                                            {/* Step 5 */}
                                            <div className="relative">
                                                <div className="flex justify-end">
                                                    <div className="w-5/6 pr-8">
                                                        <h3 className="mb-2 text-right text-xl font-bold">Pengumuman Hasil Seleksi</h3>
                                                        <p className="text-right text-gray-600">
                                                            Pengumuman hasil seleksi akan disampaikan melalui website dan SMS/WhatsApp ke nomor orang
                                                            tua/wali.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-primary absolute top-0 right-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                    5
                                                </div>
                                            </div>
                                            <div className=""></div>

                                            {/* Step 6 */}
                                            <div className=""></div>
                                            <div className="relative">
                                                <div className="flex">
                                                    <div className="w-5/6 pl-8">
                                                        <h3 className="mb-2 text-xl font-bold">Registrasi Ulang & Masuk Pesantren</h3>
                                                        <p className="text-gray-600">
                                                            Bagi yang diterima, melakukan registrasi ulang dengan melunasi biaya pendidikan dan masuk
                                                            pesantren sesuai jadwal yang ditentukan.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-primary absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                    6
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Timeline */}
                                    <div className="space-y-8 md:hidden">
                                        {/* Step 1 */}
                                        <div className="relative pl-10">
                                            <div className="bg-primary absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                1
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold">Pendaftaran Online</h3>
                                            <p className="text-gray-600">
                                                Calon santri melakukan pendaftaran online melalui website resmi Pondok Pesantren {name} dan mengisi
                                                formulir dengan lengkap.
                                            </p>
                                        </div>

                                        {/* Step 2 */}
                                        <div className="relative pl-10">
                                            <div className="bg-primary absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                2
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold">Pembayaran Biaya Pendaftaran</h3>
                                            <p className="text-gray-600">
                                                Pendaftaran Gratis. Tidak ada biaya apapun yang dikenakan untuk proses pendaftaran santri baru.
                                            </p>
                                        </div>

                                        {/* Step 3 */}
                                        <div className="relative pl-10">
                                            <div className="bg-primary absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                3
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold">Verifikasi Dokumen</h3>
                                            <p className="text-gray-600">
                                                Menyerahkan berkas pendaftaran lengkap ke panitia untuk diverifikasi. Dokumen dapat dikirim secara
                                                online atau diserahkan langsung.
                                            </p>
                                        </div>

                                        {/* Step 4 */}
                                        <div className="relative pl-10">
                                            <div className="bg-primary absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                4
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold">Tes Seleksi</h3>
                                            <p className="text-gray-600">
                                                Mengikuti tes seleksi yang meliputi tes tulis (pengetahuan umum dan agama), tes baca Al-Qur'an, dan
                                                wawancara.
                                            </p>
                                        </div>

                                        {/* Step 5 */}
                                        <div className="relative pl-10">
                                            <div className="bg-primary absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                5
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold">Pengumuman Hasil Seleksi</h3>
                                            <p className="text-gray-600">
                                                Pengumuman hasil seleksi akan disampaikan melalui website dan SMS/WhatsApp ke nomor orang tua/wali.
                                            </p>
                                        </div>

                                        {/* Step 6 */}
                                        <div className="relative pl-10">
                                            <div className="bg-primary absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                6
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold">Registrasi Ulang & Masuk Pesantren</h3>
                                            <p className="text-gray-600">
                                                Bagi yang diterima, melakukan registrasi ulang dengan melunasi biaya pendidikan (Biaya daftar ulang)
                                                dan masuk pesantren sesuai jadwal yang ditentukan.
                                            </p>
                                        </div>
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
                                            <tr>
                                                <td className="border p-3 font-medium">Pendaftaran Online</td>
                                                <td className="border p-3">1 Februari - 30 April 2025</td>
                                                <td className="border p-3">1 Juni - 31 Juli 2025</td>
                                            </tr>
                                            <tr>
                                                <td className="border p-3 font-medium">Verifikasi Berkas</td>
                                                <td className="border p-3">1 - 5 Mei 2025</td>
                                                <td className="border p-3">1 - 5 Agustus 2025</td>
                                            </tr>
                                            <tr>
                                                <td className="border p-3 font-medium">Tes Seleksi</td>
                                                <td className="border p-3">10 - 11 Mei 2025</td>
                                                <td className="border p-3">10 - 11 Agustus 2025</td>
                                            </tr>
                                            <tr>
                                                <td className="border p-3 font-medium">Pengumuman Hasil</td>
                                                <td className="border p-3">15 Mei 2025</td>
                                                <td className="border p-3">15 Agustus 2025</td>
                                            </tr>
                                            <tr>
                                                <td className="border p-3 font-medium">Registrasi Ulang</td>
                                                <td className="border p-3">16 - 25 Mei 2025</td>
                                                <td className="border p-3">16 - 25 Agustus 2025</td>
                                            </tr>
                                            <tr>
                                                <td className="border p-3 font-medium">Masuk Pesantren</td>
                                                <td className="border p-3" colSpan={2}>
                                                    Juli 2025
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
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Berapa biaya pendidikan di Pondok Pesantren {name}?</AccordionTrigger>
                                        <AccordionContent>
                                            <p>Biaya pendidikan di Pondok Pesantren {name} terdiri dari beberapa komponen:</p>

                                            <ol className="mt-2 list-decimal space-y-1 pl-5">
                                                <li>Biaya pendaftaran: Gratis</li>
                                                <li>
                                                    Biaya daftar ulang: Rp 3.000.000
                                                    <ol className="mt-1 list-disc space-y-1 pl-6">
                                                        <li>Biaya bulanan (Juli 2025) : Rp.600.000 *</li>
                                                        <li>Biaya Semester (Genap 2025) : Rp.500.000 **</li>
                                                        <li>Pemeliharaan sarana & prasarana (Tahun 2025) : Rp.600.000 ***</li>
                                                        <li>Uang pangkal: Rp. 1.000.000 ****</li>
                                                        <li>Raport, Papan Nama & ID Card: Rp.300.000 ****</li>
                                                    </ol>
                                                </li>
                                            </ol>

                                            <div className="mt-2 space-y-1 text-sm">
                                                <p>*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : Dibayar per bulan</p>
                                                <p>**&nbsp;&nbsp;&nbsp; : Dibayar per semester</p>
                                                <p>***&nbsp;&nbsp;&nbsp; : Dibayar per tahun</p>
                                                <p>****&nbsp; : Dibayar sekali</p>
                                            </div>

                                            <p className="mt-2">
                                                Pondok Pesantren {name} juga menyediakan beasiswa bagi santri berprestasi dan santri dari keluarga
                                                kurang mampu.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Apakah ada program beasiswa yang tersedia?</AccordionTrigger>
                                        <AccordionContent>
                                            Ya, Pondok Pesantren {name} menyediakan beberapa program beasiswa:
                                            <ul className="mt-2 list-disc space-y-1 pl-5">
                                                <li>Beasiswa Tahfidz bagi penghafal Al-Qur'an minimal 5 juz</li>
                                                <li>Beasiswa Prestasi bagi siswa berprestasi akademik dan non-akademik</li>
                                                <li>Beasiswa Dhuafa bagi santri dari keluarga kurang mampu</li>
                                                <li>Beasiswa Yatim/Piatu bagi santri yatim atau piatu</li>
                                            </ul>
                                            Untuk informasi lebih lanjut tentang persyaratan dan proses seleksi beasiswa, silakan hubungi bagian
                                            administrasi pesantren.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Apa saja fasilitas yang tersedia di pesantren?</AccordionTrigger>
                                        <AccordionContent>
                                            Pondok Pesantren {name} dilengkapi dengan berbagai fasilitas untuk menunjang kegiatan belajar dan
                                            kehidupan santri, antara lain:
                                            <ul className="mt-2 list-disc space-y-1 pl-5">
                                                <li>Asrama putra dan putri terpisah</li>
                                                <li>Masjid</li>
                                                <li>Ruang kelas dengan fasilitas modern</li>
                                                <li>Perpustakaan</li>
                                                <li>Laboratorium komputer, IPA, dan bahasa</li>
                                                <li>Lapangan olahraga (futsal, basket, voli)</li>
                                                <li>Kantin dan dapur</li>
                                                <li>Klinik kesehatan</li>
                                                <li>Area WiFi terbatas</li>
                                                <li>Koperasi pesantren</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-4">
                                        <AccordionTrigger>Bagaimana jadwal kegiatan santri sehari-hari?</AccordionTrigger>
                                        <AccordionContent>
                                            Jadwal kegiatan santri di Pondok Pesantren {name} dirancang untuk menyeimbangkan pendidikan formal,
                                            pendidikan agama, dan pengembangan diri. Secara umum, jadwal harian santri adalah sebagai berikut:
                                            <ul className="mt-2 list-disc space-y-1 pl-5">
                                                <li>03.30 - 04.30: Bangun tidur, shalat tahajud</li>
                                                <li>04.30 - 05.30: Shalat Subuh berjamaah dan tadarus Al-Qur'an</li>
                                                <li>05.30 - 06.30: Mandi dan sarapan</li>
                                                <li>07.00 - 12.30: Kegiatan belajar mengajar formal</li>
                                                <li>12.30 - 13.30: Shalat Dzuhur berjamaah dan makan siang</li>
                                                <li>13.30 - 15.00: Istirahat</li>
                                                <li>15.00 - 16.00: Shalat Ashar berjamaah dan tadarus Al-Qur'an</li>
                                                <li>16.00 - 17.30: Kegiatan ekstrakurikuler</li>
                                                <li>17.30 - 18.30: Mandi dan persiapan Maghrib</li>
                                                <li>18.30 - 19.30: Shalat Maghrib berjamaah dan tadarus Al-Qur'an</li>
                                                <li>19.30 - 20.00: Makan malam</li>
                                                <li>20.00 - 21.00: Shalat Isya berjamaah</li>
                                                <li>21.00 - 22.00: Belajar mandiri/tutorial</li>
                                                <li>22.00: Istirahat malam</li>
                                            </ul>
                                            Jadwal dapat berbeda pada hari Jumat dan hari libur.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-5">
                                        <AccordionTrigger>Apakah santri diperbolehkan membawa gadget?</AccordionTrigger>
                                        <AccordionContent>
                                            Santri tidak diperbolehkan membawa dan menggunakan gadget seperti smartphone, tablet, atau laptop pribadi
                                            selama berada di pesantren. Hal ini untuk menjaga fokus belajar dan menciptakan lingkungan yang kondusif.
                                            <p className="mt-2">
                                                Untuk komunikasi dengan keluarga, santri dapat menggunakan telepon pesantren pada jadwal yang telah
                                                ditentukan. Orang tua juga dapat menghubungi pesantren untuk menyampaikan pesan penting kepada santri.
                                            </p>
                                            <p className="mt-2">
                                                Untuk keperluan pembelajaran, pesantren menyediakan laboratorium komputer dengan akses internet
                                                terbatas yang dapat digunakan santri pada jam-jam tertentu di bawah pengawasan ustadz/ustadzah.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </section>

                        {/* CTA with Parallax */}
                        <div className="relative mt-16 overflow-hidden rounded-xl py-20 text-center">
                            <div
                                className="from-primary/80 absolute inset-0 z-10 bg-gradient-to-r to-green-600/80"
                                style={{
                                    backgroundImage: `url('/storage/image/assets/hero-3.jpg?v=${new Date().getTime()})`,
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
