<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        // $items = User::find(Auth::id())->item()->orderBy('item_order', 'asc')->get();
        $history = User::find(Auth::id())->history()->get();
        return Inertia::render('ItemList/HistoryList/HistoryList');
    }
}
