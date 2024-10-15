import { Filters } from './filters';
import { Order } from './order';

export class Criteria {
  readonly filters: Filters;
  readonly order: Order;
  readonly page?: string;
  readonly take?: string;

  constructor(filters: Filters, order: Order, page?: string, take?: string) {
    this.filters = filters;
    this.order = order;
    this.page = page;
    this.take = take;
  }

  public hasFilters(): boolean {
    return this.filters.filters.length > 0;
  }
}
