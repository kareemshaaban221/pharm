<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\UserService;

class AuthController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    /**
     * check for email
     * if found, check for password
     * if correct create a login token and return the response
     * otherwise throw HttpResponseException
     */
    public function login(LoginRequest $request) {
        return $this->userService->loginOrFail($request);
    }

    /**
     * prepare data before storing in database
     * store user data in database
     * NOTE: validation is handled by form request
     */
    public function register(RegisterRequest $request) {
        return $this->userService->registerOrFail($request);
    }
}
