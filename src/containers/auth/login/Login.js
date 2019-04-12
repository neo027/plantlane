import React, { Component } from 'react';
import _ from 'lodash';

import Button from '../../../components/buttons/Button';
import SocialLogin from '../social/SocialLogin';

import './Login.css';

class Login extends Component {

	constructor(){
		super();
	
		this.state = {
			data:{
				username:'',
				password:''
			},
			error:null
		}
	}

	validate = () => {
		let {username, password} = this.state.data;

		if(_.isEmpty(username)){
			return 'Email can not be empty';
		}
		else if(_.isEmpty(password)){
			return 'Password must be atleast 8 characters.';
		}
		else {
			return null;
		}
	}

	handleChange = (e) => {
		this.setState({data:{..._.cloneDeep(this.state.data), [e.target.name]:e.target.value}});
	}

	handleSubmit = (e) => {
		e.preventDefault();

		let error = this.validate();

		if(!error){
			this.props.submit(this.state.data)
			.catch(error => {
				
			});
		}
		else {
			this.setState({error});
		}
	}

	render() {

		return (
			<div className="plantlane-login">
				<form onSubmit={this.handleSubmit} className="plantlane-login-form">
					<div className="form-group">
					    <label htmlFor="username">Email address</label>
					    <input type="username" className="form-control" onChange={this.handleChange} value={this.state.data.username} name="username" aria-describedby="emailHelp" placeholder="john.doe@example.com" />
					</div>
					<div className="form-group">
					    <label htmlFor="password">Password</label>
					    <input type="password" className="form-control" onChange={this.handleChange} value={this.state.data.password} name="password" placeholder="********" />
					</div>
					<div className="form-group text-right">
						<a className="plantlane-login-forgotpassword" href="/forgotpassword">Forgot Password?</a>
					</div>
					<Button animate className="btn-block">Login</Button>
				</form>
				<hr className="plantlane-hr-text" data-content="OR"/>
				<SocialLogin />
			</div>
		);
	}
}

export default Login;