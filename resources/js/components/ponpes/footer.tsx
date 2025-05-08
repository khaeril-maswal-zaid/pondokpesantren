import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-blue-800 text-white">
            <div className="container mx-auto px-8 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-xl font-bold">Pondok Pesantren Al-Zaid</h3>
                        <p className="mb-4">
                            Lembaga pendidikan Islam yang mengintegrasikan nilai-nilai tradisional dengan pendidikan modern untuk mencetak generasi
                            berakhlak mulia.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="transition-colors hover:text-blue-300" aria-label="Facebook">
                                <Facebook />
                            </Link>
                            <Link href="#" className="transition-colors hover:text-blue-300" aria-label="Instagram">
                                <Instagram />
                            </Link>
                            <Link href="#" className="transition-colors hover:text-blue-300" aria-label="Twitter">
                                <Twitter />
                            </Link>
                            <Link href="#" className="transition-colors hover:text-blue-300" aria-label="Youtube">
                                <Youtube />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-xl font-bold">Navigasi</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="transition-colors hover:text-blue-300">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="#tentang" className="transition-colors hover:text-blue-300">
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="#program" className="transition-colors hover:text-blue-300">
                                    Program
                                </Link>
                            </li>
                            <li>
                                <Link href="#tokoh" className="transition-colors hover:text-blue-300">
                                    Struktur
                                </Link>
                            </li>
                            <li>
                                <Link href="#blog" className="transition-colors hover:text-blue-300">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#kontak" className="transition-colors hover:text-blue-300">
                                    Kontak
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-xl font-bold">Program</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="transition-colors hover:text-blue-300">
                                    Tahfidz Al-Qur'an
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-blue-300">
                                    Kitab Kuning
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-blue-300">
                                    Bahasa Arab & Inggris
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-blue-300">
                                    Ekstrakurikuler
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-blue-300">
                                    Madrasah Diniyah
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-blue-300">
                                    Pendidikan Formal
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-xl font-bold">Kontak</h3>
                        <address className="not-italic">
                            <p className="mb-2">Jl. Pesantren No. 123, Kelurahan Contoh, Kecamatan Contoh, Kota Contoh, Provinsi Contoh, 12345</p>
                            <p className="mb-2">Telepon: (021) 1234-5678</p>
                            <p className="mb-2">Email: info@pesantrenalzaid.ac.id</p>
                        </address>
                    </div>
                </div>
                <div className="mt-8 border-t border-blue-700 pt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Pondok Pesantren Al-Zaid. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </footer>
    );
}
