import { component } from 'remini/preact';
import { translation } from '../../lib/locale/translation';

export const NotFound = component(() => {

  return (
    <h1>{translation.NotFound}</h1>
  )
});
