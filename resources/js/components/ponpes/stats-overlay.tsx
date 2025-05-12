import * as LucideIcons from 'lucide-react';

// Di render:

export default function StatsOverlay({ stats }) {
    const Icon = LucideIcons[stats.icon] || LucideIcons.HelpCircle; // fallback jika tidak ditemukan
    return (
        <div className="relative z-10 container mx-auto -mt-16 px-8">
            <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-0">
                    {stats.map((stat, index) => {
                        const Icon = LucideIcons[stat.icon]; // Ambil dari nama di DB
                        return (
                            <div
                                key={index}
                                className={`flex items-center space-x-4 rounded-none bg-white p-6 shadow-lg md:rounded-lg ${
                                    index === 0
                                        ? 'border-gray-100 md:rounded-r-none md:border-r'
                                        : index === 1
                                          ? 'border-gray-100 md:rounded-none md:border-r'
                                          : 'md:rounded-l-none'
                                }`}
                            >
                                <div className="flex-shrink-0">{Icon ? <Icon className="text-primary h-8 w-8" /> : null}</div>
                                <div>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
