import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import Notification from '../components/Notification';
import { getTodos, saveTodos } from '../services/TodoService';

const TodoListContainer = () => {
  const [todos, setTodos] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosFromDB = await getTodos();
      setTodos(todosFromDB);
    };

    fetchTodos();
  }, []);

  const addTodo = (newTodo) => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    showNotification(newTodo.text);
  };

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const updateTodo = (updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      {notification && <Notification message={notification} onClose={closeNotification} />}
    </div>
  );
};

export default TodoListContainer;