import { IPaginationMeta } from 'nestjs-typeorm-paginate';

export class PaginationResponse<T> {
  items: T[];
  meta: IPaginationMeta;
}
