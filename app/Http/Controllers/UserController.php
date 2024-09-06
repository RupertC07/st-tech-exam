<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserAuthRequest;
use App\Interfaces\UserInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private UserInterface $userRepository;

    public function __construct(UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }



    public function auth(UserAuthRequest $request)
    {
        return $this->userRepository->auth($request);
    }

    public function signout(Request $request)
    {
        return $this->userRepository->signout($request);
    }

}
