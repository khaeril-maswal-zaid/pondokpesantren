'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Types
type JadwalType = {
    id: string;
    activity_name: string;
    gel1: string;
    gel2: string;
    order: number;
};

// Form schema with date validation
const formSchema = z.object({
    id: z.string().optional(),
    activity_name: z.string().min(3, {
        message: 'Nama kegiatan harus minimal 3 karakter.',
    }),
    gel1: z
        .string()
        .min(3, {
            message: 'Tanggal gelombang 1 harus diisi.',
        })
        .refine(
            (val) => {
                // Simple validation for DD MMMM YYYY format
                // More complex validation could be added
                return /^\d{1,2}\s[A-Za-z]+\s\d{4}$/.test(val) || /^\d{1,2}-\d{1,2}\s[A-Za-z]+\s\d{4}$/.test(val);
            },
            {
                message: 'Format tanggal harus DD MMMM YYYY (contoh: 1 Januari 2025)',
            },
        ),
    gel2: z
        .string()
        .min(3, {
            message: 'Tanggal gelombang 2 harus diisi.',
        })
        .refine(
            (val) => {
                return /^\d{1,2}\s[A-Za-z]+\s\d{4}$/.test(val) || /^\d{1,2}-\d{1,2}\s[A-Za-z]+\s\d{4}$/.test(val);
            },
            {
                message: 'Format tanggal harus DD MMMM YYYY (contoh: 1 Januari 2025)',
            },
        ),
});

type JadwalFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: JadwalType) => void;
    initialData: JadwalType | null;
};

export function JadwalForm({ isOpen, onClose, onSave, initialData }: JadwalFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: '',
            activity_name: '',
            gel1: '',
            gel2: '',
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                id: initialData.id,
                activity_name: initialData.activity_name,
                gel1: initialData.gel1,
                gel2: initialData.gel2,
            });
        } else {
            form.reset({
                id: '',
                activity_name: '',
                gel1: '',
                gel2: '',
            });
        }
    }, [initialData, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave({
            id: values.id || '',
            activity_name: values.activity_name,
            gel1: values.gel1,
            gel2: values.gel2,
            order: initialData?.order || 0,
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Jadwal Pendaftaran' : 'Tambah Jadwal Pendaftaran'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Ubah detail jadwal pendaftaran di bawah ini.' : 'Tambahkan jadwal pendaftaran baru di bawah ini.'}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="activity_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Kegiatan</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan nama kegiatan" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gel1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tanggal Gelombang 1</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: 1 Januari 2025" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gel2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tanggal Gelombang 2</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: 1 Maret 2025" {...field} />
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
