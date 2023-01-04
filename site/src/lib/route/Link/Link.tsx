import { useCallback } from 'preact/hooks';
import { go } from '../go';
import { Route } from '../route';

type Props = {
  className?: string;
  onClick?: () => void;

  route?: Route;
  href?: string;
  path?: string;

  children: any;
}

export const Link = (props: Props) => {
  const { href, route, path, children, onClick, className } = props;

  /**
   * https://github.com/molefrog/wouter/blob/2a4b5228118fc8c4a4c48342a0776bfeb9ae4ba8/index.js#L92-L120
   */

  const handleClick = useCallback(
    (event: MouseEvent) => {
      // ignores the navigation when clicked using right mouse button or
      // by holding a special modifier key: ctrl, command, win, alt, shift
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.button !== 0
      ) {
        return;
      }

      onClick && onClick();

      if (href) {
        return;
      }

      if (!event.defaultPrevented) {
        event.preventDefault();

        if (route) {
          route.go();
        }
        else if (path) {
          go(path);
        }
      }
    },
    [onClick, route, href, path]
  );

  const link = href
    ? href
    : route
      ? route.path
      : path;

  return (
    <a href={link} onClick={handleClick} className={className}>
      {children}
    </a>
  )
};
