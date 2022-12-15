import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import UserProvider from './context/UserProvider';
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
