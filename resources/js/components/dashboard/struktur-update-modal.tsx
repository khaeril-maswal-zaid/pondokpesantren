'use client';

import type React from 'react';

import { CropDialog } from '@/components/dashboard/crop-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { router } from '@inertiajs/react';
import { Loader2, Phone, Upload, X } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { z } from 'zod';

// Define validation schema
const strukturSchema = z.object({
    nama: z.string().min(3, 'Nama harus minimal 3 karakter'),
    role: z.string().min(3, 'Role harus minimal 3 karakter'),
    keterangan: z.string().min(3, 'Keterangan harus minimal 3 karakter'),
    no_hp: z.string().min(10, 'Nomor HP harus minimal 10 karakter').max(15, 'Nomor HP maksimal 15 karakter'),
    foto: z.any().optional(),
});

type ValidationErrors = {
    [key: string]: string | undefined;
};

interface Props {
    selectedUpdate: any;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export default function StrukturUpdateModal({ selectedUpdate, isOpen, onOpenChange }: Props) {
    const [cropDialogOpen, setCropDialogOpen] = useState(false);

    const [open, setOpen] = useState(isOpen);
    const [nama, setNama] = useState(selectedUpdate.name);
    const [role, setRole] = useState(selectedUpdate.role);
    const [keterangan, setKeterangan] = useState(selectedUpdate.keterangan);
    const [no_hp, setNoHp] = useState(selectedUpdate.no_hp);
    const [foto, setFoto] = useState(selectedUpdate.image);

    const imageSrc = typeof foto === 'string' && foto.startsWith('data:image') ? foto : `/storage/${foto}`;

    // Cropping states
    const [src, setSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({
        unit: '%',
        width: 75,
        height: 100,
        x: 12.5,
        y: 0,
        aspect: 3 / 4,
    });
    const [completedCrop, setCompletedCrop] = useState(null);

    const imgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

    // ganti onSelectFile menjadi:
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

    const onImageLoad = useCallback((img: HTMLImageElement) => {
        imgRef.current = img;
        const width = img.width * 0.75;
        const height = width * (4 / 3);
        setCrop({
            unit: 'px',
            width,
            height,
            x: (img.width - width) / 2,
            y: (img.height - height) / 2,
            aspect: 3 / 4,
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

    const resetCrop = () => {
        setSrc(null);
        setFoto('');
    };

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [errorsServer, setErrorsServer] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const validateForm = () => {
        try {
            strukturSchema.parse({ nama, role, keterangan, no_hp, foto });
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: ValidationErrors = {};
                error.errors.forEach((err) => {
                    const path = err.path[0] as string;
                    newErrors[path] = err.message;
                });
                setErrors(newErrors);
                const firstError = error.errors[0];
                if (firstError) {
                    toast({
                        title: 'Validasi Error',
                        description: firstError.message,
                        variant: 'destructive',
                    });
                }
            } else {
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
        const isValid = validateForm();
        if (!isValid) {
            setIsSubmitting(false);
            return;
        }

        router.put(
            route('struktur.update', selectedUpdate.id),
            {
                nama: nama,
                role: role,
                keterangan: keterangan,
                no_hp: no_hp,
                foto: foto,
            },
            {
                onError: (e) => {
                    setErrorsServer(e);
                    setIsSubmitting(false);
                },
                onSuccess: () => {
                    toast({
                        title: 'Berhasil!',
                        description: 'Data pengurus berhasil diedit',
                    });
                    resetForm();
                    setOpen(false);
                    setIsSubmitting(false);
                },
            },
        );
    };

    const batalButton = () => {
        onOpenChange(false);
        setOpen(false);
        resetForm();
        setIsSubmitting(false);
        setErrorsServer('');
    };

    const resetForm = () => {
        setNama('');
        setRole('');
        setKeterangan('');
        setNoHp('');
        setFoto('');
        setErrors({});
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setNoHp(value);
        clearError('no_hp');
    };

    const formatPhoneNumber = (phoneNumber: string) => {
        if (!phoneNumber) return '';
        return phoneNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    };

    return (
        <>
            <Dialog
                open={open}
                onOpenChange={(newOpen) => {
                    // langsung panggil parent
                    onOpenChange(newOpen);
                    if (!newOpen) resetForm();
                }}
            >
                <DialogContent className="h-[90vh] max-w-md overflow-y-auto sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Pengurus Baru</DialogTitle>
                        <DialogDescription className="mb-3">Isi detail pengurus baru. Klik simpan setelah selesai.</DialogDescription>

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
                        <div className="mb-4 flex flex-col items-center">
                            <div className="mb-2">
                                <Avatar className="h-24 w-24 cursor-pointer" onClick={() => document.getElementById('foto')?.click()}>
                                    {foto ? (
                                        <AvatarImage src={imageSrc} alt="Preview" />
                                    ) : (
                                        <>
                                            <AvatarFallback>{nama ? getInitials(nama) : '+'}</AvatarFallback>
                                            <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center rounded-full bg-black opacity-0 transition-opacity hover:opacity-100">
                                                <Upload className="h-8 w-8 text-white" />
                                            </div>
                                        </>
                                    )}
                                </Avatar>
                                <Input id="foto" type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
                            </div>
                            <p className="text-xs text-gray-500">Klik untuk mengunggah foto</p>
                            {foto && (
                                <Button type="button" variant="outline" size="sm" className="mt-2" onClick={resetCrop}>
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
                                <Label htmlFor="role" className={`text-sm font-medium ${errors.role ? 'text-destructive' : ''}`}>
                                    Role <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="role"
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                        clearError('role');
                                    }}
                                    placeholder="Masukkan role"
                                    className={errors.role ? 'border-destructive' : ''}
                                />
                                {errors.role && <p className="text-destructive text-xs">{errors.role}</p>}
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
                                {no_hp && <p className="text-xs text-gray-500">Format: {formatPhoneNumber(no_hp)}</p>}
                                {errors.no_hp && <p className="text-destructive text-xs">{errors.no_hp}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="keterangan" className={`text-sm font-medium ${errors.keterangan ? 'text-destructive' : ''}`}>
                                Keterangan <span className="text-red-500">*</span>
                            </Label>
                            <textarea
                                id="keterangan"
                                value={keterangan}
                                onChange={(e) => {
                                    setKeterangan(e.target.value);
                                    clearError('keterangan');
                                }}
                                className={`focus:ring-primary min-h-[100px] w-full resize-none rounded-md border px-3 py-2 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:outline-none ${
                                    errors.keterangan ? 'border-destructive focus:ring-destructive' : 'border-gray-300'
                                }`}
                            />
                            {errors.keterangan && <p className="text-destructive text-xs">{errors.keterangan}</p>}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => batalButton()}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Mengedit...
                                    </>
                                ) : (
                                    'Edit'
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
                resetCrop={resetCrop}
                previewCanvasRef={previewCanvasRef}
                aspectRatio={3 / 4}
            />
        </>
    );
}
