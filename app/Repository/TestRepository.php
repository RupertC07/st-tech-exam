<?php

namespace App\Repository;
use App\Interfaces\TestInterface;
use App\Models\User;
use App\Traits\ApiResponseTrait;
use Request;

class TestRepository implements TestInterface{

    use ApiResponseTrait;
     public function index($request){
        
        return $this->successResponse($request, 'Success');
        
    }
}