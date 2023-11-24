<?php

namespace App\Services\Interfaces;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

interface IUserService {

    public function loginOrFail(Request $request): JsonResponse;

    public function registerOrFail(Request $request): JsonResponse;

}
