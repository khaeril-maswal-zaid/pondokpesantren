'use client';

import AgendaCreateModal from '@/components/dashboard/agenda-create-modal';
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
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar, Eye, Filter, MapPin, MoreVertical, Pencil, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

import AgendaUpdateModal from '@/components/dashboard/agenda-update-modal';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function AgendaPage({ agendaData }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAgenda, setSelectedAgenda] = useState<any>(null);
    const [fotoModalOpen, setFotoModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    // Filter agenda berdasarkan nama
    const filteredAgenda = agendaData.data.filter((agenda) => agenda.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // Format waktu
    const formatWaktu = (waktu: string) => {
        return format(new Date(waktu), 'dd MMMM yyyy', { locale: id });
    };

    // Handle view photos
    const handleViewPhotos = (agenda: any) => {
        setSelectedAgenda(agenda);
        setFotoModalOpen(true);
    };

    const handleUpdate = (agenda: any) => {
        setSelectedAgenda(agenda);
        setUpdateModalOpen(true);
    };

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setDeleteModal = (agenda: any | null) => {
        if (!agenda.id) return;
        setSelectedAgenda(agenda);
        setDeleteModalOpen(true);
    };

    const confirmDelete = (id: string) => {
        router.delete(route('agenda.destroy', id), {
            onSuccess: () => {
                toast({
                    title: 'Berhasil!',
                    description: 'Data agenda berhasil dihapus',
                });
                setDeleteModalOpen(false);
                setIsSubmitting(false);
            },
        });
    };

    return (
        <AppLayout button={<AgendaCreateModal />} breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="border-b p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium">Daftar Agenda</h2>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        type="search"
                                        placeholder="Cari agenda..."
                                        className="w-[250px] pl-8"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Agenda</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Waktu</TableHead>
                                    <TableHead>Tempat</TableHead>
                                    <TableHead className="w-[80px]">Foto</TableHead>
                                    <TableHead className="w-[80px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAgenda.length > 0 ? (
                                    filteredAgenda.map((agenda, index) => (
                                        <TableRow key={agenda.title + index}>
                                            <TableCell className="font-medium">{agenda.title}</TableCell>
                                            <TableCell>{formatWaktu(agenda.date)}</TableCell>
                                            <TableCell>{agenda.time} WITA</TableCell>
                                            <TableCell>
                                                <div className="flex items-start gap-1">
                                                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
                                                    <span>{agenda.location}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-1"
                                                    onClick={() => handleViewPhotos(agenda)}
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                    <span className="sr-md:inline sr-only">Lihat</span>
                                                </Button>
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
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                router.get(route('agenda.cards'));
                                                            }}
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setTimeout(() => {
                                                                    handleUpdate(agenda);
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
                                                                    setDeleteModal(agenda);
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
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-4 text-center text-gray-500">
                                            Tidak ada agenda ditemukan
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Foto Modal */}
                    <Dialog open={fotoModalOpen} onOpenChange={setFotoModalOpen}>
                        <DialogContent className="">
                            <DialogHeader>
                                <DialogTitle>{selectedAgenda?.title}</DialogTitle>
                                <DialogDescription>
                                    <p>
                                        <Calendar className="me-1 mt-0.5 inline h-4 w-4 flex-shrink-0 text-gray-500" />
                                        {selectedAgenda && formatWaktu(selectedAgenda.date)},
                                        <MapPin className="ms-2 me-1 mt-0.5 inline h-4 w-4 flex-shrink-0 text-gray-500" />
                                        {selectedAgenda && selectedAgenda.location}
                                    </p>
                                </DialogDescription>
                            </DialogHeader>

                            {selectedAgenda && (
                                <div className="flex flex-col items-center">
                                    <div className="relative w-full">
                                        <img
                                            src={'/storage/' + selectedAgenda.image || '/placeholder.svg'}
                                            alt={`Foto ${selectedAgenda.title}`}
                                            className="h-auto max-h-[400px] w-full rounded-md object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            <DialogFooter>
                                <Button onClick={() => setFotoModalOpen(false)}>Tutup</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* // DI LUAR LOOP (sekali saja) */}
                    <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Apakah Anda yakin ingin menghapus data struktur {selectedAgenda?.name}?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setDeleteModalOpen(false)}>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={() => {
                                        confirmDelete(selectedAgenda?.id);
                                    }}
                                >
                                    {isSubmitting ? 'Menghapus' : 'Hapus'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    {updateModalOpen && <AgendaUpdateModal Open={updateModalOpen} selectedAgenda={selectedAgenda} />}
                </div>
            </div>
        </AppLayout>
    );
}
