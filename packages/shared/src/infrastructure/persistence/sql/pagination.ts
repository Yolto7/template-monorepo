export interface Pagination {
  page: number;
  limit: number;
  offset?: number;
}

export function sqlPaginationResolver(page?: string, take?: string): Pagination {
  const pagination: Pagination = {
    page: 1,
    limit: 50,
  };

  if (take) {
    const newTake = Number(take);
    newTake > 0 && (pagination.limit = newTake);
    newTake > 1000 && (pagination.limit = 1000);
  }

  if (page) {
    const newPage = Number(page);
    if (newPage > 1) {
      pagination.page = newPage;
      pagination.offset = (newPage - 1) * pagination.limit;
    }
  }

  return pagination;
}
