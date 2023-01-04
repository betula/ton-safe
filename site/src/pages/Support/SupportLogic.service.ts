import { localeDoc } from '../../lib/locale/localeDoc';

export const SupportLogic = () => {
  const doc = localeDoc('legal/support');

  return {
    doc,

    get ready() {
      return doc.ready;
    }
  }
};
