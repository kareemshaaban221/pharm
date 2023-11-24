<?php

namespace App\Http\Controllers;

use App\Http\Requests\Stock\StoreRequest;
use App\Services\StockService;

class StockController extends Controller
{

    protected StockService $stockService;

    public function __construct(StockService $stockService) {
        $this->stockService = $stockService;
    }

    public function index() {
        return $this->stockService->getAllOrFail();
    }

    public function store(StoreRequest $request) {
        return $this->stockService->storeOrFail($request);
    }

}
