<?php

namespace App\Services\Concretes\Stocks;

use App\Facades\Response;
use App\Models\Stock;
use App\Repositories\StockRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class StockImp {

    private StockRepository $stockRepository;
    protected Collection $stocks;
    protected Stock $stock;
    protected array $response_data;

    public function __construct(StockRepository $stockRepository) {
        $this->stockRepository = $stockRepository;
    }

    public function prepareStocks(): self {
        $this->stocks = $this->stockRepository->getAll();
        return $this;
    }

    public function prepareResponse(): self {
        $data = $this->stocks->toArray();
        $this->response_data = compact('data');
        return $this;
    }

    public function getResponse(): JsonResponse {
        return Response::ok($this->response_data);
    }

}
