import { provide } from 'provi/client';
import { Translation } from './Translation.service';

const createProxy = (): any => {
  return new Proxy({}, {
    get(_target, prop) {
      return (provide(Translation).translation as any)(prop);
    },
    apply(_target, _this, args) {
      return (provide(Translation).translation as any)(...args);
    }
  });
}

export const translation = createProxy();
