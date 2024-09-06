<?php

namespace App\Repository;
use App\Interfaces\UserInterface;
use App\Services\UserService;
use App\Traits\ApiResponseTrait;

class UserRepository implements UserInterface
{

    use ApiResponseTrait;
    public function auth($request)
    {
        try {
            $user = new UserService();
            $token = $user->auth($request);

            if ($token) {
                return $this->successResponse(['token' => $token], 'User has been successfully logged in');
            }
            return $this->errorResponse('Invalid Credentials', 401);
        } catch (\Exception $e) {
            $message = config('app.env') == 'local' ? $e : "Internal Server Error";
            return $this->errorResponse($message, 500);
        }
    }
    public function signout($request)
    {
        try {


            $user = new UserService();


            if ($user->logout($request)) {
                return $this->successResponse(null, 'User has been successfully logged out');
            }
            return $this->errorResponse('Invalid Action', 401);
        } catch (\Exception $e) {
            $message = config('app.env') == 'local' ? $e : "Internal Server Error";
            return $this->errorResponse($message, 500);
        }
    }
}