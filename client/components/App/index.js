import React from 'react';
import {Provider} from 'react-redux';
import { Link } from 'react-router-dom';

import store from '../../store';
import TodoList from '../TodoList';

import './style.css';

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <div>
            <div><Link to="/">Home</Link></div>
            <div><Link to="/about">About</Link></div>
            <div><Link to="/missing">Not Working</Link></div>
            <hr />
            <TodoList />
          </div>
        </Provider>
    );
  }
}

export default App;