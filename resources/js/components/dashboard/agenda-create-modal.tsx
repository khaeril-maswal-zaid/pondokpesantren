'use client';

import type React from 'react';

import ImageCropper from '@/components/dashboard/image-cropper';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Calendar, CropIcon, Loader2, PlusCircle, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

// Define validation schema
const agendaSchema = z.object({
    nama_agenda: z.string().min(5, 'Nama agenda harus minimal 5 karakter'),
    waktu: z.string().min(1, 'Waktu harus diisi'),
    tempat: z.string().min(3, 'Tempat harus minimal 3 karakter'),
    lokasi: z.string().min(3, 'Lokasi harus minimal 3 karakter'),
    deskripsi: z.string().min(10, 'Deskripsi harus minimal 10 karakter'),
    status: z.enum(['Upcoming', 'Completed']),
    foto: z.array(z.any()).min(1, 'Minimal satu foto harus diunggah'),
});

type ValidationErrors = {
    [key: string]: string | undefined;
};

export default function AgendaCreateModal() {
    const [open, setOpen] = useState(false);
    const [nama_agenda, setNamaAgenda] = useState('');
    const [waktu, setWaktu] = useState('');
    const [tempat, setTempat] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [status, setStatus] = useState<'Upcoming' | 'Completed'>('Upcoming');

    // Image states
    const [photos, setPhotos] = useState<File[]>([]);
    const [photosPreviews, setPhotosPreviews] = useState<string[]>([]);

    // Cropping states
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(null);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

    // Validation states
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Landscape aspect ratio (4:3)
    const aspectRatio = 4 / 3;

    // Reset errors when inputs change
    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
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
        if (currentPhotoIndex !== null) {
            // Replace existing photo
            const newPhotos = [...photos];
            const newPreviews = [...photosPreviews];
            newPhotos[currentPhotoIndex] = file;
            newPreviews[currentPhotoIndex] = croppedImage;
            setPhotos(newPhotos);
            setPhotosPreviews(newPreviews);
        } else {
            // Add new photo
            setPhotos([...photos, file]);
            setPhotosPreviews([...photosPreviews, croppedImage]);
        }

        setCropModalOpen(false);
        setCurrentPhotoIndex(null);
        setImageToCrop(null);
        clearError('foto');
    };

    const removePhoto = (index: number) => {
        const newPhotos = [...photos];
        const newPreviews = [...photosPreviews];
        newPhotos.splice(index, 1);
        newPreviews.splice(index, 1);
        setPhotos(newPhotos);
        setPhotosPreviews(newPreviews);

        if (newPhotos.length === 0) {
            setErrors((prev) => ({ ...prev, foto: 'Minimal satu foto harus diunggah' }));
        }
    };

    const editPhoto = (index: number) => {
        if (photos[index]) {
            setCurrentPhotoIndex(index);
            const reader = new FileReader();
            reader.onload = () => {
                setImageToCrop(reader.result as string);
                setCropModalOpen(true);
            };
            reader.readAsDataURL(photos[index]);
        } else if (photosPreviews[index]) {
            setCurrentPhotoIndex(index);
            setImageToCrop(photosPreviews[index]);
            setCropModalOpen(true);
        }
    };

    const validateForm = () => {
        try {
            agendaSchema.parse({
                nama_agenda,
                waktu,
                tempat,
                lokasi,
                deskripsi,
                status,
                foto: photos,
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
            nama_agenda,
            waktu,
            tempat,
            lokasi,
            deskripsi,
            status,
            foto: photos,
        };

        console.log('Form submitted:', formData);

        // Simulate API call
        setTimeout(() => {
            // Simulate successful API response
            toast({
                title: 'Berhasil!',
                description: 'Agenda berhasil dibuat',
            });

            // Reset form and close modal
            resetForm();
            setOpen(false);
            setIsSubmitting(false);
        }, 2000); // 2 second delay to simulate network request
    };

    const resetForm = () => {
        setNamaAgenda('');
        setWaktu('');
        setTempat('');
        setLokasi('');
        setDeskripsi('');
        setStatus('Upcoming');
        setPhotos([]);
        setPhotosPreviews([]);
        setErrors({});
    };

    return (
        <>
            <Button className="gap-2" onClick={() => setOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Agenda
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
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Agenda Baru</DialogTitle>
                        <DialogDescription>Isi detail agenda baru. Klik simpan setelah selesai.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nama_agenda" className={`text-sm font-medium ${errors.nama_agenda ? 'text-destructive' : ''}`}>
                                Nama Agenda <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="nama_agenda"
                                value={nama_agenda}
                                onChange={(e) => {
                                    setNamaAgenda(e.target.value);
                                    clearError('nama_agenda');
                                }}
                                placeholder="Masukkan nama agenda"
                                className={errors.nama_agenda ? 'border-destructive' : ''}
                            />
                            {errors.nama_agenda && <p className="text-destructive text-xs">{errors.nama_agenda}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="waktu" className={`text-sm font-medium ${errors.waktu ? 'text-destructive' : ''}`}>
                                    Waktu <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        id="waktu"
                                        type="datetime-local"
                                        value={waktu}
                                        onChange={(e) => {
                                            setWaktu(e.target.value);
                                            clearError('waktu');
                                        }}
                                        className={`pl-8 ${errors.waktu ? 'border-destructive' : ''}`}
                                    />
                                </div>
                                {errors.waktu && <p className="text-destructive text-xs">{errors.waktu}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-sm font-medium">
                                    Status
                                </Label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as 'Upcoming' | 'Completed')}
                                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="Upcoming">Upcoming</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="tempat" className={`text-sm font-medium ${errors.tempat ? 'text-destructive' : ''}`}>
                                    Tempat <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="tempat"
                                    value={tempat}
                                    onChange={(e) => {
                                        setTempat(e.target.value);
                                        clearError('tempat');
                                    }}
                                    placeholder="Masukkan tempat"
                                    className={errors.tempat ? 'border-destructive' : ''}
                                />
                                {errors.tempat && <p className="text-destructive text-xs">{errors.tempat}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lokasi" className={`text-sm font-medium ${errors.lokasi ? 'text-destructive' : ''}`}>
                                    Lokasi <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="lokasi"
                                    value={lokasi}
                                    onChange={(e) => {
                                        setLokasi(e.target.value);
                                        clearError('lokasi');
                                    }}
                                    placeholder="Masukkan lokasi"
                                    className={errors.lokasi ? 'border-destructive' : ''}
                                />
                                {errors.lokasi && <p className="text-destructive text-xs">{errors.lokasi}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="deskripsi" className={`text-sm font-medium ${errors.deskripsi ? 'text-destructive' : ''}`}>
                                Deskripsi <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="deskripsi"
                                value={deskripsi}
                                onChange={(e) => {
                                    setDeskripsi(e.target.value);
                                    clearError('deskripsi');
                                }}
                                placeholder="Masukkan deskripsi agenda"
                                className={`min-h-[100px] ${errors.deskripsi ? 'border-destructive' : ''}`}
                            />
                            {errors.deskripsi && <p className="text-destructive text-xs">{errors.deskripsi}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className={`text-sm font-medium ${errors.foto ? 'text-destructive' : ''}`}>
                                Foto Agenda <span className="text-red-500">*</span> (4:3 landscape ratio)
                            </Label>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-wrap gap-4">
                                    {photosPreviews.map((preview, index) => (
                                        <div key={index} className="relative h-[90px] w-[120px]">
                                            <img
                                                src={preview || '/placeholder.svg'}
                                                alt={`Preview ${index + 1}`}
                                                className="h-full w-full rounded-md border object-cover"
                                            />
                                            <div className="absolute top-1 right-1 flex gap-1">
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    size="icon"
                                                    className="h-6 w-6 bg-white"
                                                    onClick={() => editPhoto(index)}
                                                >
                                                    <CropIcon className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => removePhoto(index)}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    <div
                                        className={`hover:border-primary/50 flex h-[90px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-2 transition-colors ${
                                            errors.foto ? 'border-destructive' : 'border-gray-300'
                                        }`}
                                        onClick={() => document.getElementById('add-photo')?.click()}
                                    >
                                        <Upload className="mb-1 h-6 w-6 text-gray-400" />
                                        <p className="text-xs text-gray-500">Tambah Foto</p>
                                        <Input id="add-photo" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </div>
                                </div>
                                {errors.foto && <p className="text-destructive text-xs">{errors.foto}</p>}
                            </div>
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
