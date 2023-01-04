import { localeDoc } from '../../lib/locale/localeDoc';

export const TermsOfUseLogic = () => {
  const doc = localeDoc('legal/terms');

  return {
    doc,

    get ready() {
      return doc.ready;
    }
  }
};
