<?php

namespace App\Http\Controllers;

use App\Models\Kontak;
use App\Models\Struktur;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KontakController extends Controller
{
    public function index(): Response
    {
        $data = [
            'kontaksData' => Kontak::all(),
        ];

        return Inertia::render('dashboard/kontak/page', $data);
    }

    public function status(Kontak $kontak, Request $request)
    {
        $request->validate([
            'status' => 'required|in:aktif,nonaktif',
        ]);

        $kontak->update(['status' => $request->status]);
    }

    public function update(Request $request, Kontak $kontak)
    {
        $request->validate([
            'link' => 'required|url',
            'value' => 'required|string',
        ]);

        $kontak->update([
            'link' => $request->link,
            'value' => $request->value
        ]);
    }

    public function cards(): Response
    {
        $ogTags = [
            'title' => 'Kontak Pondok Pesantren ' . config('app.name') . ' Bulukumba',
            'description' => 'Pondok Pesantren Ubay Bin Ka’ab Bulukumba berdiri di atas prinsip menjalankan amal ibadah sesuai dengan tuntunan Ahlus Sunnah wal Jamaah, berlandaskan Al-qur`an dan hadist yang sahih.',
            'image' => asset('/storage/image/assets/logo.png'),
            'url' => config('app.url'),
        ];

        request()->attributes->set('og', $ogTags);

        $data = [
            'contactChannels' => Kontak::where('status', 'aktif')->get(),
            'strukturSlides' => Struktur::select('name', 'role', 'keterangan', 'image')->take(3)->get()
        ];

        return Inertia::render('ponpes/kontak/page', $data);
    }
}
