import { provide } from 'provi/client';
import { sync, put, wrap, val } from 'remini';
import { extend } from '../extend';
import { route } from '../route/route'
import { Locale } from './Locale.service';
import { LocaleConfig } from './LocaleConfig.service';

export const localeRoute = (path: string) => {
  const originRoute = route(
    { locale: true, optional: true, pattern: 'en' },
    path
  );

  sync(() => originRoute.active, (active) => {
    if (!active) return;
    const locale = originRoute.params.locale;
    if (!locale) return;
    provide(LocaleConfig).setLocaleTrigger(locale);
  });

  sync(() => originRoute.params.locale, (locale) => {
    const active = originRoute.active;
    if (!active) return;
    if (!locale) return;
    provide(LocaleConfig).setLocaleTrigger(locale);
  });

  const $pathGen = wrap(() => {
    return pathGenerator();
  });

  const _pathGenerator = originRoute.pathGenerator;
  const _goRoute = originRoute.go;

  function patchParams(params?: any) {
    return Object.assign({
      locale: provide(Locale).code
    }, params || {});
  }

  function pathGenerator(params?: any) {
    return _pathGenerator(patchParams(params));
  }

  function goRoute(params?: any) {
    return _goRoute(patchParams(params));
  }

  return extend(originRoute, {

    get path() {
      return val($pathGen)
    },

    go: goRoute,
    pathGenerator
  }) as typeof originRoute;
}
