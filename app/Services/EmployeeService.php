<?php

namespace App\Services;
use App\Models\Employee;

class EmployeeService
{

    public function create($request)
    {
        $employee = Employee::create([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "birthdate" => $request->birthdate,
            "gender" => $request->gender,
            "monthly_salary" => $request->monthly_salary
        ]);
        return $employee;
    }

    public function update($request, $id)
    {
        $employee = Employee::where('id', $id)->update([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "birthdate" => $request->birthdate,
            "gender" => $request->gender,
            "monthly_salary" => $request->monthly_salary
        ]);
        return $employee;
    }

    public function show($id)
    {
        $employee = Employee::where('id', $id)->first();
        return $employee;
    }

    public function list($request)
    {

        $perpage = 10;
        $search = $request->search ?? null;
        $employee = new Employee();

        if ($search) {
            $employee = $employee->where(function ($q) use ($search) {
                $q->where('first_name', 'like', '%' . $search . '%')
                    ->orWhere('last_name', 'like', '%' . $search . '%')
                    ->orWhere('gender', 'like', '%' . $search . '%')
                    ->orWhere('birthdate', 'like', '%' . $search . '%')
                    ->orWhere('monthly_salary', 'like', '%' . $search . '%');

            });
        }
        $employee = $employee->orderByDesc('updated_at')->orderBy('id');
        $employee = $employee->paginate($perpage);
        return $employee;
    }

    public function delete($id)
    {
        $employee = Employee::where('id', $id)->whereNull('deleted_at')->delete();
        return $employee;
    }

    public function summarize()
    {


        $maleCount = Employee::where('gender', 'Male')->count();
        $femaleCount = Employee::where('gender', 'Female')->count();


        $ageStats = Employee::select(
            \DB::raw('AVG(TIMESTAMPDIFF(YEAR, birthdate, CURDATE())) AS average_age'),
            \DB::raw('MAX(TIMESTAMPDIFF(YEAR, birthdate, CURDATE())) AS max_age'),
            \DB::raw('MIN(TIMESTAMPDIFF(YEAR, birthdate, CURDATE())) AS min_age')
        )->first();


        $totalSalary = Employee::sum('monthly_salary');
        $avgSalary = Employee::avg('monthly_salary');

        return [
            'maleCount' => $maleCount,
            'femaleCount' => $femaleCount,
            'ageStats' => [
                'average_age' => round($ageStats->average_age),
                'min' => $ageStats->min_value,
                'max' => $ageStats->max_age
            ],
            'totalSalary' => $totalSalary,
            'averageSalary' => round($avgSalary)
        ];



    }

}