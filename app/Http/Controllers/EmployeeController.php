<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Interfaces\EmployeeInterface;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    private EmployeeInterface $employeeRepository;

    public function __construct(EmployeeInterface $employeeRepository)
    {
        $this->employeeRepository = $employeeRepository;
    }

    public function index(Request $request)
    {
        return $this->employeeRepository->index($request);
    }

    public function create(EmployeeRequest $request)
    {
        return $this->employeeRepository->create($request);

    }
    public function update(EmployeeRequest $request, $id)
    {
        return $this->employeeRepository->update($request, $id);

    }

    public function delete($id)
    {
        return $this->employeeRepository->delete($id);

    }

    public function show($id)
    {
        return $this->employeeRepository->show($id);

    }

    public function summarize()
    {
        return $this->employeeRepository->summarize();

    }
}
