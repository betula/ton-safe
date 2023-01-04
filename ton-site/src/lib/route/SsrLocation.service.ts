import { box, put, val } from 'remini';
import { extend } from '../extend';

export const SsrLocation = () => {
  const $url = box('');

  return extend($url, {
    setUrl(url: string) {
      put($url, url);
    },

    get pathname() {
      return val($url)
    }
  });
}
