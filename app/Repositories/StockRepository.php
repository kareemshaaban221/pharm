<?php

namespace App\Repositories;

use App\Models\Stock;
use Illuminate\Database\Eloquent\Collection;

class StockRepository extends BaseRepository {

    public function __construct() {
        parent::__construct(Stock::class);
    }

    public function getAll(): Collection {
        return Stock::all();
    }

    public function store(array $data): Stock {
        return Stock::create($data);
    }

}
