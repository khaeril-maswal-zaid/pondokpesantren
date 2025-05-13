<?php

namespace Database\Seeders;

use App\Models\Struktur;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StrukturSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $strukturs = [
            [
                'name' => 'Abdurrauf Abdullah P, M.Pd.',
                'no_hp' => '+62 813-8125-0081',
                'role' => "Pimpinan Pesantren",
                'keterangan' => 'Pimpinan',
                'image' => 'image/structure/abdurrauf-abdullah-pawaly.png',
            ],
            [
                'name' => 'Al-Hafidz Ahmad Jazee, M.Pd',
                'no_hp' => '1234567890',
                'role' => "Dewan Pakar",
                'keterangan' => "Pemegang sanad qira'at sab'ah dari syekh Musa jibou as-sudani",
                'image' => 'image/structure/ahmad-jazee.png',
            ],
            [
                'name' => 'Al- Hafidz Fathi Ararya Dihyan',
                'no_hp' => '1234567890',
                'role' => 'Trainer dan Pembina',
                'keterangan' => 'Berlisensi dan Bersanad',
                'image' => 'image/structure/fathi-ararya-dihyan.png',
            ],
            [
                'name' => 'Al-Hafidz M. Zainal Hasani',
                'no_hp' => '1234567890',
                'role' => 'Trainer dan Pembina',
                'keterangan' => 'Berlisensi dan Bersanad',
                'image' => 'image/structure/m-zainal-hasani.png',
            ],
        ];

        foreach ($strukturs as $key => $struktur) {
            Struktur::create([
                'name' => $struktur['name'],
                'no_hp' => $struktur['no_hp'],
                'role' => $struktur['role'],
                'keterangan' => $struktur['keterangan'],
                'image' => $struktur['image'],
            ]);
        }
    }
}
