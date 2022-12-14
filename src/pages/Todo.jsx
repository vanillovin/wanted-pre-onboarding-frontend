import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toDoAPI } from '../apis';
import TodoForm from '../components/todo/TodoForm';
import TodoItem from '../components/todo/TodoItem';
import { UserContext } from '../context/UserProvider';

function Todo() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [todos, setTodos] = useState({
    isLoading: true,
    data: null,
    error: null,
  });
  const { isLoading, data, error } = todos;

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    toDoAPI
      .getTodos(user)
      .then((res) => res.json())
      .then((data) => {
        console.log('getTodos data :', data);
        if (data.error) throw new Error(data.message);
        setTodos((prev) => ({
          ...prev,
          isLoading: false,
          data,
        }));
      })
      .catch((err) => {
        console.log('getTodos err :', err);
        setTodos((prev) => ({
          ...prev,
          isLoading: false,
          error: err.message,
        }));
      });
  }, [user]);

  if (error) return <div>에러 발생! {error}</div>;

  return !isLoading ? (
    <div className="">
      <TodoForm token={user} setTodos={setTodos} />
      <ul className="rounded-sm mt-2">
        {data && data.length > 0 ? (
          data.map((todo) => (
            <TodoItem key={todo.id} token={user} todo={todo} setTodos={setTodos} />
          ))
        ) : (
          <div>아직 투두가 없어요 👻</div>
        )}
      </ul>
    </div>
  ) : (
    <div>loading...</div>
  );
}

export default Todo;
