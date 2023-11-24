<?php

namespace App\Services\Concretes;

use App\Facades\Response;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterImp {
    protected UserRepository $userRepository;
    protected User $user;
    protected array $inputs;
    protected string $token;
    protected array $response_data;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function setRequestInputs(Request $request): self {
        $this->inputs = $request->validated();
        return $this;
    }

    public function hashInputPassword(): self {
        $this->inputs['password'] = Hash::make($this->inputs['password']);
        return $this;
    }

    public function createAndSetUser(): self {
        $this->user = $this->userRepository->store($this->inputs);
        return $this;
    }

    public function createUserToken(): self {
        $this->token = $this->user->createToken('auth_user_token')->plainTextToken;
        return $this;
    }

    public function prepareResponse(): self {
        $this->response_data = [
            'token' => $this->token,
            'data' => $this->user
        ];
        return $this;
    }

    public function getResponse(): JsonResponse {
        return Response::created(
            data: $this->response_data,
            createdObj: $this->userRepository->getShortModelName());
    }
}
