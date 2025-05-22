<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Official 1 Ponpes UBK',
            'email' => 'official1@ubaybinkaab.ponpes.id',
            'password' => 'ponpesubk165',
        ]);


        $this->call(BlogSeeder::class);
        // $this->call(SantriBaruSeeder::class);
        $this->call(ContenItemPendaftaranSeeder::class);
        $this->call(WorkflowStepPendaftaranSeeder::class);
        $this->call(JadwalPendaftaranSeeder::class);
        $this->call(AgendaSeeder::class);
        $this->call(StrukturSeeder::class);
        $this->call(KontakSeeder::class);
    }
}
