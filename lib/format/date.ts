import { formatDistance } from "date-fns";
import { id } from "date-fns/locale";

export const INDONESIA_LOCALE = "id-ID";
export const INDONESIA_TIME_ZONE = "Asia/Jakarta";

function toDate(value: Date | string) {
  return value instanceof Date ? value : new Date(value);
}

export function formatDateInJakarta(
  value: Date | string,
  options: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat(INDONESIA_LOCALE, {
    timeZone: INDONESIA_TIME_ZONE,
    ...options,
  }).format(toDate(value));
}

export function formatRelativeTimeFromReference(
  value: Date | string,
  referenceTime: Date | string,
) {
  return formatDistance(toDate(value), toDate(referenceTime), {
    addSuffix: true,
    locale: id,
  });
}

export function formatDayMonthLabel(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (match) {
    return `${Number(match[3])}/${Number(match[2])}`;
  }

  const date = new Date(value);
  return `${date.getUTCDate()}/${date.getUTCMonth() + 1}`;
}
