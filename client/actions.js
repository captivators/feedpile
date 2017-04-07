export const addTodo = (todo) => {
  return {type: "ADD_TODO", todo}
};

export const removeTodo = (id) => {
  return {type: "DEL_TODO", id}
};
