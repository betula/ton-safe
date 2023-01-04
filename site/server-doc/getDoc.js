import { data } from '../data/index.js';

/**
 * @param {string} id
 */
export const getDoc = async (id) => {
  if (!id || !data[id]) {
    // throw new Error(`Doc ${id} not found`);
    // console.error(`Doc ${id} not found`);

    return {
      id,
      ok: 0,
      text: '',
      json: null
    }
  }

  return {
    id,
    ok: 1,
    text: typeof data[id] === "string" ? data[id] : '',
    json: typeof data[id] === "object" ? data[id] : null
  };
}
