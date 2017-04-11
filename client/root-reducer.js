import data from './data.json';
console.log(JSON.stringify(data));
const initialState = {
  articles: data
};

const addTodo = (state, action) => {
  // creates a new state reference:todo)});
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
