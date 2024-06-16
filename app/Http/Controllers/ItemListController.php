<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\SubItem;
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
        $data = User::find(Auth::id())->item()->get();

        $save_data = new Item();
        $save_data->item_name = $request->item_name;
        $save_data->item_order = count($data);
        $save_data->user_id = Auth::id();
        $save_data->save();

        return Redirect::route('item_list');
    }

    public function updateItem(Request $request, $id)
    {

        $item = Item::find($id);
        $updateArray = [];
        // dd($request);
        if (!is_null($request->item_name)) {
            $updateArray = ['item_name' => $request->item_name];
        }
        $request_order = $request->item_order;
        if ($request_order !== 0) {
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

        // dd($updateArray);
        $item->update($updateArray);

        return Redirect::route('item_list');
    }

    public function createSubItem(Request $request)
    {
        $data = Item::find($request->item_id)->sub_item()->get();

        $save_data = new SubItem();

        if (isset($request->sub_item_image)) {

            $imageData = $request->sub_item_image;

            list($type, $imageData) = explode(';', $imageData);
            list(, $imageData)      = explode(',', $imageData);
            $imageData = base64_decode($imageData);
            $str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPUQRSTUVWXYZ';
            $filename = substr(str_shuffle($str), 0, 10) . round(microtime(true) * 1000) . '.jpg';
            $path = storage_path('app/public/' . $filename);
            file_put_contents($path, $imageData);
            $request['sub_item_image'] = $filename;
            $save_data->sub_item_image = $filename;
        }

        $save_data->item_id = $request->item_id;
        $save_data->sub_item_name = $request->sub_item_name;
        $save_data->sub_item_text = $request->sub_item_text;
        $save_data->sub_item_order = 1;
        
        $save_data->save();

        return Redirect::route('item_list.show', ['id' => $request->item_id]);
    }

    public function updateSubItem(Request $request, $id)
    {
        $sub_item = SubItem::find($id);

        if (isset($request->sub_item_image)) {

            $imageData = $request->sub_item_image;

            list($type, $imageData) = explode(';', $imageData);
            list(, $imageData)      = explode(',', $imageData);
            $imageData = base64_decode($imageData);
            $str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPUQRSTUVWXYZ';
            $filename = substr(str_shuffle($str), 0, 10) . round(microtime(true) * 1000) . '.jpg';
            $path = storage_path('app/public/' . $filename);
            file_put_contents($path, $imageData);
            $request['sub_item_image'] = $filename;
        }

        $sub_item->update($request->all());

        return Redirect::route('item_list.show', ['id' => $sub_item->item_id]);
    }
}
