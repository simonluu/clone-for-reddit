import React, { Component } from 'react';

import Navigation from '../containers/navigation';

export default class App extends Component {
	render() {
		return (
			<div>
				<Navigation />
				{this.props.children}
			</div>
		);
	}
}