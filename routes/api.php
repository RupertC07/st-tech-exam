<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'test'], function () {
    Route::post('/', [TestController::class, 'index']);
});


Route::group(['prefix' => 'user'], function () {
    Route::post('/authenticate', [UserController::class, 'auth']);
});




Route::group(['prefix' => 'employee', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/', [EmployeeController::class, 'index']);
    Route::post('/', [EmployeeController::class, 'create']);
    Route::put('/{id}', [EmployeeController::class, 'update']);
    Route::get('/{id}', [EmployeeController::class, 'show']);
    Route::delete('/{id}', [EmployeeController::class, 'delete']);
});


Route::group(['prefix' => 'analytics', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/employee', [EmployeeController::class, 'summarize']);
});
