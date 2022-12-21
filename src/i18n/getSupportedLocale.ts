import locales from 'dayjs/locale.json';

type TDayjsLocale = {
  name: string;
  key: string;
};

// Dayjs does not support all sublocales of a language (like en-US or de-DE)
// This function returns the supported locale for a given i18next language
export const getSupportedLocale = (i18nextLanguage: string): string => {
  const localeStrings = (locales as TDayjsLocale[]).map((dayjsLocale) => dayjsLocale.key);

  if (localeStrings.includes(i18nextLanguage)) {
    return i18nextLanguage.toLocaleLowerCase();
  }

  if (i18nextLanguage.includes('-')) {
    return getSupportedLocale(i18nextLanguage.split('-')[0]).toLocaleLowerCase();
  }

  return 'en';
};
