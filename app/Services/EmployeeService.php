<?php

namespace app\Services;
use App\Models\Employee;

class EmployeeService {

    public function create($request) {
        $employee = Employee::create([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "birthdate" => $request->birthdate,
            "gender" => $request->gender,
            "monthly_salary" => $request->monthly_salary 
        ]);
        return $employee;
    }

    public function updated($request, $id){
        $employee = Employee::where('id', $id)->update([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "birthdate" => $request->birthdate,
            "gender" => $request->gender,
            "monthly_salary" => $request->monthly_salary 
        ]);
        return $employee;
    }

    public function show($id){
        $employee = Employee::where('id', $id)->first();
        return $employee;
    }

    public function list($request){

        $perpage = 10;
        $search = $request->search ?? null;
        $employee = new Employee();

        if($search){
            $employee = $employee->where(function($q) use ($search){
                $q->where('first_name', 'like', '%'.$search.'%')
                ->orWhere('last_name', 'like', '%'.$search.'%')
                ->orWhere('gender', 'like', '%'.$search.'%')
                ->orWhere('birthdate', 'like', '%'.$search.'%')
                ->orWhere('monthly_salary', 'like', '%'.$search.'%');

            });
        }

        $employee = $employee->paginate($perpage);
        return $employee;
    }

    public function delete($id){
        $employee = Employee::where('id', $id)->whereNull('deleted_at')->delete();
        return $employee;
    }

}