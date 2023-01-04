import { sync } from 'remini';
import { translation } from '../lib/locale/translation';

export const Title = () => {
  sync(() => translation.Title, (title) => {
    document.title = title;
  });

  return {
    get title() {
      return translation.Title
    }
  }
}
