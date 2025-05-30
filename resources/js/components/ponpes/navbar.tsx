'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const { name } = usePage().props;

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const Navigasi = [
        {
            title: 'Beranda',
            link: '/',
        },
        {
            title: 'Agenda',
            link: route('agenda.cards'),
        },
        {
            title: 'Struktur',
            link: route('struktur.cards'),
        },
        {
            title: 'Blog',
            link: route('blog.cards'),
        },
        {
            title: 'Kontak',
            link: route('kontak.cards'),
        },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
                isScrolled ? 'bg-white py-2 shadow-md' : 'bg-transparent py-4',
            )}
        >
            <div className="container mx-auto flex items-center justify-between px-8">
                <Link href="/" className="flex items-center">
                    <img src={`storage/image/assets/logo.png?v=${new Date().getTime()})`} alt="" className="mr-3 h-15" />
                    <span className={cn('hidden text-xl font-bold transition-colors sm:block', isScrolled ? 'text-primary' : 'text-gray-50')}>
                        Pesantren {name}
                    </span>
                    <span className={cn('block text-lg font-bold transition-colors sm:hidden', isScrolled ? 'text-primary' : 'text-gray-50')}>
                        Ponpes {name}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center space-x-8 md:flex">
                    {Navigasi.map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className={cn(
                                'font-medium transition-colors',
                                isScrolled ? 'hover:text-primary text-gray-800' : 'text-gray-50 hover:text-white',
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}

                    <Link href={route('santri-baru.info')}>
                        <Button
                            className={cn(
                                'transition-colors',
                                isScrolled ? 'bg-primary hover:bg-primary/90 text-white' : 'text-primary bg-white hover:bg-gray-100',
                            )}
                        >
                            Pendaftaran Santri
                        </Button>
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={cn('transition-colors md:hidden', isScrolled ? 'text-gray-800' : 'text-gray-50')}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="bg-white shadow-lg md:hidden">
                    <div className="container mx-auto flex flex-col space-y-4 px-8 py-4">
                        {Navigasi.map((item, index) => (
                            <Link
                                href={item.link}
                                className="hover:text-primary py-2 font-medium text-gray-800 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}

                        <Link href={route('santri-baru.info')} onClick={() => setIsMenuOpen(false)}>
                            <Button className="bg-primary hover:bg-primary/90 w-full text-white">Pendaftaran Santri</Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
