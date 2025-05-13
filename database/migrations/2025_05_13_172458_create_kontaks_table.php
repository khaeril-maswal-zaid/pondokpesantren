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
        Schema::create('kontaks', function (Blueprint $table) {
            $table->id();
            $table->string('label')->unique(); // contoh: fb, ig, etc
            $table->string('name'); // nama platform
            $table->string('value'); // nama pengguna atau deskripsi
            $table->string('link')->nullable(); // url ke platform tersebut
            $table->string('icon')->nullable(); // nama ikon dari lucide
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kontaks');
    }
};
