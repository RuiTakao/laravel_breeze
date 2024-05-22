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
        $profile = User::find(Auth::id())->profile;
        return Inertia::render('AppearanceLayout/Index', ['profile' => $profile]);
    }

    public function layoutProfleEdit(Request $request): RedirectResponse
    {
        $id = User::find(Auth::id())->profile->id;
        $profile = Profile::find($id);
        $profile->update($request->all());

        return Redirect::route('layout');
    }
}
