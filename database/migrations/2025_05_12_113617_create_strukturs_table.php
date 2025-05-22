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
        Schema::create('strukturs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('no_hp');
            $table->string('role');
            $table->string('keterangan');
            $table->boolean('main')->default(false);
            $table->enum('gender', ['Laki-laki', 'Perempuan'])->default('Laki-laki',);
            $table->string('image')->default('image/structure/custom-struktur.jpg');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('strukturs');
    }
};
