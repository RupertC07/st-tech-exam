<?php

namespace App\Interfaces;

Interface EmployeeInterface {

    public function index($request);
    public function create($request);
    public function update($request, $id);
    public function show($id);
    public function delete($id);

    public function summarize();
}