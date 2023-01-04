import { provide } from 'provi/client';
import { hydrate } from 'preact';
import { App } from './App/App'
import { Title } from './App/Title.service';
import { docChan } from './lib/doc/docChan';
import { docBatch } from './lib/doc/docBatch';

const main = () => {

  // create doc batch
  const batch = docBatch(async (ids: string[]) => {
    const url = new URL('/v1/document/get', String(location.origin));
    url.searchParams.append('batch', JSON.stringify(ids));

    const req = await fetch(url.href);
    return await req.json();
  });

  // attach doc handler
  docChan.handler(batch.get);

  // init title service
  provide(Title);

  // render
  hydrate(
    <App />,
    document.getElementById('app')!
  );
}

main();
