import data from '../data.json';

const initialState = {
  articles: data,
  open: false
};

const toggleListItem = (state, action) => {
  // return Object.assign({}, state, {open: action.item.state.open});
  return {...state, open : action.item.state.open}  //with babel-preset-stage-2
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_NESTED_ITEM':
      return toggleListItem(state, action);
    default:
      return state
  }
}

export default rootReducer;
