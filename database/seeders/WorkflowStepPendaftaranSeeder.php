<?php

namespace Database\Seeders;

use App\Models\WorkflowStepPendaftaran;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkflowStepPendaftaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        $panduanPendaftaran = [
            [
                'title' => 'Pendaftaran Online',
                'description' => 'Calon santri melakukan pendaftaran online melalui website resmi Pondok Pesantren Ubay Bin Kaab dan mengisi formulir dengan lengkap.'
            ],
            [
                'title' => 'Pembayaran Biaya Pendaftaran',
                'description' => 'Pendaftaran Gratis. Tidak ada biaya apapun yang dikenakan untuk proses pendaftaran santri baru.'
            ],
            [
                'title' => 'Verifikasi Dokumen',
                'description' => 'Menyerahkan berkas pendaftaran lengkap ke panitia untuk diverifikasi. Dokumen dapat dikirim secara online atau diserahkan langsung.'
            ],
            [
                'title' => 'Tes Seleksi',
                'description' => 'Mengikuti tes seleksi yang meliputi tes tulis (pengetahuan umum dan agama), tes baca Al-Qur\'an, dan wawancara.'
            ],
            [
                'title' => 'Pengumuman Hasil Seleksi',
                'description' => 'Pengumuman hasil seleksi akan disampaikan melalui website dan SMS/WhatsApp ke nomor orang tua/wali.'
            ],
            [
                'title' => 'Registrasi Ulang & Masuk Pesantren',
                'description' => 'Bagi yang diterima, melakukan registrasi ulang dengan melunasi biaya pendidikan dan masuk pesantren sesuai jadwal yang ditentukan.'
            ]
        ];

        foreach ($panduanPendaftaran as $i => $value) {
            WorkflowStepPendaftaran::create([
                'module'      => 'alur',
                'title'       => $value['title'],
                'description' => $value['description'],
                'order' => $i  + 1,
                'created_at'  => $now,
                'updated_at'  => $now,
            ]);
        }

        // FAQ (QA)
        $faqs = [
            [
                'question' => 'Berapa biaya pendidikan di Pondok Pesantren Ubay Bin Kaab?',
                'answer' => ' <p>Biaya pendidikan di Pondok Pesantren {name} terdiri dari beberapa komponen:</p>
                <ol class="mt-2 list-decimal space-y-1 pl-5">
                    <li>Biaya pendaftaran: Gratis</li>
                    <li>
                        Biaya daftar ulang: Rp 3.000.000
                        <ol class="mt-1 list-disc space-y-1 pl-6">
                            <li>Biaya bulanan (Juli 2025) : Rp.600.000 *</li>
                            <li>Biaya Semester (Genap 2025) : Rp.500.000 **</li>
                            <li>Pemeliharaan sarana & prasarana (Tahun 2025) : Rp.600.000 ***</li>
                            <li>Uang pangkal: Rp. 1.000.000 ****</li>
                            <li>Raport, Papan Nama & ID Card: Rp.300.000 ****</li>
                        </ol>
                    </li>
                </ol>

                <div class="mt-2 space-y-1 text-sm">
                    <p>*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : Dibayar per bulan</p>
                    <p>**&nbsp;&nbsp;&nbsp; : Dibayar per semester</p>
                    <p>***&nbsp;&nbsp;&nbsp; : Dibayar per tahun</p>
                    <p>****&nbsp; : Dibayar sekali</p>
                </div>

                <p class="mt-2">
                    Pondok Pesantren {name} juga menyediakan beasiswa bagi santri berprestasi dan santri dari keluarga
                    kurang mampu.
                </p>'
            ],
            [
                'question' => 'Apakah ada program beasiswa yang tersedia?',
                'answer' => 'Ya, Pondok Pesantren {name} menyediakan beberapa program beasiswa:
                <ul class="mt-2 list-disc space-y-1 pl-5">
                    <li>Beasiswa Tahfidz bagi penghafal Al-Quran minimal 5 juz</li>
                    <li>Beasiswa Prestasi bagi siswa berprestasi akademik dan non-akademik</li>
                    <li>Beasiswa Dhuafa bagi santri dari keluarga kurang mampu</li>
                    <li>Beasiswa Yatim/Piatu bagi santri yatim atau piatu</li>
                </ul>
                Untuk informasi lebih lanjut tentang persyaratan dan proses seleksi beasiswa, silakan hubungi bagian
                administrasi pesantren.'
            ],
            [
                'question' => 'Apa saja fasilitas yang tersedia di pesantren?',
                'answer' => 'Pondok Pesantren {name} dilengkapi dengan berbagai fasilitas untuk menunjang kegiatan belajar dan
                kehidupan santri, antara lain:
                <ul class="mt-2 list-disc space-y-1 pl-5">
                    <li>Asrama putra dan putri terpisah</li>
                    <li>Masjid</li>
                    <li>Ruang kelas dengan fasilitas modern</li>
                    <li>Perpustakaan</li>
                    <li>Laboratorium komputer, IPA, dan bahasa</li>
                    <li>Lapangan olahraga (futsal, basket, voli)</li>
                    <li>Kantin dan dapur</li>
                    <li>Klinik kesehatan</li>
                    <li>Area WiFi terbatas</li>
                    <li>Koperasi pesantren</li>
                </ul>'
            ],
            [
                'question' => 'Apakah santri diperbolehkan membawa gadget?',
                'answer' => 'Santri tidak diperbolehkan membawa dan menggunakan gadget seperti smartphone, tablet, atau laptop pribadi
                selama berada di pesantren. Hal ini untuk menjaga fokus belajar dan menciptakan lingkungan yang kondusif.
                <p class="mt-2">
                    Untuk komunikasi dengan keluarga, santri dapat menggunakan telepon pesantren pada jadwal yang telah
                    ditentukan. Orang tua juga dapat menghubungi pesantren untuk menyampaikan pesan penting kepada santri.
                </p>
                <p class="mt-2">
                    Untuk keperluan pembelajaran, pesantren menyediakan laboratorium komputer dengan akses internet
                    terbatas yang dapat digunakan santri pada jam-jam tertentu di bawah pengawasan ustadz/ustadzah.
                </p>'
            ],
        ];

        foreach ($faqs as $i => $value) {
            WorkflowStepPendaftaran::create([
                'module'      => 'faq',
                'title'       => $value['question'],
                'description' => $value['answer'],
                'order' => $i  + 1,
                'created_at'  => $now,
                'updated_at'  => $now,
            ]);
        }
    }
}
