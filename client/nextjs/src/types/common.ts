export interface PaginationResponse {
  /** 当前页码 */
  page: number;
  /** 每页条数（固定20） */
  pagesize: number;
  /** 总条数	 */
  numResults: number;
  /** 总计分页数 */
  numPages: number;
}

export interface CostTime {}

export interface Result<T> {
  code: number;
  message: string;
  ttl: number;
  /** 信息本体 */
  data: T;
}
