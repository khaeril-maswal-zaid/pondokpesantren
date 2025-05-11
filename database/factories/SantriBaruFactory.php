<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SantriBaru>
 */
class SantriBaruFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = $this->faker->randomElement(['Laki-laki', 'Perempuan']);

        return [
            'nik' => $this->faker->numerify('################'),
            'nama_lengkap' => $this->faker->name($gender),
            'tempat_lahir' => $this->faker->city(),
            'tanggal_lahir' => $this->faker->date(),
            'jenis_kelamin' => $gender,
            'provinsi' => $this->faker->state(),
            'kabupaten' => $this->faker->city(),
            'kecamatan' => $this->faker->streetName(),
            'desa' => $this->faker->streetSuffix(),
            'nama_ayah' => $this->faker->name('male'),
            'nama_ibu' => $this->faker->name('female'),
            'pekerjaan_ayah' => $this->faker->jobTitle(),
            'pekerjaan_ibu' => $this->faker->jobTitle(),
            'kontak_ayah' => $this->faker->phoneNumber(),
            'kontak_ibu' => $this->faker->phoneNumber(),
            'jenjang' => $this->faker->randomElement(['MI', 'MTs', 'MA']),
            'nama_sekolah' => $this->faker->company() . ' School',
            'nisn' => $this->faker->unique()->numerify('##########'),
            'tahun_tamat' => $this->faker->year(),
            'foto' => $this->faker->imageUrl(300, 300, 'people'),
            'no_registrasi' => $this->faker->unique()->bothify('REG####'),
            'status' => $this->faker->randomElement(['rejected', 'accepted', 'pending']),
        ];
    }
}
