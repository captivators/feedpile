import React from 'react';
import {render} from 'react-dom';
import './style.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			todos: []
		};
		this.handleClick = this.handleClick.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
	}
	handleClick() {
		let todo = this.input.value;
		this.state.todos.push(todo);
   this.setState({
		 todos: this.state.todos
	}
	 )
		this.input.value = "";
	}
	deleteTodo(id) {
		console.log(`deletetodo ${JSON.stringify(id)}`);
		let newTodos = this.state.todos.filter((val, index) => id !== index);
		this.setState({
			todos: newTodos
		})
	}
	render () {
		return (
				<div>
					<input ref={(node) => this.input = node} type="text"/>
					<button onClick={this.handleClick}>Hello world 2!</button>
					{this.state.todos.map((todo, index) => <h1 key={index} onClick={() => this.deleteTodo(index)
					}>{todo}</h1>)}
				</div>
		)
	}
}
render(<App />, document.getElementById('app'));