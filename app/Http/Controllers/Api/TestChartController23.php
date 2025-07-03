<?php
//app/Http/Controllers/Api/TestChartController.php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestChartController23 extends Controller
{
     public function getData()
    {
        $data = DB::table('recycling')
            ->join('products', 'recycling.product', '=', 'products.id')
            ->select('products.product_name', DB::raw('COUNT(*) as count'))
            ->groupBy('recycling.product', 'products.product_name')
            ->orderByDesc('count')
            ->get();

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

        // Lekérdezés az intervallumra (példa: 'created_at' mező szerint)
         $data = DB::table('recycling')
            ->join('products', 'recycling.product', '=', 'products.id')
            ->select('products.product_name', DB::raw('COUNT(*) as count'))
            ->whereBetween('event_date', [$startDate, $endDate])
            ->groupBy('recycling.product', 'products.product_name')
            ->orderByDesc('count')
            ->get();
        return response()->json($data);
    }
    
}