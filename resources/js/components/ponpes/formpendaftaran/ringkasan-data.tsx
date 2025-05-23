'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getDesaName, getKabupatenName, getKecamatanName, getProvinsiName } from '@/lib/wilayah';
import { usePage } from '@inertiajs/react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FileDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface RingkasanDataProps {
    data: {
        // Data Diri Santri
        nik: string;
        namaLengkap: string;
        tempatLahir: string;
        tanggalLahir: string;
        jenisKelamin: string;
        provinsi: string;
        kabupaten: string;
        kecamatan: string;
        desa: string;

        // Data Orang Tua
        namaAyah: string;
        namaIbu: string;
        pekerjaanAyah: string;
        pekerjaanIbu: string;
        kontakAyah: string;
        kontakIbu: string;

        // Jenjang Pendidikan
        jenjang: string;

        // Asal Sekolah
        namaSekolah?: string;
        nisn?: string;
        tahunTamat?: string;

        // Foto
        foto: string;
    };
    onCheckboxChange?: (checked: boolean) => void;
    isSubmitted?: boolean;
    registrationNumber?: string;
}

export function RingkasanData({ data, onCheckboxChange, isSubmitted = false, registrationNumber = '' }: RingkasanDataProps) {
    const pdfRef = useRef<HTMLDivElement>(null);

    const { alamat, name } = usePage().props;

    const [provinsiName, setProvinsiName] = useState('');
    const [kabupatenName, setKabupatenName] = useState('');
    const [kecamatanName, setKecamatanName] = useState('');
    const [desaName, setDesaName] = useState('');

    useEffect(() => {
        const fetchWilayah = async () => {
            const prov = await getProvinsiName(data.provinsi);
            const kab = await getKabupatenName(data.kabupaten, data.provinsi);
            const kec = await getKecamatanName(data.kecamatan, data.kabupaten);
            const desa = await getDesaName(data.desa, data.kecamatan);

            setProvinsiName(prov);
            setKabupatenName(kab);
            setKecamatanName(kec);
            setDesaName(desa);
        };

        fetchWilayah();
    }, [data]);

    // Fungsi untuk generate dan download PDF
    const generatePDF = () => {
        const doc = new jsPDF();

        // KOP SURAT
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('FORMULIR PENDAFTARAN CALON SANTRI/ SANTRIWATI', 105, 20, { align: 'center' });
        doc.text(`PONDOK PESANTREN ${name.toUpperCase()}`, 105, 27, { align: 'center' });
        doc.setFontSize(10.5);
        doc.setFont('Helvetica', 'normal');
        doc.text(`${alamat}`, 105, 34, { align: 'center' });

        // Garis horizontal
        doc.setLineWidth(0.5);
        doc.line(10, 38, 200, 38);

        // TABEL FORMULIR (bagian identitas awal)
        const today = new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        autoTable(doc, {
            startY: 45,
            head: [],
            body: [
                ['No. Registrasi', ': ' + registrationNumber],
                ['Jenjang yang Didaftari', ': ' + data.jenjang],
                ['Tanggal Pendaftaran', ': ' + today],
            ],
            theme: 'plain',
            styles: { fontSize: 10, cellPadding: 2 },
            columnStyles: { 0: { cellWidth: 50 } },
        });

        // Tambahkan Data Diri Santri
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Data Diri Santri', 14, 53 + 25);

        function capitalizeFirstLetter(text: string) {
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        }

        autoTable(doc, {
            startY: 83,
            head: [],
            body: [
                ['NIK', ': ' + data.nik],
                ['Nama Lengkap', ': ' + data.namaLengkap],
                ['Tempat, Tanggal Lahir', ': ' + `${data.tempatLahir}, ${new Date(data.tanggalLahir).toLocaleDateString('id-ID')}`],
                ['Jenis Kelamin', ': ' + data.jenisKelamin],
                [
                    'Alamat',
                    ': ' +
                        `${capitalizeFirstLetter(desaName)}, ${capitalizeFirstLetter(kecamatanName)}, ${capitalizeFirstLetter(kabupatenName)}, ${capitalizeFirstLetter(provinsiName)}`,
                ],
            ],
            theme: 'plain',
            styles: { fontSize: 10, cellPadding: 2 },
            columnStyles: { 0: { cellWidth: 50 } },
        });

        // Tambahkan Data Orang Tua
        const lastY = (doc as any).lastAutoTable.finalY + 10;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Data Orang Tua', 14, lastY);

        autoTable(doc, {
            startY: lastY + 4,
            head: [],
            body: [
                ['Nama Ayah', ': ' + data.namaAyah],
                ['Nama Ibu', ': ' + data.namaIbu],
                ['Pekerjaan Ayah', ': ' + data.pekerjaanAyah],
                ['Pekerjaan Ibu', ': ' + data.pekerjaanIbu],
                ['Kontak Ayah', ': ' + data.kontakAyah],
                ['Kontak Ibu', ': ' + data.kontakIbu],
            ],
            theme: 'plain',
            styles: { fontSize: 10, cellPadding: 2 },
            columnStyles: { 0: { cellWidth: 50 } },
        });

        // Tambahkan Data Asal Sekolah jika bukan MI
        if (data.jenjang !== 'MI' && data.namaSekolah) {
            const lastY2 = (doc as any).lastAutoTable.finalY + 10;
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(data.jenjang === 'MTs' ? 'Asal Sekolah Dasar (SD/MI)' : 'Asal Sekolah Menengah Pertama (SMP/MTs)', 14, lastY2);

            autoTable(doc, {
                startY: lastY2 + 4,
                head: [],
                body: [
                    [data.jenjang === 'MTs' ? 'Nama Sekolah Dasar' : 'Nama Sekolah Menengah Pertama', ': ' + data.namaSekolah],
                    ['NISN', ': ' + (data.nisn || '-')],
                    [data.jenjang === 'MTs' ? 'Tahun Tamat SD/MI' : 'Tahun Tamat SMP/MTs', ': ' + (data.tahunTamat || '-')],
                ],
                theme: 'plain',
                styles: { fontSize: 10, cellPadding: 2 },
                columnStyles: { 0: { cellWidth: 80 } },
            });
        }

        // Tambahkan foto jika ada
        if (data.foto) {
            try {
                const lastY3 = (doc as any).lastAutoTable.finalY + 10;
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text('Foto Santri', 150, 48);

                // Tambahkan foto
                doc.addImage(data.foto, 'JPEG', 150, 48 + 5, 40, 53.33); // 3:4 ratio
            } catch (error) {
                console.error('Error adding image to PDF:', error);
            }
        }

        // Tambahkan footer
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Halaman ${i} dari ${pageCount}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, {
                align: 'center',
            });
        }

        // Download PDF
        doc.save(`Formulir_Pendaftaran_${data.namaLengkap.replace(/\s+/g, '_')}.pdf`);
    };

    return (
        <div className="space-y-6" ref={pdfRef}>
            <div className="flex flex-col gap-6 md:flex-row">
                <div className="space-y-6 md:w-2/3">
                    {isSubmitted && registrationNumber && (
                        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
                            <h3 className="mb-1 text-lg font-medium text-green-800">Pendaftaran Berhasil!</h3>
                            <p className="mb-2 text-green-700">Pendaftaran Anda telah berhasil dikirim dan diproses oleh sistem.</p>
                            <p className="font-medium text-green-800">
                                No. Registrasi: <span className="font-bold">{registrationNumber}</span>
                            </p>
                        </div>
                    )}

                    <div>
                        <h3 className="mb-2 text-lg font-medium">Data Diri Santri</h3>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">NIK</TableCell>
                                    <TableCell>{data.nik}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Nama Lengkap</TableCell>
                                    <TableCell>{data.namaLengkap}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Tempat, Tanggal Lahir</TableCell>
                                    <TableCell>{`${data.tempatLahir}, ${new Date(data.tanggalLahir).toLocaleDateString('id-ID')}`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Jenis Kelamin</TableCell>
                                    <TableCell>{data.jenisKelamin}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Alamat</TableCell>
                                    <TableCell>{`${data.desa}, ${data.kecamatan}, ${data.kabupaten}, ${data.provinsi}`}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div>
                        <h3 className="mb-2 text-lg font-medium">Data Orang Tua</h3>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Nama Ayah</TableCell>
                                    <TableCell>{data.namaAyah}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Nama Ibu</TableCell>
                                    <TableCell>{data.namaIbu}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Pekerjaan Ayah</TableCell>
                                    <TableCell>{data.pekerjaanAyah}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Pekerjaan Ibu</TableCell>
                                    <TableCell>{data.pekerjaanIbu}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Kontak Ayah</TableCell>
                                    <TableCell>{data.kontakAyah}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Kontak Ibu</TableCell>
                                    <TableCell>{data.kontakIbu}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div>
                        <h3 className="mb-2 text-lg font-medium">Jenjang Pendidikan</h3>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Jenjang</TableCell>
                                    <TableCell>
                                        {data.jenjang === 'MI'
                                            ? 'MI (Madrasah Ibtidaiyah)'
                                            : data.jenjang === 'MTs'
                                              ? 'MTs (Madrasah Tsanawiyah)'
                                              : 'MA (Madrasah Aliyah)'}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    {data.jenjang !== 'MI' && data.namaSekolah && (
                        <div>
                            <h3 className="mb-2 text-lg font-medium">
                                {data.jenjang === 'MTs' ? 'Asal Sekolah Dasar' : 'Asal Sekolah Menengah Pertama'}
                            </h3>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            {data.jenjang === 'MTs' ? 'Nama Sekolah Dasar' : 'Nama Sekolah Menengah Pertama'}
                                        </TableCell>
                                        <TableCell>{data.namaSekolah}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">NISN</TableCell>
                                        <TableCell>{data.nisn}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            {data.jenjang === 'MTs' ? 'Tahun Tamat SD/MI' : 'Tahun Tamat SMP/MTs'}
                                        </TableCell>
                                        <TableCell>{data.tahunTamat}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>

                <div className="md:w-1/3">
                    <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-lg font-medium">Foto Santri</h3>
                        {isSubmitted && (
                            <Button type="button" variant="outline" size="sm" onClick={generatePDF} className="flex items-center gap-1">
                                <FileDown className="h-4 w-4" />
                                Unduh PDF
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-col items-center rounded-lg border bg-white p-4 shadow-sm">
                        {data.foto ? (
                            <div className="aspect-[3/4] w-full overflow-hidden rounded border">
                                <img src={data.foto || '/placeholder.svg'} alt="Foto Santri" className="h-full w-full bg-gray-50 object-contain" />
                            </div>
                        ) : (
                            <div className="flex aspect-[3/4] w-full items-center justify-center rounded border bg-gray-50">
                                <p className="p-4 text-center text-gray-500">Foto belum diunggah</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {!isSubmitted && (
                <div className="border-t pt-4">
                    <div className="mb-4 flex items-start space-x-2">
                        <Checkbox
                            id="pernyataan"
                            required
                            className="mt-1"
                            onCheckedChange={(checked) => {
                                if (onCheckboxChange) {
                                    onCheckboxChange(checked === true);
                                }
                            }}
                        />
                        <label htmlFor="pernyataan" className="text-sm leading-relaxed">
                            Dengan mengirimkan formulir ini, saya menyatakan bahwa semua informasi yang diberikan adalah benar dan akurat.
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}
