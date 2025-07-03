<?php
//app/Http/Controllers/Api/ChartController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\PseudoTypes\LowercaseString;

class ChartController extends Controller
{
    public function getData(Request $request)
    {


        $selectedMachine = trim($request->input('selectedMachine'));
        $query = DB::table('recycling')
            ->join('products', 'recycling.product', '=', 'products.id')
            ->select('products.product_name', DB::raw('COUNT(*) as count'))
            ->groupBy('recycling.product', 'products.product_name')
            ->orderByDesc('count');
        if (!empty($selectedMachine) && strtolower($selectedMachine) !== "all") {
            $query->where('recycling.machine', $selectedMachine);
        }
        $data = $query->get();
        return response()->json($data);
    }


    public function getDataByDate(Request $request)
    {




        $startDate = $request->input('start_date'); // pl. "2025-07-01"
        $endDate = $request->input('end_date');     // pl. "2025-07-10"

        // Validálás (opcionális, de ajánlott)
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);



        $selectedMachine = trim($request->input('selectedMachine'));
        $query = DB::table('recycling')
            ->join('products', 'recycling.product', '=', 'products.id')
            ->select('products.product_name', DB::raw('COUNT(*) as count'))
            ->whereBetween('event_date', [$startDate, $endDate])
            ->groupBy('recycling.product', 'products.product_name')
            ->orderByDesc('count');
        if (!empty($selectedMachine) && strtolower($selectedMachine) !== "all") {
            $query->where('recycling.machine', $selectedMachine);
        }
        $data = $query->get();
        return response()->json($data);
    }
}
