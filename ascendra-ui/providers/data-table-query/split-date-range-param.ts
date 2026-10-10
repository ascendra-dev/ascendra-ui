import type { DateRange } from 'react-day-picker';
import type { QueryParamValues } from './data-table-query.types';

/** Splits a `daterange`-type field's `DateRange` value into two ISO strings — every backend DTO expects two named bounds, never the single form-side object. */
export function splitDateRangeParam(
  params: QueryParamValues,
  field: string,
): { from?: string; to?: string } {
  const range = params[field] as DateRange | undefined;
  return { from: range?.from?.toISOString(), to: range?.to?.toISOString() };
}
