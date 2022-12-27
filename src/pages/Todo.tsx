import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toDoAPI } from '../apis';
import TodoForm from '../components/todo/TodoForm';
import TodoItem from '../components/todo/TodoItem';
import { ITodo } from '../components/types/todo.type';
import useUser from '../hooks/useUser';

interface ITodoState {
  loading: boolean;
  todos: ITodo[];
  error: string | null;
}

function Todo() {
  const navigate = useNavigate();
  const {
    user: { token },
  } = useUser();

  const [todo, setTodo] = useState<ITodoState>({
    loading: true,
    todos: [],
    error: null,
  });
  const { loading, todos, error } = todo;

  const onSetTodos = (todos: ITodo[]) =>
    setTodo((prev) => ({
      ...prev,
      todos,
    }));

  useEffect(() => {
    if (!token) navigate('/');
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      toDoAPI
        .getTodos(token)
        .then((res) => res.json())
        .then((data) => {
          // console.log('getTodos data :', data);
          if (data.error) throw new Error(data.message);
          setTodo((prev) => ({
            ...prev,
            isLoading: false,
            data,
          }));
        })
        .catch((err) => {
          // console.log('getTodos err :', err);
          setTodo((prev) => ({
            ...prev,
            isLoading: false,
            error: err.message,
          }));
        });
    }
  }, [token]);

  if (error) return <div>에러 발생! {error}</div>;

  return !loading ? (
    <div className="border w-96 p-3 rounded-md">
      <TodoForm token={token as string} onAddTodo={() => {}} />
      <ul className="rounded-sm mt-2">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              token={token as string}
              todo={todo}
              onUpdateTodo={() => {}}
              onDeleteTodo={() => {}}
            />
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
