<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Blog extends Model
{
    /** @use HasFactory<\Database\Factories\BlogFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'oleh',
        'slug',
        'title',
        'excerpt',
        'body1',
        'body2',
        'picture1',
        'picture2',
        'picture3',
        'tags',
        'visit'
    ];

    protected $casts = [
        'tags' => 'array',
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function athor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
