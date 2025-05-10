<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SantriBaru extends Model
{
    /** @use HasFactory<\Database\Factories\SantriBaruFactory> */
    use HasFactory;

    protected $fillable = [
        'nik',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'provinsi',
        'kabupaten',
        'kecamatan',
        'desa',
        'nama_ayah',
        'nama_ibu',
        'pekerjaan_ayah',
        'pekerjaan_ibu',
        'kontak_ayah',
        'kontak_ibu',
        'jenjang',
        'nama_sekolah',
        'nisn',
        'tahun_tamat',
        'foto',
        'no_registrasi',
    ];
}
