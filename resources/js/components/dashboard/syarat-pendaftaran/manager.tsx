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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { MoveDown, MoveUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { SyaratForm } from './syarat-form';

// Types
type SyaratType = {
    id: string;
    point: string;
    order: number;
    subcategory: 'umum' | 'khusus';
};

export function SyaratPendaftaranManager({ persyaratan }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentSyarat, setCurrentSyarat] = useState<SyaratType | null>(null);
    const [syaratList, setSyaratList] = useState<SyaratType[]>(persyaratan);

    const handleOpenForm = (syarat?: SyaratType) => {
        setCurrentSyarat(syarat || null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setCurrentSyarat(null);
    };

    const handleOpenDeleteDialog = (syarat: SyaratType) => {
        setCurrentSyarat(syarat);
        setIsDeleteDialogOpen(true);
    };

    const handleSaveSyarat = (syarat: SyaratType) => {
        if (syarat.id) {
            // Update existing
            setSyaratList((prev) => prev.map((item) => (item.id === syarat.id ? syarat : item)));
            toast({
                title: 'Syarat berhasil diperbarui',
                description: `Syarat "${syarat.point}" telah diperbarui.`,
            });
        } else {
            // Add new
            const newId = Date.now().toString();
            const newOrder = Math.max(...syaratList.filter((item) => item.subcategory === syarat.subcategory).map((item) => item.order)) + 1;

            setSyaratList((prev) => [...prev, { ...syarat, id: newId, order: newOrder }]);
            toast({
                title: 'Syarat berhasil ditambahkan',
                description: `Syarat "${syarat.point}" telah ditambahkan.`,
            });
        }
        handleCloseForm();
    };

    const handleDeleteSyarat = () => {
        if (!currentSyarat) return;

        setSyaratList((prev) => prev.filter((item) => item.id !== currentSyarat.id));
        setIsDeleteDialogOpen(false);
        setCurrentSyarat(null);

        toast({
            title: 'Syarat berhasil dihapus',
            description: `Syarat "${currentSyarat.point}" telah dihapus.`,
        });
    };

    const handleMoveItem = (id: string, direction: 'up' | 'down') => {
        const syarat = syaratList.find((item) => item.id === id);
        if (!syarat) return;

        const subcategory = syarat.subcategory;
        const subcategoryItems = syaratList.filter((item) => item.subcategory === subcategory);
        const sortedItems = [...subcategoryItems].sort((a, b) => a.order - b.order);

        const currentIndex = sortedItems.findIndex((item) => item.id === id);
        if ((direction === 'up' && currentIndex === 0) || (direction === 'down' && currentIndex === sortedItems.length - 1)) {
            return;
        }

        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        const targetItem = sortedItems[newIndex];

        // Swap orders
        const updatedList = syaratList.map((item) => {
            if (item.id === id) {
                return { ...item, order: targetItem.order };
            }
            if (item.id === targetItem.id) {
                return { ...item, order: syarat.order };
            }
            return item;
        });

        setSyaratList(updatedList);

        // toast({
        //     title: 'Urutan berhasil diubah',
        //     description: `Syarat "${syarat.point}" telah dipindahkan.`,
        // });
    };

    const getSyaratByCategory = (subcategory: 'umum' | 'khusus') => {
        return syaratList.filter((item) => item.subcategory === subcategory).sort((a, b) => a.order - b.order);
    };

    return (
        <>
            <Tabs defaultValue="umum" className="space-y-4">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="umum">Persyaratan Umum</TabsTrigger>
                        <TabsTrigger value="khusus">Persyaratan Khusus</TabsTrigger>
                    </TabsList>
                    <Button onClick={() => handleOpenForm()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Syarat
                    </Button>
                </div>

                <TabsContent value="umum">
                    <Card>
                        <CardHeader>
                            <CardTitle>Persyaratan Umum</CardTitle>
                            <CardDescription>Kelola persyaratan umum untuk pendaftaran pesantren</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">No</TableHead>
                                        <TableHead>Persyaratan</TableHead>
                                        <TableHead className="w-32 text-center">Urutan</TableHead>
                                        <TableHead className="w-32 text-center">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {getSyaratByCategory('umum').map((syarat) => (
                                        <TableRow key={syarat.id}>
                                            <TableCell className="font-medium">{syarat.order}</TableCell>
                                            <TableCell>{syarat.point}</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => handleMoveItem(syarat.id, 'up')}>
                                                        <MoveUp className="h-4 w-4" />
                                                        <span className="sr-only">Pindah ke atas</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleMoveItem(syarat.id, 'down')}>
                                                        <MoveDown className="h-4 w-4" />
                                                        <span className="sr-only">Pindah ke bawah</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => handleOpenForm(syarat)}>
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => handleOpenDeleteDialog(syarat)}
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
                </TabsContent>

                <TabsContent value="khusus">
                    <Card>
                        <CardHeader>
                            <CardTitle>Persyaratan Khusus</CardTitle>
                            <CardDescription>Kelola persyaratan khusus untuk pendaftaran pesantren</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">No</TableHead>
                                        <TableHead>Persyaratan</TableHead>
                                        <TableHead className="w-32 text-center">Urutan</TableHead>
                                        <TableHead className="w-32 text-center">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {getSyaratByCategory('khusus').map((syarat) => (
                                        <TableRow key={syarat.id}>
                                            <TableCell className="font-medium">{syarat.order}</TableCell>
                                            <TableCell>{syarat.point}</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => handleMoveItem(syarat.id, 'up')}>
                                                        <MoveUp className="h-4 w-4" />
                                                        <span className="sr-only">Pindah ke atas</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleMoveItem(syarat.id, 'down')}>
                                                        <MoveDown className="h-4 w-4" />
                                                        <span className="sr-only">Pindah ke bawah</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => handleOpenForm(syarat)}>
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => handleOpenDeleteDialog(syarat)}
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
                </TabsContent>
            </Tabs>

            <SyaratForm isOpen={isFormOpen} onClose={handleCloseForm} onSave={handleSaveSyarat} initialData={currentSyarat} />

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Syarat Pendaftaran</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus syarat "{currentSyarat?.point}"? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteSyarat}
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
