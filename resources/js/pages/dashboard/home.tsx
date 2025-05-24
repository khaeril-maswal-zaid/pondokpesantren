import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { ClipboardList, FileText, HelpCircle, Loader2, Pencil, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ student, santribaru }) {
    const { name, auth } = usePage().props;

    const [value, setValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleEdit = (item: any) => {
        setSelectedStudent(item);
        setEditModalOpen(true);
        setValue(item.value || '');
    };

    // Reset form when kontak changes
    useEffect(() => {
        if (student) {
            setValue(student.value || '');
        }
    }, [student]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate form
        if (!value.trim()) {
            toast({
                title: 'Error',
                description: 'Value tidak boleh kosong',
                variant: 'destructive',
            });
            setIsSubmitting(false);
            return;
        }

        router.put(
            route('student.update', selectedStudent.id),
            {
                value: value,
            },
            {
                preserveScroll: true, // Ini penting
                onSuccess: () => {
                    // Show success toast
                    toast({
                        title: 'Berhasil',
                        description: `Jumlah ${selectedStudent.title} berhasil diperbarui`,
                    });

                    // Close modal
                    setEditModalOpen(false);
                    setIsSubmitting(false);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
                    <div className="relative p-8 md:p-12">
                        <div className="flex flex-col items-center justify-between md:flex-row">
                            <div className="mb-6 flex-1 text-center md:mb-0 md:text-left">
                                <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                    <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
                                    Dashboard Admin
                                </div>
                                <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                                    Selamat datang, <span className="text-blue-600">{auth?.user?.name.split(' ').slice(0, 2).join(' ')}</span>
                                </h2>
                                <p className="mb-4 text-lg text-gray-600">di Dashboard Website Resmi</p>
                                <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                                    Pondok Pesantren {name}
                                </h3>
                                <p className="mx-auto mt-4 max-w-md text-gray-500 md:mx-0">
                                    Kelola semua informasi pendaftaran dan data pesantren dengan mudah melalui panel admin yang terintegrasi.
                                </p>
                            </div>

                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-2xl md:h-40 md:w-40">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white md:h-32 md:w-32">
                                            <span className="text-3xl font-bold text-blue-600 md:text-4xl">UBK</span>
                                        </div>
                                    </div>
                                    <div className="absolute -top-2 -right-2 h-6 w-6 animate-pulse rounded-full border-4 border-white bg-green-500"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-blue-200/50 pt-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="text-center">
                                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <ClipboardList className="h-6 w-6" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Kelola Informasi</p>
                                    <p className="text-xs text-gray-500">Pendaftaran Pesantren</p>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Monitor Data</p>
                                    <p className="text-xs text-gray-500">Santri & Alumni</p>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                        <HelpCircle className="h-6 w-6" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Kelola FAQ</p>
                                    <p className="text-xs text-gray-500">& Pertanyaan Umum</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {student.map((item, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Data</CardTitle>
                                <Pencil className="text-muted-foreground h-4 w-4" onClick={() => handleEdit(item)} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{item.value}</div>
                                <p className="text-muted-foreground text-xs">{item.title} Ponpes UBK</p>
                            </CardContent>
                        </Card>
                    ))}

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{santribaru}</div>
                            <p className="text-muted-foreground text-xs">Calon Santri/ Santriwati</p>
                        </CardContent>
                    </Card>
                </div>

                <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit Jumlah {selectedStudent?.title}</DialogTitle>
                            <DialogDescription>Pondok Pesantren {name}</DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="value">Jumlah {selectedStudent?.title}</Label>
                                <Input id="value" value={value} onChange={(e) => setValue(e.target.value)} placeholder={`Masukkan ${student.name}`} />
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
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
            </div>
        </AppLayout>
    );
}
