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
        $contactChannels = [
            [
                'label' => 'fb',
                'name' => 'Facebook',
                'value' => 'Ubay Bin Kaab',
                'link' => 'https://facebook.com/ubay',
                'icon' => 'Facebook',
                'color' => '#1877F2',
                'bgColor' => '#E7F0FF',
                'status' => 'aktif',
            ],
            [
                'label' => 'ig',
                'name' => 'Instagram',
                'value' => '@ubaykaab',
                'link' => 'https://instagram.com/ubaykaab',
                'icon' => 'Instagram',
                'color' => '#E4405F',
                'bgColor' => '#FDEEF1',
                'status' => 'aktif',
            ],
            [
                'label' => 'tw',
                'name' => 'Twitter',
                'value' => '@ubaykaab',
                'link' => 'https://twitter.com/ubaykaab',
                'icon' => 'Twitter',
                'color' => '#1DA1F2',
                'bgColor' => '#E9F5FD',
                'status' => 'aktif',
            ],
            [
                'label' => 'yt',
                'name' => 'YouTube',
                'value' => 'Ubay Official',
                'link' => 'https://youtube.com/@ubaykaab',
                'icon' => 'Youtube',
                'color' => '#FF0000',
                'bgColor' => '#FFEBEB',
                'status' => 'aktif',
            ],
            [
                'label' => 'wa',
                'name' => 'WhatsApp',
                'value' => '+62 813-8125-0081',
                'link' => 'https://wa.me/6281381250081',
                'icon' => 'MessageSquare',
                'color' => '#25D366',
                'bgColor' => '#EAFAF1',
                'status' => 'aktif',
            ],
            [
                'label' => 'email',
                'name' => 'Email',
                'value' => 'official1@ubayinkaab.ponpes.id',
                'link' => 'mailto:official1@ubayinkaab.ponpes.id',
                'icon' => 'Mail',
                'color' => '#D44638',
                'bgColor' => '#FEEFED',
                'status' => 'aktif',
            ],
            [
                'label' => 'web',
                'name' => 'Website',
                'value' => 'ubaykaab.or.id',
                'link' => 'https://ubaykaab.or.id',
                'icon' => 'Globe',
                'color' => '#0078D7',
                'bgColor' => '#E5F1FB',
                'status' => 'aktif',
            ],
            [
                'label' => 'linkedin',
                'name' => 'LinkedIn',
                'value' => 'Ubay Kaab Institute',
                'link' => 'https://linkedin.com/in/ubaykaab',
                'icon' => 'Linkedin',
                'color' => '#0077B5',
                'bgColor' => '#E5F1F9',
                'status' => 'aktif',
            ],
            [
                'label' => 'tiktok',
                'name' => 'TikTok',
                'value' => '@ubaykaab',
                'link' => 'https://tiktok.com/@ubaykaab',
                'icon' => 'SendIcon', // Placeholder
                'color' => '#000000',
                'bgColor' => '#F0F0F0',
                'status' => 'aktif',
            ],
            [
                'label' => 'telegram',
                'name' => 'Telegram',
                'value' => '@ubaychannel',
                'link' => 'https://t.me/ubaychannel',
                'icon' => 'Send',
                'color' => '#0088CC',
                'bgColor' => '#E5F7FD',
                'status' => 'aktif',
            ],
        ];



        foreach ($contactChannels as $key => $kontak) {
            Kontak::create([
                'label' => $kontak['label'],
                'name' => $kontak['name'],
                'value' => $kontak['value'],
                'link' => $kontak['link'],
                'icon' => $kontak['icon'],
                'bgColor' => $kontak['bgColor'],
                'color' => $kontak['color'],
                'status' => $kontak['status'],
            ]);
        }
    }
}
