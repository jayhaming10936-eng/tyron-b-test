<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $user = request()->user();

        return Inertia::render('dashboard', [
            'stats' => $user->isSuperAdmin() ? [
                'total_users' => User::role('User')->count(),
                'total_admins' => User::role('Admin')->count(),
                'total_super_admins' => User::role('Super Admin')->count(),
                'total_accounts' => User::count(),
            ] : null,
            'team' => $user->team ? [
                'id' => $user->team->id,
                'name' => $user->team->name,
                'label' => $user->team->label,
                'description' => $user->team->description,
            ] : null,
        ]);
    }
}
