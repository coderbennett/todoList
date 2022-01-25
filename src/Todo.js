import React from 'react';

export default function Todo( { todo, toggleTodo } ) {
  function handleTodoClick() {
      toggleTodo(todo.id);
  };

  return <div >
      <label>
          <input className='todoCheckbox' type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
      </label>
      <p className='todos'>{todo.name}</p>
      <hr></hr>
  </div>;
}
