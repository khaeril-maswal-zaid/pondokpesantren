<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KontakController;
use App\Http\Controllers\SantriBaruController;
use App\Http\Controllers\StrukturController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/penerimaan-santri-baru', [SantriBaruController::class, 'informasi'])->name('santri-baru.info');
Route::get('/penerimaan-santri-baru/pendaftaran', [SantriBaruController::class, 'create'])->name('santri-baru.create');
Route::post('/penerimaan-santri-baru/store', [SantriBaruController::class, 'store'])->name('santri-baru.store');

Route::get('/blog/{blog:slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/blog-pesantren', [BlogController::class, 'cards'])->name('blog.cards');
Route::get('/agenda-pesantren', [AgendaController::class, 'cards'])->name('agenda.cards');
Route::get('/struktur-pesantren', [StrukturController::class, 'cards'])->name('struktur.cards');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [HomeController::class, 'dashboard'])->name('dashboard');

    Route::get('/dashboard/penerimaan-santri-baru', [SantriBaruController::class, 'index'])->name('santri-baru.index');
    Route::put('/dashboard/penerimaan-santri-baru/{santriBaru:no_registrasi}', [SantriBaruController::class, 'approved'])->name('santri-baru.approved');

    Route::get('/dashboard/blog', [BlogController::class, 'index'])->name('blog.index');
    Route::post('/dashboard/blog', [BlogController::class, 'store'])->name('blog.store');
    Route::get('/dashboard/blog/edit', [BlogController::class, 'edit'])->name('blog.edit');

    Route::get('/dashboard/agenda', [AgendaController::class, 'index'])->name('agenda.index');
    Route::post('/dashboard/agenda', [AgendaController::class, 'store'])->name('agenda.store');

    Route::get('/dashboard/struktur', [StrukturController::class, 'index'])->name('struktur.index');
    Route::post('/dashboard/struktur', [StrukturController::class, 'store'])->name('struktur.store');
    Route::put('/dashboard/struktur/{struktur}', [StrukturController::class, 'update'])->name('struktur.update');
    Route::delete('/dashboard/struktur/{struktur}', [StrukturController::class, 'destroy'])->name('struktur.destroy');

    Route::get('/dashboard/kontak', [KontakController::class, 'index'])->name('kontak.index');
    Route::put('/dashboard/kontak/status/{kontak:label}', [KontakController::class, 'status'])->name('kontak.status');
    Route::put('/dashboard/kontak/update/{kontak:label}', [KontakController::class, 'update'])->name('kontak.update');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
