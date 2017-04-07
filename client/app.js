import React from 'react';
import {render} from 'react-dom';
import './style.css';
import store from './store'
import {Provider} from 'react-redux'
import TodoList from './TodoList'

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <div>
            <TodoList />
          </div>
        </Provider>
    )
  }
}
render(<App />, document.getElementById('app'));