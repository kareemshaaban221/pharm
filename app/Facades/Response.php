<?php

namespace App\Facades;
use Illuminate\Support\Facades\Facade;

/**
 * @see \App\Http\Helpers\Response
 */
class Response extends Facade {
    protected static function getFacadeAccessor() {
        return 'myResponse';
    }
}
