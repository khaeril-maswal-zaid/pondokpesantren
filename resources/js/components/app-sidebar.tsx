import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { CalendarDays, FileText, HandCoins, Image, Info, LayoutDashboard, Phone, UserPlus, Users2 } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard, // Ikon khas untuk dashboard
    },
    {
        title: 'Calon Santri Baru',
        href: route('santri-baru.index'),
        icon: UserPlus, // Dapil = daerah pemilihan = lokasi
    },
    {
        title: 'Blog',
        href: route('blog.index'),
        icon: FileText, // Blog = tulisan = dokumen
    },
    {
        title: 'Agenda',
        href: '/dashboard/agenda',
        icon: CalendarDays, // Agenda = kalender / jadwal
    },
    {
        title: 'Struktur',
        href: '/dashboard/struktur',
        icon: Users2, // Struktur organisasi = orang-orang
    },
    {
        title: 'Kontak UBK',
        href: 'dashboard/kontak',
        icon: Phone, // Kontak = telepon
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Tentang Ubay Bin Kaab',
        href: 'dashboard/tentang',
        icon: Info, // Tentang = informasi
    },
    {
        title: 'Donasi Ponpes UBK',
        href: 'dashboard/donasi',
        icon: HandCoins, // Donasi = uang / amal
    },
    {
        title: 'Carousel Web',
        href: 'dashboard/carousel',
        icon: Image, // Carousel = gambar berganti
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
