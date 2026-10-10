import type { PageListResponse } from '@/ascendra-ui/lib/api/types';
import type { QueryFn, QueryParamValues } from './data-table-query.types';

/**
 * Adapts a page-based list endpoint (api-contract.md Rule 4) into a QueryFn — batch N is page N,
 * and `meta.totalPages` is a real, exact total. See createCursorQueryFn for the cursor-based
 * counterpart.
 */
export function createPageQueryFn<T>(
  runQuery: (params: QueryParamValues, page: number) => Promise<PageListResponse<T>>,
): QueryFn<T> {
  return async (params, batch) => {
    const { data, meta } = await runQuery(params, batch);
    return { data, totalBatches: meta.totalPages };
  };
}
