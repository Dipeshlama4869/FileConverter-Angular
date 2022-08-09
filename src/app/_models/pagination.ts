export interface Pagination {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result!: T;
    pagination!: Pagination;
}