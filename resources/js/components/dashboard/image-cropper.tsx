'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    imageUrl: string | null;
    onCropComplete: (croppedImageUrl: string, file: File) => void;
    aspectRatio: number;
}

export default function ImageCropper({ open, onOpenChange, imageUrl, onCropComplete, aspectRatio }: ImageCropperProps) {
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });

    // Reset crop when image changes
    useEffect(() => {
        if (open && imageUrl && imgRef.current && imgRef.current.complete) {
            initializeCrop();
        }
    }, [imageUrl, open]);

    function initializeCrop() {
        if (!imgRef.current) return;

        const { width, height } = imgRef.current;
        setImgDimensions({ width, height });

        // Calculate the maximum crop area that fits the aspect ratio
        let cropWidth, cropHeight;

        if (width / height > aspectRatio) {
            // Image is wider than our target aspect ratio
            cropHeight = height;
            cropWidth = height * aspectRatio;
        } else {
            // Image is taller than our target aspect ratio
            cropWidth = width;
            cropHeight = width / aspectRatio;
        }

        // Convert to percentage
        const percentWidth = (cropWidth / width) * 100;
        const percentHeight = (cropHeight / height) * 100;

        // Center the crop
        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: percentWidth,
                },
                aspectRatio,
                width,
                height,
            ),
            width,
            height,
        );

        setCrop(crop);
        setCompletedCrop(crop);
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        initializeCrop();
    }

    function handleCropComplete() {
        if (!imgRef.current || !completedCrop) return;

        const canvas = document.createElement('canvas');
        const image = imgRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        // Set canvas dimensions to match the cropped area
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;

        // Draw the cropped image onto the canvas
        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height,
        );

        // Convert the canvas to a blob
        canvas.toBlob(
            (blob) => {
                if (!blob) return;

                // Create a new file from the blob
                const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });

                // Get the data URL for preview
                const reader = new FileReader();
                reader.onload = () => {
                    onCropComplete(reader.result as string, file);
                };
                reader.readAsDataURL(blob);
            },
            'image/jpeg',
            0.95,
        ); // High quality JPEG
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="my-8 sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Crop Image (4:3 Landscape)</DialogTitle>
                </DialogHeader>
                <div className="py-3">
                    {imageUrl && (
                        <div className="flex flex-col items-center">
                            <div className="mb-2 text-sm text-gray-500">
                                Drag to adjust the crop area. The image will be cropped to a 4:3 landscape ratio.
                            </div>
                            <ReactCrop
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={aspectRatio}
                                className="mx-auto max-h-[30px] border"
                            >
                                <img
                                    ref={imgRef}
                                    src={imageUrl || '/placeholder.svg'}
                                    alt="Crop me"
                                    onLoad={onImageLoad}
                                    className="max-h-[30px] max-w-full"
                                    crossOrigin="anonymous"
                                />
                            </ReactCrop>

                            {imgDimensions.width > 0 && (
                                <div className="mt-2 text-xs text-gray-500">
                                    Original: {imgDimensions.width} x {imgDimensions.height} px | Crop: {Math.round(completedCrop?.width || 0)} x{' '}
                                    {Math.round(completedCrop?.height || 0)} px
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleCropComplete}>Apply Crop</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
