import { Model } from "./model";

export class Stock extends Model {
  name: string|undefined;

  static getInstance(data: any): Stock {
    let stock = new Stock();
    stock.name = data.name;
    stock.created_at = data.created_at;
    stock.updated_at = data.updated_at;
    stock.id = data.id;
    return stock;
  }
}
