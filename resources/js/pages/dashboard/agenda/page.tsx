'use client';

import AgendaCreateModal from '@/components/dashboard/agenda-create-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Eye, Filter, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

// Sample data for agenda
const agendaData = [
    {
        id: '1',
        nama_agenda: 'Pengajian Akbar',
        waktu: '2023-12-15T19:00:00',
        tempat: 'Aula Utama',
        lokasi: 'Pondok Pesantren Al-Hikmah',
        foto: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600&text=Foto+Pengajian+2'],
        deskripsi: 'Pengajian akbar dengan pembicara Ustadz Abdul Somad',
        status: 'Upcoming',
    },
    {
        id: '2',
        nama_agenda: 'Wisuda Santri',
        waktu: '2023-11-20T09:00:00',
        tempat: 'Gedung Serbaguna',
        lokasi: 'Pondok Pesantren Al-Hikmah',
        foto: ['/placeholder.svg?height=400&width=600&text=Wisuda+Santri', '/placeholder.svg?height=400&width=600&text=Wisuda+Santri+2'],
        deskripsi: 'Wisuda santri angkatan 2023',
        status: 'Completed',
    },
    {
        id: '3',
        nama_agenda: 'Peringatan Maulid Nabi',
        waktu: '2023-09-28T19:30:00',
        tempat: 'Masjid Al-Hikmah',
        lokasi: 'Pondok Pesantren Al-Hikmah',
        foto: ['/placeholder.svg?height=400&width=600&text=Maulid+Nabi', '/placeholder.svg?height=400&width=600&text=Maulid+Nabi+2'],
        deskripsi: 'Peringatan Maulid Nabi Muhammad SAW',
        status: 'Completed',
    },
    {
        id: '4',
        nama_agenda: 'Lomba Tahfidz Quran',
        waktu: '2024-01-15T08:00:00',
        tempat: 'Aula Utama',
        lokasi: 'Pondok Pesantren Al-Hikmah',
        foto: ['/placeholder.svg?height=400&width=600&text=Lomba+Tahfidz', '/placeholder.svg?height=400&width=600&text=Lomba+Tahfidz+2'],
        deskripsi: 'Lomba Tahfidz Quran antar santri',
        status: 'Upcoming',
    },
    {
        id: '5',
        nama_agenda: 'Bakti Sosial',
        waktu: '2024-02-05T07:00:00',
        tempat: 'Desa Sumbersari',
        lokasi: 'Kecamatan Lowokwaru, Malang',
        foto: ['/placeholder.svg?height=400&width=600&text=Bakti+Sosial', '/placeholder.svg?height=400&width=600&text=Bakti+Sosial+2'],
        deskripsi: 'Bakti sosial dan pembagian sembako untuk warga sekitar',
        status: 'Upcoming',
    },
    {
        id: '6',
        nama_agenda: 'Seminar Pendidikan Islam',
        waktu: '2023-10-10T09:00:00',
        tempat: 'Gedung Serbaguna',
        lokasi: 'Pondok Pesantren Al-Hikmah',
        foto: ['/placeholder.svg?height=400&width=600&text=Seminar+Pendidikan', '/placeholder.svg?height=400&width=600&text=Seminar+Pendidikan+2'],
        deskripsi: 'Seminar pendidikan Islam di era digital',
        status: 'Completed',
    },
];

export default function AgendaPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAgenda, setSelectedAgenda] = useState<any>(null);
    const [fotoModalOpen, setFotoModalOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    // Filter agenda berdasarkan nama
    const filteredAgenda = agendaData.filter((agenda) => agenda.nama_agenda.toLowerCase().includes(searchTerm.toLowerCase()));

    // Format waktu
    const formatWaktu = (waktu: string) => {
        return format(new Date(waktu), 'dd MMMM yyyy, HH:mm', { locale: id }) + ' WIB';
    };

    // Handle view photos
    const handleViewPhotos = (agenda: any) => {
        setSelectedAgenda(agenda);
        setCurrentPhotoIndex(0);
        setFotoModalOpen(true);
    };

    // Next photo
    const nextPhoto = () => {
        if (selectedAgenda && currentPhotoIndex < selectedAgenda.foto.length - 1) {
            setCurrentPhotoIndex(currentPhotoIndex + 1);
        }
    };

    // Previous photo
    const prevPhoto = () => {
        if (selectedAgenda && currentPhotoIndex > 0) {
            setCurrentPhotoIndex(currentPhotoIndex - 1);
        }
    };

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Upcoming':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
            case 'Completed':
                return 'bg-green-100 text-green-800 hover:bg-green-100';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Agenda Kegiatan</h1>
                <AgendaCreateModal />
            </div>

            <div className="rounded-lg border bg-white shadow-sm">
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
                                <TableHead>Waktu</TableHead>
                                <TableHead>Tempat</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[80px]">Foto</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAgenda.length > 0 ? (
                                filteredAgenda.map((agenda) => (
                                    <TableRow key={agenda.id}>
                                        <TableCell className="font-medium">{agenda.nama_agenda}</TableCell>
                                        <TableCell>{formatWaktu(agenda.waktu)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-start gap-1">
                                                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
                                                <span>
                                                    {agenda.tempat}, {agenda.lokasi}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={getStatusColor(agenda.status)}>
                                                {agenda.status}
                                            </Badge>
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
            </div>

            {/* Foto Modal */}
            <Dialog open={fotoModalOpen} onOpenChange={setFotoModalOpen}>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>{selectedAgenda?.nama_agenda}</DialogTitle>
                        <DialogDescription>
                            {selectedAgenda?.deskripsi} - {selectedAgenda && formatWaktu(selectedAgenda.waktu)}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedAgenda && (
                        <div className="flex flex-col items-center">
                            <div className="relative w-full">
                                <img
                                    src={selectedAgenda.foto[currentPhotoIndex] || '/placeholder.svg'}
                                    alt={`Foto ${selectedAgenda.nama_agenda}`}
                                    className="h-auto max-h-[400px] w-full rounded-md object-contain"
                                />
                                {selectedAgenda.foto.length > 1 && (
                                    <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                                        {selectedAgenda.foto.map((_, index: number) => (
                                            <button
                                                key={index}
                                                className={`h-2.5 w-2.5 rounded-full ${index === currentPhotoIndex ? 'bg-primary' : 'bg-gray-300'}`}
                                                onClick={() => setCurrentPhotoIndex(index)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {selectedAgenda.foto.length > 1 && (
                                <div className="mt-4 flex justify-center gap-4">
                                    <Button variant="outline" size="sm" onClick={prevPhoto} disabled={currentPhotoIndex === 0}>
                                        Sebelumnya
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={nextPhoto}
                                        disabled={currentPhotoIndex === selectedAgenda.foto.length - 1}
                                    >
                                        Selanjutnya
                                    </Button>
                                </div>
                            )}

                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-500">
                                    Foto {currentPhotoIndex + 1} dari {selectedAgenda.foto.length}
                                </p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button onClick={() => setFotoModalOpen(false)}>Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
