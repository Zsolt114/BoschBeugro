<?php
// routes/api.php
use App\Http\Controllers\Api\ChartController;
use App\Http\Controllers\Api\MachinesSelectorController;
use App\Http\Controllers\Api\TableController;

Route::get('/api/chart-data-bydate', [ChartController::class, 'getDataByDate']);

Route::get('/api/chart-data', [ChartController::class, 'getData']);

Route::get('/api/machineselectoptions', [MachinesSelectorController::class, 'getData']);

Route::get('/api/table-data', [TableController::class, 'getData']);

Route::get('/api/table-data-bydate', [TableController::class, 'getDataByDate']);

Route::get('/api/table-heading', [TableController::class, 'getMachineData']);

