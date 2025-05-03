import imagePlaceholder from '@/assets/placeholder.svg';

export default function AboutSection() {
    return (
        <div className="container mx-auto my-20 px-4">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                    <img src={imagePlaceholder} alt="Pondok Pesantren Al-Zaid" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
                </div>

                <div>
                    <h2 className="mb-6 text-3xl font-bold text-green-800">Tentang Pondok Pesantren Al-Zaid</h2>

                    <div className="space-y-4 text-gray-700">
                        <p>
                            Pondok Pesantren Al-Zaid didirikan pada tahun 1985 oleh KH. Ahmad Zaid dengan visi mencetak generasi Qur'ani yang
                            berakhlak mulia dan berwawasan luas.
                        </p>

                        <p>
                            Selama lebih dari 35 tahun, pesantren kami telah mendidik ribuan santri dan santriwati yang kini tersebar di berbagai
                            bidang kehidupan, menjadi tokoh masyarakat, ulama, profesional, dan pemimpin yang amanah.
                        </p>

                        <p>
                            Kami menggabungkan pendidikan agama tradisional dengan pendidikan modern untuk membekali santri dengan ilmu yang
                            komprehensif, sehingga mampu menghadapi tantangan zaman tanpa kehilangan jati diri sebagai muslim.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-white p-4 shadow-md">
                            <h3 className="mb-2 font-semibold text-green-800">Visi</h3>
                            <p className="text-sm text-gray-600">Mencetak generasi Qur'ani yang berakhlak mulia dan berwawasan luas</p>
                        </div>

                        <div className="rounded-lg bg-white p-4 shadow-md">
                            <h3 className="mb-2 font-semibold text-green-800">Misi</h3>
                            <p className="text-sm text-gray-600">
                                Menyelenggarakan pendidikan Islam yang berkualitas dan relevan dengan kebutuhan zaman
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
