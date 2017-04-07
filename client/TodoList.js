import React from 'react'
import {connect} from 'react-redux'
import Todo from './Todo'
import {addTodo} from './actions'

const TodoList = (props) => {
  let inputTodo;
  console.log(`props in TodoList ${JSON.stringify(props)}`);
  return (
      <div>
        <input ref={(node) => inputTodo = node} type="text"/>
        <button onClick={() => {
          props.dispatchAddTodo(addTodo(inputTodo.value));
          inputTodo.value = '';
        }}>Add Todo
        </button>
        {props.todosFromRedux.map((todo, index) => <Todo key={index} todo={todo} index={index}/>)}
      </div>
  )
};

const mapStateToProps = (state) => {
  console.log(`in mapStatetoProps ${JSON.stringify(state)}`);
  return {
    todosFromRedux: state.todos
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddTodo: function (action) {
      dispatch(action);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
