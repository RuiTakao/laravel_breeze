<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'sub_item_name',
        'sub_item_order',
        'sub_item_text',
        'sub_item_image',
        'item_id',
    ];
}
