'use client';

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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { getDesaName, getKabupatenName, getKecamatanName, getProvinsiName } from '@/lib/wilayah';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Check, Eye, Filter, MoreVertical, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function PendaftaranPage({ pendaftarData }: { pendaftarData: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPendaftar, setSelectedPendaftar] = useState<any>(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [pendaftarToDelete, setPendaftarToDelete] = useState<string | null>(null);

    // Filter pendaftar berdasarkan nama
    const filteredPendaftar = pendaftarData.data.filter((pendaftar) => pendaftar.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()));

    // Format tanggal lahir
    const formatTanggalLahir = (tanggal: string) => {
        return format(new Date(tanggal), 'dd MMMM yyyy', { locale: id });
    };

    function capitalizeFirstLetter(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    // Gabungkan alamat
    const getAlamat = (pendaftar: any) => {
        const [provinsiName, setProvinsiName] = useState('');
        const [kabupatenName, setKabupatenName] = useState('');
        const [kecamatanName, setKecamatanName] = useState('');
        const [desaName, setDesaName] = useState('');

        useEffect(() => {
            const fetchWilayah = async () => {
                const prov = await getProvinsiName(pendaftar.provinsi);
                const kab = await getKabupatenName(pendaftar.kabupaten, pendaftar.provinsi);
                const kec = await getKecamatanName(pendaftar.kecamatan, pendaftar.kabupaten);
                const desa = await getDesaName(pendaftar.desa, pendaftar.kecamatan);

                setProvinsiName(prov);
                setKabupatenName(kab);
                setKecamatanName(kec);
                setDesaName(desa);
            };

            fetchWilayah();
        }, [pendaftar]);

        return ` ${kecamatanName}, ${kabupatenName}`;
    };

    // Ambil kontak orang tua (ayah atau ibu)
    const getKontakOrangTua = (pendaftar: any) => {
        return pendaftar.kontak_ayah || pendaftar.kontak_ibu || '-';
    };

    // Handle detail action
    const handleDetail = (pendaftar: any) => {
        setSelectedPendaftar(pendaftar);
        setDetailModalOpen(true);
    };

    // Handle delete action
    const handleDelete = (noRegistrasi: string) => {
        setPendaftarToDelete(noRegistrasi);
    };

    // Handle approve action
    const handleApprove = (noRegistrasi: string, value: string) => {
        router.put(
            route('santri-baru.approved', noRegistrasi),
            { status: value },
            {
                preserveScroll: true, // Ini penting
            },
        );
    };

    //-----------------
    // STATE di luar map
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedToDelete, setSelectedToDelete] = useState(null);

    const confirmDelete = (no_registrasi: string | null) => {
        if (!no_registrasi) return;
        // ...lanjutkan proses hapus via fetch/axios
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-800 hover:bg-green-100';
            case 'Pending':
                return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="rounded-lg border bg-white shadow-sm">
                        <div className="border-b p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-medium">Daftar Pendaftar</h2>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                                        <Input
                                            type="search"
                                            placeholder="Cari berdasarkan nama ..."
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
                                        <TableHead>No</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Tempat dan Tanggal Lahir</TableHead>
                                        <TableHead>Alamat</TableHead>
                                        <TableHead>Nomor HP Orang Tua</TableHead>
                                        <TableHead>Nomor Registrasi</TableHead>
                                        <TableHead>Status penerimaan</TableHead>
                                        <TableHead className="w-[100px]">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPendaftar.map((pendaftar) => (
                                        <TableRow key={pendaftar.nik}>
                                            <TableCell>{}</TableCell>
                                            <TableCell className="font-medium whitespace-nowrap">{pendaftar.nama_lengkap}</TableCell>
                                            <TableCell>
                                                {pendaftar.tempat_lahir}, {formatTanggalLahir(pendaftar.tanggal_lahir)}
                                            </TableCell>
                                            <TableCell>{getAlamat(pendaftar)}</TableCell>
                                            <TableCell>{getKontakOrangTua(pendaftar)}</TableCell>
                                            <TableCell>{pendaftar.no_registrasi}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={getStatusColor(pendaftar.status)}>
                                                    {pendaftar.status}
                                                </Badge>
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
                                                                setTimeout(() => handleDetail(pendaftar), 0);
                                                            }}
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Detail
                                                        </DropdownMenuItem>

                                                        {pendaftar.status == 'Approved' ? (
                                                            <DropdownMenuItem
                                                                onClick={(e) => {
                                                                    // e.preventDefault(); // Cegah default link behavior
                                                                    handleApprove(pendaftar.no_registrasi, 'Pending');
                                                                }}
                                                            >
                                                                <Check className="mr-2 h-4 w-4" />
                                                                Ubah ke Pending
                                                            </DropdownMenuItem>
                                                        ) : (
                                                            <DropdownMenuItem
                                                                onClick={(e) => {
                                                                    // e.preventDefault(); // Cegah default link behavior
                                                                    handleApprove(pendaftar.no_registrasi, 'Approved');
                                                                }}
                                                            >
                                                                <Check className="mr-2 h-4 w-4" />
                                                                Approve
                                                            </DropdownMenuItem>
                                                        )}

                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => {
                                                                setTimeout(() => setSelectedToDelete(pendaftar), 0);
                                                                setTimeout(() => setDeleteModalOpen(true), 0);
                                                            }}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Hapus
                                                        </DropdownMenuItem>

                                                        <DropdownMenuSeparator />
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    {/* Detail Modal */}
                    <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
                        <DialogContent className="sm:max-w-[700px]">
                            <DialogHeader>
                                <DialogTitle>Detail Pendaftar</DialogTitle>
                                <DialogDescription>
                                    Informasi lengkap pendaftar santri baru dengan nomor registrasi {selectedPendaftar?.no_registrasi}
                                </DialogDescription>
                            </DialogHeader>

                            {selectedPendaftar && (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="md:col-span-1">
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={`storage/image/santribaru/${selectedPendaftar.foto}` || '/placeholder.svg'}
                                                alt={selectedPendaftar.nama_lengkap}
                                                className="h-auto w-full max-w-[200px] rounded-md border"
                                            />
                                            <p className="mt-2 text-sm font-medium">{selectedPendaftar.nama_lengkap}</p>
                                            <p className="text-sm text-gray-500">{selectedPendaftar.no_registrasi}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 md:col-span-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Data Pribadi</h3>
                                                <div className="mt-2 space-y-2">
                                                    <div>
                                                        <p className="text-xs text-gray-500">NIK</p>
                                                        <p className="text-sm">{selectedPendaftar.nik}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Tempat, Tanggal Lahir</p>
                                                        <p className="text-sm">
                                                            {selectedPendaftar.tempat_lahir},{formatTanggalLahir(selectedPendaftar.tanggal_lahir)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Jenis Kelamin</p>
                                                        <p className="text-sm">{selectedPendaftar.jenis_kelamin}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Alamat</p>
                                                        <p className="text-sm">{getAlamat(selectedPendaftar)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Data Orang Tua</h3>
                                                <div className="mt-2 space-y-2">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Nama Ayah</p>
                                                        <p className="text-sm">{selectedPendaftar.nama_ayah}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Pekerjaan Ayah</p>
                                                        <p className="text-sm">{selectedPendaftar.pekerjaan_ayah}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Kontak Ayah</p>
                                                        <p className="text-sm">{selectedPendaftar.kontak_ayah || '-'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Nama Ibu</p>
                                                        <p className="text-sm">{selectedPendaftar.nama_ibu}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Pekerjaan Ibu</p>
                                                        <p className="text-sm">{selectedPendaftar.pekerjaan_ibu}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Kontak Ibu</p>
                                                        <p className="text-sm">{selectedPendaftar.kontak_ibu || '-'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Data Pendidikan</h3>
                                            <div className="mt-2 grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500">Jenjang yang Dituju</p>
                                                    <p className="text-sm">{selectedPendaftar.jenjang}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Nama Sekolah Asal</p>
                                                    <p className="text-sm">{selectedPendaftar.nama_sekolah}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">NISN</p>
                                                    <p className="text-sm">{selectedPendaftar.nisn}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Tahun Tamat</p>
                                                    <p className="text-sm">{selectedPendaftar.tahun_tamat}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <DialogFooter>
                                <Button onClick={() => setDetailModalOpen(false)}>Tutup</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* // DI LUAR LOOP (sekali saja) */}
                    <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Apakah Anda yakin ingin menghapus data pendaftar {selectedToDelete?.nama_lengkap}?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setDeleteModalOpen(false)}>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={() => {
                                        confirmDelete(selectedToDelete?.no_registrasi);
                                        setDeleteModalOpen(false);
                                    }}
                                >
                                    Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </AppLayout>
    );
}
