'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Types
type AlurType = {
    id: string;
    title: string;
    description: string;
    order: number;
};

// Form schema
const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(3, {
        message: 'Judul langkah harus minimal 3 karakter.',
    }),
    description: z.string().min(10, {
        message: 'Deskripsi langkah harus minimal 10 karakter.',
    }),
});

type AlurFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: AlurType) => void;
    initialData: AlurType | null;
};

export function AlurForm({ isOpen, onClose, onSave, initialData }: AlurFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: '',
            title: '',
            description: '',
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                id: initialData.id,
                title: initialData.title,
                description: initialData.description,
            });
        } else {
            form.reset({
                id: '',
                title: '',
                description: '',
            });
        }
    }, [initialData, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave({
            id: values.id || '',
            title: values.title,
            description: values.description,
            order: initialData?.order || 0,
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} modal={false}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Langkah Alur Pendaftaran' : 'Tambah Langkah Alur Pendaftaran'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Ubah detail langkah alur pendaftaran di bawah ini.' : 'Tambahkan langkah alur pendaftaran baru di bawah ini.'}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul Langkah</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan judul langkah" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan deskripsi langkah" className="min-h-[100px]" {...field} />
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
