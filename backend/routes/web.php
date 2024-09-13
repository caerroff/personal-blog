<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/post', [PostController::class, 'getAll']);

Route::get('/post/{id}', [PostController::class, 'get'])->where('id', '[0-9]+');;

Route::post('/post/new', [PostController::class, 'new']);

Route::post('/post/update', [PostController::class, 'update']);

Route::delete('/post/{id}', [PostController::class, 'delete'])->where('id', '[0-9]+');;