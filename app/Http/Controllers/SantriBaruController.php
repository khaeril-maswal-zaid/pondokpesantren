<?php

namespace App\Http\Controllers;

use App\Models\SantriBaru;
use App\Http\Requests\StoreSantriBaruRequest;
use App\Http\Requests\UpdateSantriBaruRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SantriBaruController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'pendaftarData' => SantriBaru::select(['nik', 'nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'provinsi', 'kabupaten', 'kecamatan', 'desa', 'nama_ayah', 'nama_ibu', 'pekerjaan_ayah', 'pekerjaan_ibu', 'kontak_ayah', 'kontak_ibu', 'jenjang', 'nama_sekolah', 'nisn', 'tahun_tamat', 'foto', 'no_registrasi',])->latest()->get(),
        ];

        return Inertia::render('dashboard/pendaftaran/page', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $ogTags = [
            'title' => 'Pondok Pesantren' . config('app.name') . 'Bulukumba',
            'description' => 'Penerimaan Santri/ Santriwati Baru Pondok Pesantren' . config('app.name') . 'Bulukumba tahun ajaran 2025/206 ',
            'image' => asset('/storage/image/assets/logo.png'),
            'url' => config('app.url'),
        ];

        request()->attributes->set('og', $ogTags);

        return Inertia::render('ponpes/pendaftaran/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSantriBaruRequest $request)
    {
        $base64Image = $request->foto;
        [$type, $data] = explode(';', $base64Image);
        [, $extension] = explode('/', $type); // jpeg, png
        [, $base64Data] = explode(',', $data);

        $filename = uniqid() . '-' . Str::slug($request->namaLengkap) . '.' . $extension;

        Storage::disk('public')->put("image/santribaru/{$filename}", base64_decode($base64Data));

        $imagePath = "image/{$filename}";

        SantriBaru::create([
            'nik' => $request->nik,
            'nama_lengkap' => $request->namaLengkap,
            'tempat_lahir' => $request->tempatLahir,
            'tanggal_lahir' => $request->tanggalLahir,
            'jenis_kelamin' => $request->jenisKelamin,
            'provinsi' => $request->provinsi,
            'kabupaten' => $request->kabupaten,
            'kecamatan' => $request->kecamatan,
            'desa' => $request->desa,

            'nama_ayah' => $request->namaAyah,
            'nama_ibu' => $request->namaIbu,
            'pekerjaan_ayah' => $request->pekerjaanAyah,
            'pekerjaan_ibu' => $request->pekerjaanIbu,
            'kontak_ayah' => $request->kontakAyah,
            'kontak_ibu' => $request->kontakIbu,

            'jenjang' => $request->jenjang,
            'nama_sekolah' => $request->namaSekolah,
            'nisn' => $request->nisn,
            'tahun_tamat' => $request->tahunTamat,
            'foto' => $imagePath,
            'no_registrasi' => $request->noRegistrasi,
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(SantriBaru $santriBaru)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SantriBaru $santriBaru)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSantriBaruRequest $request, SantriBaru $santriBaru)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SantriBaru $santriBaru)
    {
        //
    }

    public function informasi()
    {
        return Inertia::render('ponpes/pendaftaran/page');
    }
}
