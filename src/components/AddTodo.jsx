import { useState } from 'react';
import { push } from 'firebase/database';
import database from '../firebase';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) return;

    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };

    const todoRef = push(database.ref('todos'), newTodo);
    newTodo.id = todoRef.key;

    addTodo(newTodo);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;