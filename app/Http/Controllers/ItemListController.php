<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ItemListController extends Controller
{
    public function index(): Response
    {
        $items = User::find(Auth::id())->item()->orderBy('item_order', 'asc')->get();
        return Inertia::render('ItemList/Index', ['items' => $items]);
    }

    public function show($id): Response
    {
        $item = Item::find($id);
        $sub_items = Item::find($id)->sub_item()->orderBy('sub_item_order', 'asc')->get();
        return Inertia::render('ItemList/Show', ['item' => $item, 'sub_items' => $sub_items]);
    }
}
