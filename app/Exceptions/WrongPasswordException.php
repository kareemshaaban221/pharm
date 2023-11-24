<?php

namespace App\Exceptions;
use App\Facades\Response;
use Exception;
use Illuminate\Http\Request;

class WrongPasswordException extends Exception {

    public function render() {
        return Response::notAuthorized('Wrong password');
    }

}
