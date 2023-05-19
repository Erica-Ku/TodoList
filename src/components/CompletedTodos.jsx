const CompletedTodos = ({ completedTodos, deleteTodo }) => {
    const handleDelete = id => {
      deleteTodo(id);
    };
  
    return (
      <div>
        <h2>Completed Todos</h2>
        <ul>
          {completedTodos.map(todo => (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
export default CompletedTodos;