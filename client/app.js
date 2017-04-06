import React from 'react'
import {render} from 'react-dom'

class App extends React.Component {
	constructor() {
		super();
		this.state = {}
	}
	render () {
		return (
				<div>
					<h1>Hello world 2!</h1>
				</div>
		)
	}
}


render(<App />, document.getElementById('app'));
