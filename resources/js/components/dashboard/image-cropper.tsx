'use client';

import { Button } from '@/components/ui/button';
import { Crop } from 'lucide-react';
import React from 'react';
import ReactCrop, { type Crop as CropType } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export interface FotoCropperProps {
    src: string;
    crop: CropType;
    completedCrop: CropType | null;
    setCrop: (c: CropType) => void;
    setCompletedCrop: (c: CropType | null) => void;
    onImageLoad: (img: HTMLImageElement) => boolean;
    generateCrop: () => void;
    resetCrop: () => void;
    previewCanvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function FotoCropper({
    src,
    crop,
    completedCrop,
    setCrop,
    setCompletedCrop,
    onImageLoad,
    generateCrop,
    resetCrop,
    previewCanvasRef,
}: FotoCropperProps) {
    return (
        <>
            <div className="rounded-lg border bg-gray-50 p-4">
                <p className="mb-2 text-sm text-gray-500">Sesuaikan area foto dengan rasio 3:4</p>
                <p className="mb-4 text-sm text-gray-500">
                    <strong>Panduan posisi wajah:</strong> Pastikan wajah berada di tengah frame dan menempati sekitar 70-80% dari tinggi foto. Mata
                    sebaiknya berada pada 1/3 bagian atas foto.
                </p>
                <div className="relative mx-auto">
                    <ReactCrop crop={crop} onChange={setCrop} onComplete={setCompletedCrop} aspect={3 / 4} className="mx-auto max-h-[400px]">
                        <img alt="Crop me" src={src} onLoad={(e) => onImageLoad(e.currentTarget)} className="mx-auto max-h-[400px]" />
                    </ReactCrop>
                </div>
            </div>
            <div className="flex justify-between">
                <Button type="button" onClick={generateCrop}>
                    <Crop className="mr-2 h-4 w-4" /> Potong Foto
                </Button>
            </div>
            <canvas ref={previewCanvasRef} className="hidden" />
        </>
    );
}
