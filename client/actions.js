export const toggleListItem = (item) => {
  return {type: "TOGGLE_NESTED_ITEM", item}
};

export const removeTodo = (id) => {
  return {type: "DEL_TODO", id}
};
