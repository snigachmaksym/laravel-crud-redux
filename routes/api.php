<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login');

Route::group(['middleware' => ['jwt.auth']], function() {
    Route::get('userdata', 'UserController@getAuthenticatedUser');
    Route::get('posts/{id}', 'PostController@getAllPostByUserId');
    Route::post('post', 'PostController@store');
    Route::post('post/{id}', 'PostController@update');
    Route::delete('post/{id}', 'PostController@destroy');
});

