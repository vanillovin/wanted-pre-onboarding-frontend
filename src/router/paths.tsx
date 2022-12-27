import { RouteObject } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Register from '../pages/Register';
import Todo from '../pages/Todo';

const paths: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <NavigationBar />
        <Register />
      </>
    ),
  },
  {
    path: '/todo',
    element: (
      <>
        <NavigationBar />
        <Todo />
      </>
    ),
  },
];

export default paths;
