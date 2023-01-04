import { provide } from "provi/client";
import { box, event, on, put, val } from "remini";
import { SsrCache } from "../doc/SsrCache.service";
import { LocaleCacheKey } from "./LocaleCacheKey";

export const LocaleConfig = () => {
  const cache = provide(SsrCache);
  const $defaultCode = box(cache.has(LocaleCacheKey)
    ? cache.get(LocaleCacheKey)
    : 'en'
  );

  const setLocaleTrigger = event<string>();

  on(setLocaleTrigger, (code) => {
    put($defaultCode, code);
  });

  return {
    get defaultCode() {
      return val($defaultCode);
    },

    setLocaleTrigger
  };
};
