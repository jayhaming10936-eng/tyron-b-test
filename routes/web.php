<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::resource('users', UserController::class);
    Route::resource('teams', TeamController::class);
});

require __DIR__.'/settings.php';
