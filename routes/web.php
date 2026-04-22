<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Catalog');
});

Route::get('/katalog', function () {
    return Inertia::render('Catalog');
});

Route::get('/pesan', function () {
    return Inertia::render('ProductDetail');
});

Route::get('/keranjang', function () {
    return Inertia::render('Cart');
});