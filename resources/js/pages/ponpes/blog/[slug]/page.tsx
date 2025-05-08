'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Calendar, ChevronUp, Clock, Eye, Facebook, Linkedin, Share2, Tag, Twitter, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Simulasi data artikel berita
const getArticleData = (slug: string) => {
    // Kita bisa menambahkan logika untuk mengambil data berdasarkan slug
    // Untuk saat ini, kita gunakan data statis

    const articles = {
        'peringatan-maulid-nabi-muhammad-saw-1445-h': {
            title: 'Peringatan Maulid Nabi Muhammad SAW 1445 H',
            category: 'Kegiatan',
            date: '12 Oktober 2023',
            author: 'Admin Pesantren',
            authorRole: 'Tim Redaksi',
            authorImage: '/placeholder.svg?height=100&width=100',
            authorBio:
                'Tim redaksi Pondok Pesantren Al-Zaid yang bertanggung jawab untuk mendokumentasikan dan mempublikasikan berbagai kegiatan pesantren.',
            readTime: '5 menit',
            views: '324',
            image: '/placeholder.svg?height=600&width=1200',
            excerpt:
                'Laporan kegiatan peringatan Maulid Nabi Muhammad SAW yang diselenggarakan di Pondok Pesantren Al-Zaid dengan berbagai rangkaian acara dan ceramah yang penuh hikmah dan berkah.',
            content: `
        <p>Alhamdulillah, Pondok Pesantren Al-Zaid telah sukses menyelenggarakan peringatan Maulid Nabi Muhammad SAW 1445 H pada hari Kamis, 12 Oktober 2023. Acara yang dihadiri oleh seluruh santri, pengajar, dan tamu undangan ini berlangsung dengan khidmat dan penuh berkah.</p>
        
        <p>Rangkaian acara dimulai setelah shalat Maghrib berjamaah dengan pembacaan ayat suci Al-Qur'an oleh Santri Tahfidz terbaik, dilanjutkan dengan pembacaan shalawat dan maulid Al-Barzanji yang dipimpin oleh KH. Ahmad Zaid selaku pengasuh pondok pesantren.</p>
        
        <p>Dalam sambutannya, KH. Ahmad Zaid menekankan pentingnya meneladani akhlak Rasulullah SAW dalam kehidupan sehari-hari. "Peringatan maulid bukan sekadar seremonial tahunan, tetapi momentum untuk memperkuat komitmen kita dalam mengikuti sunnah Rasulullah," ujarnya.</p>
        
        <p>Acara kemudian dilanjutkan dengan tausiyah dari Ustadz Dr. Mahmud Hasan yang membahas tentang "Relevansi Ajaran Rasulullah di Era Digital". Beliau menyampaikan bahwa nilai-nilai yang diajarkan Rasulullah seperti kejujuran, amanah, dan akhlak mulia tetap relevan dan bahkan semakin dibutuhkan di era teknologi saat ini.</p>
        
        <h3>Penampilan Santri</h3>
        
        <p>Salah satu highlight acara adalah penampilan marawis dan hadrah dari grup kesenian santri Al-Zaid yang membawakan berbagai shalawat dengan iringan musik tradisional. Penampilan ini mendapat sambutan meriah dari seluruh hadirin.</p>
        
        <p>Selain itu, santri-santri juga menampilkan drama singkat tentang kisah-kisah teladan dari kehidupan Rasulullah SAW yang dikemas secara menarik dan edukatif.</p>
        
        <h3>Pembagian Hadiah</h3>
        
        <p>Pada kesempatan ini juga dilakukan pembagian hadiah kepada para santri berprestasi dalam berbagai bidang, seperti tahfidz, kitab kuning, dan bahasa. Pemberian penghargaan ini bertujuan untuk memotivasi santri agar terus berprestasi dan mengembangkan potensi diri.</p>
        
        <p>Acara ditutup dengan doa bersama yang dipimpin oleh KH. Ahmad Zaid dan dilanjutkan dengan makan bersama. Panitia juga membagikan berkat kepada masyarakat sekitar sebagai bentuk sedekah dan berbagi kebahagiaan.</p>
        
        <p>Semoga dengan peringatan Maulid Nabi Muhammad SAW ini, seluruh keluarga besar Pondok Pesantren Al-Zaid dapat semakin meningkatkan kecintaan kepada Rasulullah SAW dan mengamalkan ajarannya dalam kehidupan sehari-hari.</p>
      `,
            tags: ['Maulid Nabi', 'Kegiatan Pesantren', 'Shalawat'],
            relatedPosts: [
                {
                    title: 'Keutamaan Menuntut Ilmu dalam Islam',
                    excerpt: "Pembahasan tentang keutamaan menuntut ilmu dalam Islam berdasarkan Al-Qur'an dan Hadits serta pandangan para ulama.",
                    image: '/placeholder.svg?height=400&width=600',
                    category: 'Artikel',
                    date: '5 Oktober 2023',
                    slug: 'keutamaan-menuntut-ilmu-dalam-islam',
                },
                {
                    title: "Prestasi Santri dalam Musabaqah Tilawatil Qur'an",
                    excerpt:
                        "Berita tentang prestasi membanggakan yang diraih oleh santri Al-Zaid dalam ajang Musabaqah Tilawatil Qur'an tingkat provinsi.",
                    image: '/placeholder.svg?height=400&width=600',
                    category: 'Prestasi',
                    date: '20 September 2023',
                    slug: 'prestasi-santri-dalam-musabaqah-tilawatil-quran',
                },
            ],
            prevPost: {
                title: 'Kunjungan Dinas Pendidikan ke Pesantren Al-Zaid',
                slug: 'kunjungan-dinas-pendidikan-ke-pesantren-al-zaid',
            },
            nextPost: {
                title: 'Keutamaan Menuntut Ilmu dalam Islam',
                slug: 'keutamaan-menuntut-ilmu-dalam-islam',
            },
        },
        'keutamaan-menuntut-ilmu-dalam-islam': {
            title: 'Keutamaan Menuntut Ilmu dalam Islam',
            category: 'Artikel',
            date: '5 Oktober 2023',
            author: 'Ustadz Mahmud Hasan',
            authorRole: 'Kepala Madrasah Aliyah',
            authorImage: '/placeholder.svg?height=100&width=100',
            authorBio:
                'Lulusan S3 Pendidikan Islam UIN Syarif Hidayatullah Jakarta. Telah mengajar di Pesantren Al-Zaid selama 15 tahun dan menjabat sebagai Kepala Madrasah Aliyah sejak 2018.',
            readTime: '7 menit',
            views: '512',
            image: '/placeholder.svg?height=600&width=1200',
            excerpt:
                "Pembahasan tentang keutamaan menuntut ilmu dalam Islam berdasarkan Al-Qur'an dan Hadits serta pandangan para ulama tentang pentingnya ilmu bagi setiap muslim.",
            content: `
        <p>Islam sangat menjunjung tinggi ilmu pengetahuan dan orang-orang yang berilmu. Hal ini tercermin dari banyaknya ayat Al-Qur'an dan hadits yang membahas tentang keutamaan menuntut ilmu.</p>
        
        <p>Allah SWT berfirman dalam Surah Al-Mujadilah ayat 11: "Allah akan meninggikan orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu pengetahuan beberapa derajat." Ayat ini dengan jelas menunjukkan bahwa Allah memberikan kedudukan yang tinggi bagi orang-orang yang berilmu.</p>
        
        <h3>Hadits tentang Keutamaan Ilmu</h3>
        
        <p>Rasulullah SAW bersabda: "Barangsiapa yang menempuh jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan ke surga." (HR. Muslim). Hadits ini menunjukkan bahwa menuntut ilmu adalah salah satu jalan menuju surga.</p>
        
        <p>Dalam hadits lain, Rasulullah SAW juga bersabda: "Menuntut ilmu itu wajib bagi setiap muslim." (HR. Ibnu Majah). Ini menunjukkan bahwa mencari ilmu bukan hanya anjuran, tetapi kewajiban bagi setiap muslim, baik laki-laki maupun perempuan.</p>
        
        <h3>Pandangan Ulama</h3>
        
        <p>Imam Al-Ghazali dalam kitabnya Ihya Ulumuddin membagi ilmu menjadi dua kategori: ilmu fardhu 'ain (wajib bagi setiap individu) dan ilmu fardhu kifayah (wajib bagi sebagian masyarakat). Ilmu fardhu 'ain meliputi ilmu-ilmu dasar agama yang harus diketahui oleh setiap muslim, sedangkan ilmu fardhu kifayah adalah ilmu-ilmu yang dibutuhkan untuk kemaslahatan masyarakat.</p>
        
        <p>Ibnu Qayyim Al-Jauziyyah mengatakan bahwa ilmu adalah cahaya yang menerangi jalan seseorang dalam kegelapan. Tanpa ilmu, seseorang akan tersesat dalam kebodohan dan kesesatan.</p>
        
        <h3>Etika Menuntut Ilmu</h3>
        
        <p>Dalam menuntut ilmu, seorang muslim harus memperhatikan adab dan etika, di antaranya:</p>
        <ul>
          <li>Ikhlas karena Allah SWT</li>
          <li>Menghormati guru dan ulama</li>
          <li>Sabar dan tekun dalam belajar</li>
          <li>Mengamalkan ilmu yang telah dipelajari</li>
          <li>Menyebarkan ilmu kepada orang lain</li>
        </ul>
        
        <p>Dengan demikian, menuntut ilmu dalam Islam bukan sekadar untuk mendapatkan gelar atau pekerjaan, tetapi untuk mendapatkan ridha Allah SWT dan membawa manfaat bagi diri sendiri dan masyarakat.</p>
        
        <p>Pondok Pesantren Al-Zaid sebagai lembaga pendidikan Islam berkomitmen untuk mencetak generasi yang berilmu dan berakhlak mulia, sesuai dengan ajaran Islam yang menjunjung tinggi ilmu pengetahuan.</p>
      `,
            tags: ['Ilmu', 'Pendidikan Islam', 'Hadits'],
            relatedPosts: [
                {
                    title: 'Peringatan Maulid Nabi Muhammad SAW 1445 H',
                    excerpt:
                        'Laporan kegiatan peringatan Maulid Nabi Muhammad SAW yang diselenggarakan di Pondok Pesantren Al-Zaid dengan berbagai rangkaian acara dan ceramah.',
                    image: '/placeholder.svg?height=400&width=600',
                    category: 'Kegiatan',
                    date: '12 Oktober 2023',
                    slug: 'peringatan-maulid-nabi-muhammad-saw-1445-h',
                },
                {
                    title: 'Tips Menjaga Kesehatan Selama Bulan Ramadhan',
                    excerpt: 'Artikel kesehatan tentang cara menjaga kondisi tubuh tetap prima selama menjalankan ibadah puasa di bulan Ramadhan.',
                    image: '/placeholder.svg?height=400&width=600',
                    category: 'Kesehatan',
                    date: '15 September 2023',
                    slug: 'tips-menjaga-kesehatan-selama-bulan-ramadhan',
                },
            ],
            prevPost: {
                title: 'Peringatan Maulid Nabi Muhammad SAW 1445 H',
                slug: 'peringatan-maulid-nabi-muhammad-saw-1445-h',
            },
            nextPost: {
                title: "Prestasi Santri dalam Musabaqah Tilawatil Qur'an",
                slug: 'prestasi-santri-dalam-musabaqah-tilawatil-quran',
            },
        },
        'prestasi-santri-dalam-musabaqah-tilawatil-quran': {
            title: "Prestasi Santri dalam Musabaqah Tilawatil Qur'an",
            category: 'Prestasi',
            date: '20 September 2023',
            author: 'Admin Pesantren',
            authorRole: 'Tim Redaksi',
            authorImage: '/placeholder.svg?height=100&width=100',
            authorBio:
                'Tim redaksi Pondok Pesantren Al-Zaid yang bertanggung jawab untuk mendokumentasikan dan mempublikasikan berbagai kegiatan pesantren.',
            readTime: '6 menit',
            views: '287',
            image: '/placeholder.svg?height=600&width=1200',
            excerpt:
                "Berita tentang prestasi membanggakan yang diraih oleh santri Al-Zaid dalam ajang Musabaqah Tilawatil Qur'an tingkat provinsi dengan berbagai kategori lomba.",
            content: `
        <p>Alhamdulillah, santri-santri Pondok Pesantren Al-Zaid kembali menorehkan prestasi membanggakan dalam ajang Musabaqah Tilawatil Qur'an (MTQ) tingkat provinsi yang diselenggarakan pada tanggal 15-18 September 2023.</p>
        
        <p>Dalam kompetisi bergengsi ini, santri Al-Zaid berhasil meraih berbagai juara di beberapa kategori lomba. Prestasi ini merupakan buah dari kerja keras, dedikasi, dan bimbingan intensif dari para ustadz dan ustadzah pembimbing.</p>
        
        <h3>Daftar Prestasi</h3>
        
        <p>Berikut adalah daftar prestasi yang diraih oleh santri Pondok Pesantren Al-Zaid:</p>
        <ul>
          <li>Juara 1 Cabang Tilawah Putra: Ahmad Fauzi (kelas 2 MA)</li>
          <li>Juara 2 Cabang Tilawah Putri: Fatimah Azzahra (kelas 3 MA)</li>
          <li>Juara 1 Cabang Tahfidz 10 Juz Putra: Muhammad Hasan (kelas 3 MTs)</li>
          <li>Juara 3 Cabang Tahfidz 5 Juz Putri: Aisyah Ramadhani (kelas 1 MA)</li>
          <li>Juara 2 Cabang Tafsir Bahasa Arab: Abdul Karim (kelas 3 MA)</li>
          <li>Juara 1 Cabang Kaligrafi Putri: Zahra Khoirunnisa (kelas 2 MA)</li>
        </ul>
        
        <h3>Persiapan Menuju MTQ Nasional</h3>
        
        <p>Para juara 1 akan mewakili provinsi dalam Musabaqah Tilawatil Qur'an tingkat nasional yang akan diselenggarakan pada bulan Maret 2024 mendatang. Untuk itu, pihak pesantren telah menyiapkan program pembinaan intensif bagi para santri tersebut.</p>
        
        <p>"Kami akan memberikan bimbingan khusus dengan mendatangkan qari dan hafidz nasional untuk mempersiapkan santri-santri kami menghadapi kompetisi di tingkat nasional," ujar KH. Ahmad Zaid, pengasuh Pondok Pesantren Al-Zaid.</p>
        
        <h3>Dukungan dan Apresiasi</h3>
        
        <p>Prestasi ini mendapat apresiasi dari berbagai pihak, termasuk Pemerintah Daerah yang menyampaikan ucapan selamat dan dukungan untuk persiapan MTQ Nasional.</p>
        
        <p>Kepala Kantor Kementerian Agama setempat juga menyampaikan apresiasinya dan berjanji akan memberikan dukungan penuh untuk pembinaan para santri yang akan berlaga di tingkat nasional.</p>
        
        <p>Semoga prestasi ini menjadi motivasi bagi seluruh santri Pondok Pesantren Al-Zaid untuk terus berprestasi dan mengharumkan nama pesantren di berbagai ajang kompetisi, baik di tingkat daerah, nasional, maupun internasional.</p>
      `,
            tags: ['MTQ', 'Prestasi Santri', 'Tahfidz'],
            relatedPosts: [
                {
                    title: 'Peringatan Maulid Nabi Muhammad SAW 1445 H',
                    excerpt:
                        'Laporan kegiatan peringatan Maulid Nabi Muhammad SAW yang diselenggarakan di Pondok Pesantren Al-Zaid dengan berbagai rangkaian acara dan ceramah.',
                    image: '/placeholder.svg?height=400&width=600',
                    category: 'Kegiatan',
                    date: '12 Oktober 2023',
                    slug: 'peringatan-maulid-nabi-muhammad-saw-1445-h',
                },
                {
                    title: 'Keutamaan Menuntut Ilmu dalam Islam',
                    excerpt: "Pembahasan tentang keutamaan menuntut ilmu dalam Islam berdasarkan Al-Qur'an dan Hadits serta pandangan para ulama.",
                    image: '/placeholder.svg?height=400&width=600',
                    category: 'Artikel',
                    date: '5 Oktober 2023',
                    slug: 'keutamaan-menuntut-ilmu-dalam-islam',
                },
            ],
            prevPost: {
                title: 'Keutamaan Menuntut Ilmu dalam Islam',
                slug: 'keutamaan-menuntut-ilmu-dalam-islam',
            },
            nextPost: {
                title: 'Tips Menjaga Kesehatan Selama Bulan Ramadhan',
                slug: 'tips-menjaga-kesehatan-selama-bulan-ramadhan',
            },
        },
        'tips-menjaga-kesehatan-selama-bulan-ramadhan': {
            title: 'Tips Menjaga Kesehatan Selama Bulan Ramadhan',
            category: 'Kesehatan',
            date: '15 September 2023',
            author: 'Dr. Aminah Salim',
            authorRole: 'Dokter Klinik Pesantren',
            authorImage: '/placeholder.svg?height=100&width=100',
            authorBio:
                'Dokter umum yang bertugas di klinik kesehatan Pondok Pesantren Al-Zaid. Lulusan Fakultas Kedokteran Universitas Indonesia dengan spesialisasi kesehatan masyarakat.',
            readTime: '8 menit',
            views: '423',
            image: '/placeholder.svg?height=600&width=1200',
            excerpt:
                'Artikel kesehatan tentang cara menjaga kondisi tubuh tetap prima selama menjalankan ibadah puasa di bulan Ramadhan dengan berbagai tips praktis.',
            content: `
        <p>Bulan Ramadhan adalah bulan yang penuh berkah, di mana umat Muslim di seluruh dunia menjalankan ibadah puasa. Selama berpuasa, tubuh mengalami perubahan ritme dan pola makan yang dapat memengaruhi kesehatan jika tidak dikelola dengan baik.</p>
        
        <p>Berikut adalah beberapa tips untuk menjaga kesehatan selama bulan Ramadhan:</p>
        
        <h3>1. Sahur dengan Menu Seimbang</h3>
        
        <p>Sahur adalah waktu makan yang sangat penting selama Ramadhan. Konsumsilah makanan yang mengandung karbohidrat kompleks (seperti nasi merah, roti gandum), protein (telur, daging tanpa lemak), serta sayur dan buah. Makanan ini akan memberikan energi yang bertahan lama selama berpuasa.</p>
        
        <p>Hindari makanan yang terlalu asin atau manis saat sahur karena dapat menyebabkan rasa haus yang berlebihan selama berpuasa.</p>
        
        <h3>2. Berbuka dengan Bijak</h3>
        
        <p>Saat berbuka puasa, mulailah dengan makanan ringan seperti kurma dan air putih untuk mengembalikan kadar gula darah. Setelah itu, tunggulah beberapa menit sebelum mengonsumsi makanan berat.</p>
        
        <p>Hindari makan berlebihan saat berbuka puasa karena dapat menyebabkan gangguan pencernaan dan rasa tidak nyaman. Makanlah secukupnya dengan porsi yang seimbang.</p>
        
        <h3>3. Konsumsi Air yang Cukup</h3>
        
        <p>Pastikan untuk mengonsumsi air yang cukup antara waktu berbuka dan sahur untuk mencegah dehidrasi. Disarankan untuk minum setidaknya 8 gelas air selama waktu tersebut.</p>
        
        <p>Hindari minuman yang mengandung kafein seperti kopi dan teh kental karena dapat menyebabkan dehidrasi.</p>
        
        <h3>4. Jaga Aktivitas Fisik</h3>
        
        <p>Tetap aktif secara fisik selama Ramadhan, namun sesuaikan intensitasnya. Waktu terbaik untuk berolahraga adalah 1-2 jam setelah berbuka puasa atau sebelum sahur.</p>
        
        <p>Olahraga ringan seperti jalan kaki atau yoga dapat membantu menjaga kebugaran tanpa menguras energi berlebihan.</p>
        
        <h3>5. Istirahat yang Cukup</h3>
        
        <p>Usahakan untuk mendapatkan tidur yang cukup meskipun jadwal harian berubah selama Ramadhan. Jika memungkinkan, ambil waktu untuk tidur siang singkat untuk mengembalikan energi.</p>
        
        <h3>6. Perhatikan Kondisi Kesehatan</h3>
        
        <p>Bagi yang memiliki kondisi kesehatan tertentu seperti diabetes, tekanan darah tinggi, atau penyakit kronis lainnya, konsultasikan dengan dokter sebelum berpuasa untuk mendapatkan saran yang sesuai dengan kondisi kesehatan.</p>
        
        <p>Dengan menerapkan tips-tips di atas, diharapkan ibadah puasa dapat dijalankan dengan lancar dan tetap menjaga kesehatan tubuh. Semoga Ramadhan tahun ini membawa keberkahan dan manfaat bagi kesehatan jasmani dan rohani.</p>
      `,
            tags: ['Kesehatan', 'Ramadhan', 'Puasa'],
            relatedPosts: [
                {
                    title: 'Keutamaan Menuntut Ilmu dalam Islam',
                    excerpt: "Pembahasan tentang keutamaan menuntut ilmu dalam Islam berdasarkan Al-Qur'an dan Hadits serta pandangan para ulama.",
                    image: '/placeholder.svg?height=400&width=600',
                    category: 'Artikel',
                    date: '5 Oktober 2023',
                    slug: 'keutamaan-menuntut-ilmu-dalam-islam',
                },
                {
                    title: "Prestasi Santri dalam Musabaqah Tilawatil Qur'an",
                    excerpt:
                        "Berita tentang prestasi membanggakan yang diraih oleh santri Al-Zaid dalam ajang Musabaqah Tilawatil Qur'an tingkat provinsi.",
                    image: '/placeholder.svg?height=400&width=600',
                    category: 'Prestasi',
                    date: '20 September 2023',
                    slug: 'prestasi-santri-dalam-musabaqah-tilawatil-quran',
                },
            ],
            prevPost: {
                title: "Prestasi Santri dalam Musabaqah Tilawatil Qur'an",
                slug: 'prestasi-santri-dalam-musabaqah-tilawatil-quran',
            },
            nextPost: {
                title: 'Kunjungan Dinas Pendidikan ke Pesantren Al-Zaid',
                slug: 'kunjungan-dinas-pendidikan-ke-pesantren-al-zaid',
            },
        },
    };

    // Return the article data based on slug, or a default article if not found
    return articles[slug] || articles['peringatan-maulid-nabi-muhammad-saw-1445-h'];
};

export default function BlogDetail({ params }: { params: { slug: string } }) {
    const article = getArticleData(params.slug);
    const [scrollY, setScrollY] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            setShowBackToTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Estimasi waktu baca
    const readTime = article.readTime || '5 menit';

    return (
        <main className="pb-16">
            {/* Hero Section - Tetap sama seperti sebelumnya */}
            <div ref={headerRef} className="relative h-[400px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/placeholder.svg?height=800&width=1920')",
                        transform: `translateY(${scrollY * 0.1}px)`,
                    }}
                ></div>
                <div className="bg-primary/70 absolute inset-0"></div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
                    <div className="text-primary mb-4 inline-block rounded bg-white px-3 py-1 text-sm font-semibold">Blog Pesantren</div>
                    <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">Artikel & Berita</h1>
                    <p className="max-w-3xl text-center text-xl text-white/90">"Menuntut ilmu adalah kewajiban bagi setiap muslim dan muslimah"</p>
                </div>
            </div>

            <div className="container mx-auto mt-8 px-4 md:px-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link href="/blog" className="text-primary flex items-center hover:underline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        <span>Kembali ke Blog</span>
                    </Link>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Main Content - Article */}
                    <div className="lg:col-span-8" ref={contentRef}>
                        {/* Article Header */}
                        <div className="mb-8">
                            <Badge className="bg-primary hover:bg-primary/90 mb-4">{article.category}</Badge>
                            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{article.title}</h1>
                            <p className="mb-6 text-lg leading-relaxed text-gray-600">{article.excerpt}</p>

                            {/* Article Meta */}
                            <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Calendar className="text-primary mr-2 h-4 w-4" />
                                    <span>{article.date}</span>
                                </div>
                                <div className="flex items-center">
                                    <User className="text-primary mr-2 h-4 w-4" />
                                    <span>{article.author}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="text-primary mr-2 h-4 w-4" />
                                    <span>{readTime} membaca</span>
                                </div>
                                <div className="flex items-center">
                                    <Eye className="text-primary mr-2 h-4 w-4" />
                                    <span>{article.views} kali dilihat</span>
                                </div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="mb-8 overflow-hidden rounded-lg shadow-md">
                            <img src={article.image || '/placeholder.svg'} alt={article.title} width={1200} height={600} className="h-auto w-full" />
                        </div>

                        {/* Table of Contents */}
                        <div className="mb-8 rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <h3 className="mb-2 font-bold text-gray-700">Daftar Isi</h3>
                            <ul className="space-y-1">
                                {article.content.match(/<h3>(.*?)<\/h3>/g)?.map((match, index) => {
                                    const title = match.replace(/<h3>|<\/h3>/g, '').trim();
                                    const anchor = title.toLowerCase().replace(/\s+/g, '-');
                                    return (
                                        <li key={index} className="text-primary hover:underline">
                                            <a href={`#${anchor}`} className="flex items-center">
                                                <span className="mr-2">•</span>
                                                <span>{title}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Article Content */}
                        <article className="prose prose-blue lg:prose-lg max-w-none">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: article.content.replace(/<h3>(.*?)<\/h3>/g, (match, title) => {
                                        const anchor = title.toLowerCase().replace(/\s+/g, '-');
                                        return `<h3 id="${anchor}">${title}</h3>`;
                                    }),
                                }}
                            />
                        </article>

                        {/* Tags */}
                        <div className="mt-8 flex flex-wrap items-center gap-2">
                            <Tag className="h-5 w-5 text-gray-600" />
                            {article.tags.map((tag, index) => (
                                <Link
                                    key={index}
                                    href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="hover:bg-primary rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:text-white"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>

                        {/* Share */}
                        <div className="mt-8 border-t border-b py-6">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="flex items-center font-medium">
                                    <Share2 className="text-primary mr-2 h-5 w-5" /> Bagikan Artikel:
                                </span>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                                        <Facebook className="h-5 w-5 text-blue-600" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                                        <Twitter className="h-5 w-5 text-blue-400" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                                        <Linkedin className="h-5 w-5 text-blue-700" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Author Bio */}
                        <div className="mt-8 rounded-lg border border-gray-100 bg-gray-50 p-6">
                            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={article.authorImage || '/placeholder.svg'} alt={article.author} />
                                    <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="mb-1 text-xl font-bold">{article.author}</h3>
                                    <p className="text-primary mb-3 text-sm">{article.authorRole || 'Penulis'}</p>
                                    <p className="text-gray-600">{article.authorBio || 'Penulis artikel di Pondok Pesantren Al-Zaid.'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Post Navigation */}
                        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {article.prevPost && (
                                <Link
                                    href={`/blog/${article.prevPost.slug}`}
                                    className="flex items-center rounded-lg border p-4 transition-colors hover:bg-gray-50"
                                >
                                    <div>
                                        <div className="mb-1 flex items-center text-sm text-gray-500">
                                            <ArrowLeft className="mr-1 h-4 w-4" /> Artikel Sebelumnya
                                        </div>
                                        <div className="font-medium">{article.prevPost.title}</div>
                                    </div>
                                </Link>
                            )}

                            {article.nextPost && (
                                <Link
                                    href={`/blog/${article.nextPost.slug}`}
                                    className="flex items-center justify-end rounded-lg border p-4 text-right transition-colors hover:bg-gray-50"
                                >
                                    <div>
                                        <div className="mb-1 flex items-center justify-end text-sm text-gray-500">
                                            Artikel Berikutnya <ArrowRight className="ml-1 h-4 w-4" />
                                        </div>
                                        <div className="font-medium">{article.nextPost.title}</div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-8">
                            {/* Related Posts */}
                            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                                <div className="border-b bg-gray-50 p-4">
                                    <h3 className="text-lg font-bold">Artikel Terkait</h3>
                                </div>
                                <div className="divide-y">
                                    {article.relatedPosts.map((post, index) => (
                                        <div key={index} className="p-4 transition-colors hover:bg-gray-50">
                                            <Link href={`/blog/${post.slug}`} className="group">
                                                <div className="flex gap-3">
                                                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                                                        <img
                                                            src={post.image || '/placeholder.svg'}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <Badge className="mb-1 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800">
                                                            {post.category}
                                                        </Badge>
                                                        <h4 className="group-hover:text-primary line-clamp-2 font-medium transition-colors">
                                                            {post.title}
                                                        </h4>
                                                        <div className="mt-1 flex items-center text-xs text-gray-500">
                                                            <Calendar className="mr-1 h-3 w-3" />
                                                            {post.date}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                                <div className="border-b bg-gray-50 p-4">
                                    <h3 className="text-lg font-bold">Kategori</h3>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-2">
                                        <Link href="/category/kegiatan" className="flex items-center justify-between rounded p-2 hover:bg-gray-50">
                                            <span className="hover:text-primary">Kegiatan</span>
                                            <Badge variant="outline">12</Badge>
                                        </Link>
                                        <Link href="/category/artikel" className="flex items-center justify-between rounded p-2 hover:bg-gray-50">
                                            <span className="hover:text-primary">Artikel</span>
                                            <Badge variant="outline">8</Badge>
                                        </Link>
                                        <Link href="/category/prestasi" className="flex items-center justify-between rounded p-2 hover:bg-gray-50">
                                            <span className="hover:text-primary">Prestasi</span>
                                            <Badge variant="outline">5</Badge>
                                        </Link>
                                        <Link href="/category/pengumuman" className="flex items-center justify-between rounded p-2 hover:bg-gray-50">
                                            <span className="hover:text-primary">Pengumuman</span>
                                            <Badge variant="outline">7</Badge>
                                        </Link>
                                        <Link href="/category/kesehatan" className="flex items-center justify-between rounded p-2 hover:bg-gray-50">
                                            <span className="hover:text-primary">Kesehatan</span>
                                            <Badge variant="outline">3</Badge>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Popular Tags */}
                            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                                <div className="border-b bg-gray-50 p-4">
                                    <h3 className="text-lg font-bold">Tag Populer</h3>
                                </div>
                                <div className="p-4">
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            href="/tag/pendidikan-islam"
                                            className="hover:bg-primary rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:text-white"
                                        >
                                            Pendidikan Islam
                                        </Link>
                                        <Link
                                            href="/tag/tahfidz"
                                            className="hover:bg-primary rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:text-white"
                                        >
                                            Tahfidz
                                        </Link>
                                        <Link
                                            href="/tag/kegiatan-pesantren"
                                            className="hover:bg-primary rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:text-white"
                                        >
                                            Kegiatan Pesantren
                                        </Link>
                                        <Link
                                            href="/tag/prestasi-santri"
                                            className="hover:bg-primary rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:text-white"
                                        >
                                            Prestasi Santri
                                        </Link>
                                        <Link
                                            href="/tag/kesehatan"
                                            className="hover:bg-primary rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:text-white"
                                        >
                                            Kesehatan
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Subscribe */}
                            <div className="bg-primary overflow-hidden rounded-lg text-white shadow-sm">
                                <div className="p-6">
                                    <h3 className="mb-2 text-lg font-bold">Berlangganan Update</h3>
                                    <p className="mb-4 text-sm text-white/80">
                                        Dapatkan artikel dan berita terbaru dari Pondok Pesantren Al-Zaid langsung ke email Anda.
                                    </p>
                                    <div className="space-y-2">
                                        <input type="email" placeholder="Email Anda" className="w-full rounded px-3 py-2 text-sm text-gray-800" />
                                        <Button className="text-primary w-full bg-white hover:bg-white/90">Berlangganan</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="bg-primary hover:bg-primary/90 fixed right-8 bottom-8 z-50 rounded-full p-3 text-white shadow-lg transition-colors"
                    aria-label="Kembali ke atas"
                >
                    <ChevronUp className="h-5 w-5" />
                </button>
            )}
        </main>
    );
}
