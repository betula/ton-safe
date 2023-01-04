import { provide } from 'provi/client';
import { chan } from '../chan';
import { ssr } from '../ssr';
import { SsrCache } from './SsrCache.service';
import { Doc } from './types';

export const docChan = chan<string, Promise<Doc> | Doc>()
  .interceptor((id, handler) => {
    const ssrCache = provide(SsrCache);

    if (ssr) {
      const ret = handler(id);
      if ('then' in ret) {
        return ret.then(doc => {
          ssrCache.set(id, doc);
          return doc;
        });
      }
      else {
        ssrCache.set(id, ret);
        return ret;
      }
    }
    else if (ssrCache.has(id)) {
      return ssrCache.get(id);
    }

    return handler(id);
  });
