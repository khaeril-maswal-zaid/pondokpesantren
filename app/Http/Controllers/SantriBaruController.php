<?php

namespace App\Http\Controllers;

use App\Models\SantriBaru;
use App\Http\Requests\StoreSantriBaruRequest;
use App\Http\Requests\UpdateSantriBaruRequest;
use App\Models\ContenItemPendaftaran;
use App\Models\JadwalPendaftaran;
use App\Models\WorkflowStepPendaftaran;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SantriBaruController extends Controller
{
    protected $ogTags;
    public function __construct()
    {
        $this->ogTags = [
            'title' => 'Pondok Pesantren ' . config('app.name') . ' Bulukumba',
            'description' => 'Penerimaan Santri/ Santriwati Baru Pondok Pesantren' . config('app.name') . 'Bulukumba tahun ajaran 2025/206 ',
            'image' => asset('/storage/image/assets/logo.png'),
            'url' => config('app.url'),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data = [
            'pendaftarData' => SantriBaru::select(['nik', 'nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'provinsi', 'kabupaten', 'kecamatan', 'desa', 'nama_ayah', 'nama_ibu', 'pekerjaan_ayah', 'pekerjaan_ibu', 'kontak_ayah', 'kontak_ibu', 'jenjang', 'nama_sekolah', 'nisn', 'tahun_tamat', 'foto', 'no_registrasi', 'status'])->latest()->paginate(10),
        ];

        return Inertia::render('dashboard/pendaftaran/page', $data);
    }

    public function informasi(): Response
    {

        $persyaratanUmum = ContenItemPendaftaran::select('point')->where('module', 'persyaratan')
            ->where('subcategory', 'umum')
            ->orderBy('id')
            ->get();

        $persyaratanKhusus = ContenItemPendaftaran::select('point')->where('module', 'persyaratan')
            ->where('subcategory', 'khusus')
            ->orderBy('id')
            ->get();

        $dokumenWajib = ContenItemPendaftaran::select('point')->where('module', 'dokumen')
            ->where('subcategory', 'wajib')
            ->orderBy('id')
            ->get();

        $dokumenTambahan = ContenItemPendaftaran::select('point')->where('module', 'dokumen')
            ->where('subcategory', 'tambahan')
            ->orderBy('id')
            ->get();


        $faq = WorkflowStepPendaftaran::select('title', 'description')
            ->where('module', 'faq')
            ->orderBy('id')
            ->get();

        $jadwal = JadwalPendaftaran::select('activity_name', 'gel1', 'gel2')
            ->whereNot('activity_name', 'Masuk Pesantren')
            ->orderBy('id')
            ->get();

        $jadwalMasuk = JadwalPendaftaran::select('activity_name', 'gel1')
            ->where('activity_name', 'Masuk Pesantren')
            ->first();

        $steps = WorkflowStepPendaftaran::where('module', 'alur')
            ->orderBy('id')
            ->get(['id', 'title', 'description']);

        request()->attributes->set('og', $this->ogTags);

        return Inertia::render('ponpes/pendaftaran/page', compact(
            'persyaratanUmum',
            'persyaratanKhusus',
            'dokumenWajib',
            'dokumenTambahan',
            'faq',
            'jadwal',
            'jadwalMasuk',
            'steps'
        ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        request()->attributes->set('og', $this->ogTags);

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
            'status' => 'Pending',
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

    public function approved(SantriBaru $santriBaru, Request $request)
    {
        $request->validate([
            'status' => 'required|in:Approved,Pending',
        ]);

        $santriBaru->update(['status' => $request->status]);
    }
}
