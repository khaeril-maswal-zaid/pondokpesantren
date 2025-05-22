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
type FaqType = {
    id: string;
    description: string;
    title: string;
    order: number;
};

// Form schema
const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(5, {
        message: 'Pertanyaan harus minimal 5 karakter.',
    }),
    description: z.string().min(10, {
        message: 'Jawaban harus minimal 10 karakter.',
    }),
});

type FaqFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: FaqType) => void;
    initialData: FaqType | null;
};

export function FaqForm({ isOpen, onClose, onSave, initialData }: FaqFormProps) {
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
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="h-[90vh] overflow-y-auto sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Pertanyaan' : 'Tambah Pertanyaan'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Ubah pertanyaan dan jawaban di bawah ini.' : 'Tambahkan pertanyaan dan jawaban baru di bawah ini.'}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pertanyaan</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan pertanyaan" {...field} />
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
                                    <FormLabel>Jawaban</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan jawaban" className="min-h-[150px]" {...field} />
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
