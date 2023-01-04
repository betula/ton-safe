import { localeDoc } from '../../lib/locale/localeDoc';

export const HomeLogic = () => {
  const doc = localeDoc('home/bottom');
  const text = localeDoc('home/text');

  return {
    doc,
    text,

    get ready() {
      return doc.ready;
    }
  }
};
