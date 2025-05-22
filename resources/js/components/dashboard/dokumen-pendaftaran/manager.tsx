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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { FileText, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DokumenForm } from './dokumen-form';

// Types
type DokumenType = {
    id: string;
    point: string;
    subcategory: 'wajib' | 'tambahan';
    order: number;
};

export function DokumenPendaftaranManager({ dokumen }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentDokumen, setCurrentDokumen] = useState<DokumenType | null>(null);
    const [dokumenList, setDokumenList] = useState<DokumenType[]>(dokumen);

    const handleOpenForm = (dokumen?: DokumenType) => {
        setCurrentDokumen(dokumen || null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setCurrentDokumen(null);
    };

    const handleOpenDeleteDialog = (dokumen: DokumenType) => {
        setCurrentDokumen(dokumen);
        setIsDeleteDialogOpen(true);
    };

    const handleSaveDokumen = (dokumen: DokumenType) => {
        if (dokumen.id) {
            // Update existing
            setDokumenList((prev) => prev.map((item) => (item.id === dokumen.id ? dokumen : item)));
            toast({
                title: 'Dokumen berhasil diperbarui',
                description: `Dokumen "${dokumen.point}" telah diperbarui.`,
            });
        } else {
            // Add new
            const newId = Date.now().toString();
            const newOrder = Math.max(...dokumenList.filter((item) => item.subcategory === dokumen.subcategory).map((item) => item.order), 0) + 1;

            setDokumenList((prev) => [...prev, { ...dokumen, id: newId, order: newOrder }]);
            toast({
                title: 'Dokumen berhasil ditambahkan',
                description: `Dokumen "${dokumen.point}" telah ditambahkan.`,
            });
        }
        handleCloseForm();
    };

    const handleDeleteDokumen = () => {
        if (!currentDokumen) return;

        setDokumenList((prev) => prev.filter((item) => item.id !== currentDokumen.id));
        setIsDeleteDialogOpen(false);
        setCurrentDokumen(null);

        toast({
            title: 'Dokumen berhasil dihapus',
            description: `Dokumen "${currentDokumen.point}" telah dihapus.`,
        });
    };

    const getDokumenByCategory = (category: 'wajib' | 'tambahan') => {
        return dokumenList.filter((item) => item.subcategory === category).sort((a, b) => a.order - b.order);
    };

    return (
        <>
            <Tabs defaultValue="wajib" className="space-y-4">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="wajib">Dokumen Wajib</TabsTrigger>
                        <TabsTrigger value="tambahan">Dokumen Tambahan</TabsTrigger>
                    </TabsList>
                    <Button onClick={() => handleOpenForm()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Dokumen
                    </Button>
                </div>

                <TabsContent value="wajib">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dokumen Wajib</CardTitle>
                            <CardDescription>Dokumen yang wajib dilengkapi oleh calon santri</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {getDokumenByCategory('wajib').map((dokumen) => (
                                    <Card key={dokumen.id} className="overflow-hidden py-0">
                                        <CardContent className="p-0">
                                            <div className="flex items-start p-4">
                                                <div className="mr-4 flex-shrink-0">
                                                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                                                        <FileText className="text-primary h-5 w-5" />
                                                    </div>
                                                </div>
                                                <div className="my-auto min-w-0 flex-1">
                                                    <h3 className="font-medium">{dokumen.point}</h3>
                                                </div>
                                                <div className="ml-4 flex gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => handleOpenForm(dokumen)}>
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => handleOpenDeleteDialog(dokumen)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Hapus</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tambahan">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dokumen Tambahan</CardTitle>
                            <CardDescription>Dokumen tambahan yang dapat melengkapi pendaftaran</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {getDokumenByCategory('tambahan').map((dokumen) => (
                                    <Card key={dokumen.id} className="overflow-hidden py-0">
                                        <CardContent className="p-0">
                                            <div className="flex items-start p-4">
                                                <div className="mr-4 flex-shrink-0">
                                                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                                                        <FileText className="text-primary h-5 w-5" />
                                                    </div>
                                                </div>
                                                <div className="my-auto min-w-0 flex-1">
                                                    <h3 className="font-medium">{dokumen.point}</h3>
                                                </div>
                                                <div className="ml-4 flex gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => handleOpenForm(dokumen)}>
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => handleOpenDeleteDialog(dokumen)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Hapus</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <DokumenForm isOpen={isFormOpen} onClose={handleCloseForm} onSave={handleSaveDokumen} initialData={currentDokumen} />

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Dokumen</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus dokumen "{currentDokumen?.point}"? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteDokumen}
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
