import { useState } from 'react';
import CompletedTodos from './CompletedTodos';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  const [editingId, setEditingId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [inputText, setInputText] = useState('');

  const handleDelete = id => {
    deleteTodo(id);
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setUpdatedText(text);
    setInputText(text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setUpdatedText('');
    setInputText('');
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

  const handleComplete = id => {
    const completedTodo = todos.find(todo => todo.id === id);
    const updatedTodo = {
      ...completedTodo,
      completed: true,
    };

    updateTodo(updatedTodo);
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div>
      <ul>
        {activeTodos.map(todo => (
          <li key={todo.id} className={editingId === todo.id ? 'editing' : ''}>
            {editingId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                />
                <button onClick={() => handleUpdate(todo.id)}>Update</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{todo.text}</span>
                {!todo.completed && (
                  <>
                    <button onClick={() => handleEdit(todo.id, todo.text)}>
                      Edit
                    </button>
                    <button onClick={() => handleComplete(todo.id)}>
                      Complete
                    </button>
                  </>
                )}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <CompletedTodos completedTodos={completedTodos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default TodoList;