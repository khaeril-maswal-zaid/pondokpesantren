<?php

namespace App\Http\Controllers;

use App\Models\ContenItemPendaftaran;
use App\Models\JadwalPendaftaran;
use App\Models\WorkflowStepPendaftaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContenItemPendaftaranController extends Controller
{
    public function index(): Response
    {

        $data = [
            'persyaratan' => ContenItemPendaftaran::select('point', 'subcategory', 'order', 'id')->where('module', 'persyaratan')
                ->orderBy('id')
                ->get(),

            'dokumen' => ContenItemPendaftaran::select('point', 'subcategory', 'order', 'id')->where('module', 'dokumen')
                ->orderBy('id')
                ->get(),


            'faq' => WorkflowStepPendaftaran::select('title', 'description', 'order', 'id')
                ->where('module', 'faq')
                ->orderBy('id')
                ->get(),

            'jadwal' => JadwalPendaftaran::select('activity_name', 'gel1', 'gel2', 'id')
                ->whereNot('activity_name', 'Masuk Pesantren')
                ->orderBy('id')
                ->get(),

            'steps' => WorkflowStepPendaftaran::select('title', 'description', 'order', 'id')->where('module', 'alur')
                ->orderBy('id')
                ->get(['id', 'title', 'description']),
        ];

        return Inertia::render('dashboard/informasipendaftaran/page', $data);
    }
}
