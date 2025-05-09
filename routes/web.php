<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SantriBaruController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/penerimaan-santri-baru', [SantriBaruController::class, 'informasi'])->name('santri-baru.info');
Route::get('/penerimaan-santri-baru/pendaftaran', [SantriBaruController::class, 'create'])->name('santri-baru.create');
Route::post('/penerimaan-santri-baru/store', [SantriBaruController::class, 'store'])->name('santri-baru.store');

Route::get('/cripto-ts-analisis', [HomeController::class, 'cripto'])->name('home.cripto');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
