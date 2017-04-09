import data from '../data.json';

const initialState = {
  articles: data
};

const addTodo = (state, action) => {
  // creates a new state reference:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  console.log(`3. In add todo of reducer`);
  return Object.assign({}, state, {todos: state.todos.concat(action.todo)});
};

const removeTodo = (state, action) => {
  console.log(`3. In remove todo of reducer`);
  return Object.assign({}, state, {todos: state.todos.filter((val, index) => action.id !== index)});
};

function rootReducer(state = initialState, action) {
  console.log(`2. In reducer ${JSON.stringify(action)}`);
  switch (action.type) {
    case 'ADD_TODO':
      return addTodo(state, action);
    case 'DEL_TODO':
      return removeTodo(state, action);
    default:
      return state
  }
}

export default rootReducer;
