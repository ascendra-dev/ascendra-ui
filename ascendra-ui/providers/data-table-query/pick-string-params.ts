import type { QueryParamValues } from './data-table-query.types';

/** Picks named fields off a confirmed param bag, keeping only non-empty strings — an unset/cleared field is `''`, not `undefined`, and should drop out rather than become a literal empty-string filter. */
export function pickStringParams<K extends string>(
  params: QueryParamValues,
  keys: readonly K[],
): Partial<Record<K, string>> {
  const result: Partial<Record<K, string>> = {};
  for (const key of keys) {
    const value = params[key];
    if (typeof value === 'string' && value.length > 0) result[key] = value;
  }
  return result;
}
