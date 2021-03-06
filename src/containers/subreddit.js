import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions/action';
import Posts from '../components/posts';

class Subreddit extends Component {
	constructor(props) {
		super(props);

		this.handleRefreshClick = this.handleRefreshClick.bind(this);
	}

	componentDidMount() {
		const { dispatch, selectedSubreddit } = this.props
		dispatch(fetchPostsIfNeeded(selectedSubreddit));
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.name !== undefined && nextProps.params.name !== this.props.selectedSubreddit) {
			const { dispatch, selectedSubreddit } = nextProps;
			dispatch(selectSubreddit(nextProps.params.name));
			dispatch(fetchPostsIfNeeded(nextProps.params.name));
		}
		if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
			const { dispatch, selectedSubreddit } = nextProps;
			dispatch(fetchPostsIfNeeded(selectedSubreddit));
		}
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const { dispatch, selectedSubreddit } = this.props;
		dispatch(invalidateSubreddit(selectedSubreddit));
		dispatch(fetchPostsIfNeeded(selectedSubreddit));
	}

	render() {
		const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
		return (
			<div style={{ padding: '15px' }}>
				<p>
					{lastUpdated &&
						<span>
							Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
							{' '}
						</span>
					}
					{!isFetching &&
						<a href="#" onClick={this.handleRefreshClick}>
							Refresh
						</a>
					}
				</p>
				{!isFetching && posts.length === 0 && <h2>This Subreddit is Empty</h2>}
				{posts.length > 0 && 
					<div style={{ opacity: isFetching ? 0.5 : 1}}>
						<Posts posts={posts} />
					</div>
				}
			</div>
		);
	}
}

Subreddit.propTypes = {
	selectedSubreddit: PropTypes.string.isRequired,
	posts: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { selectedSubreddit, postsBySubreddit } = state;
	const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || { isFetching: true, items: [] };
	return { selectedSubreddit, posts, isFetching, lastUpdated };
}

export default connect(mapStateToProps)(Subreddit);