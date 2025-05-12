<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SantriBaruController;
use App\Http\Controllers\StrukturController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/penerimaan-santri-baru', [SantriBaruController::class, 'informasi'])->name('santri-baru.info');
Route::get('/penerimaan-santri-baru/pendaftaran', [SantriBaruController::class, 'create'])->name('santri-baru.create');
Route::post('/penerimaan-santri-baru/store', [SantriBaruController::class, 'store'])->name('santri-baru.store');

Route::get('/blog/{blog:slug}', [BlogController::class, 'show'])->name('blog.show');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [HomeController::class, 'dashboard'])->name('dashboard');

    Route::get('/dashboard/penerimaan-santri-baru', [SantriBaruController::class, 'index'])->name('santri-baru.index');
    Route::put('/dashboard/penerimaan-santri-baru/{santriBaru:no_registrasi}', [SantriBaruController::class, 'approved'])->name('santri-baru.approved');

    Route::get('/dashboard/blog', [BlogController::class, 'index'])->name('blog.index');
    Route::post('/dashboard/blog', [BlogController::class, 'store'])->name('blog.store');

    Route::get('/dashboard/agenda', [AgendaController::class, 'index'])->name('agenda.index');

    Route::get('/dashboard/struktur', [StrukturController::class, 'index'])->name('struktur.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
