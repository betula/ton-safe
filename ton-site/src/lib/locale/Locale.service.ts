import { provide } from 'provi/client';
import { box, on, put, sync, val } from 'remini';
import { SsrCache } from '../doc/SsrCache.service';
import { ssr } from '../ssr';
import { LocaleCacheKey } from './LocaleCacheKey';
import { LocaleConfig } from './LocaleConfig.service';

export const Locale = () => {
  const config = provide(LocaleConfig);

  const $code = box(config.defaultCode);

  on(config.setLocaleTrigger, (code) => {
    put($code, code);
  });

  if (ssr) {
    sync($code, (code) => {
      provide(SsrCache).set(LocaleCacheKey, code);
    });
  }

  return {
    get code() {
      return val($code);
    },

    setCode(code: string) {
      put($code, code);
    },

    get switchLocaleCode() {
      return 'en'; //this.code === 'ru' ? 'en' : 'ru';
    }
  };
}
