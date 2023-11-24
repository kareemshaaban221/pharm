<?php

namespace App\Repositories;

class BaseRepository {
    private string $model;

    public function __construct(string $model) {
        $this->model = $model;
    }

    public function getShortModelName(): string {
        return last(explode('\\', $this->model));
    }
}
