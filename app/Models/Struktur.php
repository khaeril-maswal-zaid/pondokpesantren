<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Struktur extends Model
{
    protected $fillable = [
        'name',
        'no_hp',
        'role',
        'keterangan',
        'main',
        'image',
    ];
}
