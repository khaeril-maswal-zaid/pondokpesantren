import React from 'react';
('use client');

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Crop as CropIcon } from 'lucide-react';
import ReactCrop, { type Crop as CropType } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export interface CropDialog {
    open: boolean;
    onClose: () => void;
    onCropDone: (base64: string) => void;
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

export function CropDialog({
    open,
    onClose,
    onCropDone,
    src,
    crop,
    setCrop,
    setCompletedCrop,
    onImageLoad,
    generateCrop,
    previewCanvasRef,
    aspectRatio,
}: CropDialog) {
    const handleSave = () => {
        // generate the cropped image on canvas
        generateCrop();
        // get base64 data and pass to parent
        const base64 = previewCanvasRef.current!.toDataURL();
        onCropDone(base64);

        // return;
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="h-[90vh] max-w-md overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Potong Foto</DialogTitle>
                </DialogHeader>

                <div className="rounded-lg border bg-gray-50 p-4">
                    <p className="mb-4 text-sm text-gray-500">
                        Tentukan posisi terbaik untuk foto — sesuaikan area potong agar hasil terlihat optimal.
                    </p>
                    <div className="relative mx-auto">
                        <ReactCrop
                            crop={crop}
                            onChange={setCrop}
                            onComplete={setCompletedCrop}
                            aspect={aspectRatio}
                            className="mx-auto max-h-[400px]"
                        >
                            <img alt="Crop me" src={src} onLoad={(e) => onImageLoad(e.currentTarget)} className="mx-auto max-h-[400px]" />
                        </ReactCrop>
                    </div>
                </div>

                <canvas ref={previewCanvasRef} className="hidden" />

                <DialogFooter className="mt-4 flex justify-end">
                    <Button onClick={handleSave}>
                        <CropIcon className="mr-2 h-4 w-4" /> Simpan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
