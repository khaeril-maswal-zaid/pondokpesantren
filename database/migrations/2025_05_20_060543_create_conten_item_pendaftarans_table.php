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
        Schema::create('conten_item_pendaftarans', function (Blueprint $table) {
            $table->id();
            $table->enum('module', ['persyaratan', 'dokumen']);
            $table->enum('subcategory', ['umum', 'khusus', 'wajib', 'tambahan']);
            $table->string('point')->nullable();
            $table->integer('order');
            $table->timestamps();

            // Index untuk pencarian/filtering berdasarkan module & subcategory
            $table->index(['module', 'subcategory']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conten_item_pendaftarans');
    }
};
