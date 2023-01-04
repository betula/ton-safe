import { provide } from "provi/client"
import { doc } from "../doc/doc"
import { Locale } from "./Locale.service"
import { scope, collect } from "unsubscriber";
import { batch, box, once, put, sync, val } from "remini";
import { DocContainer } from "../doc/types";


export const localeDoc = <Json = any>(id: string): DocContainer<Json> => {
  const locale = provide(Locale);
  const unsubs = scope();
  const dictionary = new Map();

  const $loading = box(true);
  const $loaded = box(doc());

  let stopPrevious: void | (() => void);

  const ensureLocale = (code: string) => {
    if (dictionary.has(code)) {
      stopPrevious && stopPrevious();
      put($loaded, dictionary.get(code));
      return;
    }

    const currDoc = doc(`${id}_${code}`);

    collect(unsubs!, () => {
      dictionary.set(code, currDoc);
    });

    if (currDoc.ready) {
      stopPrevious && stopPrevious();
      batch(() => {
        put($loaded, currDoc);
        put($loading, false);
      });
    } else {
      const stop = once(() => currDoc.ready, () => {
        stopPrevious && stopPrevious();
        batch(() => {
          put($loaded, currDoc);
          put($loading, false);
        });
      });
      const _stopPrevious = stopPrevious;

      stopPrevious = () => {
        stop();
        _stopPrevious && _stopPrevious();
        stopPrevious = void 0;
      };
    }
  };

  sync(() => locale.code, ensureLocale);

  return {
    get text() {
      return this.data.text
    },
    get json() {
      return this.data.json
    },
    get data() {
      return val($loaded).data;
    },
    get loading() {
      return val($loading);
    },
    get ready() {
      return !this.loading;
    }
  }
}
