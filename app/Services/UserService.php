<?php

namespace App\Services;

use App\Services\Concretes\LoginImp;
use App\Services\Concretes\RegisterImp;
use App\Services\Interfaces\IUserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserService implements IUserService {

    protected LoginImp $loginImp;
    protected RegisterImp $registerImp;

    public function __construct(LoginImp $loginImp, RegisterImp $registerImp) {
        $this->loginImp = $loginImp;
        $this->registerImp = $registerImp;
    }

    public function loginOrFail(Request $request): JsonResponse {
        return $this->loginImp
            ->setRequestInputs($request)
            ->setUserByEmail()
            ->checkUserPassword()
            ->deleteUserTokens()
            ->createUserToken()
            ->prepareResponse()
            ->getResponse();
    }

    public function registerOrFail(Request $request): JsonResponse {
        return $this->registerImp
            ->setRequestInputs($request)
            ->hashInputPassword()
            ->createAndSetUser()
            ->createUserToken()
            ->prepareResponse()
            ->getResponse();
    }

}
