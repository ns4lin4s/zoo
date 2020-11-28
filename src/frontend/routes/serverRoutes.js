import Home from '../containers/Home';
import Register from '../containers/Register';
import Drop from '../containers/Drop';

const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/agregar',
    component: Register,
  },
  {
    exact: true,
    path: '/eliminar',
    component: Drop,
  },
];

export default routes;
