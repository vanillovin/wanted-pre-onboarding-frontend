import React from 'react';

function TodoItem({ todo }) {
  return (
    <li className="flex items-center justify-between my-2">
      {/* isCompleted, userId */}
      <p>{todo.todo}</p>
      <div>
        <button
          onClick={() => {}}
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
