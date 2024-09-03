<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomRequest;
use App\Interfaces\TestInterface;
use Illuminate\Http\Request;

class TestController extends Controller
{
     private TestInterface $testRepository;

     public function __construct(TestInterface $testRepository)
     {
         //instantiate the interface for user, so we can use all the repos that handles actions
         $this->testRepository = $testRepository;
     }

     public function index(CustomRequest $request){
        return $this->testRepository->index($request);
     }
}
