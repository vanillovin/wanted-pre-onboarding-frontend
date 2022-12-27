import { AddTodoParams } from './components/types/todo.type';
import { AuthParams } from './components/types/auth.type';

const BASE_URL = 'https://pre-onboarding-selection-task.shop';
const AUTH_URL = `${BASE_URL}/auth`;
const TODO_URL = `${BASE_URL}/todos`;

const headers = new Headers();
headers.set('Content-Type', 'application/json');
headers.set('Access-Control-Allow-Origin', '*');
headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
headers.set('Access-Control-Allow-Credentials', 'true');
headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

export const authAPI = {
  signUp: (data: AuthParams) => {
    return fetch(`${AUTH_URL}/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  },
  signIn: (data: AuthParams) => {
    return fetch(`${AUTH_URL}/signin`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  },
};

export const toDoAPI = {
  createTodo: (token: any, data: any) => {
    headers.set('Authorization', `Bearer ${token}`);
    return fetch(`${TODO_URL}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  },
  getTodos: (token: any) => {
    headers.set('Authorization', `Bearer ${token}`);
    return fetch(`${TODO_URL}`, {
      method: 'GET',
      headers,
    });
  },
  updateTodo: (token: any, payload: any) => {
    headers.set('Authorization', `Bearer ${token}`);
    return fetch(`${TODO_URL}/${payload.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload.data),
    });
  },
  deleteTodo: (token: any, id: any) => {
    headers.set('Authorization', `Bearer ${token}`);
    return fetch(`${TODO_URL}/${id}`, {
      method: 'DELETE',
      headers,
    });
  },
};
