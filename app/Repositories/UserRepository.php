<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository {

    public function __construct() {
        parent::__construct(User::class);
    }

    public function getByEmail(string $email): User|NULL {
        return User::where('email', $email)->first();
    }

    public function store(array $data): User {
        return User::create($data);
    }

}
