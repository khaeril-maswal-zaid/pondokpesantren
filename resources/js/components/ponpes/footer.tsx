import { Link } from '@inertiajs/react';
import { Facebook, Image, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="bg-green-900 pt-16 pb-6 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <div className="mb-4 flex items-center">
                            <div className="relative mr-2 h-10 w-10">
                                <Image src="/placeholder.svg?height=40&width=40" alt="Logo" width={40} height={40} className="object-contain" />
                            </div>
                            <span className="text-lg font-semibold text-white">Pondok Pesantren Al-Zaid</span>
                        </div>
                        <p className="mb-4 text-gray-300">Mencetak generasi Qur'ani yang berakhlak mulia dan berwawasan luas sejak 1985.</p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-white hover:text-green-300">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-white hover:text-green-300">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-white hover:text-green-300">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-white hover:text-green-300">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">Youtube</span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Tautan</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="#programs" className="text-gray-300 hover:text-white">
                                    Program
                                </Link>
                            </li>
                            <li>
                                <Link href="#figures" className="text-gray-300 hover:text-white">
                                    Tokoh
                                </Link>
                            </li>
                            <li>
                                <Link href="#blog" className="text-gray-300 hover:text-white">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white">
                                    Galeri
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white">
                                    Pendaftaran
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Program</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white">
                                    Tahfidz Al-Qur'an
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white">
                                    Kitab Kuning
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white">
                                    Bahasa Arab & Inggris
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white">
                                    Ekstrakurikuler
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white">
                                    Madrasah Diniyah
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white">
                                    Pendidikan Formal
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Kontak</h3>
                        <ul className="space-y-4">
                            <li className="flex">
                                <Phone className="mr-2 h-5 w-5 flex-shrink-0 text-green-400" />
                                <span className="text-gray-300">+62 812 3456 7890</span>
                            </li>
                            <li className="flex">
                                <Mail className="mr-2 h-5 w-5 flex-shrink-0 text-green-400" />
                                <span className="text-gray-300">info@pesantrenalzaid.ac.id</span>
                            </li>
                            <li className="flex">
                                <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-green-400" />
                                <span className="text-gray-300">
                                    Jl. Pesantren No. 123, Desa Sukamaju, Kecamatan Cilodong, Kota Depok, Jawa Barat 16415
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-green-800 pt-6">
                    <p className="text-center text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Pondok Pesantren Al-Zaid. Hak Cipta Dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
}
