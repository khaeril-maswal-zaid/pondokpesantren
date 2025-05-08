<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
                    'image' => 'image/assets/hero-3.jpg',
                    'quote' => 'خير الناس أنفعهم للناس',
                    'translation' => 'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya',
                ],
            ],

            'about' => [
                'title' => 'Sejarah Singkat',
                'image' => 'image/assets/about.jpg',
                'body1' => '<p class="mb-4 text-gray-700">Pondok Pesantren Al-Zaid didirikan pada tahun 1985 oleh KH. Ahmad Zaid dengan visi mencetak generasi yang berilmu, berakhlak mulia, dan bermanfaat bagi umat. Pesantren kami menggabungkan pendidikan Islam tradisional dengan pendidikan modern untuk mempersiapkan santri menghadapi tantangan zaman.</p><p class="mb-4 text-gray-700">Nilai-nilai yang kami pegang teguh adalah keikhlasan, kesederhanaan, kemandirian, ukhuwah Islamiyah, dan kebebasan yang bertanggung jawab. Kami percaya bahwa pendidikan yang baik harus menyeimbangkan aspek intelektual, spiritual, dan sosial.</p><p class="text-gray-700">Selama lebih dari tiga dekade, Pondok Pesantren Al-Zaid telah melahirkan ribuan alumni yang tersebar di berbagai bidang dan profesi, memberikan kontribusi positif bagi masyarakat dan bangsa.</p>',
            ],


            'figures' => [
                [
                    'name' => 'Abdurrauf Abdullah P, M.Pd.',
                    'role' => "Pimpinan Pesantren",
                    'image' => 'image/structure/abdurrauf-abdullah-pawaly.png',
                ],
                [
                    'name' => 'Al-Hafidz Ahmad Jazee, M.Pd',
                    'role' => "Dewan Pakar",
                    'image' => 'image/structure/ahmad-jazee.png',
                ],
                [
                    'name' => 'Al- Hafidz Fathi Ararya Dihyan',
                    'role' => 'Trainer dan Pembina',
                    'image' => 'image/structure/fathi-ararya-dihyan.png',
                ],
                [
                    'name' => 'Al-Hafidz M. Zainal Hasani',
                    'role' => 'Trainer dan Pembina',
                    'image' => 'image/structure/m-zainal-hasani.png',
                ],
            ],

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

            'agenda' => [
                [
                    'title' => 'Halaqoh pengambilan Sanad',
                    'image' => 'image/agenda/halaqoh-pengambilan-sanad.jpg',
                    'date' => '05-06-2025',
                    'time' => '08:00-10:00',
                    'location' => 'Masjid Ubay Bin Ka\'ab, Bulukumba'
                ],
                [
                    'title' => 'Halaqoh pengambilan Sanad Putri',
                    'image' => 'image/agenda/halaqoh-pengambilan-sanad-putri.jpg',
                    'date' => '06-06-2025',
                    'time' => '08:00-10:00',
                    'location' => 'Aula Akhwat Ubay Bin Ka\'ab'
                ],
                [
                    'title' => 'Pelatihan TOT Tahfidzul Qur\'an',
                    'image' => 'image/agenda/pelatihan-tot-tahfidzul-quran.jpg',
                    'date' => '15-07-2025',
                    'time' => '08:00-10:00',
                    'location' => 'Gedung Dakwah Muhammadiyah Bulukumba'
                ],
                [
                    'title' => 'Footsal Rutin oleh Ubay Football Club',
                    'image' => 'image/agenda/footsal-rutin-oleh-ubay-football-club.jpg',
                    'date' => '10-05-2025',
                    'time' => '08:00-10:00',
                    'location' => 'Lapangan Futsal Nusantara, Bulukumba'
                ],
                [
                    'title' => 'Penerimaan Raport SD Qur\'an Ubay Bin Ka\'ab',
                    'image' => 'image/agenda/penerimaan-raport-sd-quran-ubay-bin-kaab.jpg',
                    'date' => '20-06-2025',
                    'time' => '08:00-10:00',
                    'location' => 'Ruang Kelas Utama SD Qur\'an Ubay Bin Ka\'ab'
                ]
            ],

            'blogs' => Blog::select(['title', 'slug', 'excerpt', 'picture1', 'created_at'])->latest()->take(4)->get()
        ];

        return Inertia::render('ponpes/Home', $data);
    }
}
