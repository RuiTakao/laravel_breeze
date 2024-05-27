<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
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
        return Inertia::render('ItemList/Show', [
            'item' => $item,
            'sub_items' => $sub_items
        ]);
    }

    public function createItem(Request $request)
    {

        $item_order = $request->item_order;

        $data = User::find(Auth::id())->item()->get();
        if (count($data) >= $item_order) {
            foreach($data as $d) {
                if ($d->item_order >= $item_order) {
                    $update_data = Item::find($d->id);
                    $update_data->update(['item_order' => $update_data->item_order + 1]);
                }
            }
        }

        $save_data = new Item();
        $save_data->item_name = $request->item_name;
        $save_data->item_order = $request->item_order;
        $save_data->user_id = Auth::id();
        $save_data->save();

        return Redirect::route('item_list');
    }

    public function updateItem(Request $request, $id)
    {

        $item = Item::find($id);
        $updateArray = [];
        if (!is_null($request->item_name)) {
            $updateArray = ['item_name' => $request->item_name];
        }
        $request_order = $request->item_order;
        if (!is_null($request_order)) {
            if ($item->item_order !== $request_order) {
                $data = User::find(Auth::id())->item()->get();
                foreach ($data as $d) {
                    if ($d->item_order >= $request_order) {
                        $update_data = Item::find($d->id);
                        $update_data->update(['item_order' => $update_data->item_order + 1]);
                    }
                }
                $updateArray = array_merge($updateArray, ['item_order' => $request->item_order]);
            }
        }

        $item->update($updateArray);

        return Redirect::route('item_list');
    }
}
