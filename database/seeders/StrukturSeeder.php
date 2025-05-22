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
                'main' => 1,
                'gender' => 'Laki-laki',
                'image' => 'image/structure/abdurrauf-abdullah-pawaly.png',
            ],
            [
                'name' => 'Al-Hafidz Ahmad Jazee, M.Pd',
                'no_hp' => '1234567890',
                'role' => "Dewan Pakar",
                'keterangan' => "Pemegang sanad qira'at sab'ah dari syekh Musa jibou as-sudani",
                'main' => 1,
                'gender' => 'Laki-laki',
                'image' => 'image/structure/ahmad-jazee.png',
            ],
            [
                'name' => 'Al- Hafidz Fathi Ararya Dihyan',
                'no_hp' => '1234567890',
                'role' => 'Trainer dan Pembina',
                'keterangan' => 'Berlisensi dan Bersanad',
                'main' => 1,
                'gender' => 'Laki-laki',
                'image' => 'image/structure/fathi-ararya-dihyan.png',
            ],
            [
                'name' => 'Al-Hafidz M. Zainal Hasani',
                'no_hp' => '1234567890',
                'role' => 'Trainer dan Pembina',
                'keterangan' => 'Berlisensi dan Bersanad',
                'main' => 1,
                'gender' => 'Laki-laki',
                'image' => 'image/structure/m-zainal-hasani.png',
            ],
            [
                'name' => 'Al-Hafidz Adryan Syahwan',
                'no_hp' => '1234567890',
                'role' => 'Trainer dan Pembina',
                'keterangan' => 'Berlisensi dan Bersanad',
                'main' => 0,
                'gender' => 'Laki-laki',
                'image' => 'image/structure/682de132dfc73-al-hafidz-adryan-syahwan.png',
            ],
            [
                'name' => 'Fulanah',
                'no_hp' => '1234567890',
                'role' => 'Official',
                'keterangan' => 'Training',
                'main' => 0,
                'gender' => 'Laki-laki',
                'image' => 'image/structure/custom-struktur.jpg',
            ],
            [
                'name' => 'Fulanah',
                'no_hp' => '1234567890',
                'role' => 'Official',
                'keterangan' => 'Training',
                'main' => 0,
                'gender' => 'Laki-laki',
                'image' => 'image/structure/custom-struktur.jpg',
            ],
            [
                'name' => 'Fulanah',
                'no_hp' => '1234567890',
                'role' => 'Official',
                'keterangan' => 'Training',
                'main' => 0,
                'gender' => 'Laki-laki',
                'image' => 'image/structure/custom-struktur.jpg',
            ],
        ];

        foreach ($strukturs as $key => $struktur) {
            Struktur::create([
                'name' => $struktur['name'],
                'no_hp' => $struktur['no_hp'],
                'role' => $struktur['role'],
                'keterangan' => $struktur['keterangan'],
                'main' => $struktur['main'],
                'gender' => $struktur['gender'],
                'image' => $struktur['image'],
            ]);
        }
    }
}
