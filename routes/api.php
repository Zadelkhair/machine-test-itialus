<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('all/products', [ProductController::class, 'all']);
Route::get('get/product', [ProductController::class, 'get']);
Route::get('find/products', [ProductController::class, 'find']);
Route::get('search/products', [ProductController::class, 'search']);
Route::post('store/product', [ProductController::class, 'store']);
Route::put('update/product', [ProductController::class, 'update']);
Route::delete('delete/product', [ProductController::class, 'delete']);


Route::get('all/categories', [CategoryController::class, 'all']);
Route::post('store/category', [CategoryController::class, 'store']);
Route::delete('delete/category', [CategoryController::class, 'delete']);
