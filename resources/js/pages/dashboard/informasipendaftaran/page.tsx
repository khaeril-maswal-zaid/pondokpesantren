'use client';

import { AlurPendaftaranManager } from '@/components/dashboard/alur-pendaftaran/manager';
import { DokumenPendaftaranManager } from '@/components/dashboard/dokumen-pendaftaran/manager';
import { FaqManager } from '@/components/dashboard/faq/manager';
import { JadwalPendaftaranManager } from '@/components/dashboard/jadwal-pendaftaran/manager';
import { SyaratPendaftaranManager } from '@/components/dashboard/syarat-pendaftaran/manager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Informasi Pendaftaran',
        href: '/informasi-pendaftaran',
    },
];

export default function InformasiPendaftaranPage({ persyaratan, dokumen, faq, jadwal, jadwalMasuk, steps }) {
    const [activeTab, setActiveTab] = useState('syarat');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Informasi Pendaftaran" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <div className="border-b">
                        <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
                            <TabsTrigger
                                value="syarat"
                                className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:bg-transparent"
                            >
                                Syarat Pendaftaran
                            </TabsTrigger>
                            <TabsTrigger
                                value="dokumen"
                                className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:bg-transparent"
                            >
                                Dokumen Pendaftaran
                            </TabsTrigger>
                            <TabsTrigger
                                value="alur"
                                className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:bg-transparent"
                            >
                                Alur Pendaftaran
                            </TabsTrigger>
                            <TabsTrigger
                                value="jadwal"
                                className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:bg-transparent"
                            >
                                Jadwal Pendaftaran
                            </TabsTrigger>
                            <TabsTrigger
                                value="faq"
                                className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:bg-transparent"
                            >
                                Pertanyaan Umum
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="syarat" className="mt-0">
                        <SyaratPendaftaranManager persyaratan={persyaratan} />
                    </TabsContent>

                    <TabsContent value="dokumen" className="mt-0">
                        <DokumenPendaftaranManager dokumen={dokumen} />
                    </TabsContent>

                    <TabsContent value="alur" className="mt-0">
                        <AlurPendaftaranManager steps={steps} />
                    </TabsContent>

                    <TabsContent value="jadwal" className="mt-0">
                        <JadwalPendaftaranManager jadwal={jadwal} />
                    </TabsContent>

                    <TabsContent value="faq" className="mt-0">
                        <FaqManager faq={faq} />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
