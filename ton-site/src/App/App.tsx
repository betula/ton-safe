import { provide } from 'provi/client';
import { component } from 'remini/preact';
import { NotFound } from '../components/NotFound/NotFound';
import { ActivePage } from './ActivePage.service';
import './global.css';

export const App = component(() => {
  const { page } = provide(ActivePage);

  if (page) {
    return <page.Component />;
  }

  return (
    <NotFound />
  )
});
