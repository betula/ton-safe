import { provide } from 'provi/client';
import { box, on, put, val, wrap, batch, sync } from 'remini';
import { ssr } from '../ssr';
import { ActiveRoute } from './ActiveRoute.service';
import { go } from './go';
import { goEvent } from './goEvent';
import { SsrLocation } from './SsrLocation.service';

type Stringify<T> = {
  [P in keyof Omit<T, 'optional' | 'pattern'>]: string;
};

export type Route<P = any> = {
  readonly active: boolean;
  readonly path: string;
  readonly params: Stringify<P>;

  go: (params?: Partial<Stringify<P>>) => void;
  pathGenerator: (params?: Partial<Stringify<P>>) => string;
};

type RouteFunction = {
  <A>(p1: A): Route<A extends string ? {} : A>;
  <A,B>(p1: A, p2: B): Route<(A extends string ? {} : A)
    & (B extends string ? {} : B)>;
  <A,B,C>(p1: A, p2: B, p3: C): Route<(A extends string ? {} : A)
    & (B extends string ? {} : B)
    & (C extends string ? {} : C)>;
  <A,B,C,D>(p1: A, p2: B, p3: C, p4: D): Route<(A extends string ? {} : A)
    & (B extends string ? {} : B)
    & (C extends string ? {} : C)
    & (D extends string ? {} : D)>;
};

export const route: RouteFunction = (...args: any[]) => {
  let paramKeys: any[] = [];
  let pathSchema: any[] = [];

  const path = args.map(p => {
    if (typeof p === 'string') {
      p = p.replace(/^\/*(.*?)\/*$/, '$1');
      p && pathSchema.push(p);
      return p;
    }
    else {
      const keys = Object.keys(p).filter(key => ['optional', 'pattern'].indexOf(key) < 0);
      paramKeys = paramKeys.concat(keys);
      return keys
        .map(key => {
          pathSchema.push({ key });
          return `(${p.pattern || '[a-z0-9_-]+?' })${p.optional ? '?' : ''}`;
        })
        .join('');
    }
  }).filter(p => p).join('/');

  const pattern = new RegExp(`^/?${path}/?$`, 'i');

  const $active = box(test());
  const $params = box<any>(extract());

  const $pathGen = wrap(() => pathGenerator());

  if (ssr) {
    on(provide(SsrLocation), up);
  } else {
    addEventListener('popstate', up);
    on(goEvent, up);
  }

  function pathGenerator(params?: any) {
    params = Object.assign({}, val($params), params || {});

    let path = pathSchema.map(p => {
      if (typeof p === 'string') {
        return p;
      } else {
        return params[p.key];
      }
    }).filter(p => p).join('/') || '/';

    if (path.at(0) !== '/') {
      path = '/' + path;
    }

    return path;
  }

  function pathname() {
    return ssr
      ? provide(SsrLocation).pathname
      : location.pathname;
  }

  function test() {
    return pattern.test(pathname())
  }

  function extract() {
    const m = pattern.exec(pathname())
    let data: any = {};

    for (let i = 0; i < paramKeys.length; i++) {
      data[paramKeys[i]] = m && m[i + 1] || '';
    }
    return data;
  }

  function up() {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event#the_history_stack
     *
     * Note: When writing functions that process popstate event it is important to take into
     * account that properties like window.location will already reflect the state change (if it
     * affected the current URL), but document might still not. If the goal is to catch the moment
     * when the new document state is already fully in place, a zero-delay setTimeout()
     * method call should be used to effectively put its inner callback function that does the
     * processing at the end of the browser event loop: window.onpopstate = () =>
     * setTimeout(doSomeThing, 0);
     */

    if (!ssr) {
      setTimeout(() => {
        batch(() => {
          put($active, test());
          put($params, extract());
        });
      }, 0);
    } else {
      batch(() => {
        put($active, test());
        put($params, extract());
      });
    }
  }

  function routeGo(params: any) {
    go(pathGenerator(params));
  }

  const routeInstance = {
    get active() {
      return val($active)
    },
    get path() {
      return val($pathGen)
    },
    get params() {
      return val($params);
    },

    go: routeGo,
    pathGenerator,
  };

  sync($active, (active) => {
    if (active) {
      provide(ActiveRoute).setRoute(routeInstance);
    }
  });

  return routeInstance;
}
