'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm as useFormHook } from 'react-hook-form';
import { z } from 'zod';

import { AsalSekolahForm } from '@/components/ponpes/formpendaftaran/asal-sekolah-form';
import { DataDiriForm } from '@/components/ponpes/formpendaftaran/data-diri-form';
import { DataOrangTuaForm } from '@/components/ponpes/formpendaftaran/data-orang-tua-form';
import { RingkasanData } from '@/components/ponpes/formpendaftaran/ringkasan-data';
import { Steps } from '@/components/ponpes/formpendaftaran/steps';
import { UploadFotoForm } from '@/components/ponpes/formpendaftaran/upload-foto-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

// Definisi skema validasi dengan Zod
const formSchema = z.object({
    // Data Diri Santri
    nik: z.string().length(16, { message: 'NIK harus 16 digit' }).regex(/^\d+$/, { message: 'NIK hanya boleh berisi angka' }),
    namaLengkap: z.string().min(3, { message: 'Nama lengkap wajib diisi minimal 3 karakter' }),
    tempatLahir: z.string().min(3, { message: 'Tempat lahir wajib diisi' }),
    tanggalLahir: z.string().min(1, { message: 'Tanggal lahir wajib diisi' }),
    jenisKelamin: z.enum(['Laki-laki', 'Perempuan'], { message: 'Pilih jenis kelamin' }),
    provinsi: z.string().min(1, { message: 'Provinsi wajib diisi' }),
    kabupaten: z.string().min(1, { message: 'Kabupaten/Kota wajib diisi' }),
    kecamatan: z.string().min(1, { message: 'Kecamatan wajib diisi' }),
    desa: z.string().min(1, { message: 'Desa/Kelurahan wajib diisi' }),

    // Data Orang Tua
    namaAyah: z.string().min(3, { message: 'Nama ayah wajib diisi' }),
    namaIbu: z.string().min(3, { message: 'Nama ibu wajib diisi' }),
    pekerjaanAyah: z.string().min(1, { message: 'Pekerjaan ayah wajib diisi' }),
    pekerjaanIbu: z.string().min(1, { message: 'Pekerjaan ibu wajib diisi' }),
    kontakAyah: z.string().min(10, { message: 'Nomor kontak minimal 10 digit' }).regex(/^\d+$/, { message: 'Nomor kontak hanya boleh berisi angka' }),
    kontakIbu: z.string().min(10, { message: 'Nomor kontak minimal 10 digit' }).regex(/^\d+$/, { message: 'Nomor kontak hanya boleh berisi angka' }),

    // Asal Sekolah
    namaSekolah: z.string().min(3, { message: 'Nama sekolah wajib diisi' }),
    nisn: z.string().length(10, { message: 'NISN harus 10 digit' }).regex(/^\d+$/, { message: 'NISN hanya boleh berisi angka' }),
    tahunTamat: z.string().min(4, { message: 'Tahun tamat wajib diisi' }),

    // Foto
    foto: z
        .string()
        .refine((val) => !val || val.length <= 700000, {
            message: 'Ukuran foto tidak boleh melebihi 510 KB',
        })
        .nullable()
        .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormPendaftaranSantri() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [registrationNumber, setRegistrationNumber] = useState('');

    // Inisialisasi form dengan React Hook Form dan Zod resolver
    const form = useFormHook<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nik: '',
            namaLengkap: '',
            tempatLahir: '',
            tanggalLahir: '',
            jenisKelamin: undefined,
            provinsi: '',
            kabupaten: '',
            kecamatan: '',
            desa: '',
            namaAyah: '',
            namaIbu: '',
            pekerjaanAyah: '',
            pekerjaanIbu: '',
            kontakAyah: '',
            kontakIbu: '',
            namaSekolah: '',
            nisn: '',
            tahunTamat: '',
            foto: null,
        },
        mode: 'onChange',
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        nik: '',
        namaLengkap: '',
        tempatLahir: '',
        tanggalLahir: '',
        jenisKelamin: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        desa: '',
        namaAyah: '',
        namaIbu: '',
        pekerjaanAyah: '',
        pekerjaanIbu: '',
        kontakAyah: '',
        kontakIbu: '',
        namaSekolah: '',
        nisn: '',
        tahunTamat: '',
        foto: '',
    });

    const totalSteps = 5;

    // Fungsi untuk navigasi antar step
    const nextStep = async () => {
        let isValid = false;

        if (step === 1) {
            isValid = await form.trigger([
                'nik',
                'namaLengkap',
                'tempatLahir',
                'tanggalLahir',
                'jenisKelamin',
                'provinsi',
                'kabupaten',
                'kecamatan',
                'desa',
            ]);
        } else if (step === 2) {
            isValid = await form.trigger(['namaAyah', 'namaIbu', 'pekerjaanAyah', 'pekerjaanIbu', 'kontakAyah', 'kontakIbu']);
        } else if (step === 3) {
            isValid = await form.trigger(['namaSekolah', 'nisn', 'tahunTamat']);
        } else if (step === 4) {
            // Foto is optional, but we need to validate its size if it exists
            isValid = await form.trigger(['foto']);
        }

        if (isValid) {
            setStep((prev) => Math.min(prev + 1, totalSteps));
        }
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    // Handler untuk perubahan checkbox
    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
    };

    // Fungsi untuk generate nomor registrasi
    const generateRegistrationNumber = () => {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
        return `REG/${year}/${randomNum}`;
    };

    // Handler submit form yang disederhanakan
    function handleSubmitForm(e) {
        e.preventDefault();

        setData({
            nik: form.getValues().nik,
            namaLengkap: form.getValues().namaLengkap,
            tempatLahir: form.getValues().tempatLahir,
            tanggalLahir: form.getValues().tanggalLahir,
            jenisKelamin: form.getValues().jenisKelamin,
            provinsi: form.getValues().provinsi,
            kabupaten: form.getValues().kabupaten,
            kecamatan: form.getValues().kecamatan,
            desa: form.getValues().desa,
            namaAyah: form.getValues().namaAyah,
            namaIbu: form.getValues().namaIbu,
            pekerjaanAyah: form.getValues().pekerjaanAyah,
            pekerjaanIbu: form.getValues().pekerjaanIbu,
            kontakAyah: form.getValues().kontakAyah,
            kontakIbu: form.getValues().kontakIbu,
            namaSekolah: form.getValues().namaSekolah,
            nisn: form.getValues().nisn,
            tahunTamat: form.getValues().tahunTamat,
        });

        // Validasi pernyataan
        if (!isChecked) {
            alert('Ingat, Anda harus menyetujui pernyataan kebenaran data');
            return;
        }

        // Set status loading
        setIsSubmitting(true);

        // pengiriman data ke server
        post(route('santri-baru.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                alert('Pendaftaran berhasil dikirim!');

                const regNumber = generateRegistrationNumber();
                setRegistrationNumber(regNumber);
                reset();
            },
        });
    }

    // Animasi untuk transisi antar step
    const variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <div className="mx-auto max-w-3xl">
            <Steps currentStep={step} totalSteps={totalSteps} />
            {Object.keys(errors).length > 0 && (
                <div variant={'default'} className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                    <p className="font-bold">Terjadi kesalahan:</p>
                    <ul className="mt-2 list-inside list-disc">
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <Form {...form}>
                <form onSubmit={handleSubmitForm}>
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>
                                {step === 1 && 'Data Diri Santri'}
                                {step === 2 && 'Data Orang Tua'}
                                {step === 3 && 'Asal Sekolah'}
                                {step === 4 && 'Upload Foto'}
                                {step === 5 && 'Ringkasan Data'}
                            </CardTitle>
                            <CardDescription>
                                {step === 1 && 'Lengkapi informasi data diri santri'}
                                {step === 2 && 'Lengkapi informasi data orang tua'}
                                {step === 3 && 'Lengkapi informasi asal sekolah'}
                                {step === 4 && 'Upload foto santri dengan ukuran 3x4'}
                                {step === 5 && 'Periksa kembali data yang telah diisi'}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={variants}
                                    transition={{ duration: 0.3 }}
                                >
                                    {step === 1 && <DataDiriForm form={form} />}
                                    {step === 2 && <DataOrangTuaForm form={form} />}
                                    {step === 3 && <AsalSekolahForm form={form} />}
                                    {step === 4 && <UploadFotoForm form={form} />}
                                    {step === 5 && (
                                        <RingkasanData
                                            data={form.getValues()}
                                            onCheckboxChange={handleCheckboxChange}
                                            isSubmitted={isSubmitted}
                                            registrationNumber={registrationNumber}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
                                Sebelumnya
                            </Button>

                            {step < totalSteps ? (
                                <Button type="button" onClick={nextStep}>
                                    Selanjutnya
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    // disabled={isSubmitting || isSubmitted}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Memproses...
                                        </>
                                    ) : isSubmitted ? (
                                        'Pendaftaran Terkirim'
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" /> Kirim Pendaftaran
                                        </>
                                    )}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
