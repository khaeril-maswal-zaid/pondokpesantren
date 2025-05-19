import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    const { name, contact, programUtams, alamat } = usePage().props;
    return (
        <footer className="bg-blue-800 text-white">
            <div className="container mx-auto px-8 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-xl font-bold">Pesantren {name}</h3>
                        <p className="mb-4">
                            Pondok Pesantren Ubay Bin Ka’ab Bulukumba berdiri di atas prinsip menjalankan amal ibadah sesuai dengan tuntunan Ahlus
                            Sunnah wal Jamaah, berlandaskan Al-qur`an dan hadist yang sahih.
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
                                <Link href={route('dashboard')} className="transition-colors hover:text-blue-300">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href={route('agenda.cards')} className="transition-colors hover:text-blue-300">
                                    Struktur
                                </Link>
                            </li>
                            <li>
                                <Link href={route('struktur.cards')} className="transition-colors hover:text-blue-300">
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
                            {programUtams.map((program) => (
                                <li key={program.id}>
                                    <Link href="#" className="transition-colors hover:text-blue-300">
                                        {program.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-xl font-bold">Kontak</h3>
                        <address className="not-italic">
                            <p className="mb-2">{alamat}</p>
                            {contact.map((item) => (
                                <div className="flex items-center">
                                    <p className="mb-2">
                                        {item.name}: {item.value}
                                    </p>
                                </div>
                            ))}
                        </address>
                    </div>
                </div>
                <div className="mt-8 border-t border-blue-700 pt-8 text-center">
                    <p>
                        &copy; {new Date().getFullYear()} Pondok Pesantren {name}. Hak Cipta Dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
}
