<?php

namespace Database\Seeders;

use App\Models\ContenItemPendaftaran;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ContenItemPendaftaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        // Persyaratan Umum
        $persyaratan_umum = [
            'Beragama Islam',
            'Lulus SD/MI untuk jenjang MTs atau lulus SMP/MTs untuk jenjang MA',
            'Berusia maksimal 13 tahun untuk jenjang MTs atau 16 tahun untuk jenjang MA',
            'Sehat jasmani dan rohani',
            'Mendapat izin dari orang tua/wali',
        ];

        foreach ($persyaratan_umum as $i => $desc) {
            ContenItemPendaftaran::create([
                'module'      => 'persyaratan',
                'subcategory' => 'umum',
                'point' => $desc,
                'order' => $i  + 1,
                'created_at'  => $now,
                'updated_at'  => $now,
            ]);
        }

        // Persyaratan Khusus
        $persyaratan_khusus = [
            'Mampu membaca Al-Qur’an',
            'Memiliki hafalan minimal 1 juz Al-Qur’an (untuk program tahfidz)',
            'Lulus tes seleksi masuk yang meliputi tes tulis, tes baca Al-Qur’an, dan wawancara',
            'Bersedia mematuhi seluruh peraturan pesantren',
            'Bersedia tinggal di asrama pesantren',
            'Bersedia untuk tidak pindah sekolah selama minimal 3 tahun',
        ];

        foreach ($persyaratan_khusus as $i => $desc) {
            ContenItemPendaftaran::create([
                'module'      => 'persyaratan',
                'subcategory' => 'khusus',
                'point' => $desc,
                'order' => $i  + 1,
                'created_at'  => $now,
                'updated_at'  => $now,
            ]);
        }

        // Dokumen Wajib
        $dokumen_wajib = [
            'Fotokopi ijazah dan SKHUN terakhir yang dilegalisir (2 lembar)',
            'Fotokopi rapor 2 semester terakhir yang dilegalisir (2 lembar)',
            'Fotokopi akta kelahiran (2 lembar)',
            'Fotokopi Kartu Keluarga (2 lembar)',
        ];

        foreach ($dokumen_wajib as $i => $title) {
            ContenItemPendaftaran::create([
                'module'      => 'dokumen',
                'subcategory' => 'wajib',
                'point' => $title,
                'order' => $i  + 1,
                'created_at'  => $now,
                'updated_at'  => $now,
            ]);
        }

        // Dokumen Tambahan
        $dokumen_tambahan = [
            'Surat pernyataan kesanggupan mematuhi peraturan (bermaterai)',
            'Fotokopi piagam prestasi (jika ada)',
            'Surat rekomendasi dari sekolah/madrasah asal (jika ada)',
        ];

        foreach ($dokumen_tambahan as $i => $title) {
            ContenItemPendaftaran::create([
                'module'      => 'dokumen',
                'subcategory' => 'tambahan',
                'point' => $title,
                'order' => $i  + 1,
                'created_at'  => $now,
                'updated_at'  => $now,
            ]);
        }
    }
}
