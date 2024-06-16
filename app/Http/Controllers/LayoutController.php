<?php

namespace App\Http\Controllers;

use App\Models\Layout;
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
        $profile = User::find(Auth::id())->profile;
        $layout = User::find(Auth::id())->layout;
        return Inertia::render('AppearanceLayout/Index', [
            'profile' => $profile,
            'layout' => $layout
        ]);
    }

    public function layoutProfleEdit(Request $request): RedirectResponse
    {

        if (isset($request->image_path)) {

            $imageData = $request->image_path;

            list($type, $imageData) = explode(';', $imageData);
            list(, $imageData)      = explode(',', $imageData);
            $imageData = base64_decode($imageData);
            $str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPUQRSTUVWXYZ';
            $filename = substr(str_shuffle($str), 0, 10) . round(microtime(true) * 1000) . '.jpg';
            $path = storage_path('app/public/' . $filename);
            file_put_contents($path, $imageData);
            $request['image_path'] = $filename;
        }

        $id = User::find(Auth::id())->profile->id;
        $profile = Profile::find($id);
        $profile->update($request->all());

        return Redirect::route('layout');
    }

    public function FVEdit(Request $request): RedirectResponse
    {
        if (isset($request->fv_image)) {

            $imageData = $request->fv_image;

            list($type, $imageData) = explode(';', $imageData);
            list(, $imageData)      = explode(',', $imageData);
            $imageData = base64_decode($imageData);
            $str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPUQRSTUVWXYZ';
            $filename = substr(str_shuffle($str), 0, 10) . round(microtime(true) * 1000) . '.jpg';
            $path = storage_path('app/public/' . $filename);
            file_put_contents($path, $imageData);
            $request['fv_image'] = $filename;
        }

        $id = User::find(Auth::id())->layout->id;
        $layout = Layout::find($id);
        $layout->update($request->all());

        return Redirect::route('layout');
    }

    public function LayoutPatternEdit(Request $request): RedirectResponse
    {
        $id = User::find(Auth::id())->layout->id;
        $layout = Layout::find($id);
        $layout->update($request->all());

        return Redirect::route('layout');
    }
}
