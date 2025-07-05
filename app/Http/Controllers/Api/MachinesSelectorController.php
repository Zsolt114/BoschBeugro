<?php
//app/Http/Controllers/Api/MachinesSelectorController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use App\Models\Recycling;

class MachinesSelectorController extends Controller
{
    public function getData()
    {
        // Cache kulcs
        $cacheKey = 'machines_list';

        // Cache időtartam másodpercben (pl. 600 = 10 perc)
        $data = Cache::remember($cacheKey, 600, function () {
            return Recycling::select('machine')
                ->distinct()
                ->orderBy('machine', 'asc')
                ->get();
        });

        return response()->json($data);
    }
}
