import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

import SearchBar from './search_bar';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions/action';

const nav_items = ['All', 'AskReddit', 'Funny', 'TodayILearned', 'Gaming', 'Television', 'Movies', 'LeagueOfLegends', 'Hearthstone', 'Overwatch']

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	render_nav_items() {
		return nav_items.map((item) => {
			return (
				<NavItem>
					<Link
						className='navItem'
						to={`/cloneforreddit/${item.toLowerCase()}`}
						activeStyle={{ color : 'red', textDecoration : 'none' }}
						onClick={() => {this.handleChange(item)}}>
						{item}
					</Link>
				</NavItem>
			);
		});
	}

	handleChange(nextSubreddit) {
		this.props.dispatch(selectSubreddit(nextSubreddit));
		this.props.dispatch(invalidateSubreddit(nextSubreddit));
		this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
	}

	render() {
		return (
			<div>
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to='/cloneforreddit' onClick={() => {this.handleChange('')}}>Clone for Reddit</Link>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav style={{ width: '88vw' }}>
						{this.render_nav_items()}
						<SearchBar />
					</Nav>
				</Navbar>
			</div>
		);
	}
}

Navigation.propTypes = {
	dispatch: PropTypes.func.isRequired
}

export default connect()(Navigation);