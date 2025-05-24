<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'label' => 'students',
                'title' => 'Alumni',
                'value' => '000',
            ],
            [
                'label' => 'students',
                'title' => 'Santri Aktif',
                'value' => '000',
            ],
            [
                'label' => 'students',
                'title' => 'Santriwati Aktif',
                'value' => '000',
            ],
        ];


        foreach ($datas as $key => $data) {
            Settings::create([
                'label' => $data['label'],
                'title' => $data['title'],
                'value' => $data['value']
            ]);
        }
    }
}
