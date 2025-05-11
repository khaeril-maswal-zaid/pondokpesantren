<?php

namespace Database\Seeders;

use App\Models\SantriBaru;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SantriBaruSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SantriBaru::factory()->count(50)->create();
    }
}
