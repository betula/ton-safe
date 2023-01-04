import { ssr } from '../ssr';
import { SsrGlobalKey } from './SsrGlobalKey';

export const SsrCache = () => {
  type Cache = {
    [index: string]: any
  };

  let cache: Cache = {};

  if (!ssr) {
    cache = (window as any)[SsrGlobalKey] || cache;
  }

  return {
    set(id: string, doc: any) {
      cache[id] = doc;
    },

    has(id: string) {
      return !!cache[id];
    },

    get(id: string) {
      const doc = cache[id];
      if (!doc) {
        throw new Error(`Doc ${id} not found`);
      }
      delete cache[id];
      return doc;
    },

    exportJs() {
      return `window["${SsrGlobalKey}"]=${JSON.stringify(cache)}`;
    },

    exportHtml() {
      return `<script>${this.exportJs()}</script>`
    }
  }
};
