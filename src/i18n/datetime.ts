import dayjs from 'dayjs';
import i18next from 'i18next';
import { getSupportedLocale } from './getSupportedLocale';

export const getDateInFormat = (
  date: string | number | Date | dayjs.Dayjs,
  format: string = 'LL',
  locale: string = i18next.language,
): string => {
  const supportedLocale = getSupportedLocale(locale);
  return dayjs(date).locale(supportedLocale).format(format);
};
