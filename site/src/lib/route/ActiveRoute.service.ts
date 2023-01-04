import { box, put, val } from 'remini';
import { Route } from './route';

export const ActiveRoute = () => {
  const $activeRoute = box<Route | void>(void 0);

  return {
    get route() {
      return val($activeRoute);
    },

    setRoute(route: Route) {
      put($activeRoute, route);
    }
  }
};
