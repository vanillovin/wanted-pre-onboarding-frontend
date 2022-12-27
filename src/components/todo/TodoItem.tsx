import { FormEvent, useState } from 'react';
import { toDoAPI } from '../../apis';
import { ITodo, DeleteTodoParams, UpdateTodoParams } from '../types/todo.type';

interface TodoItemProps {
  token: string;
  todo: ITodo;
  onUpdateTodo: (params: UpdateTodoParams) => void;
  onDeleteTodo: (params: DeleteTodoParams) => void;
}

function TodoItem({ token, todo, onDeleteTodo }: TodoItemProps) {
  const [text, setText] = useState(todo.todo);
  const [editing, setEditing] = useState(false);

  const handleDeleteTodo = () => {
    toDoAPI
      .deleteTodo(token, todo.id)
      .then(() => {
        // setTodos((prev) => ({
        //   ...prev,
        //   data: prev.data.filter((prevTodo) => prevTodo.id !== todo.id),
        // }));
        alert('투두 삭제 완료!');
      })
      .catch((err) => {
        alert(`투두 삭제 실패 ${err.message}`);
      });
  };

  const handleCompleteTodo = () => {
    toDoAPI
      .updateTodo(token, {
        id: todo.id,
        data: { todo: todo.todo, isCompleted: !todo.isCompleted },
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.message);
        // setTodos((prev) => ({
        //   ...prev,
        //   data: prev.data.map((prevTodo) =>
        //     prevTodo.id === todo.id
        //       ? { ...prevTodo, isCompleted: data.isCompleted }
        //       : prevTodo
        //   ),
        // }));
        alert(!todo.isCompleted ? '투두 완료!' : '투두 미완료!');
      })
      .catch((err) => {
        alert(`투두 업데이트 실패 ${err.message}`);
      });
  };

  const handleUpdateTodo = (e: FormEvent) => {
    e.preventDefault();
    toDoAPI
      .updateTodo(token, {
        id: todo.id,
        data: { todo: text, isCompleted: todo.isCompleted },
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.message);
        setEditing(false);
        // setTodos((prev) => ({
        //   ...prev,
        //   data: prev.data.map((prevTodo) =>
        //     prevTodo.id === todo.id ? { ...prevTodo, todo: data.todo } : prevTodo
        //   ),
        // }));
        alert('투두 업데이트 성공! 🪐');
      })
      .catch((err) => {
        alert(`투두 업데이트 실패 ${err.message}`);
      });
  };

  return (
    <li className="my-2">
      {!editing ? (
        <div className="flex items-center justify-between">
          <p className={`${todo.isCompleted ? 'line-through' : ''}`}>{todo.todo}</p>
          <div>
            <button
              onClick={() => setEditing(true)}
              className="border rounded-full w-7 h-7 text-amber-400 mr-1 hover:bg-gray-100 transition-all"
            >
              ✏
            </button>
            <button
              onClick={handleDeleteTodo}
              className="border rounded-full w-7 h-7 text-rose-400 mr-1 hover:bg-gray-100 transition-all"
            >
              ✘
            </button>
            <button
              onClick={handleCompleteTodo}
              className="border rounded-full w-7 h-7 text-emerald-400 hover:bg-gray-100 transition-all"
            >
              ✔
            </button>
          </div>
        </div>
      ) : (
        <form className="flex items-center justify-between" onSubmit={handleUpdateTodo}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border flex-1 p-1 outline-none"
          />
          <div>
            <button
              className={`rounded-sm ml-1 ${
                todo.todo === text ? 'bg-red-100' : 'bg-red-300'
              } p-1 hover:bg-opacity-70`}
              disabled={todo.todo === text}
              onClick={handleUpdateTodo}
            >
              수정
            </button>
            <button
              className="rounded-sm ml-1 bg-red-200 p-1 hover:bg-opacity-70"
              onClick={() => setEditing(false)}
            >
              취소
            </button>
          </div>
        </form>
      )}
    </li>
  );
}

export default TodoItem;
