import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const sections = ['beranda', 'tentang', 'layanan', 'kontak'];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('beranda');
    const [progress, setProgress] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 10);

            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrolledPercent = (scrollTop / docHeight) * 100;
            setProgress(scrolledPercent);

            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.div className="fixed top-0 right-0 left-0 z-[60] h-1 bg-green-900" style={{ width: `${progress}%` }} />

            <header
                className={`sticky top-0 z-50 backdrop-blur-md transition-all ${
                    scrolled ? 'bg-green-600 shadow-md' : 'bg-white/60 dark:bg-black/40'
                }`}
            >
                <div className="flex items-center justify-between px-4 py-3 md:px-8">
                    {/* Logo */}
                    <Link href="/" className={`text-xl font-bold ${scrolled ? 'text-gray-50' : 'text-green-700 dark:text-green-300'}`}>
                        Pesantren Al-Zaid
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center space-x-6 md:flex">
                        <Link
                            href="#beranda"
                            className={`${activeSection === 'beranda' ? 'font-semibold' : ''} ${scrolled ? 'text-gray-50' : 'text-green-700 dark:text-green-300'}`}
                        >
                            Beranda
                        </Link>

                        <Link
                            href="#tentang"
                            className={`${activeSection === 'beranda' ? 'font-semibold' : ''} ${scrolled ? 'text-gray-50' : 'text-green-700 dark:text-green-300'}`}
                        >
                            Tentang
                        </Link>

                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                                <div className="flex cursor-pointer items-center gap-1">
                                    <span className={`hover:font-semibold ${scrolled ? 'text-gray-50' : 'text-green-700 dark:text-green-300'}`}>
                                        Program Utama
                                    </span>
                                    <ChevronDown size={16} className={`${scrolled ? 'text-gray-50' : ''}`} />
                                </div>
                            </PopoverTrigger>

                            <PopoverContent
                                onMouseEnter={() => setOpen(true)}
                                onMouseLeave={() => setOpen(false)}
                                className="w-40 space-y-2 bg-green-50"
                                sideOffset={4} // jarak dari trigger
                            >
                                <a href="#konsultasi" className="block hover:underline">
                                    Tahfidz Al-Qur'an
                                </a>
                                <a href="#pelatihan" className="block hover:underline">
                                    Bahasa Arab & Inggris
                                </a>
                                <a href="#pelatihan" className="block hover:underline">
                                    Kitab Kuning
                                </a>
                                <a href="#pelatihan" className="block hover:underline">
                                    Ekstrakurikuler
                                </a>
                            </PopoverContent>
                        </Popover>

                        <Link
                            href="#kontak"
                            className={`${activeSection === 'beranda' ? 'font-semibold' : ''} ${scrolled ? 'text-gray-50' : 'text-green-700 dark:text-green-300'}`}
                        >
                            Kontak
                        </Link>
                    </nav>

                    <div className="flex items-center gap-2">
                        {searchOpen && (
                            <Input
                                type="text"
                                placeholder="Cari..."
                                className={`w-48 ${scrolled ? 'border-gray-50 text-gray-50 placeholder:text-gray-50 focus-visible:border-gray-700 focus-visible:ring-[3px] focus-visible:ring-gray-50' : 'border-green-700'} border-2`}
                            />
                        )}
                        <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)} aria-label="Toggle Search">
                            <Search size={18} />
                        </Button>
                        <Switch className={`${scrolled ? 'data-[state=checked]:bg-amber-300' : ''} hidden md:flex`} />

                        <Link href={route('santri-baru.create')} as="button">
                            <Button
                                className={`${scrolled ? 'bg-gray-800 hover:bg-gray-950 focus:ring-4 focus:ring-gray-500 focus:outline-none' : 'focus:ring-4 focus:ring-green-300 focus:outline-none'} hidden md:flex`}
                                variant="default"
                            >
                                Daftar
                            </Button>
                        </Link>

                        {/* Mobile Nav */}
                        <Sheet>
                            <SheetTrigger className="md:hidden">
                                <Menu />
                            </SheetTrigger>
                            <SheetContent side="right">
                                <nav className="m-4 flex flex-col space-y-4">
                                    <Link href="#beranda">Beranda</Link>
                                    <Link href="#tentang">Tentang</Link>
                                    <Link href="#layanan">Layanan</Link>
                                    <Link href="#kontak">Kontak</Link>
                                    <Switch />
                                    <Button variant="default">Daftar</Button>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
