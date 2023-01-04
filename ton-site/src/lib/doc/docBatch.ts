import { initial } from "./doc";
import { Doc } from "./types";

type Line = {
  id: string;
  ok: (doc: Doc) => void;
  fail: () => void
}

export const docBatch = (fn: (ids: string[]) => Promise<Doc[]>) => {

  let batchQueue: Line[] = [];
  let tid: any = 0;

  const startTick = () => {
    if (tid) return;
    tid = setTimeout(finishTick);
  }

  const finishTick = () => {
    if (!tid) return;
    clearTimeout(tid);
    tid = 0;
    run();
  }

  const toLine = async (id: string) => {
    if (!tid) startTick();

    let done: (doc: Doc) => void = () => {};
    let promise = new Promise<Doc>(resolve => {
      done = resolve;
    })
    batchQueue.push({
      id,
      ok: done,
      fail: () => done(initial(id))
    });

    return promise;
  }

  const run = async () => {
    const queue = batchQueue;
    batchQueue = [];

    const query = queue.map((line) => line.id);

    const docs = await fn(query);

    let docsMap = new Map();
    docs.forEach((doc) => {
      docsMap.set(doc.id, doc);
    });

    queue.forEach((line) => {
      if (!docsMap.has(line.id)) {
        return line.fail();
      }
      line.ok(docsMap.get(line.id));
    });
  }

  return {
    get: toLine
  }
};
