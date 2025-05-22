'use client';

import type React from 'react';

import { CropDialog } from '@/components/dashboard/crop-dialog';
import RichTextEditor from '@/components/dashboard/rich-text-editor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { CropIcon, Loader2, PlusCircle, Upload, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { z } from 'zod';

// Definisikan skema validasi
const blogPostSchema = z.object({
    title: z.string().min(5, 'Judul harus terdiri dari minimal 5 karakter').max(100, 'Judul tidak boleh lebih dari 100 karakter'),
    description: z.string().min(10, 'Deskripsi harus terdiri dari minimal 10 karakter').max(255, 'Deskripsi tidak boleh lebih dari 500 karakter'),
    body1: z.string().min(20, 'Konten utama harus terdiri dari minimal 20 karakter'),
    body2: z.string().optional(),
    category: z.string().nonempty('Kategori wajib dipilih'),
    tags: z.array(z.string()).min(1, 'Minimal 1 tag harus dipilih').max(5, 'Maksimal 5 tag yang diperbolehkan'),
    // Jika ingin menjadikan mainImage wajib diunggah, gunakan kode ini:// mainImage: z.any().refine((file) => file instanceof File, {//     message: 'Gambar utama wajib diunggah',// }),
    mainImage: z.any().optional(),
    subImage1: z.any().optional(),
    subImage2: z.any().optional(),
});

type ValidationErrors = {
    [key: string]: string | undefined;
};

export default function BlogPostModal() {
    const { auth } = usePage().props;

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body1, setBody1] = useState('');
    const [body2, setBody2] = useState('');
    const [category, setCategory] = useState('');

    // Image states
    const [mainImage, setMainImage] = useState('');
    const [subImage1, setSubImage1] = useState('');
    const [subImage2, setSubImage2] = useState('');

    // Cropping states
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState('media');

    // Validation states
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pulse effect state
    const [pulse, setPulse] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    const [errorsServer, setErrorsServer] = useState('');

    //---------------------------------------------------

    const [src, setSrc] = useState<string | null>(null);

    const [cropDialogOpen, setCropDialogOpen] = useState(false);
    const [completedCrop, setCompletedCrop] = useState(null);

    const imgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

    // Landscape aspect ratio (4:3)
    const aspectRatio = 4 / 3;

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
        setMainImage(base64);
    }, [completedCrop]);

    const resetCrop = () => {
        setSrc(null);
        setMainImage('');
    };

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

    // Reset errors when inputs change
    useEffect(() => {
        if (errors.title && title.length >= 5) {
            setErrors((prev) => ({ ...prev, title: undefined }));
        }
        if (errors.description && description.length >= 10) {
            setErrors((prev) => ({ ...prev, description: undefined }));
        }
        if (errors.body1 && body1.length >= 20) {
            setErrors((prev) => ({ ...prev, body1: undefined }));
        }
        if (errors.mainImage && mainImage) {
            setErrors((prev) => ({ ...prev, mainImage: undefined }));
        }
        if (errors.tags && tags.length >= 1) {
            setErrors((prev) => ({ ...prev, tags: undefined }));
        }
        if (errors.category && category.length >= 1) {
            setErrors((prev) => ({ ...prev, category: undefined }));
        }
    }, [title, description, body1, mainImage, tags, errors]);

    // Handle pulse effect
    useEffect(() => {
        if (pulse) {
            const timer = setTimeout(() => {
                setPulse(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [pulse]);

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Create tag when semicolon is pressed
        if (e.key === ';' && tagInput.trim() !== '') {
            e.preventDefault();
            const newTag = tagInput.trim().replace(';', '');
            if (newTag && !tags.includes(newTag)) {
                // Check if adding this tag would exceed the limit
                if (tags.length >= 5) {
                    setErrors((prev) => ({ ...prev, tags: 'Maximum 5 tags allowed' }));
                    return;
                }
                setTags([...tags, newTag]);
                if (errors.tags) {
                    setErrors((prev) => ({ ...prev, tags: undefined }));
                }
            }
            setTagInput('');
        }
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTagInput(value);

        // Check if the input ends with a semicolon
        if (value.endsWith(';')) {
            const newTag = value.slice(0, -1).trim();
            if (newTag && !tags.includes(newTag)) {
                // Check if adding this tag would exceed the limit
                if (tags.length >= 5) {
                    setErrors((prev) => ({ ...prev, tags: 'Maximum 5 tags allowed' }));
                    return;
                }
                setTags([...tags, newTag]);
                if (errors.tags) {
                    setErrors((prev) => ({ ...prev, tags: undefined }));
                }
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
        // If we're removing a tag and now have none, show the error
        if (tags.length <= 1) {
            setErrors((prev) => ({ ...prev, tags: 'At least one tag is required' }));
        }
    };

    const validateForm = () => {
        try {
            blogPostSchema.parse({
                title,
                description,
                body1,
                body2,
                category,
                tags,
                mainImage,
                subImage1,
                subImage2,
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
                        title: 'Validation Error',
                        description: firstError.message,
                        variant: 'destructive',
                    });
                }
            } else {
                // Handle unexpected errors
                console.error('Validation error:', error);
                toast({
                    title: 'Error',
                    description: 'An unexpected error occurred. Please try again.',
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
            route('blog.store'),
            {
                title,
                description,
                body1, // This will contain HTML from the rich text editor
                body2, // This will contain HTML from the rich text editor
                mainImage,
                subImage1,
                subImage2,
                tags,
                category,
            },
            {
                onError: (e) => {
                    setErrorsServer(e);
                    setIsSubmitting(false);
                },
                onSuccess: () => {
                    toast({
                        title: 'Berhasil!',
                        description: 'Blog berhasil dipublis',
                    });
                    resetForm();
                    setOpen(false);
                    setIsSubmitting(false);
                },
            },
        );
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setBody1('');
        setBody2('');
        setCategory('');
        setMainImage('');
        setSubImage1('');
        setSubImage2('');
        setTagInput('');
        setTags([]);
        setActiveTab('media');
        setErrors({});
    };

    // Handle outside click (prevent closing and add pulse effect)
    const handleOpenChange = (newOpen: boolean) => {
        if (open && !newOpen) {
            // User is trying to close the modal by clicking outside
            setPulse(true);
            // Don't allow closing
            return;
        }
        setOpen(newOpen);
    };

    return (
        <>
            <Button className="gap-2" onClick={() => setOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Post
            </Button>

            <Dialog open={open} onOpenChange={handleOpenChange} modal={false}>
                <DialogContent
                    className={'overflow-hidden p-0 transition-all duration-300 sm:max-w-[1000px]'}
                    ref={dialogRef}
                    onInteractOutside={(e) => {
                        e.preventDefault();
                        setPulse(true);
                    }}
                    onEscapeKeyDown={(e) => {
                        e.preventDefault();
                        setPulse(true);
                    }}
                    // Remove the default close button and add our own
                    closeButton={false}
                >
                    <DialogHeader className="relative p-6 pb-2">
                        <DialogTitle>Buat Postingan Blog Baru</DialogTitle>
                        <DialogDescription>
                            Isi detail di bawah ini untuk membuat postingan blog baru. Klik Save Post ketika selesai.
                        </DialogDescription>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm p-0 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
                            onClick={() => setOpen(false)}
                        >
                            <X className="h-3" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </DialogHeader>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

                        <div className="px-6">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="media">Step 1</TabsTrigger>
                                <TabsTrigger value="content">Step 2</TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="h-[calc(90vh-180px)] overflow-hidden">
                            <ScrollArea className="h-full w-full">
                                <div className="p-6">
                                    <TabsContent value="media" className="mt-0">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            {/* Left column - Title and Description */}
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="title" className={cn('text-sm font-medium', errors.title && 'text-destructive')}>
                                                        Judul <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input
                                                        id="title"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        placeholder="Enter blog post title"
                                                        required
                                                        autoFocus
                                                        className={errors.title ? 'border-destructive' : ''}
                                                    />
                                                    {errors.title && <p className="text-destructive text-xs">{errors.title}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="description"
                                                        className={cn('text-sm font-medium', errors.description && 'text-destructive')}
                                                    >
                                                        Deskripsi <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Textarea
                                                        id="description"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        placeholder="Enter a short description"
                                                        required
                                                        className={cn('min-h-[150px]', errors.description && 'border-destructive')}
                                                    />
                                                    {errors.description && <p className="text-destructive text-xs">{errors.description}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="author" className="text-sm font-medium">
                                                        Penulis
                                                    </Label>
                                                    <Input id="author" value={auth?.user.name} disabled className="bg-gray-300" />
                                                </div>
                                            </div>

                                            {/*  Right column - Images */}
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <Label className="text-sm font-medium">Images (4:3 landscape ratio)</Label>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="space-y-2">
                                                            <Label
                                                                htmlFor="mainImage"
                                                                className={cn('text-xs text-gray-500', errors.mainImage && 'text-destructive')}
                                                            >
                                                                Main Image <span className="text-red-500">*</span>
                                                            </Label>
                                                            <div className="flex flex-col items-center">
                                                                <div
                                                                    className={cn(
                                                                        'hover:border-primary/50 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-2 transition-colors',
                                                                        mainImage ? 'border-primary' : 'border-gray-300',
                                                                        errors.mainImage && !mainImage && 'border-destructive',
                                                                    )}
                                                                    // style={{ height: '180px' }}
                                                                    onClick={() => document.getElementById('mainImage')?.click()}
                                                                >
                                                                    {mainImage ? (
                                                                        <div className="relative h-full w-full">
                                                                            <img
                                                                                src={mainImage || '/placeholder.svg'}
                                                                                alt="Main preview"
                                                                                className="h-full w-full rounded-md object-cover"
                                                                                style={{ aspectRatio: `${aspectRatio}`, objectFit: 'cover' }}
                                                                            />
                                                                            <div className="absolute top-1 right-1 flex gap-1">
                                                                                <Button
                                                                                    type="button"
                                                                                    variant="secondary"
                                                                                    size="icon"
                                                                                    className="h-6 w-6 bg-white"
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        if (mainImage) {
                                                                                            const reader = new FileReader();
                                                                                            reader.readAsDataURL(mainImage);
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <CropIcon className="h-3 w-3" />
                                                                                </Button>
                                                                                <Button
                                                                                    type="button"
                                                                                    variant="destructive"
                                                                                    size="icon"
                                                                                    className="h-6 w-6"
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        mainImage('');
                                                                                    }}
                                                                                >
                                                                                    <X className="h-3 w-3" />
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <Upload className="mb-2 h-8 w-8 text-gray-400" />
                                                                            <p className="text-xs text-gray-500">Upload main image (required)</p>
                                                                        </>
                                                                    )}
                                                                </div>
                                                                <Input
                                                                    id="mainImage"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => onSelectFile(e, 'main')}
                                                                    required
                                                                    className="hidden"
                                                                />
                                                                {errors.mainImage && !setMainImage && (
                                                                    <p className="text-destructive mt-1 text-xs">{errors.mainImage}</p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="subImage1" className="text-xs text-gray-500">
                                                                    Sub Image 1 (optional)
                                                                </Label>
                                                                <div className="flex flex-col items-center">
                                                                    <div
                                                                        className={cn(
                                                                            'hover:border-primary/50 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-2 transition-colors',
                                                                            subImage1 ? 'border-primary' : 'border-gray-300',
                                                                        )}
                                                                        // style={{ height: '120px' }}
                                                                        onClick={() => document.getElementById('subImage1')?.click()}
                                                                    >
                                                                        {subImage1 ? (
                                                                            <div className="relative h-full w-full">
                                                                                <img
                                                                                    src={subImage1 || '/placeholder.svg'}
                                                                                    alt="Sub image 1 preview"
                                                                                    className="h-full w-full rounded-md object-cover"
                                                                                    style={{ aspectRatio: `${aspectRatio}`, objectFit: 'cover' }}
                                                                                />
                                                                                <div className="absolute top-1 right-1 flex gap-1">
                                                                                    <Button
                                                                                        type="button"
                                                                                        variant="secondary"
                                                                                        size="icon"
                                                                                        className="h-6 w-6 bg-white"
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            if (subImage1) {
                                                                                                const reader = new FileReader();
                                                                                                reader.readAsDataURL(subImage1);
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        <CropIcon className="h-3 w-3" />
                                                                                    </Button>
                                                                                    <Button
                                                                                        type="button"
                                                                                        variant="destructive"
                                                                                        size="icon"
                                                                                        className="h-6 w-6"
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            setSubImage1('');
                                                                                        }}
                                                                                    >
                                                                                        <X className="h-3 w-3" />
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                <Upload className="mb-1 h-6 w-6 text-gray-400" />
                                                                                <p className="text-xs text-gray-500">Upload sub image 1</p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <Input
                                                                        id="subImage1"
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => onSelectFile(e, 'sub1')}
                                                                        className="hidden"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="subImage2" className="text-xs text-gray-500">
                                                                    Sub Image 2 (optional)
                                                                </Label>
                                                                <div className="flex flex-col items-center">
                                                                    <div
                                                                        className={cn(
                                                                            'hover:border-primary/50 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-2 transition-colors',
                                                                            subImage2 ? 'border-primary' : 'border-gray-300',
                                                                        )}
                                                                        // style={{ height: '120px' }}
                                                                        onClick={() => document.getElementById('subImage2')?.click()}
                                                                    >
                                                                        {subImage2 ? (
                                                                            <div className="relative h-full w-full">
                                                                                <img
                                                                                    src={subImage2 || '/placeholder.svg'}
                                                                                    alt="Sub image 2 preview"
                                                                                    className="h-full w-full rounded-md object-cover"
                                                                                    style={{ aspectRatio: `${aspectRatio}`, objectFit: 'cover' }}
                                                                                />
                                                                                <div className="absolute top-1 right-1 flex gap-1">
                                                                                    <Button
                                                                                        type="button"
                                                                                        variant="secondary"
                                                                                        size="icon"
                                                                                        className="h-6 w-6 bg-white"
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            if (subImage2) {
                                                                                                const reader = new FileReader();

                                                                                                reader.readAsDataURL(subImage2);
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        <CropIcon className="h-3 w-3" />
                                                                                    </Button>
                                                                                    <Button
                                                                                        type="button"
                                                                                        variant="destructive"
                                                                                        size="icon"
                                                                                        className="h-6 w-6"
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            setSubImage2(null);
                                                                                            setSubImage2Preview(null);
                                                                                        }}
                                                                                    >
                                                                                        <X className="h-3 w-3" />
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                <Upload className="mb-1 h-6 w-6 text-gray-400" />
                                                                                <p className="text-xs text-gray-500">Upload sub image 2</p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <Input
                                                                        id="subImage2"
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => onSelectFile(e, 'sub2')}
                                                                        className="hidden"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="content" className="mt-0 space-y-6">
                                        <div className="grid grid-cols-12 gap-6">
                                            {/* Left sidebar - Tags */}
                                            <div className="col-span-12 space-y-6 md:col-span-3">
                                                <div className="space-y-2">
                                                    <Label htmlFor="category7" className="text-sm font-medium">
                                                        Kategori Artikel <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Select value={category} onValueChange={setCategory}>
                                                        <SelectTrigger id="category7" className={cn(errors.category && 'border-destructive')}>
                                                            <SelectValue placeholder="Pilih kategori" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem className="hover:bg-muted transition-none" value="News">
                                                                News
                                                            </SelectItem>
                                                            <SelectItem className="hover:bg-muted transition-none" value="Dakwah">
                                                                Dakwah
                                                            </SelectItem>
                                                            <SelectItem className="hover:bg-muted transition-none" value="Opini">
                                                                Opini
                                                            </SelectItem>
                                                            <SelectItem className="hover:bg-muted transition-none" value="The Story">
                                                                The Story
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.category && <p className="text-destructive text-xs">{errors.category}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="tags" className={cn('text-sm font-medium', errors.tags && 'text-destructive')}>
                                                        Tags <span className="text-red-500">*</span> (Maksimal 5, ketik lalu tekan ; untuk
                                                        menambahkan)
                                                    </Label>
                                                    <div className="flex flex-col space-y-2">
                                                        <Input
                                                            id="tags"
                                                            value={tagInput}
                                                            onChange={handleTagInputChange}
                                                            onKeyDown={handleTagKeyDown}
                                                            placeholder="Type a tag and press ; (semicolon)"
                                                            className={errors.tags ? 'border-destructive' : ''}
                                                            disabled={tags.length >= 5}
                                                        />
                                                        {errors.tags && <p className="text-destructive text-xs">{errors.tags}</p>}
                                                        <div
                                                            className={cn(
                                                                'min-h-[200px] overflow-auto rounded-md border p-3',
                                                                errors.tags && tags.length === 0 && 'border-destructive',
                                                            )}
                                                        >
                                                            {tags.length > 0 ? (
                                                                <div className="flex flex-wrap gap-2">
                                                                    {tags.map((tag) => (
                                                                        <Badge key={tag} variant="secondary" className="px-2 py-1 text-xs">
                                                                            {tag}
                                                                            <X
                                                                                className="ml-1 h-3 w-3 cursor-pointer"
                                                                                onClick={() => removeTag(tag)}
                                                                            />
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm text-gray-400">No tags added yet</p>
                                                            )}
                                                        </div>
                                                        <p className="text-muted-foreground text-xs">
                                                            {tags.length}/5 tags used {tags.length === 0 && '(at least one tag required)'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right content area - Rich Text Editors */}
                                            <div className="col-span-12 space-y-6 md:col-span-9">
                                                <div className="space-y-2">
                                                    <Label htmlFor="body1" className={cn('text-sm font-medium', errors.body1 && 'text-destructive')}>
                                                        Body 1 <span className="text-red-500">*</span>
                                                    </Label>
                                                    <div className={cn('min-h-[300px] rounded-md border', errors.body1 && 'border-destructive')}>
                                                        <RichTextEditor value={body1} onChange={setBody1} placeholder="Enter the main content" />
                                                    </div>
                                                    {errors.body1 && <p className="text-destructive text-xs">{errors.body1}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="body2" className="text-sm font-medium">
                                                        Body 2
                                                    </Label>
                                                    <div className="min-h-[300px] rounded-md border">
                                                        <RichTextEditor
                                                            value={body2}
                                                            onChange={setBody2}
                                                            placeholder="Enter additional content (optional)"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </div>
                            </ScrollArea>
                        </div>
                    </Tabs>

                    <DialogFooter className="flex space-x-2 p-6 pt-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Post'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <CropDialog
                open={cropDialogOpen}
                onClose={() => {
                    setCropDialogOpen(false);
                }}
                onCropDone={(base64) => {
                    setMainImage(base64);
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
