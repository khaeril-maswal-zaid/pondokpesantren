<?php

namespace App\Http\Middleware;

use App\Models\Kontak;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'contact' =>  Kontak::select("name", 'value', 'link', 'icon')->where('label', 'wa')->orWhere('label', 'email')->get(),
            'alamat' => "Jln. Poros Manyampa - Palangisan Kalikia, Desa Manyampa Kec. Ujung Loe Kab. Bulukumba",
            'programUtams' => [
                [
                    'name' => 'Akademi Tahsin dan Tajwid',
                    'description' => 'Meningkatkan kemampuan membaca Al-Qur’an dengan tajwid yang benar dan pelafalan yang fasih.',
                ],
                [
                    'name' => 'Akademi Tahfidz 30 Juz Mutqin',
                    'description' => 'Program intensif menghafal 30 juz Al-Qur’an dengan metode mutqin dan bimbingan bersanad.',
                ],
                [
                    'name' => 'Akademi Lughoh Arabiyah',
                    'description' => 'Belajar bahasa Arab dari dasar hingga mahir untuk memahami Al-Qur’an dan literatur Islam.',
                ],
                [
                    'name' => 'Dakwah dan Keterampilan',
                    'description' => 'Membina santri berdakwah efektif dengan keterampilan komunikasi, teknologi, dan kewirausahaan islami.',
                ],
            ],

            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
