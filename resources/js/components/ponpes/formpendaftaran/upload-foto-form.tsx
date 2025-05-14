'use client';

import FotoCropper from '@/components/ponpes/FotoCropper';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ImageIcon, RefreshCw, Upload } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';

interface UploadFotoFormProps {
    form: UseFormReturn<any>;
}

export function UploadFotoForm({ form }: UploadFotoFormProps) {
    const [src, setSrc] = useState<string | null>(null);
    const [isCropping, setIsCropping] = useState(false);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [crop, setCrop] = useState({ unit: '%', width: 75, height: 100, x: 12.5, y: 0, aspect: 3 / 4 });
    const [completedCrop, setCompletedCrop] = useState(null);

    const imgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            if (file.size > 510 * 1024) {
                alert('Ukuran foto tidak boleh melebihi 510 KB');
                e.target.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setSrc(reader.result as string);
                setIsCropping(true);
                setCroppedImage(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const onImageLoad = useCallback((img: HTMLImageElement) => {
        imgRef.current = img;
        // center crop logic...
        const width = img.width * 0.75;
        const height = width * (4 / 3);
        setCrop({ unit: 'px', width, height, x: (img.width - width) / 2, y: (img.height - height) / 2, aspect: 3 / 4 });
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
        setCroppedImage(base64);
        form.setValue('foto', base64);
        setIsCropping(false);
    }, [completedCrop, form]);

    const resetCrop = () => {
        setSrc(null);
        setCroppedImage(null);
        setIsCropping(false);
        form.setValue('foto', null);
    };

    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="foto"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Foto Santri (Ukuran 3x4)</FormLabel>
                        <FormControl>
                            <div className="space-y-4">
                                {!src && !croppedImage && (
                                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                                        <ImageIcon className="mb-4 h-12 w-12 text-gray-400" />
                                        <p className="mb-4 text-sm text-gray-500">Upload foto dengan ukuran 3x4 dengan latar belakang berwarna</p>
                                        <Button type="button" onClick={() => document.getElementById('foto-upload')?.click()}>
                                            <Upload className="mr-2 h-4 w-4" /> Pilih Foto
                                        </Button>
                                        <input id="foto-upload" type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
                                    </div>
                                )}

                                {isCropping && src && (
                                    <FotoCropper
                                        src={src}
                                        crop={crop}
                                        completedCrop={completedCrop}
                                        setCrop={setCrop}
                                        setCompletedCrop={setCompletedCrop}
                                        onImageLoad={onImageLoad}
                                        generateCrop={generateCrop}
                                        resetCrop={resetCrop}
                                        previewCanvasRef={previewCanvasRef}
                                    />
                                )}

                                {croppedImage && !isCropping && (
                                    <div className="space-y-4">
                                        <Card className="flex flex-col items-center p-4">
                                            <p className="mb-2 text-sm font-medium">Hasil Foto 3x4</p>
                                            <div className="overflow-hidden rounded border" style={{ width: '3in', height: '4in' }}>
                                                <img src={croppedImage} alt="Cropped" className="h-full w-full object-cover" />
                                            </div>
                                        </Card>
                                        <div className="flex justify-end">
                                            <Button type="button" variant="outline" onClick={resetCrop}>
                                                <RefreshCw className="mr-2 h-4 w-4" /> Ganti Foto
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                    </FormItem>
                )}
            />
        </div>
    );
}
