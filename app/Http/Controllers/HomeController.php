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
                'title' => 'Sejarah Pendirian Pondok Pesantren Ubay Bin Ka’ab Bulukumba',
                'image' => 'image/assets/about.jpg',
                'body1' => '<p class="mb-2 text-gray-800">Pondok Pesantren Ubay Bin Ka’ab Bulukumba dirintis pada bulan Juli tahun 2020 dan berlokasi di Lajae, Jawi-Jawi, Kabupaten Bulukumba. Lahan tempat berdirinya pesantren ini merupakan wakaf dari almarhumah Ibu Hj. Darniati, istri dari Bapak H. Rais Sanusi, seluas 50 x 50 meter persegi.</p><p class="mb-2 text-gray-800">Awalnya, tanah wakaf ini diamanahkan kepada Pondok Pesantren Darul Istiqamah Ponci. Namun, kemudian dialihkan dan dipindahwakafkan secara resmi kepada Yayasan Ubay Bin Ka’ab. Proses serah terima ini dilangsungkan langsung oleh Bapak H. Rais Sanusi kepada pihak yayasan, dengan disaksikan oleh Dr. Muzakkir Arif, Lc., M.A., Bapak Muh. Nasir, S.Pd., M.Pd., serta seluruh ahli waris.</p><p class="mb-2 text-gray-800">Untuk memenuhi kebutuhan pendidikan dan tempat belajar para santri, dibangun ruang kelas dan asrama dua lantai berukuran 7 x 21 meter di samping masjid. Alhamdulillah, pada tahun 2021 pembangunan tersebut telah rampung dan mulai dimanfaatkan oleh para santri.</p><p class="mb-2 text-gray-800">Seiring dengan perkembangan, Pondok Pesantren Ubay Bin Ka’ab Bulukumba kini telah membuka beberapa cabang:</p><ul class="list-disc list-inside ml-4 text-gray-700"><li><strong>Kampus 2</strong> di Desa Manyampa, Kecamatan Ujung Loe, di atas lahan hibah seluas 1 hektar dari Bapak Amiruddin, seorang pengusaha dan warga Manyampa.</li><li><strong>Kampus khusus santri putri</strong> di Ujung Bulu, Kota Bulukumba, tepatnya di Jalan Jati, yang merupakan wakaf dari Bapak H. Hendra, juga seorang pengusaha.</li></ul><p class="mb-2 text-gray-800">Pada tahun 2023, Yayasan Ubay Bin Ka’ab Bulukumba telah mengelola berbagai jenjang pendidikan formal, mulai dari Sekolah Dasar (SD), Madrasah Tsanawiyah/Sekolah Menengah Pertama (MTs/SMP), hingga Madrasah Aliyah/Sekolah Menengah Atas (MA/SMA). Selain itu, tersedia pula program pendidikan non-formal seperti <em>Tahfidz Day</em> dan <em>Tahfidz Weekend</em> untuk tingkat SD dan SMP.</p><p class="mb-2 text-gray-800">Pondok Pesantren Ubay Bin Ka’ab Bulukumba berdiri di atas prinsip <strong>menjalankan amal ibadah sesuai dengan tuntunan Ahlus Sunnah wal Jamaah</strong>, berlandaskan dalil yang sahih. Pesantren ini juga secara tegas menolak segala bentuk kesyirikan, khurafat, tahayul, tathayyur, bid’ah, serta praktik-praktik yang bertentangan dengan syariat Islam.</p><p>Dengan semangat keikhlasan dan dakwah yang berlandaskan ilmu, Pondok Pesantren Ubay Bin Ka’ab Bulukumba berkomitmen menjadi pelita ilmu dan keimanan bagi generasi Muslim masa depan.</p>',
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
