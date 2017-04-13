import data from '../data.json';

const initialState = {
  articles: data,
  open: false,
  toggleListItem: ''
};

const toggleListItem = (state, action) => {
  // return Object.assign({}, state, {open: action.item.state.open});
  return {...state, toggleListItem : action.item.props.primaryText}  //with babel-preset-stage-2
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
