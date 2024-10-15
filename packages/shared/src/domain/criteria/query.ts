export interface QueryPage {
  page?: string;
  take?: string;
}

export interface QueryInput extends QueryPage {
  filters: Array<Map<string, string>>;
  orderBy?: string;
  orderType?: string;
  isTotal?: boolean;
}

export class Query {
  readonly filters: Array<Map<string, string>>;
  readonly orderBy?: string;
  readonly orderType?: string;
  readonly page?: string;
  readonly take?: string;
  readonly isTotal: boolean;

  constructor(
    filters: Array<Map<string, string>>,
    orderBy?: string,
    orderType?: string,
    page?: string,
    take?: string,
    isTotal?: boolean
  ) {
    this.filters = filters;
    this.orderBy = orderBy;
    this.orderType = orderType;
    this.page = page;
    this.take = take;
    this.isTotal = isTotal || false;
  }
}
