import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

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

        // Asal Sekolah
        namaSekolah: string;
        nisn: string;
        tahunTamat: string;

        // Foto
        foto: string;
    };
}

export function RingkasanData({ data }: RingkasanDataProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-6 md:flex-row">
                <div className="space-y-6 md:w-2/3">
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
                        <h3 className="mb-2 text-lg font-medium">Asal Sekolah</h3>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Nama Sekolah Dasar</TableCell>
                                    <TableCell>{data.namaSekolah}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">NISN</TableCell>
                                    <TableCell>{data.nisn}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Tahun Tamat</TableCell>
                                    <TableCell>{data.tahunTamat}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="md:w-1/3">
                    <h3 className="mb-2 text-lg font-medium">Foto Santri</h3>
                    <div className="flex flex-col items-center rounded-lg border bg-white p-1 shadow-sm">
                        {data.foto ? (
                            <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border">
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

            <div className="border-t pt-4">
                <div className="mb-4 flex items-start space-x-2">
                    <Checkbox id="pernyataan" className="mt-1" required />
                    <label htmlFor="pernyataan" className="text-sm leading-relaxed">
                        Dengan mengirimkan formulir ini, saya menyatakan bahwa semua informasi yang diberikan adalah benar dan akurat.
                    </label>
                </div>
            </div>
        </div>
    );
}
