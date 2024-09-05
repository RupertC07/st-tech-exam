<?php

namespace App\Repository;
use App\Interfaces\EmployeeInterface;
use App\Services\EmployeeService;
use App\Traits\ApiResponseTrait;

class EmployeeRepository implements EmployeeInterface
{

    use ApiResponseTrait;
    public function index($request)
    {
        try {
            $employees = new EmployeeService();
            $employees = $employees->list($request);

            $nextPage = $employees->currentPage() < $employees->lastPage() ? $employees->currentPage() + 1 : null;
            $prevPage = $employees->currentPage() > 1 ? $employees->currentPage() - 1 : null;




            return $this->successResponse($employees, "Successfully fecthed");

        } catch (\Exception $e) {
            $message = config('app.env') == 'local' ? $e : "Internal Server Error";
            return $this->errorResponse($message, 500);
        }
    }
    public function create($request)
    {
        try {
            $employee = new EmployeeService();
            $employee = $employee->create($request);
            $data = [
                'employee' => $employee,
            ];

            return $this->successResponse($data, "Successfully Created");

        } catch (\Exception $e) {
            $message = config('app.env') == 'local' ? $e : "Internal Server Error";
            return $this->errorResponse($message, 500);
        }

    }
    public function update($request, $id)
    {
        try {
            $employeeService = new EmployeeService();
            $employee = $employeeService->show($id);
            if (!$employee) {
                return $this->errorResponse("Not found", 404);
            }

            $updated_employee = $employeeService->update($request, $id);

            $data = [
                'employee' => $updated_employee,
            ];

            return $this->successResponse($data, "Successfully Updated");

        } catch (\Exception $e) {
            $message = config('app.env') == 'local' ? $e : "Internal Server Error";
            return $this->errorResponse($message, 500);
        }
    }

    public function show($id)
    {
        try {
            $employeeService = new EmployeeService();
            $employee = $employeeService->show($id);
            if (!$employee) {
                return $this->errorResponse("Not found", 404);
            }

            $data = [
                'employee' => $employee
            ];

            return $this->successResponse($data, "Successfully Fetched");

        } catch (\Exception $e) {
            $message = config('app.env') == 'local' ? $e : "Internal Server Error";
            return $this->errorResponse($message, 500);
        }
    }

    public function delete($id)
    {
        try {
            $employeeService = new EmployeeService();
            $employee = $employeeService->show($id);
            if (!$employee) {
                return $this->errorResponse("Not found", 404);
            }

            $updated_employee = $employeeService->delete($id);


            return $this->successResponse(null, "Successfully Deleted");

        } catch (\Exception $e) {
            $message = config('app.env') == 'local' ? $e : "Internal Server Error";
            return $this->errorResponse($message, 500);
        }
    }

    public function summarize()
    {

        try {
            $employeeService = new EmployeeService();
            $summary = $employeeService->summarize();

            return $this->successResponse(['summary' => $summary], "Successfully Fetched");

        } catch (\Exception $e) {
            $message = config('app.env') == 'local' ? $e : "Internal Server Error";
            return $this->errorResponse($message, 500);
        }
    }
}