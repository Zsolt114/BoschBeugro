<?php
// routes/api.php
use App\Http\Controllers\Api\TestChartController23;

Route::get('/chart-data-bydate', [TestChartController23::class, 'getDataByDate']);

Route::get('/chart-data', [TestChartController23::class, 'getData']);