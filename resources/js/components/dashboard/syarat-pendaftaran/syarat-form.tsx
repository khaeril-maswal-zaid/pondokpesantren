'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Types
type SyaratType = {
    id: string;
    point: string;
    order: number;
    subcategory: 'umum' | 'khusus';
};

// Form schema
const formSchema = z.object({
    id: z.string().optional(),
    point: z.string().min(5, {
        message: 'Teks persyaratan harus minimal 5 karakter.',
    }),
    subcategory: z.enum(['umum', 'khusus'], {
        required_error: 'Pilih kategori persyaratan.',
    }),
});

type SyaratFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: SyaratType) => void;
    initialData: SyaratType | null;
};

export function SyaratForm({ isOpen, onClose, onSave, initialData }: SyaratFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: '',
            point: '',
            subcategory: 'umum',
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
                subcategory: 'umum',
            });
        }
    }, [initialData, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        router.put(route('contentpendaftaran.update', values.id), {
            point: values.point,
            subcategory: values.subcategory,
            order: initialData?.order,
        });

        // onSave({
        //     id: values.id || '',
        //     point: values.point,
        //     subcategory: values.subcategory,
        //     order: initialData?.order || 0,
        // });
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} modal={false}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Syarat Pendaftaran' : 'Tambah Syarat Pendaftaran'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Ubah detail syarat pendaftaran di bawah ini.' : 'Tambahkan syarat pendaftaran baru di bawah ini.'}
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
                                            <SelectItem value="umum">Persyaratan Umum</SelectItem>
                                            <SelectItem value="khusus">Persyaratan Khusus</SelectItem>
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
                                    <FormLabel>Teks Persyaratan</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan teks persyaratan" className="min-h-[100px]" {...field} />
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
