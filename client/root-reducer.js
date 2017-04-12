import data from '../data.json';

const initialState = {
  articles: data,
  open: false
};

const toggleListItem = (state, action) => {
  // creates a new state reference:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  console.log(`3. In toggleListItem of reducer`);
  return Object.assign({}, state, {open: action.item.state.open});
};


function rootReducer(state = initialState, action) {
  console.log(`2. In reducer ${JSON.stringify(action)}`);
  switch (action.type) {
    case 'TOGGLE_NESTED_ITEM':
      return toggleListItem(state, action);

    default:
      return state
  }
}

export default rootReducer;
