'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';

interface DataDiriFormProps {
    form: UseFormReturn<any>;
}

interface Wilayah {
    id: string;
    name: string;
}

export function DataDiriForm({ form }: DataDiriFormProps) {
    const [provinsi, setProvinsi] = useState<Wilayah[]>([]);
    const [kabupaten, setKabupaten] = useState<Wilayah[]>([]);
    const [kecamatan, setKecamatan] = useState<Wilayah[]>([]);
    const [desa, setDesa] = useState<Wilayah[]>([]);

    const [isLoadingProv, setIsLoadingProv] = useState(false);
    const [isLoadingKab, setIsLoadingKab] = useState(false);
    const [isLoadingKec, setIsLoadingKec] = useState(false);
    const [isLoadingDesa, setIsLoadingDesa] = useState(false);

    useEffect(() => {
        setIsLoadingProv(true);
        fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
            .then((res) => res.json())
            .then(setProvinsi)
            .finally(() => setIsLoadingProv(false));
    }, []);

    const handleProvChange = (provId: string) => {
        form.setValue('provinsi', provId);
        form.setValue('kabupaten', '');
        form.setValue('kecamatan', '');
        form.setValue('desa', '');
        setKabupaten([]);
        setKecamatan([]);
        setDesa([]);
        setIsLoadingKab(true);
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`)
            .then((res) => res.json())
            .then(setKabupaten)
            .finally(() => setIsLoadingKab(false));
    };

    const handleKabChange = (kabId: string) => {
        form.setValue('kabupaten', kabId);
        form.setValue('kecamatan', '');
        form.setValue('desa', '');
        setKecamatan([]);
        setDesa([]);
        setIsLoadingKec(true);
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabId}.json`)
            .then((res) => res.json())
            .then(setKecamatan)
            .finally(() => setIsLoadingKec(false));
    };

    const handleKecChange = (kecId: string) => {
        form.setValue('kecamatan', kecId);
        form.setValue('desa', '');
        setDesa([]);
        setIsLoadingDesa(true);
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecId}.json`)
            .then((res) => res.json())
            .then(setDesa)
            .finally(() => setIsLoadingDesa(false));
    };

    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>NIK</FormLabel>
                        <FormControl>
                            <Input placeholder="Masukkan NIK 16 digit" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="namaLengkap"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                            <Input placeholder="Masukkan nama lengkap" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="tempatLahir"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tempat Lahir</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukkan tempat lahir" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tanggalLahir"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tanggal Lahir</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="jenisKelamin"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                <SelectItem value="Perempuan">Perempuan</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="provinsi"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Provinsi</FormLabel>
                            <Select onValueChange={handleProvChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih provinsi" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {isLoadingProv ? (
                                        <div className="animate-pulse p-2 text-gray-500">Memuat...</div>
                                    ) : (
                                        provinsi.map((item) => (
                                            <SelectItem key={item.id} value={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="kabupaten"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kabupaten/Kota</FormLabel>
                            <Select onValueChange={handleKabChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kabupaten/kota" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {isLoadingKab ? (
                                        <div className="animate-pulse p-2 text-gray-500">Memuat...</div>
                                    ) : (
                                        kabupaten.map((item) => (
                                            <SelectItem key={item.id} value={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="kecamatan"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kecamatan</FormLabel>
                            <Select onValueChange={handleKecChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kecamatan" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {isLoadingKec ? (
                                        <div className="animate-pulse p-2 text-gray-500">Memuat...</div>
                                    ) : (
                                        kecamatan.map((item) => (
                                            <SelectItem key={item.id} value={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="desa"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Desa/Kelurahan</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih desa/kelurahan" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {isLoadingDesa ? (
                                        <div className="animate-pulse p-2 text-gray-500">Memuat...</div>
                                    ) : (
                                        desa.map((item) => (
                                            <SelectItem key={item.id} value={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
