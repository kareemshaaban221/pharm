<?php

namespace App\Services\Concretes;
use App\Exceptions\ModelNotFoundException;
use App\Exceptions\WrongPasswordException;
use App\Facades\Response;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginImp {
    protected UserRepository $userRepository;
    protected User|NULL $user;
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

    public function setUserByEmail(): self {
        if (!$this->user = $this->userRepository->getByEmail($this->inputs['email']))
            throw new ModelNotFoundException($this->userRepository->getShortModelName());
        return $this;
    }

    public function checkUserPassword(): self {
        if (!Hash::check($this->inputs['password'], $this->user->password))
            throw new WrongPasswordException();
        return $this;
    }

    public function deleteUserTokens():self {
        $this->user->tokens()->delete();
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
        return Response::ok(data: $this->response_data);
    }
}
