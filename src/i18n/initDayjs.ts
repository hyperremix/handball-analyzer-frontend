import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import i18next from 'i18next';
import { getSupportedLocale } from './getSupportedLocale';

export const initDayjs = () => {
  dayjs.locale(getSupportedLocale(i18next.language));
  dayjs.extend(localizedFormat);
};
