import { batch, box, put, val } from 'remini';
import { docChan } from './docChan';
import { Doc, DocContainer } from './types';

export const initial = (id?: string): Doc => ({
  id: id || '',
  ok: 0,
  text: '',
  json: null
});

export const doc = <Json = any>(id?: string): DocContainer<Json> => {
  const $data = box(initial(id));
  const $loading = box(id ? true : false);

  const protect = (data: any) => {
    if (!data) {
      return initial(id);
    }
    return {
      id: data.id || id || '',
      ok: data.ok || 0,
      text: data.text || '',
      json: data.json || null
    }
  }

  const connect = async () => {
    if (!id) return;

    try {
      const ret = docChan(id);
      const data = 'then' in ret ? await ret : ret;

      batch(() => {
        put($loading, false);
        put($data, protect(data));
      });
    }
    catch (e) {
      put($loading, false);

      console.error(e);
      throw new Error(`Doc "${id}" error during getting`);
    }
  }

  connect();

  return {
    get text() {
      return this.data.text
    },
    get json() {
      return this.data.json
    },
    get data() {
      return val($data);
    },
    get loading() {
      return val($loading);
    },
    get ready() {
      return !this.loading;
    }
  };
}
