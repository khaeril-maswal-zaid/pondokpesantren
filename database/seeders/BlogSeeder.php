<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'user_id' => 1,
                'slug' => 'momentum-wisuda-santri-ubay-bin-kaab-mengukir-langkah-menuju-masa-depan-gemilang',
                'title' => "Momentum Wisuda Santri Ubay Bin Ka\'ab: Mengukir Langkah Menuju Masa Depan Gemilang",
                'excerpt' => "Wisuda santri di Ubay Bin Ka\'ab berlangsung khidmat, menjadi simbol keberhasilan dalam menempuh perjalanan menghafal Al-Qur\'an.",
                'body1' => "Acara wisuda santri Ubay Bin Ka\'ab digelar dengan penuh khidmat dan haru. Puluhan santri diwisuda setelah menyelesaikan target hafalan mereka. Kegiatan ini menjadi puncak dari proses pembinaan yang panjang dan penuh semangat.",
                'body2' => "Para orang tua, guru, dan tamu undangan tampak hadir memberi doa dan dukungan. Wisuda ini diharapkan menjadi motivasi bagi santri lain untuk terus berjuang dalam menuntut ilmu dan menghafal Al-Qur'an.",
                'picture1' => 'image/blog/momentum-wisuda-santri-ubay-bin-kaab-mengukir-langkah-menuju-masa-depan-gemilang.jpg',
                'picture2' => 'image/blog/momentum-wisuda-santri-ubay-bin-kaab-mengukir-langkah-menuju-masa-depan-gemilang-2.jpg',
                'picture3' => 'image/blog/momentum-wisuda-santri-ubay-bin-kaab-mengukir-langkah-menuju-masa-depan-gemilang-3.jpg',
                'tags' => ["wisuda", "santri", "hafalan", "ubay bin kaab"],
                'category' => 'news',
                'visit' => 0,
            ],
            [
                'user_id' => 1,
                'slug' => 'akademi-tahsin-dan-tajwid-gelar-wisuda-perdana-dengan-khidmat',
                'title' => 'Akademi Tahsin dan Tajwid Gelar Wisuda Perdana dengan Khidmat',
                'excerpt' => 'Akademi Tahsin dan Tajwid Ubay Bin Ka’ab sukses menggelar wisuda perdana yang diikuti oleh puluhan santri.',
                'body1' => 'Bertempat di Aula Utama, para wisudawan Akademi Tahsin dan Tajwid menerima sertifikat kelulusan setelah menempuh proses pembelajaran intensif selama satu tahun.',
                'body2' => 'Acara diisi dengan pembacaan tilawah, testimoni alumni, serta pesan dan nasihat dari pembina. Momen ini menjadi sejarah penting bagi akademi dalam mencetak generasi cinta Al-Qur\'an.',
                'picture1' => 'image/blog/akademi-tahsin-dan-tajwid-gelar-wisuda-perdana-dengan-khidmat.jpg',
                'picture2' => 'image/blog/akademi-tahsin-dan-tajwid-gelar-wisuda-perdana-dengan-khidmat-2.jpg',
                'picture3' => 'image/blog/akademi-tahsin-dan-tajwid-gelar-wisuda-perdana-dengan-khidmat-3.jpg',
                'tags' => ["wisuda", "tahsin", "tajwid"],
                'category' => 'news',
                'visit' => 0
            ],
            [
                'user_id' => 1,
                'slug' => 'perkemahan-santri-ubay-mengasah-kemandirian-dan-kebersamaan',
                'title' => 'Perkemahan Bersama Komunitas PASKAS Indonesia Timur.',
                'excerpt' => 'Kegiatan perkemahan tahunan kembali digelar sebagai bagian dari pembentukan karakter santri Ubay Bin Ka’ab.',
                'body1' => 'Berlangsung selama tiga hari di Bumi Perkemahan Bontobahari, kegiatan ini melibatkan berbagai lomba keterampilan, penguatan ukhuwah, dan pelatihan dasar kepemimpinan.',
                'body2' => 'Santri tampak antusias mengikuti seluruh rangkaian kegiatan, mulai dari api unggun hingga pembekalan rohani. Banyak yang menyebut ini sebagai pengalaman berharga.',
                'picture1' => 'image/blog/perkemahan-santri-ubay-mengasah-kemandirian-dan-kebersamaan.jpg',
                'picture2' => 'image/blog/perkemahan-santri-ubay-mengasah-kemandirian-dan-kebersamaan-2.jpg',
                'picture3' => 'image/blog/perkemahan-santri-ubay-mengasah-kemandirian-dan-kebersamaan-3.jpg',
                'tags' => ["perkemahan", "santri", "karakter"],
                'category' => 'news',
                'visit' => 0
            ],
            [
                'user_id' => 1,
                'slug' => 'ubay-bin-kaab-ditunjuk-sebagai-tuan-rumah-peringatan-hari-santri-nasional-2024',
                'title' => 'Ubay Bin Ka’ab Ditunjuk sebagai Tuan Rumah Peringatan Hari Santri Nasional 2024',
                'excerpt' => 'Yayasan Ubay Bin Ka’ab dipercaya menjadi tuan rumah dalam penyelenggaraan HSN tingkat kabupaten tahun ini.',
                'body1' => 'Penunjukan ini menjadi kebanggaan sekaligus tantangan bagi seluruh civitas Ubay Bin Ka’ab untuk menampilkan yang terbaik dalam menyambut Hari Santri Nasional 2025.',
                'body2' => 'Berbagai persiapan telah dilakukan, termasuk gladi resik, koordinasi dengan ormas, dan pelatihan pasukan upacara. Kegiatan akan dipusatkan di halaman utama kampus.',
                'picture1' => 'image/blog/ubay-bin-kaab-ditunjuk-sebagai-tuan-rumah-peringatan-hari-santri-nasional-2025.jpg',
                'picture2' => 'image/blog/ubay-bin-kaab-ditunjuk-sebagai-tuan-rumah-peringatan-hari-santri-nasional-2025-2.jpg',
                'picture3' => 'image/blog/ubay-bin-kaab-ditunjuk-sebagai-tuan-rumah-peringatan-hari-santri-nasional-2025-3.jpg',
                'tags' => ["hsn", "hari santri", "tuan rumah"],
                'category' => 'news',
                'visit' => 0
            ],
            [
                'user_id' => 1,
                'slug' => 'progres-pembangunan-masjid-kampus-2-ubay-bin-kaab-terus-berjalan',
                'title' => 'Progres Pembangunan Masjid Kampus 2 Ubay Bin Ka’ab Terus Berjalan',
                'excerpt' => 'Pembangunan Masjid Kampus 2 terus berlanjut dengan dukungan penuh dari para donatur dan warga sekitar.',
                'body1' => 'Pembangunan Masjid Kampus 2 Ubay Bin Ka’ab kini memasuki tahap pemasangan atap setelah sebelumnya menyelesaikan struktur utama. Kegiatan ini merupakan bagian dari upaya memperluas fasilitas ibadah untuk mendukung kegiatan kampus.',
                'body2' => 'Ketua panitia pembangunan menyampaikan terima kasih kepada seluruh pihak yang telah berkontribusi. Diharapkan masjid ini dapat digunakan secara optimal pada awal tahun depan.',
                'picture1' => 'image/blog/progres-pembangunan-masjid-kampus-2-ubay-bin-kaab-terus-berjalan.jpg',
                'picture2' => 'image/blog/progres-pembangunan-masjid-kampus-2-ubay-bin-kaab-terus-berjalan-2.jpg',
                'picture3' => 'image/blog/progres-pembangunan-masjid-kampus-2-ubay-bin-kaab-terus-berjalan-3.jpg',
                'tags' => ["masjid", "kampus", "pembangunan"],
                'category' => 'news',
                'visit' => 0
            ],
            [
                'user_id' => 1,
                'slug' => 'sejarah-pendirian-pondok-pesantren-ubay-bin-ka’ab-bulukumba',
                'title' => 'Sejarah Pendirian Pondok Pesantren Ubay Bin Ka’ab Bulukumba',
                'excerpt' => 'Pembangunan Masjid Kampus 2 terus berlanjut dengan dukungan penuh dari para donatur dan warga sekitar.',
                'body1' => '<p class="mb-2 text-gray-800">Pondok Pesantren Ubay Bin Ka’ab Bulukumba dirintis pada bulan Juli tahun 2020 dan berlokasi di Lajae, Jawi-Jawi, Kabupaten Bulukumba. Lahan tempat berdirinya pesantren ini merupakan wakaf dari almarhumah Ibu Hj. Darniati, istri dari Bapak H. Rais Sanusi, seluas 50 x 50 meter persegi.</p><p class="mb-2 text-gray-800">Awalnya, tanah wakaf ini diamanahkan kepada Pondok Pesantren Darul Istiqamah Ponci. Namun, kemudian dialihkan dan dipindahwakafkan secara resmi kepada Yayasan Ubay Bin Ka’ab. Proses serah terima ini dilangsungkan langsung oleh Bapak H. Rais Sanusi kepada pihak yayasan, dengan disaksikan oleh Dr. Muzakkir Arif, Lc., M.A., Bapak Muh. Nasir, S.Pd., M.Pd., serta seluruh ahli waris.</p><p class="mb-2 text-gray-800">Untuk memenuhi kebutuhan pendidikan dan tempat belajar para santri, dibangun ruang kelas dan asrama dua lantai berukuran 7 x 21 meter di samping masjid. Alhamdulillah, pada tahun 2021 pembangunan tersebut telah rampung dan mulai dimanfaatkan oleh para santri.</p><p class="mb-2 text-gray-800">Seiring dengan perkembangan, Pondok Pesantren Ubay Bin Ka’ab Bulukumba kini telah membuka beberapa cabang:</p><ul class="list-disc list-inside ml-4 text-gray-700"><li><strong>Kampus 2</strong> di Desa Manyampa, Kecamatan Ujung Loe, di atas lahan hibah seluas 1 hektar dari Bapak Amiruddin, seorang pengusaha dan warga Manyampa.</li><li><strong>Kampus khusus santri putri</strong> di Ujung Bulu, Kota Bulukumba, tepatnya di Jalan Jati, yang merupakan wakaf dari Bapak H. Hendra, juga seorang pengusaha.</li></ul><p class="mb-2 text-gray-800">Pada tahun 2023, Yayasan Ubay Bin Ka’ab Bulukumba telah mengelola berbagai jenjang pendidikan formal, mulai dari Sekolah Dasar (SD), Madrasah Tsanawiyah/Sekolah Menengah Pertama (MTs/SMP), hingga Madrasah Aliyah/Sekolah Menengah Atas (MA/SMA). Selain itu, tersedia pula program pendidikan non-formal seperti <em>Tahfidz Day</em> dan <em>Tahfidz Weekend</em> untuk tingkat SD dan SMP.</p><p class="mb-2 text-gray-800">Pondok Pesantren Ubay Bin Ka’ab Bulukumba berdiri di atas prinsip <strong>menjalankan amal ibadah sesuai dengan tuntunan Ahlus Sunnah wal Jamaah</strong>, berlandaskan dalil yang sahih. Pesantren ini juga secara tegas menolak segala bentuk kesyirikan, khurafat, tahayul, tathayyur, bid’ah, serta praktik-praktik yang bertentangan dengan syariat Islam.</p><p>Dengan semangat keikhlasan dan dakwah yang berlandaskan ilmu, Pondok Pesantren Ubay Bin Ka’ab Bulukumba berkomitmen menjadi pelita ilmu dan keimanan bagi generasi Muslim masa depan.</p>',

                'body2' => '',
                'picture1' => 'image/assets/about.jpg',
                'picture2' => '',
                'picture3' => '',
                'tags' => ["masjid", "kampus", "pembangunan"],
                'category' => 'news',
                'visit' => 0
            ],
        ];

        foreach ($datas as $data) {
            Blog::create([
                'user_id' => $data['user_id'],
                'slug' => $data['slug'],
                'title' => $data['title'],
                'excerpt' => $data['excerpt'],
                'body1' => $data['body1'],
                'body2' => $data['body2'],
                'picture1' => $data['picture1'],
                'picture2' => $data['picture2'],
                'picture3' => $data['picture3'],
                'tags' => $data['tags'],
                'category' => $data['category'],
                'visit' => $data['visit'],
            ]);
        }
    }
}
