'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface KontakEditModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    kontak: any;
    onSave: (kontak: any) => void;
}

export default function KontakEditModal({ open, onOpenChange, kontak, onSave }: KontakEditModalProps) {
    const [value, setValue] = useState('');
    const [link, setLink] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when kontak changes
    useEffect(() => {
        if (kontak) {
            setValue(kontak.value);
            setLink(kontak.link);
        }
    }, [kontak]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate form
        if (!value.trim()) {
            toast({
                title: 'Error',
                description: 'Value tidak boleh kosong',
                variant: 'destructive',
            });
            setIsSubmitting(false);
            return;
        }

        if (!link.trim()) {
            toast({
                title: 'Error',
                description: 'Link tidak boleh kosong',
                variant: 'destructive',
            });
            setIsSubmitting(false);
            return;
        }

        router.put(
            route('kontak.update', kontak.label),
            {
                value: value,
                link: link,
            },
            {
                preserveScroll: true, // Ini penting
                onSuccess: () => {
                    const updatedKontak = {
                        ...kontak,
                        value,
                        link,
                    };

                    onSave(updatedKontak);

                    // Show success toast
                    toast({
                        title: 'Berhasil',
                        description: `Kontak ${kontak.name} berhasil diperbarui`,
                    });

                    // Close modal
                    onOpenChange(false);
                    setIsSubmitting(false);
                },
            },
        );
    };

    if (!kontak) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Kontak {kontak.name}</DialogTitle>
                    <DialogDescription>Perbarui informasi kontak {kontak.name}. Klik simpan setelah selesai.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="value">Value</Label>
                        <Input id="value" value={value} onChange={(e) => setValue(e.target.value)} placeholder={`Masukkan ${kontak.name}`} />
                        <p className="text-xs text-gray-500">
                            {kontak.name === 'Facebook' && 'Nama halaman atau profil Facebook'}
                            {kontak.name === 'Instagram' && 'Username Instagram (dengan @)'}
                            {kontak.name === 'Twitter' && 'Username Twitter (dengan @)'}
                            {kontak.name === 'YouTube' && 'Nama channel YouTube'}
                            {kontak.name === 'WhatsApp' && 'Nomor WhatsApp (dengan kode negara)'}
                            {kontak.name === 'Email' && 'Alamat email'}
                            {kontak.name === 'Website' && 'Alamat website'}
                            {kontak.name === 'LinkedIn' && 'Nama profil LinkedIn'}
                            {kontak.name === 'TikTok' && 'Username TikTok (dengan @)'}
                            {kontak.name === 'Telegram' && 'Username Telegram (dengan @)'}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="link">Link</Label>
                        <Input id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Masukkan link" />
                        <p className="text-xs text-gray-500">Link lengkap ke profil atau halaman {kontak.name}</p>
                    </div>

                    {/* <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="status">Status</Label>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="status"
                                    checked={status === 'aktif'}
                                    onCheckedChange={(checked) => setStatus(checked ? 'aktif' : 'nonaktif')}
                                />
                                <Label htmlFor="status" className="text-sm font-normal">
                                    {status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                                </Label>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">
                            {status === 'aktif' ? 'Kontak akan ditampilkan di website' : 'Kontak tidak akan ditampilkan di website'}
                        </p>
                    </div> */}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                'Simpan'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
