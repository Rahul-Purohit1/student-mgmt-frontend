export interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
  mark: number;
  parent_id: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
