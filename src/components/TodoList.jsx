const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  const handleDelete = id => {
    deleteTodo(id);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;