'use client';

import KontakEditModal from '@/components/dashboard/kontak-edit-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Edit, ExternalLink, Facebook, Globe, Instagram, Linkedin, Mail, Phone, Search, Send, Twitter, Youtube } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function KontakPage({ kontaksData }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [kontaks, setKontaks] = useState(kontaksData);
    const [selectedKontak, setSelectedKontak] = useState<any>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    // Filter kontak berdasarkan nama atau value
    const filteredKontaks = kontaks.filter(
        (kontak) => kontak.name.toLowerCase().includes(searchTerm.toLowerCase()) || kontak.value.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Handle edit action
    const handleEdit = (kontak: any) => {
        setSelectedKontak(kontak);
        setEditModalOpen(true);
    };

    // Update kontak
    const updateKontak = (updatedKontak: any) => {
        setKontaks(kontaks.map((kontak) => (kontak.label === updatedKontak.label ? updatedKontak : kontak)));
    };

    // Toggle status
    const toggleStatus = (label: string) => {
        setKontaks(
            kontaks.map((kontak) => {
                if (kontak.label === label) {
                    const newStatus = kontak.status === 'aktif' ? 'nonaktif' : 'aktif';

                    router.put(
                        route('kontak.status', kontak.label),
                        {
                            status: newStatus,
                        },
                        {
                            preserveScroll: true, // Ini penting
                            onSuccess: () => {
                                // Tampilkan toast setelah update sukses
                                toast({
                                    title: `Status ${kontak.name} diubah`,
                                    description: `Status kontak ${kontak.name} diubah menjadi ${newStatus}`,
                                });
                            },
                        },
                    );

                    return { ...kontak, status: newStatus };
                }
                return kontak;
            }),
        );
    };

    // Render icon berdasarkan nama icon
    const renderIcon = (iconName: string) => {
        switch (iconName) {
            case 'facebook':
                return <Facebook className="h-4 w-4" />;
            case 'instagram':
                return <Instagram className="h-4 w-4" />;
            case 'twitter':
                return <Twitter className="h-4 w-4" />;
            case 'youtube':
                return <Youtube className="h-4 w-4" />;
            case 'phone':
                return <Phone className="h-4 w-4" />;
            case 'mail':
                return <Mail className="h-4 w-4" />;
            case 'globe':
                return <Globe className="h-4 w-4" />;
            case 'linkedin':
                return <Linkedin className="h-4 w-4" />;
            case 'tiktok':
                return (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.321 5.562a5.124 5.124 0 0 1-5.121-5.121h-3.585v16.242a3.024 3.024 0 0 1-3.023 3.023 3.023 3.023 0 0 1-3.023-3.023 3.024 3.024 0 0 1 3.023-3.023c.335 0 .661.057.965.162V9.999a7.026 7.026 0 0 0-.965-.068C3.437 9.931 0 13.369 0 17.524S3.437 25.12 7.592 25.12c4.155 0 7.592-3.438 7.592-7.593V9.407a8.685 8.685 0 0 0 4.137 1.055v-4.9Z"
                            fill="currentColor"
                        />
                    </svg>
                );
            case 'send':
                return <Send className="h-4 w-4" />;
            default:
                return <Globe className="h-4 w-4" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="border-b p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium">Daftar Kontak</h2>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        type="search"
                                        placeholder="Cari kontak..."
                                        className="w-[250px] pl-8"
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
                                    <TableHead className="w-[50px]">Icon</TableHead>
                                    <TableHead>Platform</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Link</TableHead>
                                    <TableHead className="w-[100px] text-center">Status</TableHead>
                                    <TableHead className="w-[80px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredKontaks.map((kontak) => (
                                    <TableRow key={kontak.label}>
                                        <TableCell>
                                            <div className="flex items-center justify-center">{renderIcon(kontak.icon)}</div>
                                        </TableCell>
                                        <TableCell className="font-medium">{kontak.name}</TableCell>
                                        <TableCell>{kontak.value}</TableCell>
                                        <TableCell>
                                            <a
                                                href={kontak.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-600 hover:underline"
                                            >
                                                {kontak.link.length > 30 ? kontak.link.substring(0, 30) + '...' : kontak.link}
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center">
                                                <Switch
                                                    checked={kontak.status === 'aktif'}
                                                    onCheckedChange={() => toggleStatus(kontak.label)}
                                                    aria-label={`Toggle status ${kontak.name}`}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-1"
                                                onClick={() => handleEdit(kontak)}
                                            >
                                                <Edit className="h-3.5 w-3.5" />
                                                <span className="sr-md:inline sr-only">Edit</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Edit Modal */}
                <KontakEditModal open={editModalOpen} onOpenChange={setEditModalOpen} kontak={selectedKontak} onSave={updateKontak} />
            </div>
        </AppLayout>
    );
}
