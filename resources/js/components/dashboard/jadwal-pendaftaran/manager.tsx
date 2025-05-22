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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { JadwalForm } from './jadwal-form';

// Types
type JadwalType = {
    id: string;
    activity_name: string;
    gel1: string;
    gel2: string;
    order: number;
};

export function JadwalPendaftaranManager({ jadwal }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentJadwal, setCurrentJadwal] = useState<JadwalType | null>(null);
    const [jadwalList, setJadwalList] = useState<JadwalType[]>(jadwal);

    const handleOpenForm = (jadwal?: JadwalType) => {
        setCurrentJadwal(jadwal || null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setCurrentJadwal(null);
    };

    const handleOpenDeleteDialog = (jadwal: JadwalType) => {
        setCurrentJadwal(jadwal);
        setIsDeleteDialogOpen(true);
    };

    const handleSaveJadwal = (jadwal: JadwalType) => {
        if (jadwal.id) {
            // Update existing
            setJadwalList((prev) => prev.map((item) => (item.id === jadwal.id ? jadwal : item)));
            toast({
                title: 'Jadwal berhasil diperbarui',
                description: `Jadwal "${jadwal.activity_name}" telah diperbarui.`,
            });
        } else {
            // Add new
            const newId = Date.now().toString();
            const newOrder = Math.max(...jadwalList.map((item) => item.order), 0) + 1;

            setJadwalList((prev) => [...prev, { ...jadwal, id: newId, order: newOrder }]);
            toast({
                title: 'Jadwal berhasil ditambahkan',
                description: `Jadwal "${jadwal.activity_name}" telah ditambahkan.`,
            });
        }
        handleCloseForm();
    };

    const handleDeleteJadwal = () => {
        if (!currentJadwal) return;

        setJadwalList((prev) => prev.filter((item) => item.id !== currentJadwal.id));
        setIsDeleteDialogOpen(false);
        setCurrentJadwal(null);

        toast({
            title: 'Jadwal berhasil dihapus',
            description: `Jadwal "${currentJadwal.activity_name}" telah dihapus.`,
        });
    };

    return (
        <>
            <div className="mb-6 flex justify-end">
                <Button onClick={() => handleOpenForm()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Jadwal
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Jadwal Pendaftaran</CardTitle>
                    <CardDescription>Jadwal kegiatan pendaftaran gelombang 1 dan 2</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Kegiatan</TableHead>
                                <TableHead>Gelombang 1</TableHead>
                                <TableHead>Gelombang 2</TableHead>
                                <TableHead className="w-[100px] text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...jadwalList]
                                .sort((a, b) => a.order - b.order)
                                .map((jadwal) => (
                                    <TableRow key={jadwal.id}>
                                        <TableCell className="font-medium">{jadwal.activity_name}</TableCell>
                                        <TableCell>{jadwal.gel1}</TableCell>
                                        <TableCell>{jadwal.gel2}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button variant="ghost" size="icon" onClick={() => handleOpenForm(jadwal)}>
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() => handleOpenDeleteDialog(jadwal)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Hapus</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <JadwalForm isOpen={isFormOpen} onClose={handleCloseForm} onSave={handleSaveJadwal} initialData={currentJadwal} />

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Jadwal</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus jadwal "{currentJadwal?.activity_name}"? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteJadwal}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
