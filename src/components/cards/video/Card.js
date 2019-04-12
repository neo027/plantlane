import React, {Component} from 'react';

import './Card.css';

class Card extends Component {

	state = {
		width:560,
		height:370
	}

	componentDidMount() {
	    this.resize();
	    window.addEventListener('resize', this.resize);
	}

	componentWillUnmount() {
	    window.removeEventListener('resize', this.resize);
	}

	resize = () => {
		let newWidth = document.documentElement.clientWidth;
		let newHeight = 0.6 * newWidth;

		if(newWidth <= 630){
			this.setState({width:newWidth - 20, height:newHeight});
		}
	}


	render() {
		return (
			<div className="plantlane-video-card">
				<div style={{height:`${this.state.height}px`, width:`${this.state.width}px`}} className="plantlane-video-card-iframe">
					<iframe width={this.state.width} height={this.state.height} title={this.props.title} src={`https://www.youtube.com/embed/${this.props.videoId}?enablejsapi=1`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>			
				</div>
				<div className="plantlane-video-card-text">
					<h4>{this.props.title}</h4>
					<div className="plantlane-video-card-text-meta">
						<span><i className="fa fa-play"></i> {this.props.views}</span> views &nbsp;&nbsp;
						<span><i className="fa fa-thumbs-up"></i> {this.props.likes}</span> likes
					</div>
				</div>
			</div>
		);
	}
}

export default Card;