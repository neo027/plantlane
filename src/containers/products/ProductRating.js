import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';


import './productrating.css';

class ProductRating extends Component {

	state = {
		rating:0
	}

	render(){
		let five = 0, four = 0, three = 0, two = 0, one = 0;

		let rv = null;
		for (var i = this.props.reviews.length - 1; i >= 0; i--) {
			rv = this.props.reviews[i].rating_votes[0];
			if(rv){
				switch(parseInt(rv.value)){
					case 1:
						one += 1;
						break;
					case 2:
						two += 1;
						break;
					case 3:
						three += 1;
						break;
					case 4:
						four += 1;
						break;
					case 5:
						five += 1;
						break;
					default:
						continue
				}
			}
		}

		return (
			<div className="card">
				<div className="card-header">
					REVIEWS & RATINGS
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-lg-6">
							<div className="row">
								<div className="col-sm-5 plantlane-product-page-ratings">
									<StarRatings 
									  rating={this.props.avgRating}
									  starRatedColor={'#333'}
									  starEmptyColor={'#afafaf'}
									  starHoverColor={'#000'}
									  starDimension={'24px'}
									  starSpacing={'2px'}
							          numberOfStars={5} />

							          <div className="plantlane-product-page-ratings-number">{this.props.avgRating} / 5</div>
							          <div className="plantlane-product-page-ratings-text text-muted">Based on {this.props.count} ratings</div>
								</div>

						          <div className="col-sm-7">
									<div className="row">
									  <div className="side">
									    <div>5 <i className="fa fa-star"></i></div>
									  </div>
									  <div className="middle">
									    <div className="bar-container">
									      <div style={{width:(this.props.count !== 0 ? ((five / this.props.count) * 100) : '0') + '%'}} className="bar"></div>
									    </div>
									  </div>
									  <div className="side right">
									    <div>{five}</div>
									  </div>
									  <div className="side">
									    <div>4 <i className="fa fa-star"></i></div>
									  </div>
									  <div className="middle">
									    <div className="bar-container">
									      <div style={{width:(this.props.count !== 0 ? ((four / this.props.count) * 100) : '0') + '%'}} className="bar"></div>
									    </div>
									  </div>
									  <div className="side right">
									    <div>{four}</div>
									  </div>
									  <div className="side">
									    <div>3 <i className="fa fa-star"></i></div>
									  </div>
									  <div className="middle">
									    <div className="bar-container">
									      <div style={{width:(this.props.count !== 0 ? ((three / this.props.count) * 100) : '0') + '%'}} className="bar"></div>
									    </div>
									  </div>
									  <div className="side right">
									    <div>{three}</div>
									  </div>
									  <div className="side">
									    <div>2 <i className="fa fa-star"></i></div>
									  </div>
									  <div className="middle">
									    <div className="bar-container">
									      <div style={{width:(this.props.count !== 0 ? ((two / this.props.count) * 100) : '0') + '%'}} className="bar"></div>
									    </div>
									  </div>
									  <div className="side right">
									    <div>{two}</div>
									  </div>
									  <div className="side">
									    <div>1 <i className="fa fa-star"></i></div>
									  </div>
									  <div className="middle">
									    <div className="bar-container">
									      <div style={{width:(this.props.count !== 0 ? ((one / this.props.count) * 100) : '0') + '%'}} className="bar"></div>
									    </div>
									  </div>
									  <div className="side right">
									    <div>{one}</div>
									  </div>
									</div>
						          </div>

							</div>
						</div>
						<div className="col-lg-6">
							<div className="row">
								<div className="col-sm-5 plantlane-product-page-ratings">
									<StarRatings 
									  rating={this.state.rating}
									  starRatedColor={'#333'}
									  starEmptyColor={'#afafaf'}
									  starHoverColor={'#000'}
									  starDimension={'24px'}
									  starSpacing={'2px'}
									  changeRating={(value) => this.setState({rating:value})}
							          numberOfStars={5}
							          name='rating'/>

							          <div className="plantlane-product-page-rateit my-2">Rate It</div>
							          <div className="text-muted">Have you purchased this item ?</div>
								</div>
								<div className="col-sm-7 plantlane-product-page-ratings">
									<div className="text-muted my-2">Write review and win 100 points.</div>
									<button onClick={this.props.writeReview} className="btn plantlane-bg-primary plantlane-btn-round">Write Review</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card-header">
					CUSTOMER REVIEWS
				</div>
				{
					this.props.reviews.map(review => {
						let temp = review.rating_votes[0] ? parseInt(review.rating_votes[0].value) : 0;
						return (
							<div key={review.review_id + '_review'} className="card-body border-bottom border-muted">
								<h6>{review.title}</h6>
								<div className="mb-2">
									<StarRatings 
									  rating={temp}
									  starRatedColor={'#333'}
									  starEmptyColor={'#afafaf'}
									  starHoverColor={'#000'}
									  starDimension={'18px'}
									  starSpacing={'1px'}
							          numberOfStars={5} />

							        <div className="plantlane-review-card-user-detail text-muted">&nbsp;| &nbsp;&nbsp;{review.nickname} &nbsp;&nbsp;| &nbsp;&nbsp;{review.created_at}</div>
								</div>
							    <div className="text-secondary plantlane-review-card-review">{review.detail}</div>
							</div>
						);
					})
				}
				{
					this.props.count === 0 && <div className="card-body">No reviews</div>
				}
			</div>
		);
	}
}

export default ProductRating;