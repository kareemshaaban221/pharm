<?php

namespace App\Services;

use App\Services\Concretes\Stocks\StockImp;
use App\Services\Concretes\Stocks\StoreStockImp;
use Illuminate\Http\Request;

class StockService {

    protected StockImp $stockImp;
    protected StoreStockImp $storeStockImp;

    public function __construct(StockImp $stockImp, StoreStockImp $storeStockImp) {
        $this->stockImp = $stockImp;
        $this->storeStockImp = $storeStockImp;
    }

    public function getAllOrFail() {
        return $this->stockImp
            ->prepareStocks()
            ->prepareResponse()
            ->getResponse();
    }

    public function storeOrFail(Request $request) {
        return $this->storeStockImp
            ->setRequestInputs($request)
            ->createAndSetStock()
            ->prepareResponse()
            ->getResponse();
    }

}
