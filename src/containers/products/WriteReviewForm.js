import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import swal from 'sweetalert';


class WriteReviewForm extends Component {

	state = {
		rating:0,
		title:'',
		detail:'',
		error:{}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]:e.target.value, error:{}});
	}

	validate = () => {
		let error = {}, {title, detail, rating} = this.state;

		if(title === null || title === undefined || title.trim() === ''){
			error.title = "is-invalid";
		}
		if(detail === null || detail === undefined || detail.trim() === ''){
			error.detail = "is-invalid";
		}
		if(rating <= 0 || rating > 5){
			error.rating = "is-invalid";
		}

		return error;
	}

	onSubmit = (e) => {
		e.preventDefault();

		let error = this.validate(), {title, detail, rating} = this.state;

		if(Object.keys(error).length > 0){
			this.setState({error});
		}
		else {
			this.props.onReviewSubmit({title, detail, rating})
			.then(() => {
				this.setState({title:'', rating:0, detail:'', error:{}});
				this.props.close();
				swal('Review Submitted', 'Your review has been submitted for approval.', 'success');
			});
		}
	}

	render(){
		let {title, detail, rating} = this.state.error;

		return (
			<form onSubmit={this.onSubmit} className="p-2 p-md-4">
				<h4>Write your review</h4>
				<div className="form-group">
				    <label htmlFor="title">Review title</label>
				    <input onChange={this.handleChange} type="text" className={"form-control " + title} id="title" name="title" value={this.state.title} />
				</div>
				<div className="form-group">
				    <label htmlFor="detail">Review detail</label>
				    <textarea onChange={this.handleChange} className={"form-control " + detail} name="detail" id="detail" rows="3" value={this.state.detail}></textarea>
				</div>
				<div className="form-group">
					<label htmlFor="starRating">Rating</label>
					<div>
						<StarRatings 
						  rating={this.state.rating}
						  starRatedColor={'#333'}
						  starEmptyColor={'#afafaf'}
						  starHoverColor={'#000'}
						  starDimension={'24px'}
						  starSpacing={'2px'}
						  changeRating={(value) => this.setState({rating:value, error:{}})}
				          numberOfStars={5}
				          name='rating'/>
				        <input type="hidden" className={"form-control " + rating} />
				        <div className="invalid-feedback">Please choose a rating.</div>
					</div>
				</div>
				<div className="plantlane-right-container">
					<button type="submit" className="btn btn-primary">Submit Review</button>
				</div>
			</form>
		);
	}
}

export default WriteReviewForm;