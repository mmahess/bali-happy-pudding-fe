<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rute utama langsung kita arahkan ke Katalog Bali Happy Pudding
Route::get('/', function () {
    return Inertia::render('Catalog');
});

Route::get('/katalog', function () {
    return Inertia::render('Catalog');
});