import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Todo from './pages/Todo';
import NavigationBar from './components/NavigationBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <NavigationBar />
        <App />
      </>
    ),
  },
  {
    path: 'todo',
    element: (
      <>
        <NavigationBar />
        <Todo />
      </>
    ),
  },
]);

export default router;
