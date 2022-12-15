import React, { useState } from 'react';
import { toDoAPI } from '../../apis';

function TodoForm({ token, setTodos }) {
  const [todo, setTodo] = useState('');

  const onChangeTodo = (e) => setTodo(e.target.value);

  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (todo.length < 4) {
      alert('4글자 이상 입력해 주세요');
      return;
    }
    toDoAPI
      .createTodo(token, { todo })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.message);
        setTodo('');
        setTodos((prev) => ({ ...prev, data: [...prev.data, data] }));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form className="flex w-full items-center" onSubmit={handleCreateTodo}>
      <input
        type="text"
        value={todo}
        onChange={onChangeTodo}
        className={`border-b outline-none p-1 flex-1 ${
          todo.length < 4 ? 'border-blue-100' : 'border-blue-200'
        }`}
      />
      <button
        type="submit"
        disabled={todo.length < 4}
        className={`p-1 ml-1 rounded-md ${
          todo.length < 4 ? 'bg-blue-100' : 'bg-blue-200'
        }`}
      >
        추가
      </button>
    </form>
  );
}

export default TodoForm;
