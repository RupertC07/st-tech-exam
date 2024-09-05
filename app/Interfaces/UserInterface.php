<?php

namespace App\Interfaces;

Interface UserInterface {
     public function auth($request);
     public function signout($request);
}