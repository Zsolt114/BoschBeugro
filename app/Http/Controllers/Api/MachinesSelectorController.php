<?php
//app/Http/Controllers/Api/MachinesSelectorController.php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Recycling;

class MachinesSelectorController extends Controller
{
     public function getData()
    {
        $data = Recycling::select('machine')
                ->distinct()
                ->orderBy('machine', 'asc')
                ->get();

        return response()->json($data);
    }
    
}