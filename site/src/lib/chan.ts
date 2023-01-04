import { extend } from './extend';

export const chan = <Input, Output>() => {
  type Handler = (input: Input) => Output;
  type Interceptor = (input: Input, handler: Handler) => Output;

  let handler: null | Handler = null;
  let interceptor: null | Interceptor = null;

  const run = (input: Input) => {
    if (!handler) {
      throw new Error('Chan handler not defined');
    }

    if (interceptor) {
      return interceptor(input, handler);
    } else {
      return handler(input);
    }
  }

  const instance = extend(run, {
    handler: (fn: Handler) => {
      if (handler) {
        throw new Error('Chan handler already defined');
      }
      handler = fn;
      return instance;
    },
    get handled() {
      return !!handler;
    },

    interceptor(fn: Interceptor) {
      if (interceptor) {
        throw new Error('Chan interceptor already defined');
      }
      interceptor = fn;
      return instance;
    },
    get intercepted() {
      return !!interceptor;
    },
  });

  return instance;
};
