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
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
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
