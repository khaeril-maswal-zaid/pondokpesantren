<?php

namespace Database\Seeders;

use App\Models\Agenda;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgendaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $agendas = [
            [
                'title' => 'Halaqoh pengambilan Sanad',
                'image' => 'image/agenda/halaqoh-pengambilan-sanad.jpg',
                'date' => '2025-06-25',
                'time' => '08:00-10:00',
                'location' => 'Bulukumba'
            ],
            [
                'title' => 'Halaqoh pengambilan Sanad Putri',
                'image' => 'image/agenda/halaqoh-pengambilan-sanad-putri.jpg',
                'date' => '2025-03-07',
                'time' => '08:00-10:00',
                'location' => 'Bulukumba'
            ],
            [
                'title' => 'Pelatihan TOT Tahfidzul Qur\'an',
                'image' => 'image/agenda/pelatihan-tot-tahfidzul-quran.jpg',
                'date' => '2025-02-25',
                'time' => '08:00-10:00',
                'location' => 'Bulukumba'
            ],
            [
                'title' => 'Footsal Rutin oleh Ubay Football Club',
                'image' => 'image/agenda/footsal-rutin-oleh-ubay-football-club.jpg',
                'date' => '2025-04-21',
                'time' => '08:00-10:00',
                'location' => 'Bulukumba'
            ],
            [
                'title' => 'Penerimaan Raport SD Qur\'an Ubay Bin Ka\'ab',
                'image' => 'image/agenda/penerimaan-raport-sd-quran-ubay-bin-kaab.jpg',
                'date' => '2025-04-25',
                'time' => '08:00-10:00',
                'location' => 'Bulukumba'
            ]
        ];

        foreach ($agendas as $agenda) {
            Agenda::create([
                'title' => $agenda['title'],
                'image' => $agenda['image'],
                'date' => $agenda['date'],
                'time' => $agenda['time'],
                'location' => $agenda['location'],
            ]);
        }
    }
}
