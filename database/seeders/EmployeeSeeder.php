<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class EmployeeSeeder extends Seeder
{


    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $faker = Faker::create();
        for ($i = 0; $i < 20; $i++) { // Generating 20 employee records
            Employee::create([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'gender' => $faker->randomElement(['Male', 'Female']), // Randomly picks 'Male' or 'Female'
                'birthdate' => $faker->date($format = 'Y-m-d', $max = 'yesterday'),  // Date format 'YYYY-MM-DD'
                'monthly_salary' => $faker->numberBetween(10000, 3000000) // Generates an integer salary between 10000 and 300,000
            ]);
        }

    }
}
