<?php

namespace App\Http\Controllers;

use App\Models\Kontak;
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
}
