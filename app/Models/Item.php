<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_name',
        'item_order',
        'user_id'
    ];

    public function sub_item()
    {
        return $this->hasMany(SubItem::class);
    }
}
