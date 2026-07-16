import type { Locale } from '../data/site';

export function alternatePath(pathname: string, locale: Locale) {
  const target = locale === 'id' ? 'en' : 'id';
  return pathname.replace(/^\/(id|en)(?=\/|$)/, `/${target}`);
}
