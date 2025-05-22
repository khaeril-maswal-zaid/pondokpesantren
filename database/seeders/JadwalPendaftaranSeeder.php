<?php

namespace Database\Seeders;

use App\Models\JadwalPendaftaran;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JadwalPendaftaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Gelombang 1
        $datas = [
            [
                'activity_name' => 'Pendaftaran Online',
                'gel1' => '1 Februari - 30 April 2025',
                'gel2' => '1 Juni - 31 Juli 2025',
            ],
            [
                'activity_name' => 'Verifikasi Berkas',
                'gel1' => '1 - 5 Mei 2025',
                'gel2' => '1 - 5 Agustus 2025',
            ],
            [
                'activity_name' => 'Tes Seleksi',
                'gel1' => '10 - 11 Mei 2025',
                'gel2' => '10 - 11 Agustus 2025',
            ],
            [
                'activity_name' => 'Pengumuman Hasil',
                'gel1' => '15 Mei 2025',
                'gel2' => '15 Agustus 2025',
            ],
            [
                'activity_name' => 'Registrasi Ulang',
                'gel1' => '16 - 25 Mei 2025',
                'gel2' => '16 - 25 Agustus 2025',
            ],
            [
                'activity_name' => 'Masuk Pesantren',
                'gel1' => 'Juli 2025',
                'gel2' => '',
            ],

        ];

        foreach ($datas as $key => $data) {
            JadwalPendaftaran::create([
                'activity_name' => $data['activity_name'],
                'gel1'           => $data['gel1'],
                'gel2'           => $data['gel2'],
            ],);
        }
    }
}
