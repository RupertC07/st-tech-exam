<?php

namespace App\Http\Requests;

use App\Traits\ApiResponseTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;


class CustomRequest extends FormRequest
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
            'name'=>['string', 'required']
        ];
    }

    //Custom error response in request
    protected function failedValidation(Validator $validator)
    {
        $error = $validator->errors()->first();
    
        // Use the trait's errorResponse method to return a custom response
        throw new HttpResponseException(
            $this->errorResponse($error, 422)
        );
    }
}
