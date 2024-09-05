<?php

namespace App\Providers;

use App\Interfaces\EmployeeInterface;
use App\Interfaces\TestInterface;
use App\Interfaces\UserInterface;
use App\Repository\EmployeeRepository;
use App\Repository\TestRepository;
use App\Repository\UserRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->bind(TestInterface::class, TestRepository::class);
        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(EmployeeInterface::class, EmployeeRepository::class);
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
