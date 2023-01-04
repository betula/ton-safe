import { getDoc } from './getDoc.js';

/**
 * @param app {import('express').Express}
 */
export const mount = (app) => {

  app.get('/v1/document/get', async (req, res) => {
    let { id, batch } = req.query;
    if (!id && !batch) {
      return res.sendStatus(404);
    }

    if (id) {
      return res.json(await getDoc(id));
    }

    try {
      batch = JSON.parse(batch);
      if (!Array.isArray(batch)) {
        console.log('NOT arr');
        throw 'bad request';
      }
      if (batch.some(id => typeof id !== 'string')) {
        console.log('NOT str');
        throw 'bad request';
      }
    } catch {
      return res.sendStatus(400);
    }

    return res.json(await Promise.all(
      batch.map(id => getDoc(id))
    ));
  });

}
