const TODO_KEY = 'todos';

export const getTodos = () => {
  const todos = JSON.parse(localStorage.getItem(TODO_KEY)) || [];
  return todos;
};

export const saveTodos = todos => {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
};