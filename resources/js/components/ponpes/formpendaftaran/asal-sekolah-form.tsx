'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';

// Generate tahun dari 2000 sampai 2025
const tahunOptions = Array.from({ length: 26 }, (_, i) => (2000 + i).toString());

interface AsalSekolahFormProps {
    form: UseFormReturn<any>;
}

export function AsalSekolahForm({ form }: AsalSekolahFormProps) {
    // Watch jenjang untuk tampilan kondisional
    const jenjang = form.watch('jenjang');

    // Reset field asal sekolah ketika jenjang berubah
    useEffect(() => {
        if (jenjang === 'MI') {
            form.setValue('namaSekolah', '');
            form.setValue('nisn', '');
            form.setValue('tahunTamat', '');
        }
    }, [jenjang, form]);

    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="jenjang"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Jenjang Didaftari</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih jenjang yang didaftari" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="MI">MI (Madrasah Ibtidaiyah)</SelectItem>
                                <SelectItem value="MTs">MTs (Madrasah Tsanawiyah)</SelectItem>
                                <SelectItem value="MA">MA (Madrasah Aliyah)</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {jenjang && jenjang !== 'MI' && (
                <div className="mt-6 border-t pt-6">
                    <h3 className="mb-6 text-base font-medium">
                        {jenjang === 'MTs' ? 'Data Sekolah Dasar (SD/MI)' : 'Data Sekolah Menengah Pertama (SMP/MTs)'}
                    </h3>

                    <div className="space-y-5">
                        <FormField
                            control={form.control}
                            name="namaSekolah"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{jenjang === 'MTs' ? 'Nama Sekolah Dasar' : 'Nama Sekolah Menengah Pertama'}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={jenjang === 'MTs' ? 'Masukkan nama sekolah dasar' : 'Masukkan nama sekolah menengah pertama'}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nisn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>NISN</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan NISN 10 digit" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tahunTamat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{jenjang === 'MTs' ? 'Tahun Tamat SD/MI' : 'Tahun Tamat SMP/MTs'}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih tahun tamat" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {tahunOptions.map((tahun) => (
                                                <SelectItem key={tahun} value={tahun}>
                                                    {tahun}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            )}

            {jenjang === 'MI' && (
                <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-6">
                    <p className="text-blue-700">
                        Untuk pendaftaran jenjang MI (Madrasah Ibtidaiyah), tidak diperlukan data asal sekolah sebelumnya.
                    </p>
                </div>
            )}
        </div>
    );
}
