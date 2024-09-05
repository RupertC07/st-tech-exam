<?php

namespace App\Http\Requests;

use App\Traits\ApiResponseTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class EmployeeRequest extends FormRequest
{

    use ApiResponseTrait;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['string', 'required', 'max:255'],
            'last_name' => ['string', 'required', 'max:255'],
            'gender' => ['string', 'required', 'in:Male,Female'],
            'birthdate' => ['required'],
            'monthly_salary' => ['required', 'numeric', 'min:1']
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $error = $validator->errors()->first();

        // Use the trait's errorResponse method to return a custom response
        throw new HttpResponseException(
            $this->errorResponse($error, 422)
        );
    }
}
