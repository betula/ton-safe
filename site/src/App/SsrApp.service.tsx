import { provide } from 'provi/client';
import { val, wrap } from 'remini';
import { Translation } from '../lib/locale/Translation.service';
import { ActivePage } from './ActivePage.service';


export const SsrApp = () => {

  const $ready = wrap(() => {
    const readyList: boolean[] = [];

    const { page } = provide(ActivePage);
    if (page) {
      readyList.push(page.logic.ready);
    }

    readyList.push(provide(Translation).ready);

    return readyList.every(ready => ready);
  });

  // init locale
  // provide(Locale) // <-- inited inside Translation


  return {

    get ready() {
      return val($ready);
    }
  }
};
