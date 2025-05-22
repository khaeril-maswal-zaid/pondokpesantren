'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Types
type DokumenType = {
    id: string;
    point: string;
    subcategory: 'wajib' | 'tambahan';
    order: number;
};

// Form schema
const formSchema = z.object({
    id: z.string().optional(),
    point: z.string().min(3, {
        message: 'Nama dokumen harus minimal 3 karakter.',
    }),
    subcategory: z.enum(['wajib', 'tambahan'], {
        required_error: 'Pilih kategori dokumen.',
    }),
});

type DokumenFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: DokumenType) => void;
    initialData: DokumenType | null;
};

export function DokumenForm({ isOpen, onClose, onSave, initialData }: DokumenFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: '',
            point: '',
            subcategory: 'wajib',
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                id: initialData.id,
                point: initialData.point,
                subcategory: initialData.subcategory,
            });
        } else {
            form.reset({
                id: '',
                point: '',
                subcategory: 'wajib',
            });
        }
    }, [initialData, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave({
            id: values.id || '',
            point: values.point,
            subcategory: values.subcategory,
            order: initialData?.order || 0,
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} modal={false}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Dokumen Pendaftaran' : 'Tambah Dokumen Pendaftaran'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Ubah detail dokumen pendaftaran di bawah ini.' : 'Tambahkan dokumen pendaftaran baru di bawah ini.'}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="subcategory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kategori</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih kategori" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="wajib">Dokumen Wajib</SelectItem>
                                            <SelectItem value="tambahan">Dokumen Tambahan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="point"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Point</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan deskripsi dokumen" className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Batal
                            </Button>
                            <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
