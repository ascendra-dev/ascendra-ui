/** Narrower than QueryParamValues on purpose — by the time a record reaches this function, dates/ranges are already resolved to strings, so raw Date/DateRange/string[] values shouldn't type-check here. */
export type WireParamValue = string | number | boolean | null | undefined;

/**
 * Flattens an already backend-shaped record into query-string-safe values — drops
 * empty/null/undefined/false, stringifies booleans. Doesn't know field names or any module's own
 * sentinel rules (e.g. an explicit-null field that must become a literal string on the wire);
 * callers layer those on top.
 *
 * Generic over `T extends object` rather than typed as `Record<string, WireParamValue>` directly —
 * a plain DTO interface (every module's own query type) has no index signature, so TS would
 * reject it at a `Record<...>`-typed parameter even when every field is a WireParamValue.
 */
export function serializeQueryParams<T extends object>(record: T): Record<string, string | number> {
  const result: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(record) as [string, WireParamValue][]) {
    if (value === null || value === undefined || value === '' || value === false) continue;
    result[key] = typeof value === 'boolean' ? String(value) : value;
  }
  return result;
}
