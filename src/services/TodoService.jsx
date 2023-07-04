import database from '../firebase';

const TODO_KEY = 'todos';

export const getTodos = async () => {
  try {
    const snapshot = await database.ref(TODO_KEY).once('value');
    const todos = snapshot.val() || [];
    return todos;
  } catch (error) {
    console.error('Error getting todos:', error);
    return [];
  }
};

export const saveTodos = async todos => {
  try {
    await database.ref(TODO_KEY).set(todos);
  } catch (error) {
    console.error('Error saving todos:', error);
  }
};