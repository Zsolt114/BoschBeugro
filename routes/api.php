<?php
// routes/api.php
use App\Http\Controllers\Api\ChartController;
use App\Http\Controllers\Api\MachinesSelectorController;

Route::get('/api/chart-data-bydate', [ChartController::class, 'getDataByDate']);

Route::get('/api/chart-data', [ChartController::class, 'getData']);

Route::get('/api/machineselectoptions', [MachinesSelectorController::class, 'getData']);