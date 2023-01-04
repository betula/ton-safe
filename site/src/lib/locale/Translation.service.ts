import { localeDoc } from './localeDoc';

export const Translation = () => {
  const doc = localeDoc('locale/translation');

  return {
    translation: (id: string) => {
      return (doc.json || {})[id] || '';
    },

    get ready() {
      return doc.ready;
    }
  }
}
