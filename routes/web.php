<?php

use App\Http\Controllers\ItemListController;
use App\Http\Controllers\LayoutController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/admin', function () {
    return redirect('admin/layout');
})->middleware(['auth', 'verified'])->name('admin');

Route::middleware('auth')->group(function () {
    Route::get('/layout', [LayoutController::class, 'index'])->name('layout');
    Route::patch('/layoutProfleEdit', [LayoutController::class, 'layoutProfleEdit'])->name('layoutProfleEdit');
    
    Route::get('/item_list', [ItemListController::class, 'index'])->name('item_list');
    Route::get('/item_list/show/{id}', [ItemListController::class, 'show'])->name('item_list.show');
    Route::post('/item_list/create_item', [ItemListController::class, 'createItem'])->name('item_list.create_item');
    Route::patch('/item_list/update_item/{id}', [ItemListController::class, 'updateItem'])->name('item_list.update_item');
});

require __DIR__ . '/auth.php';
