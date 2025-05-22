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
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { MoveDown, MoveUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AlurForm } from './alur-form';

// Types
type AlurType = {
    id: string;
    title: string;
    description: string;
    order: number;
};

export function AlurPendaftaranManager({ steps }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentAlur, setCurrentAlur] = useState<AlurType | null>(null);
    const [alurList, setAlurList] = useState<AlurType[]>(steps);

    const handleOpenForm = (alur?: AlurType) => {
        setCurrentAlur(alur || null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setCurrentAlur(null);
    };

    const handleOpenDeleteDialog = (alur: AlurType) => {
        setCurrentAlur(alur);
        setIsDeleteDialogOpen(true);
    };

    const handleSaveAlur = (alur: AlurType) => {
        if (alur.id) {
            // Update existing
            setAlurList((prev) => prev.map((item) => (item.id === alur.id ? alur : item)));
            toast({
                title: 'Alur berhasil diperbarui',
                description: `Alur "${alur.title}" telah diperbarui.`,
            });
        } else {
            // Add new
            const newId = Date.now().toString();
            const newOrder = Math.max(...alurList.map((item) => item.order)) + 1;

            setAlurList((prev) => [...prev, { ...alur, id: newId, order: newOrder }]);
            toast({
                title: 'Alur berhasil ditambahkan',
                description: `Alur "${alur.title}" telah ditambahkan.`,
            });
        }
        handleCloseForm();
    };

    const handleDeleteAlur = () => {
        if (!currentAlur) return;

        setAlurList((prev) => prev.filter((item) => item.id !== currentAlur.id));
        setIsDeleteDialogOpen(false);
        setCurrentAlur(null);

        toast({
            title: 'Alur berhasil dihapus',
            description: `Alur "${currentAlur.title}" telah dihapus.`,
        });
    };

    const handleMoveItem = (id: string, direction: 'up' | 'down') => {
        const alur = alurList.find((item) => item.id === id);
        if (!alur) return;

        const sortedItems = [...alurList].sort((a, b) => a.order - b.order);

        const currentIndex = sortedItems.findIndex((item) => item.id === id);
        if ((direction === 'up' && currentIndex === 0) || (direction === 'down' && currentIndex === sortedItems.length - 1)) {
            return;
        }

        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        const targetItem = sortedItems[newIndex];

        // Swap orders
        const updatedList = alurList.map((item) => {
            if (item.id === id) {
                return { ...item, order: targetItem.order };
            }
            if (item.id === targetItem.id) {
                return { ...item, order: alur.order };
            }
            return item;
        });

        setAlurList(updatedList);

        // toast({
        //     title: 'Urutan berhasil diubah',
        //     description: `Alur "${alur.title}" telah dipindahkan.`,
        // });
    };

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <p className="text-muted-foreground text-sm">Drag and drop untuk mengubah urutan langkah-langkah</p>
                </div>
                <Button onClick={() => handleOpenForm()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Langkah
                </Button>
            </div>

            <div className="grid gap-4">
                {[...alurList]
                    .sort((a, b) => a.order - b.order)
                    .map((alur) => (
                        <Card key={alur.id} className="relative py-0">
                            <CardContent className="flex items-start gap-4 p-6">
                                <div className="bg-primary/10 my-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                                    <Pencil className="h-6 w-6" />
                                </div>
                                <div className="my-auto min-w-0 flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                        <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                                            {alur.order}
                                        </div>
                                        <h3 className="text-lg font-semibold">{alur.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground">{alur.description}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => handleMoveItem(alur.id, 'up')}>
                                        <MoveUp className="h-4 w-4" />
                                        <span className="sr-only">Pindah ke atas</span>
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleMoveItem(alur.id, 'down')}>
                                        <MoveDown className="h-4 w-4" />
                                        <span className="sr-only">Pindah ke bawah</span>
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => handleOpenForm(alur)}>
                                        <Pencil className="h-4 w-4" />
                                        <span className="sr-only">Edit</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => handleOpenDeleteDialog(alur)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Hapus</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>

            <AlurForm isOpen={isFormOpen} onClose={handleCloseForm} onSave={handleSaveAlur} initialData={currentAlur} />

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Langkah Alur Pendaftaran</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus langkah "{currentAlur?.title}"? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAlur} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
