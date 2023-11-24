<?php

namespace App\Services\Concretes\Stocks;
use App\Facades\Response;
use App\Models\Stock;
use App\Repositories\StockRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StoreStockImp {

    private StockRepository $stockRepository;
    protected array $inputs;
    protected Stock $stock;
    protected array $response_data;

    public function __construct(StockRepository $stockRepository) {
        $this->stockRepository = $stockRepository;
    }

    public function setRequestInputs(Request $request): self {
        $this->inputs = $request->validated();
        return $this;
    }

    public function createAndSetStock(): self {
        $this->stock = $this->stockRepository->store($this->inputs);
        return $this;
    }

    public function prepareResponse(): self {
        $data = $this->stock;
        $this->response_data = compact('data');
        return $this;
    }

    public function getResponse(): JsonResponse {
        return Response::created(
            data: $this->response_data,
            createdObj: $this->stockRepository->getShortModelName());
    }

}
