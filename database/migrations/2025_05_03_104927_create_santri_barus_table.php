<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('santri_barus', function (Blueprint $table) {
            $table->id();
            // Data Diri Santri
            $table->string('nik')->unique();
            $table->string('nama_lengkap');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->string('provinsi');
            $table->string('kabupaten');
            $table->string('kecamatan');
            $table->string('desa');

            // Data Orang Tua
            $table->string('nama_ayah');
            $table->string('nama_ibu');
            $table->string('pekerjaan_ayah');
            $table->string('pekerjaan_ibu');
            $table->string('kontak_ayah');
            $table->string('kontak_ibu');

            // Asal Sekolah
            $table->enum('jenjang', ['MI', 'MTs', 'MA']);
            $table->string('nama_sekolah')->nullable();
            $table->string('nisn')->nullable();
            $table->string('tahun_tamat')->nullable();

            // more
            $table->string('foto')->nullable();
            $table->string('no_registrasi');
            $table->string('status')->default('pending'); // pending, accepted, rejected

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('santri_barus');
    }
};
