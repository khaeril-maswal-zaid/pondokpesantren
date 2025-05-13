'use client';

import type React from 'react';

import ImageCropper from '@/components/dashboard/image-cropper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Loader2, Phone, PlusCircle, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

// Define validation schema
const strukturSchema = z.object({
    nama: z.string().min(3, 'Nama harus minimal 3 karakter'),
    posisi: z.string().min(3, 'Posisi harus minimal 3 karakter'),
    departemen: z.string().min(3, 'Departemen harus minimal 3 karakter'),
    no_hp: z.string().min(10, 'Nomor HP harus minimal 10 karakter').max(15, 'Nomor HP maksimal 15 karakter'),
    foto: z.any().optional(),
});

type ValidationErrors = {
    [key: string]: string | undefined;
};

export default function StrukturCreateModal() {
    const [open, setOpen] = useState(false);
    const [nama, setNama] = useState('');
    const [posisi, setPosisi] = useState('');
    const [departemen, setDepartemen] = useState('');
    const [no_hp, setNoHp] = useState('');

    // Image states
    const [foto, setFoto] = useState<File | null>(null);
    const [fotoPreview, setFotoPreview] = useState<string | null>(null);

    // Cropping states
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

    // Validation states
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Square aspect ratio (1:1)
    const aspectRatio = 1;

    // Reset errors when inputs change
    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                setImageToCrop(reader.result as string);
                setCropModalOpen(true);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleCroppedImage = (croppedImage: string, file: File) => {
        setFoto(file);
        setFotoPreview(croppedImage);
        setCropModalOpen(false);
        setImageToCrop(null);
        clearError('foto');
    };

    const validateForm = () => {
        try {
            strukturSchema.parse({
                nama,
                posisi,
                departemen,
                no_hp,
                foto,
            });
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: ValidationErrors = {};
                error.errors.forEach((err) => {
                    const path = err.path[0] as string;
                    newErrors[path] = err.message;
                });
                setErrors(newErrors);

                // Show toast for the first error
                const firstError = error.errors[0];
                if (firstError) {
                    toast({
                        title: 'Validasi Error',
                        description: firstError.message,
                        variant: 'destructive',
                    });
                }
            } else {
                console.error('Validation error:', error);
                toast({
                    title: 'Error',
                    description: 'Terjadi kesalahan. Silakan coba lagi.',
                    variant: 'destructive',
                });
            }
            return false;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate form
        const isValid = validateForm();
        if (!isValid) {
            setIsSubmitting(false);
            return;
        }

        // Create form data object with all fields
        const formData = {
            nama,
            posisi,
            departemen,
            no_hp,
            foto,
        };

        console.log('Form submitted:', formData);

        // Simulate API call
        setTimeout(() => {
            // Simulate successful API response
            toast({
                title: 'Berhasil!',
                description: 'Data pengurus berhasil ditambahkan',
            });

            // Reset form and close modal
            resetForm();
            setOpen(false);
            setIsSubmitting(false);
        }, 2000); // 2 second delay to simulate network request
    };

    const resetForm = () => {
        setNama('');
        setPosisi('');
        setDepartemen('');
        setNoHp('');
        setFoto(null);
        setFotoPreview(null);
        setErrors({});
    };

    // Format phone number input
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove non-numeric characters
        const value = e.target.value.replace(/\D/g, '');
        setNoHp(value);
        clearError('no_hp');
    };

    // Format phone number for display
    const formatPhoneNumber = (phoneNumber: string) => {
        if (!phoneNumber) return '';
        return phoneNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    };

    return (
        <>
            <Button className="gap-2" onClick={() => setOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Pengurus
            </Button>

            <Dialog
                open={open}
                onOpenChange={(newOpen) => {
                    if (!newOpen || !isSubmitting) {
                        setOpen(newOpen);
                        if (!newOpen) resetForm();
                    }
                }}
            >
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Pengurus Baru</DialogTitle>
                        <DialogDescription>Isi detail pengurus baru. Klik simpan setelah selesai.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4 flex flex-col items-center">
                            <div className="mb-2">
                                <Avatar className="h-24 w-24 cursor-pointer" onClick={() => document.getElementById('foto')?.click()}>
                                    {fotoPreview ? (
                                        <AvatarImage src={fotoPreview || '/placeholder.svg'} alt="Preview" />
                                    ) : (
                                        <>
                                            <AvatarFallback>{nama ? getInitials(nama) : '+'}</AvatarFallback>
                                            <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center rounded-full bg-black opacity-0 transition-opacity hover:opacity-100">
                                                <Upload className="h-8 w-8 text-white" />
                                            </div>
                                        </>
                                    )}
                                </Avatar>
                                <Input id="foto" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </div>
                            <p className="text-xs text-gray-500">Klik untuk mengunggah foto</p>
                            {fotoPreview && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => {
                                        setFoto(null);
                                        setFotoPreview(null);
                                    }}
                                >
                                    <X className="mr-1 h-3 w-3" /> Hapus Foto
                                </Button>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nama" className={`text-sm font-medium ${errors.nama ? 'text-destructive' : ''}`}>
                                Nama <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="nama"
                                value={nama}
                                onChange={(e) => {
                                    setNama(e.target.value);
                                    clearError('nama');
                                }}
                                placeholder="Masukkan nama lengkap"
                                className={errors.nama ? 'border-destructive' : ''}
                            />
                            {errors.nama && <p className="text-destructive text-xs">{errors.nama}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="posisi" className={`text-sm font-medium ${errors.posisi ? 'text-destructive' : ''}`}>
                                    Role <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="posisi"
                                    value={posisi}
                                    onChange={(e) => {
                                        setPosisi(e.target.value);
                                        clearError('posisi');
                                    }}
                                    placeholder="Masukkan posisi"
                                    className={errors.posisi ? 'border-destructive' : ''}
                                />
                                {errors.posisi && <p className="text-destructive text-xs">{errors.posisi}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="no_hp" className={`text-sm font-medium ${errors.no_hp ? 'text-destructive' : ''}`}>
                                    Nomor HP <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        id="no_hp"
                                        value={no_hp}
                                        onChange={handlePhoneChange}
                                        placeholder="Masukkan nomor HP"
                                        className={`pl-8 ${errors.no_hp ? 'border-destructive' : ''}`}
                                    />
                                </div>
                                {no_hp && <p className="text-xs text-gray-500">Format: {formatPhoneNumber(no_hp) || no_hp}</p>}
                                {errors.no_hp && <p className="text-destructive text-xs">{errors.no_hp}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="departemen" className={`text-sm font-medium ${errors.departemen ? 'text-destructive' : ''}`}>
                                Keterangan <span className="text-red-500">*</span>
                            </Label>
                            <textarea
                                id="departemen"
                                className={`focus:ring-primary min-h-[100px] w-full resize-none rounded-md border px-3 py-2 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:outline-none ${
                                    errors.departemen ? 'border-destructive focus:ring-destructive' : 'border-gray-300'
                                }`}
                            />
                            {errors.departemen && <p className="text-destructive text-xs">{errors.departemen}</p>}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
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

            {/* Image Cropper Modal */}
            <ImageCropper
                open={cropModalOpen}
                onOpenChange={setCropModalOpen}
                imageUrl={imageToCrop}
                onCropComplete={handleCroppedImage}
                aspectRatio={aspectRatio}
            />
        </>
    );
}
