<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\Blog;
use App\Models\Struktur;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $ogTags = [
            'title' => 'Pondok Pesantren ' . config('app.name') . ' Bulukumba',
            'description' => 'Pondok Pesantren Ubay Bin Ka’ab Bulukumba berdiri di atas prinsip menjalankan amal ibadah sesuai dengan tuntunan Ahlus Sunnah wal Jamaah, berlandaskan Al-qur`an dan hadist yang sahih.',
            'image' => asset('/storage/image/assets/logo.png'),
            'url' => config('app.url'),
        ];

        request()->attributes->set('og', $ogTags);


        $data = [
            'heros' => [
                [
                    'image' => 'image/assets/hero-1.jpg',
                    'quote' => 'اطلبوا العلم من المهد إلى اللحد',
                    'translation' => 'Carilah ilmu sejak dari buaian hingga ke liang lahat',
                ],
                [
                    'image' => 'image/assets/hero-2.jpg',
                    'quote' => 'إنما الأعمال بالنيات',
                    'translation' => 'Sesungguhnya setiap amalan tergantung pada niatnya',
                ],
                [
                    'image' => 'image/assets/hero-3b.jpg',
                    'quote' => 'خير الناس أنفعهم للناس',
                    'translation' => 'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya',
                ],
            ],

            'about' => Blog::select('title', 'picture1', 'body1', 'slug')->where('slug', 'sejarah-pendirian-pondok-pesantren-ubay-bin-ka’ab-bulukumba')->first(),

            'stats' => [
                [
                    'icon' => 'GraduationCap',
                    'value' => '000+',
                    'label' => 'Alumni',
                ],
                [
                    'icon' => 'Users',
                    'value' => '000+',
                    'label' => 'Santri',
                ],
                [
                    'icon' => 'BookOpen',
                    'value' => '000+',
                    'label' => 'Santriwati',
                ],
            ],

            'figures' => Struktur::select(['name', 'role', 'image'])->where('main', '1')->latest()->take(4)->get(),

            'programs' => [
                [
                    'title' => 'Akademi Tahsin dan Tajwid',
                    'description' => 'Meningkatkan kemampuan membaca Al-Qur’an dengan tajwid yang benar dan pelafalan yang fasih.',
                    'icon' => 'BookOpenText',
                ],
                [
                    'title' => 'Akademi Tahfidz 30 Juz Mutqin',
                    'description' => 'Program intensif menghafal 30 juz Al-Qur’an dengan metode mutqin dan bimbingan bersanad.',
                    'icon' => 'Layers',
                ],
                [
                    'title' => 'Akademi Lughoh Arabiyah',
                    'description' => 'Belajar bahasa Arab dari dasar hingga mahir untuk memahami Al-Qur’an dan literatur Islam.',
                    'icon' => 'Languages',
                ],
                [
                    'title' => 'Dakwah dan Keterampilan',
                    'description' => 'Membina santri berdakwah efektif dengan keterampilan komunikasi, teknologi, dan kewirausahaan islami.',
                    'icon' => 'Mic',
                ],
            ],

            'agenda' => Agenda::select(['title', 'image', 'date', 'time', 'location'])->latest()->take(4)->get(),

            'blogs' => Blog::select(['title', 'slug', 'excerpt', 'picture1', 'created_at'])->latest()->take(4)->get()
        ];

        return Inertia::render('ponpes/Home', $data);
    }

    public function dashboard(): Response
    {
        $ogTags = [
            'title' => 'Panel Admin ' . config('app.name') . 'Bulukumba',
            'description' => 'Pondok Pesantren Ubay Bin Ka’ab Bulukumba berdiri di atas prinsip menjalankan amal ibadah sesuai dengan tuntunan Ahlus Sunnah wal Jamaah, berlandaskan Al-qur`an dan hadist yang sahih.',
            'image' => asset('/storage/image/assets/logo.png'),
            'url' => config('app.url'),
        ];

        request()->attributes->set('og', $ogTags);

        return Inertia::render('dashboard/home');
    }
}
