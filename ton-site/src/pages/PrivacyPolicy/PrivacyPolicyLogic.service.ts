import { localeDoc } from '../../lib/locale/localeDoc';

export const PrivacyPolicyLogic = () => {
  const doc = localeDoc('legal/policy');

  return {
    doc,

    get ready() {
      return doc.ready;
    }
  }
};
