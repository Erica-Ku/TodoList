import { useState } from 'react';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  const [editingId, setEditingId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  const handleDelete = id => {
    deleteTodo(id);
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setUpdatedText(text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setUpdatedText('');
  };

  const handleUpdate = id => {
    if (updatedText.trim() === '') {
      handleCancelEdit();
      return;
    }

    updateTodo({
      id,
      text: updatedText.trim(),
    });

    handleCancelEdit();
  };

  const handleInputChange = e => {
    setUpdatedText(e.target.value);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {editingId === todo.id ? (
            <div>
              <input
                type="text"
                value={updatedText}
                onChange={handleInputChange}
              />
              <button onClick={() => handleUpdate(todo.id)}>Update</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              {todo.text}
              <button onClick={() => handleEdit(todo.id, todo.text)}>
                Edit
              </button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;