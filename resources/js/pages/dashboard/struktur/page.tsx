'use client';

import StrukturCreateModal from '@/components/dashboard/struktur-create-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Phone, Search } from 'lucide-react';
import { useState } from 'react';

import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function StrukturPage({ figures }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter struktur berdasarkan nama
    const filteredStruktur = figures.filter((struktur) => struktur.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Format phone number
    const formatPhoneNumber = (phoneNumber: string) => {
        return phoneNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    };

    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <AppLayout button={<StrukturCreateModal />} breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="rounded-lg border bg-white shadow-sm">
                        <div className="border-b p-4">
                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                <h2 className="text-lg font-medium">Daftar Pengurus</h2>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                                        <Input
                                            type="search"
                                            placeholder="Cari pengurus..."
                                            className="w-full pl-8 md:w-[250px]"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Foto</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Posisi</TableHead>
                                        <TableHead>Keterangan</TableHead>
                                        <TableHead>Nomor HP</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStruktur.map((struktur) => (
                                        <TableRow key={struktur.name}>
                                            <TableCell>
                                                <Avatar className="h-14 w-14">
                                                    <AvatarImage src={`/storage/${struktur.image}` || '/placeholder.svg'} alt={struktur.name} />
                                                    <AvatarFallback>{getInitials(struktur.name)}</AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell className="font-medium text-nowrap">{struktur.name}</TableCell>
                                            <TableCell className="text-nowrap">{struktur.role}</TableCell>
                                            <TableCell>{struktur.keterangan}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-nowrap">
                                                    <Phone className="h-3.5 w-3.5 text-gray-500" />
                                                    <a href={`tel:${struktur.no_hp}`} className="hover:underline">
                                                        {formatPhoneNumber(struktur.no_hp)}
                                                    </a>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
