<?php

namespace App\Http\Controllers;

use App\Models\Kontak;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KontakController extends Controller
{
    public function index()
    {
        $data = [
            'kontaks' => Kontak::all(),
        ];

        return Inertia::render('dashboard/kontak/page', $data);
    }
}
