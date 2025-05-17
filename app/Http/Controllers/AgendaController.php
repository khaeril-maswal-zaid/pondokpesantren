<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Http\Requests\StoreAgendaRequest;
use App\Http\Requests\UpdateAgendaRequest;
use App\Models\Struktur;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data = [
            'agendaData' => Agenda::select(['id', 'title', 'image', 'location', 'time', 'date'])->latest()->paginate(10),
        ];

        return Inertia::render('dashboard/agenda/page', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAgendaRequest $request)
    {
        $base64Image = $request->foto;
        [$type, $data] = explode(';', $base64Image);
        [, $extension] = explode('/', $type); // jpeg, png
        [, $base64Data] = explode(',', $data);

        $filename = Str::slug($request->nama_agenda) .  '-' . uniqid() .  '.' . $extension;

        Storage::disk('public')->put("image/agenda/{$filename}", base64_decode($base64Data));

        $imagePath = "image/agenda/{$filename}";

        Agenda::create([
            'title' => $request->nama_agenda,
            'image' => $imagePath,
            'date' => $request->date,
            'time' => $request->time1 . '-' . $request->time2,
            'location' => $request->lokasi,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Agenda $agenda)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Agenda $agenda)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAgendaRequest $request, Agenda $agenda)
    {
        $fotoInput = $request->input('foto');

        // Cek apakah $fotoInput ini Base64 (diawali "data:image/…;base64,")
        if (preg_match('/^data:image\/(\w+);base64,/', $fotoInput, $matches)) {
            $base64Image = $request->foto;
            [$type, $data] = explode(';', $base64Image);
            [, $extension] = explode('/', $type); // jpeg, png
            [, $base64Data] = explode(',', $data);

            $filename = Str::slug($request->nama_agenda) .  '-' . uniqid() .  '.' . $extension;

            Storage::disk('public')->put("image/agenda/{$filename}", base64_decode($base64Data));

            $imagePath = "image/agenda/{$filename}";

            if ($agenda->image && Storage::disk('public')->exists($agenda->image)) {
                Storage::disk('public')->delete($agenda->image);
            }
        } else {
            // bukan Base64 → kemungkinan path lama yang tidak diubah
            $imagePath = $fotoInput;
        }

        $agenda->update([
            'title' => $request->nama_agenda,
            'image' => $imagePath,
            'date' => $request->date,
            'time' => $request->time1 . '-' . $request->time2,
            'location' => $request->lokasi,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agenda $agenda)
    {
        // Hapus file gambar jika ada
        if ($agenda->image && Storage::disk('public')->exists($agenda->image)) {
            Storage::disk('public')->delete($agenda->image);
        }

        $agenda->delete();
    }

    public function cards()
    {
        // $query = Agenda::select('title', 'date', 'time', 'location', 'image')->paginate(6);
        $query = Agenda::all();

        // Group by year
        $byYear = $query->groupBy(function ($agenda) {
            // $agenda->created_at sudah instance Carbon
            return $agenda->created_at->format('Y');
        });

        $data = [
            'allAgendaData' => $byYear,
            'strukturSlides' => Struktur::select('name', 'role', 'keterangan', 'image')->take(3)->get()
        ];
        return Inertia::render('ponpes/agenda/page', $data);
    }
}
