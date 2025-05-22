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
        Schema::create('workflow_step_pendaftarans', function (Blueprint $table) {
            $table->id();
            $table->enum('module', ['alur', 'faq']);
            $table->string('title');
            $table->text('description')->nullable();
            $table->timestamps();
            $table->integer('order');

            // Index untuk filtering berdasarkan module
            $table->index('module');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workflow_step_pendaftarans');
    }
};
