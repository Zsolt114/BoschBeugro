<?php
//app/Http/Controllers/Api/ChartController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use phpDocumentor\Reflection\PseudoTypes\LowercaseString;

class TableController extends Controller
{
    public function getData(Request $request)
    {


        $selectedMachine = trim($request->input('selectedMachine'));
        $selectedProductname = trim($request->input('productname'));

        // 🔑 Cache kulcs generálása, hogy mindig egyedi legyen a kombináció
        $cacheKey = 'recycling_'
            . ($selectedMachine ?: 'all')
            . '_'
            . ($selectedProductname ?: 'all');

        // ⏰ Cache idő másodpercben (pl. 600 = 10 perc)
        $data = Cache::remember($cacheKey, 600, function () use ($selectedMachine, $selectedProductname) {
            $query = DB::table('recycling')
                ->join('products', 'recycling.product', '=', 'products.id')
                ->select('recycling.id', 'products.product_name', 'products.type_number', 'recycling.event_date')
                ->orderByDesc('recycling.event_date');

            if (!empty($selectedMachine) && strtolower($selectedMachine) !== "all") {
                $query->where('recycling.machine', $selectedMachine);
            }

            if (!empty($selectedProductname) && strtolower($selectedProductname) !== "") {
                $query->where('products.product_name', $selectedProductname);
            }

            return $query->get();
        });

        return response()->json($data);
    }


    public function getDataByDate(Request $request)
    {

        $startDate = $request->input('start_date'); // pl. "2025-07-01"
        $endDate = $request->input('end_date');     // pl. "2025-07-10"

        // Validálás
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $selectedMachine = trim($request->input('selectedMachine'));
        $selectedProductname = trim($request->input('productname'));

        // 🔑 Cache kulcs generálása (egyedi a dátum, gép és termék alapján)
        $cacheKey = 'recycling_'
            . ($startDate ?: 'null')
            . '_'
            . ($endDate ?: 'null')
            . '_'
            . ($selectedMachine ?: 'all')
            . '_'
            . ($selectedProductname ?: 'all');

        // ⏰ Cache idő (pl. 600 másodperc = 10 perc)
        $data = Cache::remember($cacheKey, 600, function () use ($startDate, $endDate, $selectedMachine, $selectedProductname) {
            $query = DB::table('recycling')
                ->join('products', 'recycling.product', '=', 'products.id')
                ->select('recycling.id', 'products.product_name', 'products.type_number', 'recycling.event_date')
                ->whereBetween('event_date', [$startDate, $endDate])
                ->orderByDesc('recycling.event_date');

            if (!empty($selectedMachine) && strtolower($selectedMachine) !== "all") {
                $query->where('recycling.machine', $selectedMachine);
            }

            if (!empty($selectedProductname) && strtolower($selectedProductname) !== "") {
                $query->where('products.product_name', $selectedProductname);
            }

            return $query->get();
        });

        return response()->json($data);
    }


    public function getMachineData(Request $request)
    {
        $selectedMachine = trim($request->input('selectedMachine'));
        // Define a cache key based on the selected machine
        $cacheKey = 'machines_' . md5($selectedMachine);
        // Attempt to retrieve the data from the cache
        $data = Cache::remember($cacheKey, 60, function () use ($selectedMachine) {
            // Start building the query to select all machines
            $query = DB::table('machines')->select('*');
            // Check if a specific machine is selected and it's not "all"
            if (!empty($selectedMachine) && strtolower($selectedMachine) !== "all") {
                // Add a where clause to filter by machine name
                $query->where('machine_name', $selectedMachine);
            }
            // Execute the query and get the results
            return $query->get();
        });
        // Return the results as a JSON response
        return response()->json($data);
    }
}
