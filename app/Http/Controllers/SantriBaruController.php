<?php

namespace App\Http\Controllers;

use App\Models\SantriBaru;
use App\Http\Requests\StoreSantriBaruRequest;
use App\Http\Requests\UpdateSantriBaruRequest;
use Inertia\Inertia;

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
        return Inertia::render('ponpes/FormPendaftaran');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSantriBaruRequest $request)
    {
        //
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
}
