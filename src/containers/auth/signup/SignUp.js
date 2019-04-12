import React, { Component } from 'react';
import _ from 'lodash';

import Button from '../../../components/buttons/Button';

import './SignUp.css';

class SignUp extends Component {

	constructor(){
		super();
	
		this.state = {
			data:{
				customer:{
					firstname:'',
					lastname:'',
					email:''
				},
				password:''
			},
			error:null
		}
	}

	validate = () => {
		let {customer, password} = this.state.data;

		if(_.isEmpty(customer.firstname)){
			return 'First Name can not be empty';
		}
		else if(_.isEmpty(customer.lastname)){
			return 'Last Name can not be empty';
		}
		else if(_.isEmpty(customer.email)){
			return 'Email can not be empty';
		}
		else if(_.isEmpty(password)){
			return 'Password must be atleast 8 characters.';
		}
		else {
			return null;
		}
	}

	handlePasswordChange = (e) => {
		this.setState({data:{..._.cloneDeep(this.state.data), password:e.target.value}});
	}

	handleChange = (e) => {
		this.setState({data:{..._.cloneDeep(this.state.data), customer:{..._.cloneDeep(this.state.data.customer), [e.target.name]:e.target.value}}});
	}

	handleSubmit = (e) => {
		e.preventDefault();

		let error = this.validate();

		if(!error){
			this.props.submit(this.state.data)
			.catch(error => {
				console.log(error);
			});
		}
		else {
			this.setState({error});
		}
	}

	render() {
		return (
			<div className="plantlane-signup">
				<form onSubmit={this.handleSubmit} className="plantlane-signup-form">
					<div className="form-row">
					    <div className="form-group col-sm-6">
					      <label htmlFor="firstName">First Name</label>
					      <input onChange={this.handleChange} type="text" className="form-control" name="firstname" placeholder="John" />
					    </div>
					    <div className="form-group col-sm-6">
					      <label htmlFor="lastName">Last Name</label>
					      <input onChange={this.handleChange} type="text" className="form-control" name="lastname" placeholder="Doe" />
					    </div>
					</div>
					<div className="form-group">
					    <label htmlFor="email">Email</label>
					    <input onChange={this.handleChange} type="email" className="form-control" name="email" placeholder="john.doe@example.com" />
					</div>
					<div className="form-group">
					    <label htmlFor="password">Password</label>
					    <input onChange={this.handlePasswordChange} type="password" className="form-control" name="password" placeholder="********" />
					</div>
					<div className="plantlane-signup-form-tnc">By continuing you agree to our <a href="#tnc">Terms of Use</a> and <a href="#privacy-policy">Privacy Policy</a>.</div>
					<Button animate className="btn-block">Register</Button>
				</form>
			</div>
		);
	}
}

export default SignUp;