'use client';

import StrukturCreateModal from '@/components/dashboard/struktur-create-modal';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Eye, UserIcon as Female, UserIcon as Male, MoreVertical, Pencil, Phone, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

import StrukturUpdateModal from '@/components/dashboard/struktur-update-modal';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function StrukturPage({ figures }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStruktur, setSelectedStruktur] = useState<any>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [activeTab, setActiveTab] = useState('Laki-Laki');

    const { errors } = usePage().props;

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

    const setEditModal = (pendaftar: any) => {
        setSelectedStruktur(pendaftar);
        setEditModalOpen(true);
    };

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setDeleteModal = (pendaftar: any | null) => {
        if (!pendaftar.id) return;
        setSelectedStruktur(pendaftar);
        setDeleteModalOpen(true);
    };

    const handleToggle = (id: number, value: number, name: string) => {
        router.put(
            route('struktur.main', id),
            {
                main: value,
            },
            {
                onError: (e) => {
                    if (errors.main) {
                        toast({
                            title: 'Gagal memperbarui!',
                            //Tidak jadi ambil error dari server karena kadang tidak tampil
                            description:
                                'Batas maksimum struktur dengan status utama telah tercapai (4). Silakan nonaktifkan status utama dari struktur lain sebelum melanjutkan.',
                        });
                    }
                },
                preserveScroll: true, // Ini penting
                onSuccess: () => {
                    // Tampilkan toast setelah update sukses
                    toast({
                        title: `Pilihan uatama diperbarui`,
                        description: `${name} diubah sebagai salah satu dari empat pilihan utama.`,
                    });
                },
            },
        );
    };

    const confirmDelete = (id: string) => {
        router.delete(route('struktur.destroy', id), {
            onSuccess: () => {
                toast({
                    title: 'Berhasil!',
                    description: 'Data pengurus berhasil dihapus',
                });
                // setOpen(false);
                setIsSubmitting(false);
            },
        });
    };

    return (
        <AppLayout button={<StrukturCreateModal />} breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Tabs defaultValue="Laki-laki" className="mb-8" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="Laki-laki" className="flex items-center justify-center gap-2">
                            <Male className="h-4 w-4" />
                            <span>Putra</span>
                        </TabsTrigger>
                        <TabsTrigger value="Perempuan" className="flex items-center justify-center gap-2">
                            <Female className="h-4 w-4" />
                            <span>Putri</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="Laki-laki" className="mt-6">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
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
                                            <TableHead>Main</TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredStruktur
                                            .filter((member) => member.gender === 'Laki-laki')
                                            .map((struktur, index) => (
                                                <TableRow key={struktur.name + index}>
                                                    <TableCell>
                                                        <Avatar className="h-14 w-14">
                                                            <AvatarImage
                                                                src={`/storage/${struktur.image}` || '/placeholder.svg'}
                                                                alt={struktur.name}
                                                            />
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
                                                    <TableCell>
                                                        <Switch
                                                            checked={struktur.main === 1}
                                                            onCheckedChange={(val) => handleToggle(struktur.id, val ? 1 : 0, struktur.name)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreVertical className="h-4 w-4" />
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setTimeout(() => {
                                                                            setEditModal(struktur);
                                                                        }, 0);
                                                                    }}
                                                                >
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setTimeout(() => {
                                                                            setDeleteModal(struktur);
                                                                        }, 0);
                                                                    }}
                                                                    className="text-red-600"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="Perempuan" className="mt-6">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
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
                                            <TableHead>Main</TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredStruktur
                                            .filter((member) => member.gender === 'Perempuan')
                                            .map((struktur) => (
                                                <TableRow key={struktur.name}>
                                                    <TableCell>
                                                        <Avatar className="h-14 w-14">
                                                            <AvatarImage
                                                                src={`/storage/${struktur.image}` || '/placeholder.svg'}
                                                                alt={struktur.name}
                                                            />
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
                                                    <TableCell>
                                                        <Switch
                                                            checked={struktur.main === 1}
                                                            onCheckedChange={(val) => handleToggle(struktur.id, val ? 1 : 0, struktur.name)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreVertical className="h-4 w-4" />
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setTimeout(() => {
                                                                            setEditModal(struktur);
                                                                        }, 0);
                                                                    }}
                                                                >
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setTimeout(() => {
                                                                            setDeleteModal(struktur);
                                                                        }, 0);
                                                                    }}
                                                                    className="text-red-600"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {editModalOpen && <StrukturUpdateModal onOpenChange={setEditModalOpen} selectedUpdate={selectedStruktur} isOpen={editModalOpen} />}

                {/* // DI LUAR LOOP (sekali saja) */}
                <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                            <AlertDialogDescription>Apakah Anda yakin ingin menghapus data struktur {selectedStruktur?.name}?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteModalOpen(false)}>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => {
                                    confirmDelete(selectedStruktur?.id);
                                }}
                            >
                                {isSubmitting ? 'Menghapus' : 'Hapus'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
