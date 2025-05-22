'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { FaqForm } from './faq-form';

// Types
type FaqType = {
    id: string;
    title: string;
    description: string;
    order: number;
};

export function FaqManager({ faq }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentFaq, setCurrentFaq] = useState<FaqType | null>(null);
    const [faqList, setFaqList] = useState<FaqType[]>(faq);

    const handleOpenForm = (faq?: FaqType) => {
        setCurrentFaq(faq || null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setCurrentFaq(null);
    };

    const handleOpenDeleteDialog = (faq: FaqType) => {
        setCurrentFaq(faq);
        setIsDeleteDialogOpen(true);
    };

    const handleSaveFaq = (faq: FaqType) => {
        if (faq.id) {
            // Update existing
            setFaqList((prev) => prev.map((item) => (item.id === faq.id ? faq : item)));
            toast({
                title: 'FAQ berhasil diperbarui',
                description: `Pertanyaan "${faq.title}" telah diperbarui.`,
            });
        } else {
            // Add new
            const newId = Date.now().toString();
            const newOrder = Math.max(...faqList.map((item) => item.order), 0) + 1;

            setFaqList((prev) => [...prev, { ...faq, id: newId, order: newOrder }]);
            toast({
                title: 'FAQ berhasil ditambahkan',
                description: `Pertanyaan "${faq.title}" telah ditambahkan.`,
            });
        }
        handleCloseForm();
    };

    const handleDeleteFaq = () => {
        if (!currentFaq) return;

        setFaqList((prev) => prev.filter((item) => item.id !== currentFaq.id));
        setIsDeleteDialogOpen(false);
        setCurrentFaq(null);

        toast({
            title: 'FAQ berhasil dihapus',
            description: `Pertanyaan "${currentFaq.title}" telah dihapus.`,
        });
    };

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <p className="text-muted-foreground text-sm">Kelola pertanyaan dan jawaban yang sering ditanyakan</p>
                </div>
                <Button onClick={() => handleOpenForm()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah FAQ
                </Button>
            </div>

            <Card>
                <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                        {[...faqList]
                            .sort((a, b) => a.order - b.order)
                            .map((faq) => (
                                <AccordionItem key={faq.id} value={faq.id} className="border-b">
                                    <div className="flex items-center">
                                        <AccordionTrigger className="flex-1 hover:no-underline">{faq.title}</AccordionTrigger>
                                        <div className="mr-4 flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenForm(faq);
                                                }}
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenDeleteDialog(faq);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Hapus</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <AccordionContent className="pt-2 pb-4">
                                        <div dangerouslySetInnerHTML={{ __html: faq.description }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                    </Accordion>
                </CardContent>
            </Card>

            <FaqForm isOpen={isFormOpen} onClose={handleCloseForm} onSave={handleSaveFaq} initialData={currentFaq} />

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Pertanyaan</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus pertanyaan "{currentFaq?.title}"? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteFaq} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
