import React from 'react'
import {connect} from 'react-redux'
import {removeTodo} from './actions'

const Todo = (props) => {
  return (
      <div>
        <h1 key={props.index}
            onClick={() => props.dispatchRemoveTodo(removeTodo(props.index))
            }>{props.todo}</h1>
      </div>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchRemoveTodo: function (action) {
      dispatch(action);
    }
  }
};


export default connect(null, mapDispatchToProps)(Todo);