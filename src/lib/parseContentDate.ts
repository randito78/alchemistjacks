/**
 * Parse `YYYY-MM-DD` from front matter as a local calendar date.
 *
 * `new Date('2025-12-23')` is specified as UTC midnight, which in negative-offset
 * time zones becomes the previous evening — so `format()` can show the wrong day.
 */
export function parseContentDate(ymd: string): Date {
  const s = ymd.trim();
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (!m) {
    return new Date(s);
  }
  const y = Number(m[1]);
  const monthIndex = Number(m[2]) - 1;
  const d = Number(m[3]);
  if (
    !Number.isFinite(y) ||
    !Number.isFinite(monthIndex) ||
    !Number.isFinite(d)
  ) {
    return new Date(s);
  }
  return new Date(y, monthIndex, d);
}
