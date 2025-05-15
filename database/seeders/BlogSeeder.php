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
                'title' => 'Momentum Wisuda Santri Ubay Bin Ka\'ab: Mengukir Langkah Menuju Masa Depan Gemilang',
                'excerpt' => 'Wisuda santri di Ubay Bin Ka\'ab berlangsung khidmat, menjadi simbol keberhasilan dalam menempuh perjalanan menghafal Al-Qur\'an.',
                'body1' => 'Acara wisuda santri Ubay Bin Ka\'ab digelar dengan penuh khidmat dan haru. Puluhan santri diwisuda setelah menyelesaikan target hafalan mereka. Kegiatan ini menjadi puncak dari proses pembinaan yang panjang dan penuh semangat.',
                'body2' => 'Para orang tua, guru, dan tamu undangan tampak hadir memberi doa dan dukungan. Wisuda ini diharapkan menjadi motivasi bagi santri lain untuk terus berjuang dalam menuntut ilmu dan menghafal Al-Qur\'an.',
                'picture1' => 'image/blog/momentum-wisuda-santri-ubay-bin-kaab-mengukir-langkah-menuju-masa-depan-gemilang.jpg',
                'picture2' => 'image/blog/momentum-wisuda-santri-ubay-bin-kaab-mengukir-langkah-menuju-masa-depan-gemilang-2.jpg',
                'picture3' => 'image/blog/momentum-wisuda-santri-ubay-bin-kaab-mengukir-langkah-menuju-masa-depan-gemilang-3.jpg',
                'tags' => 'wisuda, santri, hafalan, ubay bin kaab',
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
                'tags' => ['wisuda, tahsin, tajwid'],
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
                'tags' => ['perkemahan, santri, karakter'],
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
                'tags' => ['hsn, hari santri, tuan rumah'],
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
                'tags' => ['masjid, kampus, pembangunan'],
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
                'category' => $data['news'],
                'visit' => $data['visit'],
            ]);
        }
    }
}
