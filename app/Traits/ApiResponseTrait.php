<?php 
namespace App\Traits;

use Illuminate\Http\JsonResponse;


//Custom response format
trait ApiResponseTrait
{
    protected function successResponse($data = null, $message = 'Success', $status = 200): JsonResponse
    {
        return response()->json([
            'status' => 'Success',
            'message' => $message,
            'data' => $data,
            'code'=>$status
        ], $status);
    }

    protected function errorResponse($message = 'Error', $status = 400): JsonResponse
    {
        return response()->json([
            'status' => 'Failed',
            'message' => $message,
            'data' => null,
            'code'=>$status
        ], $status);
    }
}
