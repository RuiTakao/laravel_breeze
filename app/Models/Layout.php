<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layout extends Model
{
    use HasFactory;

    protected $fillable = [
        'fv_image',
        'layout_pattern'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
