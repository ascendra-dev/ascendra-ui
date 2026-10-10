/** Narrower than QueryParamValues on purpose — by the time a record reaches this function, dates/ranges are already resolved to strings, so raw Date/DateRange/string[] values shouldn't type-check here. */
export type WireParamValue = string | number | boolean | null | undefined;

/** Flattens an already backend-shaped record into query-string-safe values — drops empty/null/undefined/false, stringifies booleans. Doesn't know field names or any module's own sentinel rules (e.g. an explicit-null field that must become a literal string on the wire); callers layer those on top. */
export function serializeQueryParams(
  record: Record<string, WireParamValue>,
): Record<string, string | number> {
  const result: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(record)) {
    if (value === null || value === undefined || value === '' || value === false) continue;
    result[key] = typeof value === 'boolean' ? String(value) : value;
  }
  return result;
}
