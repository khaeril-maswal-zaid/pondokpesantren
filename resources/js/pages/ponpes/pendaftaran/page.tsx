'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/ponpes-layout';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, CheckCircle, Download, FileText, HelpCircle } from 'lucide-react';
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

    return (
        <>
            <Layout>
                <main className="pb-16">
                    <div className="container mx-auto px-4">
                        {/* Header with Parallax */}
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
                                <div className="text-primary mb-4 inline-block rounded bg-white px-3 py-1 text-sm font-semibold">Informasi</div>
                                <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">Pendaftaran Santri Baru</h1>
                                <p className="mx-auto max-w-3xl text-center text-xl text-white/90">
                                    Pondok Pesantren Al-Zaid membuka pendaftaran santri baru untuk tahun ajaran 2023/2024. Silakan ikuti petunjuk
                                    pendaftaran di bawah ini.
                                </p>
                            </div>
                        </div>

                        {/* Syarat Pendaftaran */}
                        <section ref={sectionRefs.syarat} id="syarat" className="mb-16 opacity-0">
                            <div className="rounded-lg bg-white p-8 shadow-md">
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
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    1
                                                </span>
                                                <span>Muslim/Muslimah yang beriman dan bertaqwa kepada Allah SWT</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    2
                                                </span>
                                                <span>Lulus SD/MI untuk jenjang MTs atau lulus SMP/MTs untuk jenjang MA</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    3
                                                </span>
                                                <span>Berusia maksimal 13 tahun untuk jenjang MTs atau 16 tahun untuk jenjang MA</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    4
                                                </span>
                                                <span>Sehat jasmani dan rohani (dibuktikan dengan surat keterangan dokter)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
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
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    1
                                                </span>
                                                <span>Mampu membaca Al-Qur'an dengan baik</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    2
                                                </span>
                                                <span>Memiliki hafalan minimal 1 juz Al-Qur'an (untuk program tahfidz)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    3
                                                </span>
                                                <span>Lulus tes seleksi masuk yang meliputi tes tulis, tes baca Al-Qur'an, dan wawancara</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    4
                                                </span>
                                                <span>Bersedia mematuhi seluruh peraturan pesantren</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    5
                                                </span>
                                                <span>Bersedia tinggal di asrama pesantren</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Dokumen Pendaftaran */}
                        <section ref={sectionRefs.dokumen} id="dokumen" className="mb-16 opacity-0">
                            <div className="rounded-lg bg-white p-8 shadow-md">
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
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    1
                                                </span>
                                                <span>Formulir pendaftaran yang telah diisi lengkap (dapat diunduh di website)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    2
                                                </span>
                                                <span>Fotokopi ijazah dan SKHUN terakhir yang dilegalisir (3 lembar)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    3
                                                </span>
                                                <span>Fotokopi rapor 2 semester terakhir yang dilegalisir (2 lembar)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    4
                                                </span>
                                                <span>Fotokopi akta kelahiran (3 lembar)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    5
                                                </span>
                                                <span>Fotokopi Kartu Keluarga (3 lembar)</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="mb-4 text-xl font-bold">Dokumen Tambahan</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    1
                                                </span>
                                                <span>Surat keterangan sehat dari dokter (asli)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    2
                                                </span>
                                                <span>Pas foto berwarna ukuran 3x4 (6 lembar) dan 2x3 (4 lembar)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    3
                                                </span>
                                                <span>Surat pernyataan kesanggupan mematuhi peraturan (bermaterai)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    4
                                                </span>
                                                <span>Fotokopi piagam prestasi (jika ada)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-primary mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                                                    5
                                                </span>
                                                <span>Surat rekomendasi dari sekolah/madrasah asal (jika ada)</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-center">
                                    <Button className="bg-primary hover:bg-primary/90">
                                        <Download className="mr-2 h-4 w-4" /> Unduh Formulir Pendaftaran
                                    </Button>
                                </div>
                            </div>
                        </section>

                        {/* Alur Pendaftaran */}
                        <section ref={sectionRefs.alur} id="alur" className="mb-16 opacity-0">
                            <div className="rounded-lg bg-white p-8 shadow-md">
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
                                            <div className="relative pb-12">
                                                <div className="flex justify-end">
                                                    <div className="w-5/6 pr-8">
                                                        <h3 className="mb-2 text-right text-xl font-bold">Pendaftaran Online</h3>
                                                        <p className="text-right text-gray-600">
                                                            Calon santri melakukan pendaftaran online melalui website resmi Pondok Pesantren Al-Zaid
                                                            dan mengisi formulir dengan lengkap.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-primary absolute top-0 right-0 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                                                    1
                                                </div>
                                            </div>
                                            <div className="pb-12"></div>

                                            {/* Step 2 */}
                                            <div className="pb-12"></div>
                                            <div className="relative pb-12">
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
                                            <div className="relative pb-12">
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
                                            <div className="pb-12"></div>

                                            {/* Step 4 */}
                                            <div className="pb-12"></div>
                                            <div className="relative pb-12">
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
                                            <div className="relative pb-12">
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
                                            <div className="pb-12"></div>

                                            {/* Step 6 */}
                                            <div className="pb-12"></div>
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
                                                Calon santri melakukan pendaftaran online melalui website resmi Pondok Pesantren Al-Zaid dan mengisi
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
                                                Melakukan pembayaran biaya pendaftaran sebesar Rp 300.000 melalui transfer bank ke rekening resmi
                                                pesantren.
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
                                                Bagi yang diterima, melakukan registrasi ulang dengan melunasi biaya pendidikan dan masuk pesantren
                                                sesuai jadwal yang ditentukan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Jadwal Pendaftaran */}
                        <section ref={sectionRefs.jadwal} id="jadwal" className="mb-16 opacity-0">
                            <div className="rounded-lg bg-white p-8 shadow-md">
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
                                                <td className="border p-3">1 Januari - 28 Februari 2023</td>
                                                <td className="border p-3">1 Maret - 30 April 2023</td>
                                            </tr>
                                            <tr>
                                                <td className="border p-3 font-medium">Verifikasi Berkas</td>
                                                <td className="border p-3">1 - 5 Maret 2023</td>
                                                <td className="border p-3">1 - 5 Mei 2023</td>
                                            </tr>
                                            <tr>
                                                <td className="border p-3 font-medium">Tes Seleksi</td>
                                                <td className="border p-3">11 - 12 Maret 2023</td>
                                                <td className="border p-3">13 - 14 Mei 2023</td>
                                            </tr>
                                            <tr>
                                                <td className="border p-3 font-medium">Pengumuman Hasil</td>
                                                <td className="border p-3">20 Maret 2023</td>
                                                <td className="border p-3">20 Mei 2023</td>
                                            </tr>
                                            <tr>
                                                <td className="border p-3 font-medium">Registrasi Ulang</td>
                                                <td className="border p-3">21 - 31 Maret 2023</td>
                                                <td className="border p-3">21 - 31 Mei 2023</td>
                                            </tr>
                                            <tr>
                                                <td className="border p-3 font-medium">Masuk Pesantren</td>
                                                <td className="border p-3" colSpan={2}>
                                                    15 Juli 2023
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
                                        <AccordionTrigger>Berapa biaya pendidikan di Pondok Pesantren Al-Zaid?</AccordionTrigger>
                                        <AccordionContent>
                                            <p>Biaya pendidikan di Pondok Pesantren Al-Zaid terdiri dari beberapa komponen:</p>
                                            <ul className="mt-2 list-disc space-y-1 pl-5">
                                                <li>Biaya pendaftaran: Rp 300.000</li>
                                                <li>Biaya masuk (sekali bayar): Rp 5.000.000</li>
                                                <li>SPP bulanan: Rp 1.200.000</li>
                                                <li>Biaya makan dan asrama: Rp 800.000 per bulan</li>
                                            </ul>
                                            <p className="mt-2">
                                                Pondok Pesantren Al-Zaid juga menyediakan beasiswa bagi santri berprestasi dan santri dari keluarga
                                                kurang mampu.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Apakah ada program beasiswa yang tersedia?</AccordionTrigger>
                                        <AccordionContent>
                                            Ya, Pondok Pesantren Al-Zaid menyediakan beberapa program beasiswa:
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
                                            Pondok Pesantren Al-Zaid dilengkapi dengan berbagai fasilitas untuk menunjang kegiatan belajar dan
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
                                            Jadwal kegiatan santri di Pondok Pesantren Al-Zaid dirancang untuk menyeimbangkan pendidikan formal,
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
                                    backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundAttachment: 'fixed',
                                }}
                            ></div>
                            <div className="bg-primary/70 absolute inset-0 z-20"></div>
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
                                    Jadilah bagian dari keluarga besar Pondok Pesantren Al-Zaid dan raih masa depan cemerlang dengan pendidikan Islam
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
