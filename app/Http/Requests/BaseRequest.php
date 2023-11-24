<?php

namespace App\Http\Requests;

use App\Facades\Response;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

abstract class BaseRequest extends FormRequest
{
    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator) {
        throw new HttpResponseException(Response::cantBeProcessed(err: $validator->errors()));
    }
}
