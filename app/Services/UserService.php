<?php

namespace app\Services;
use Illuminate\Support\Facades\Auth;


class UserService
{

    public function auth($request)
    {
        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return null;
        }
        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;

        return $token;
    }
    public function logout($request)
    {
        $user = $request->user();
        \Log::info($user);
        if ($user)
            $user->tokens()->delete();
        return true;
    }
}