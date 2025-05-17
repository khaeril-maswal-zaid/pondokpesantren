<?php

namespace Database\Seeders;

use App\Models\Kontak;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KontakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kontaks = [
            [
                'label' => 'fb',
                'name' => 'Facebook',
                'value' => 'Ubay Bin Kaab',
                'link' => 'https://facebook.com/ubay',
                'icon' => 'facebook',
                'status' => 'aktif',
            ],
            [
                'label' => 'ig',
                'name' => 'Instagram',
                'value' => '@ubaykaab',
                'link' => 'https://instagram.com/ubaykaab',
                'icon' => 'instagram',
                'status' => 'aktif',
            ],
            [
                'label' => 'tw',
                'name' => 'Twitter',
                'value' => '@ubaykaab',
                'link' => 'https://twitter.com/ubaykaab',
                'icon' => 'twitter',
                'status' => 'aktif',
            ],
            [
                'label' => 'yt',
                'name' => 'YouTube',
                'value' => 'Ubay Official',
                'link' => 'https://youtube.com/@ubaykaab',
                'icon' => 'youtube',
                'status' => 'aktif',
            ],
            [
                'label' => 'wa',
                'name' => 'WhatsApp',
                'value' => '+62 813-8125-0081',
                'link' => 'https://wa.me/6281381250081',
                'icon' => 'Phone',
                'status' => 'aktif',
            ],
            [
                'label' => 'email',
                'name' => 'Email',
                'value' => 'official1@ubaybinkaab.ponpes.id',
                'link' => 'official1@ubaybinkaab.ponpes.id',
                'icon' => 'Mail',
                'status' => 'aktif',
            ],
            [
                'label' => 'web',
                'name' => 'Website',
                'value' => 'ubaykaab.or.id',
                'link' => 'https://ubaykaab.or.id',
                'icon' => 'globe',
                'status' => 'aktif',
            ],
            [
                'label' => 'linkedin',
                'name' => 'LinkedIn',
                'value' => 'Ubay Kaab Institute',
                'link' => 'https://linkedin.com/in/ubaykaab',
                'icon' => 'linkedin',
                'status' => 'aktif',
            ],
            [
                'label' => 'tiktok',
                'name' => 'TikTok',
                'value' => '@ubaykaab',
                'link' => 'https://tiktok.com/@ubaykaab',
                'icon' => 'tiktok',
                'status' => 'aktif',
            ],
            [
                'label' => 'telegram',
                'name' => 'Telegram',
                'value' => '@ubaychannel',
                'link' => 'https://t.me/ubaychannel',
                'icon' => 'send',
                'status' => 'aktif',
            ],
        ];

        foreach ($kontaks as $key => $kontak) {
            Kontak::create([
                'label' => $kontak['label'],
                'name' => $kontak['name'],
                'value' => $kontak['value'],
                'link' => $kontak['link'],
                'icon' => $kontak['icon'],
                'status' => $kontak['status'],
            ]);
        }
    }
}
