<?php
// routes/api.php
use App\Http\Controllers\Api\TestChartController23;

Route::get('/chart-data', [TestChartController23::class, 'getDataByDate']);