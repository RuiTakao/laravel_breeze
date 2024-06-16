<?php

namespace App\Http\Controllers;

use App\Models\User;

class PortFolioController extends Controller
{
    public function index($name)
    {
        $user = User::where('name', $name)->first();

        if (is_null($user)) {
            return redirect('/');
        }

        $layout = $user->layout;
        $profile = $user->profile;
        $items = $user->item;

        return view('portfolio', compact('layout', 'profile', 'items'));
    }
}
