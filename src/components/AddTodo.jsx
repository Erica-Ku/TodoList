import { useState } from 'react';
import { push } from 'firebase/database';
import database from '../firebase';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [notification, setNotification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    const newTodo = {
      id: Date.now(),
      text,
      category,
      notification,
      completed: false,
    };

    const todoRef = push(database.ref('todos'), newTodo);
    newTodo.id = todoRef.key;

    addTodo(newTodo);
    setText('');
    setCategory('');
    setNotification(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select a category</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>

      <label>
        Enable Notification:
        <input
          type="checkbox"
          checked={notification}
          onChange={(e) => setNotification(e.target.checked)}
        />
      </label>

      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;