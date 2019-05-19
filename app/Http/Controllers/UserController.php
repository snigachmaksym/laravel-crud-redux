<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidationLoginRequest;
use App\Http\Requests\ValidationRegisterRequest;
use App\User;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function register(ValidationRegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user','token'),201);
    }

    public function login(ValidationLoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $user = User::where('email', '=', $credentials['email'])->with('posts')->first();
        if (! $user) {
            return response()->json(['errors' => ['credentials' =>'Email not found']], 401);
        }
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['errors' => ['credentials' =>'Invalid credentials']], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['errors' => ['could_not_create_token']], 500);
        }
        return response()->json(compact('user', 'token'));
    }
    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }
        $posts = $user->posts()->get();
        return response()->json(compact('user', 'posts'));
    }
}