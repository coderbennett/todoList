import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4} from 'uuid';
import './style.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }
  
  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <> 
      <div className="notepad">
        <h1>TODO List</h1>
        <TodoList className='todoList' todos={todos} toggleTodo={toggleTodo} />
        <input className="inputField" ref={todoNameRef} type="text" />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearTodos}>Clear Complete</button>
        <div className="todosLeft"><strong>{todos.filter(todo => !todo.complete).length}</strong> {(todos.filter(todo => !todo.complete).length === 1) ? 'task' : 'tasks'} left to do</div>
      </div>
        <p className="bottomAttribute"><small>Made by <a href="https://coderbennett.github.io/joeybennett-portfolio/">Joey</a></small></p>
    </>
  );
}

export default App;
