import { goEvent } from './goEvent';

export const go = (path: string) => {
  history.pushState({}, '', path);
  goEvent();
};
