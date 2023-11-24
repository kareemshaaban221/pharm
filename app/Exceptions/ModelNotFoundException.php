<?php

namespace App\Exceptions;

use App\Facades\Response;
use Exception;

class ModelNotFoundException extends Exception {

    protected string $model;

    public function __construct(string $model) {
        $this->model = $model;
    }

    public function render() {
        return Response::notFound(obj: $this->model);
    }

}
