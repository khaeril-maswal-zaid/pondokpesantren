'use client';

import type React from 'react';

// import ImageCropper from '@/components/dashboard/image-cropper';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { router } from '@inertiajs/react';
import { Calendar, Loader2, PlusCircle, Upload } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { z } from 'zod';
import { CropDialog } from './crop-dialog';

// Define validation schema
const agendaSchema = z.object({
    nama_agenda: z.string().min(5, 'Nama agenda harus minimal 5 karakter'),
    date: z.string().min(1, 'Tanggal harus diisi'),
    time1: z.string().min(1, 'Waktu harus diisi'),
    lokasi: z.string().min(3, 'Lokasi harus minimal 3 karakter'),
    time2: z.string().min(1, 'Waktu harus diisi'),
    // foto: z.array(z.any()).min(1, 'Minimal satu foto harus diunggah'),
    foto: z.any().optional(),
});

type ValidationErrors = {
    [key: string]: string | undefined;
};

export default function AgendaCreateModal() {
    const [open, setOpen] = useState(false);
    const [nama_agenda, setNamaAgenda] = useState('');
    const [date, setDate] = useState('');
    const [time1, setTime1] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [time2, setTime2] = useState('');

    // Image states

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

    const [errorsServer, setErrorsServer] = useState('');

    //---------------------------------------------------

    const [src, setSrc] = useState<string | null>(null);

    const [cropDialogOpen, setCropDialogOpen] = useState(false);
    const [foto, setFoto] = useState('');
    const [completedCrop, setCompletedCrop] = useState(null);

    const imgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const onImageLoad = useCallback((img: HTMLImageElement) => {
        imgRef.current = img;
        const width = img.width * 0.75;
        const height = width * (3 / 4);
        setCrop({
            unit: 'px',
            width,
            height,
            x: (img.width - width) / 2,
            y: (img.height - height) / 2,
            aspect: aspectRatio,
        });
        return false;
    }, []);

    const generateCrop = useCallback(() => {
        if (!completedCrop || !imgRef.current || !previewCanvasRef.current) return;
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const { width, height, x, y } = completedCrop;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = width * scaleX;
        canvas.height = height * scaleY;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(image, x * scaleX, y * scaleY, width * scaleX, height * scaleY, 0, 0, width * scaleX, height * scaleY);
        let base64 = canvas.toDataURL('image/jpeg', 1.0);
        if (base64.length > 700000) base64 = canvas.toDataURL('image/jpeg', 0.8);
        setFoto(base64);
    }, [completedCrop]);

    const [crop, setCrop] = useState({
        unit: '%',
        width: 75,
        height: 100,
        x: 12.5,
        y: 0,
        aspect: aspectRatio,
    });

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        if (file.size > 510 * 1024) {
            toast({
                title: `Gagal Upload Foto`,
                description: `Ukuran foto tidak boleh melebihi 510 KB`,
            });

            e.target.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setSrc(reader.result as string);
        };
        reader.readAsDataURL(file);

        setCropDialogOpen(true);
    };

    //----------------------------------------------------
    //     if (foto[index]) {
    //         setCurrentPhotoIndex(index);
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setImageToCrop(reader.result as string);
    //             setCropModalOpen(true);
    //         };
    //         reader.readAsDataURL(foto[index]);
    //     } else if (photosPreviews[index]) {
    //         setCurrentPhotoIndex(index);
    //         setImageToCrop(photosPreviews[index]);
    //         setCropModalOpen(true);
    //     }
    // };

    const validateForm = () => {
        try {
            agendaSchema.parse({
                nama_agenda,
                date,
                time1,
                lokasi,
                time2,
                foto: foto,
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

        router.post(
            route('agenda.store'),
            {
                nama_agenda,
                date,
                time1,
                lokasi,
                time2,
                foto,
            },
            {
                onError: (e) => {
                    setErrorsServer(e);
                    setIsSubmitting(false);
                },
                onSuccess: () => {
                    toast({
                        title: 'Berhasil!',
                        description: 'Agenda berhasil dibuat',
                    });
                    resetForm();
                    setOpen(false);
                    setIsSubmitting(false);
                },
            },
        );
    };

    const resetForm = () => {
        setNamaAgenda('');
        setDate('');
        setTime1('');
        setLokasi('');
        setTime2('');
        setFoto('');
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
                <DialogContent className="h-[90vh] max-w-md overflow-y-auto sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Agenda Baru</DialogTitle>
                        <DialogDescription>Isi detail agenda baru. Klik simpan setelah selesai.</DialogDescription>

                        {/* Menampilkan list error */}
                        {Object.keys(errorsServer).length > 0 && (
                            <div className="mb-4 rounded bg-red-100 p-4 text-red-700">
                                <ul className="list-inside list-disc">
                                    {Object.values(errorsServer).map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
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
                                <Label htmlFor="date" className={`text-sm font-medium ${errors.date ? 'text-destructive' : ''}`}>
                                    Waktu <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        id="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => {
                                            setDate(e.target.value);
                                            clearError('date');
                                        }}
                                        className={`pl-8 ${errors.date ? 'border-destructive' : ''}`}
                                    />
                                </div>
                                {errors.date && <p className="text-destructive text-xs">{errors.date}</p>}
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

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="time1" className={`text-sm font-medium ${errors.time1 ? 'text-destructive' : ''}`}>
                                    Waktu Mulai <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="time"
                                    id="time1"
                                    value={time1}
                                    onChange={(e) => {
                                        setTime1(e.target.value);
                                        clearError('time1');
                                    }}
                                    placeholder="Masukkan waktu mulai"
                                    className={errors.time1 ? 'border-destructive' : ''}
                                />
                                {errors.time1 && <p className="text-destructive text-xs">{errors.time1}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="time2" className={`text-sm font-medium ${errors.time2 ? 'text-destructive' : ''}`}>
                                    Waktu berakhir <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="time"
                                    id="time2"
                                    value={time2}
                                    onChange={(e) => {
                                        setTime2(e.target.value);
                                        clearError('time2');
                                    }}
                                    placeholder="Masukkan waktu bearkhir"
                                    className={errors.time2 ? 'border-destructive' : ''}
                                />
                                {errors.time2 && <p className="text-destructive text-xs">{errors.time2}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className={`text-sm font-medium ${errors.foto ? 'text-destructive' : ''}`}>
                                Foto Agenda <span className="text-red-500">*</span> (4:3 landscape ratio)
                            </Label>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-wrap gap-4">
                                    {foto ? (
                                        <div className="relative h-[90px] w-[120px]">
                                            <img
                                                src={foto || '/placeholder.svg'}
                                                alt={`Preview ${foto}`}
                                                className="h-full w-full rounded-md border object-cover"
                                            />
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    <div
                                        className={`hover:border-primary/50 flex h-[90px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-2 transition-colors ${
                                            errors.foto ? 'border-destructive' : 'border-gray-300'
                                        }`}
                                        onClick={() => document.getElementById('add-photo')?.click()}
                                    >
                                        <Upload className="mb-1 h-6 w-6 text-gray-400" />
                                        <p className="text-xs text-gray-500">Tambah Foto</p>
                                        <Input id="add-photo" type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
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

            <CropDialog
                open={cropDialogOpen}
                onClose={() => {
                    setCropDialogOpen(false);
                }}
                onCropDone={(base64) => {
                    setFoto(base64);
                }}
                src={src!}
                crop={crop}
                setCrop={setCrop}
                setCompletedCrop={setCompletedCrop}
                onImageLoad={onImageLoad}
                generateCrop={generateCrop}
                previewCanvasRef={previewCanvasRef}
                aspectRatio={aspectRatio}
            />
        </>
    );
}
