import { useState } from 'react';
import CompletedTodos from './CompletedTodos';
import { saveTodos } from '../services/TodoService';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  const [editingId, setEditingId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');

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
  
    const updatedTodo = {
      ...todos.find(todo => todo.id === id),
      text: updatedText.trim(),
    };
  
    const updatedTodos = todos.map(todo =>
      todo.id === id ? updatedTodo : todo
    );
  
    updateTodo(updatedTodo);
    handleCancelEdit();
    saveTodos(updatedTodos); // 수정된 todos를 저장합니다.
  };

  const handleInputChange = e => {
    setInputText(e.target.value);
    setUpdatedText(e.target.value);
  };

  const handleComplete = id => {
    const completedTodo = todos.find(todo => todo.id === id);
    const updatedTodo = {
      ...completedTodo,
      completed: true,
    };
  
    const updatedTodos = todos.map(todo =>
      todo.id === id ? updatedTodo : todo
    );
  
    updateTodo(updatedTodo);
    saveTodos(updatedTodos); // 수정된 todos를 저장합니다.
  };

  const handleFilterChange = filter => {
    setFilter(filter);
  };

  const filteredTodos = filter === 'completed' ? todos.filter(todo => todo.completed) :
    filter === 'active' ? todos.filter(todo => !todo.completed) : todos;

  return (
    <div>
      <div>
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('active')}>Active</button>
        <button onClick={() => handleFilterChange('completed')}>Completed</button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
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
      <CompletedTodos completedTodos={todos.filter(todo => todo.completed)} deleteTodo={deleteTodo} />
    </div>
  );
};

export default TodoList;