import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions/action';

class SearchBar extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = { term : '' };

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(e) {
		this.setState({ term: e.target.value });
	}

	onFormSubmit(e) {
		e.preventDefault();

		this.props.dispatch(selectSubreddit(this.state.term));
		this.props.dispatch(invalidateSubreddit(this.state.term));
		this.props.dispatch(fetchPostsIfNeeded(this.state.term));
		this.context.router.push(`/${this.state.term}`);
		this.setState({ term: '' });
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className='input-group search-bar' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
				<input
					placeholder="Search for a Subreddit"
					className="form-control input-class"
					value={this.state.term}
					onChange={this.onInputChange} />
				<span className="input-group-btn">
					<button type="submit" className="btn btn-secondary">Search</button>
				</span>
			</form>
		);
	}
}

SearchBar.propTypes = {
	dispatch: PropTypes.func.isRequired
}

export default connect()(SearchBar);