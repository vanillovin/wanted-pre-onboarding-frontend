import React, { useState } from 'react';
import { toDoAPI } from '../../apis';

function TodoForm({ token, setTodos }) {
  const [todo, setTodo] = useState('');

  const onChangeString = (e) => setTodo(e.target.value);

  const handleCreateTodo = (e) => {
    e.preventDefault();
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
        onChange={onChangeString}
        className="border-b border-blue-100 outline-none p-1 flex-1"
      />
      <button type="submit" className="p-1 bg-blue-200 ml-1 rounded-md">
        추가
      </button>
    </form>
  );
}

export default TodoForm;
