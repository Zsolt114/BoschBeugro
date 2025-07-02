<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recycling extends Model
{
    use HasFactory;

    // Ha a tábla neve nem "recyclings", itt megadhatod kézzel is:
    protected $table = 'recycling';

    // Ha nincs created_at, updated_at meződ, kikapcsolhatod:
    public $timestamps = false;

    // Ha csak bizonyos mezőket szeretnél engedélyezni töltéshez:
    // protected $fillable = ['product', 'count', ...];
}

