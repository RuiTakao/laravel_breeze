<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class LayoutController extends Controller
{

    public function index(): Response
    {
        // dd(storage_path());
        // dd(file_exists(storage_path('app/avatar.png')));
        $profile = User::find(Auth::id())->profile;
        return Inertia::render('AppearanceLayout/Index', ['profile' => $profile, 'dimage' => storage_path('app/avatar.png')]);
    }

    // public function 

    public function layoutProfleEdit(Request $request): RedirectResponse
    {

        
        $imageData = $request->image;

        // Base64エンコードされた文字列から、データ部分のみを取り出す
        
        list($type, $imageData) = explode(';', $imageData);
        list(, $imageData)      = explode(',', $imageData);
        $imageData = base64_decode($imageData);
        $path = storage_path('app/avatar.png');
        file_put_contents($path, $imageData);
        $id = User::find(Auth::id())->profile->id;
        $profile = Profile::find($id);
        unset($request['image']);
        $profile->update($request->all());

        return Redirect::route('layout');
    }
}
