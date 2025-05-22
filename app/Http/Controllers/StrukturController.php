<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStrukturRequest;
use App\Models\Struktur;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class StrukturController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'figures' => Struktur::select(['id', 'name', 'no_hp', 'role', 'image', 'main', 'keterangan', 'gender'])->get(),
        ];

        return Inertia::render('dashboard/struktur/page', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStrukturRequest $request)
    {
        $base64Image = $request->foto;
        [$type, $data] = explode(';', $base64Image);
        [, $extension] = explode('/', $type); // jpeg, png
        [, $base64Data] = explode(',', $data);

        $filename = uniqid() . '-' . Str::slug($request->nama) . '.' . $extension;

        Storage::disk('public')->put("image/structure/{$filename}", base64_decode($base64Data));

        $imagePath = "image/structure/{$filename}";

        Struktur::create([
            "name" => $request->nama,
            "role" => $request->role,
            "keterangan" => $request->keterangan,
            "no_hp" => $request->no_hp,
            "main" => '0',
            "gender" => $request->gender,
            "image" => $imagePath,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Struktur $struktur)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Struktur $struktur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreStrukturRequest $request, Struktur $struktur) // StoreStrukturRequest => sama ji update doh
    {
        $fotoInput = $request->input('foto');

        // Cek apakah $fotoInput ini Base64 (diawali "data:image/…;base64,")
        if (preg_match('/^data:image\/(\w+);base64,/', $fotoInput, $matches)) {
            $base64Image = $request->foto;
            [$type, $data] = explode(';', $base64Image);
            [, $extension] = explode('/', $type); // jpeg, png
            [, $base64Data] = explode(',', $data);

            $filename =  Str::slug($request->nama) . '-' . uniqid() . '.' . $extension;

            Storage::disk('public')->put("image/structure/{$filename}", base64_decode($base64Data));

            $imagePath = "image/structure/{$filename}";

            if ($struktur->image && Storage::disk('public')->exists($struktur->image)) {
                Storage::disk('public')->delete($struktur->image);
            }
        } else {
            // bukan Base64 → kemungkinan path lama yang tidak diubah
            $imagePath = $fotoInput;
        }

        $struktur->update([
            "name" => $request->nama,
            "role" => $request->role,
            "keterangan" => $request->keterangan,
            "no_hp" => $request->no_hp,
            "gender" => $request->gender,
            "image" => $imagePath,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Struktur $struktur)
    {
        // Hapus file gambar jika ada
        if ($struktur->image && Storage::disk('public')->exists($struktur->image)) {
            Storage::disk('public')->delete($struktur->image);
        }

        $struktur->delete();
    }

    public function cards()
    {
        $ogTags = [
            'title' => 'Struktur Pondok Pesantren ' . config('app.name') . ' Bulukumba',
            'description' => 'Pondok Pesantren Ubay Bin Ka’ab Bulukumba berdiri di atas prinsip menjalankan amal ibadah sesuai dengan tuntunan Ahlus Sunnah wal Jamaah, berlandaskan Al-qur`an dan hadist yang sahih.',
            'image' => asset('/storage/image/assets/logo.png'),
            'url' => config('app.url'),
        ];

        request()->attributes->set('og', $ogTags);

        $data = [
            'strukturData' => Struktur::select('name', 'role', 'keterangan', 'image', 'gender')->paginate(9)
        ];
        return Inertia::render('ponpes/struktur/page', $data);
    }

    public function main(Struktur $struktur, Request $request)
    {
        $item = Struktur::findOrFail($struktur->id);

        // Jika request ingin set 'main' menjadi true (1)
        if ($request->main == 1 && $item->main != 1) {
            // Hitung jumlah item yang sudah main = 1 (kecuali item yang sedang diupdate)
            $count = Struktur::where('main', 1)
                ->where('id', '!=', $struktur->id)
                ->count();

            if ($count >= 4) {
                return back()->withErrors(['main' => 'Batas maksimum struktur dengan status utama telah tercapai (4). Silakan nonaktifkan status utama dari struktur lain sebelum melanjutkan.']);
            }
        }

        $struktur->update([
            "main" => $request->main
        ]);
    }
}
