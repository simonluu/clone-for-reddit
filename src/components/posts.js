import React, { Component, PropTypes } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

export default class Posts extends Component {
	renderPosts() {
		return this.props.posts.map((post) => {
			console.log(post)
			return (
				<Row style={{ paddingTop: '5px', height: '75px', paddingLeft: '15px', paddingRight: '15px' }}>
					<Col md={1} style={{ width: '70px', padding: '0' }}>
						{post.preview ? <Image src={post.thumbnail} height="70px" width="70px" /> : <Image src='../../images/no_image.gif' height="70px" width="70px" />}
					</Col>
					<Col md={11}>
						<a href={post.url}>{post.title}</a>
						<p>Author: {post.author}</p>
					</Col>
				</Row>
			);
		});
	}
	render() {
		return (
			<div>
				{this.renderPosts()}
			</div>
		);
	}
}

Posts.propTypes = {
	posts: PropTypes.array.isRequired
}

			// <ul>
			// 	{this.props.posts.map((post, i) =>
			// 		<li key={i}>{post.title}</li>
			// 	)}
			// </ul>