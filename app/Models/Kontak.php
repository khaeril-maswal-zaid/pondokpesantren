<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kontak extends Model
{
    protected $fillable = [
        'label',
        'name',
        'value',
        'link',
        'icon',
        'status',
    ];
}
