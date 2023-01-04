import { provide, isolate } from 'provi/client';
import render from 'preact-render-to-string';
import { App } from './App/App'
import { Doc } from './lib/doc/types';
import { docChan } from './lib/doc/docChan';
import { SsrLocation } from './lib/route/SsrLocation.service';
import { SsrCache } from './lib/doc/SsrCache.service';
import { waitTruthy } from 'remini';
import { SsrApp } from './App/SsrApp.service';
import { translation } from './lib/locale/translation';

export const main = async (
  getDoc: (id: string) => Promise<Doc>,
  url: string
) => {
  if (!docChan.handled) {
    docChan.handler(getDoc);
  }

  return await isolate(async () => {
    provide(SsrLocation).setUrl(url);

    await waitTruthy(() => provide(SsrApp).ready);

    return {
      title: translation.Title,
      app: [
        '<div id="app">',
          render(<App />),
        '</div>',
        provide(SsrCache).exportHtml(),
      ].join('')
    }
  });
}
