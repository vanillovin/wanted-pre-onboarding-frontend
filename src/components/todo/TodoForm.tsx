import React, { FormEvent, useState } from 'react';
import { toDoAPI } from '../../apis';
import { AddTodoParams } from '../types/todo.type';

interface TodoFormProps {
  token: string;
  onAddTodo(params: AddTodoParams): void;
}

function TodoForm({ token, onAddTodo }: TodoFormProps) {
  const [todo, setTodo] = useState('');

  const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (todo.length < 4) {
      alert('4글자 이상 입력해 주세요');
      return;
    }
    // toDoAPI
    //   .createTodo(token, { todo })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.error) throw new Error(data.message);
    //     setTodo('');
    //     // setTodos((prev: any) => ({ ...prev, data: [...prev.data, data] }));
    //     alert('투두 추가 성공! ✨');
    //   })
    //   .catch((err) => {
    //     alert(`투두 추가 실패 ${err.message}`);
    //   });
  };

  return (
    <form className="flex w-full items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={handleChangeTodo}
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
