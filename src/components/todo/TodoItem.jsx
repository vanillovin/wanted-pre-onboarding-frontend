import React from 'react';
import { toDoAPI } from '../../apis';

function TodoItem({ token, todo, setTodos }) {
  const handleDeleteTodo = () => {
    toDoAPI
      .deleteTodo(token, todo.id)
      .then(() => {
        setTodos((prev) => ({
          ...prev,
          data: prev.data.filter((prevTodo) => prevTodo.id !== todo.id),
        }));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <li className="flex items-center justify-between my-2">
      {/* isCompleted, userId */}
      <p className={`${todo.isCompleted ? 'line-through' : ''}`}>{todo.todo}</p>
      <div>
        <button
          onClick={handleDeleteTodo}
          className="border rounded-full w-7 h-7 text-rose-400 mr-1 hover:bg-gray-100 transition-all"
        >
          ✘
        </button>
        <button
          onClick={() => {}}
          className="border rounded-full w-7 h-7 text-emerald-400 hover:bg-gray-100 transition-all"
        >
          ✔
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
