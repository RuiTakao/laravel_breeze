<?php

use App\Http\Controllers\ItemListController;
use App\Http\Controllers\LayoutController;
use App\Http\Controllers\PortFolioController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
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

// Route::get('/admin', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', function () {
    return 'ランディングページ';
});

Route::get('/admin', function () {
    return redirect('admin/layout');
});

Route::get('/{name}', [PortFolioController::class, 'index']);

Route::middleware('auth')->group(function () {
    Route::group(['prefix' => 'admin'], function () {
        Route::get('/layout', [LayoutController::class, 'index'])->name('layout');
        Route::patch('/layoutProfleEdit', [LayoutController::class, 'layoutProfleEdit'])->name('layoutProfleEdit');
        Route::patch('/FVEdit', [LayoutController::class, 'FVEdit'])->name('FVEdit');
        Route::patch('/LayoutPatternEdit', [LayoutController::class, 'LayoutPatternEdit'])->name('LayoutPatternEdit');

        Route::get('/item_list', [ItemListController::class, 'index'])->name('item_list');
        Route::get('/item_list/show/{id}', [ItemListController::class, 'show'])->name('item_list.show');
        Route::post('/item_list/create_item', [ItemListController::class, 'createItem'])->name('item_list.create_item');
        Route::patch('/item_list/update_item/{id}', [ItemListController::class, 'updateItem'])->name('item_list.update_item');

        Route::post('/sub_item_list/create', [ItemListController::class, 'createSubItem'])->name('sub_item_list.create_subItem');
        Route::patch('/sub_item_list/update/{id}', [ItemListController::class, 'updateSubItem'])->name('sub_item_list.update_subItem');
    });
});

require __DIR__ . '/auth.php';
