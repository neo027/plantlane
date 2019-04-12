import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import BackDrop from '../../components/backdrop/BackDrop';
import Modal from '../../components/modal/Modal';
import Login from './login/Login';
import SignUp from './signup/SignUp';

// import actions
import {setLogin, setSignup, closeAuth} from '../../actions/nav';

// import api
import {doLogin, doRegister} from '../../api/auth';

import './Auth.css';

class Auth extends Component {

	toggle = () => {
		if(this.props.mode === 'signup'){
			this.props.setLogin(true);
		}
		else {
			this.props.setSignup(true);
		}
	}



	render() {
		let renderedForm = this.props.mode === 'signup' ? <SignUp submit={this.props.doRegister} /> : <Login submit={this.props.doLogin} />;

		if (this.props.isLoggedIn){
			return null;
		}

		return (
			<React.Fragment>
				<BackDrop show={this.props.show}/>
				<Modal style={{height:'100%'}} show={this.props.show} close={this.props.closeAuth}>
					<div className="plantlane-auth">
						<div className="plantlane-auth-left p-4">
							<h2>{this.props.mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
							<p>Get access to your Offers, Wishlist, Orders and Much more.</p>
						</div>
						<div className="plantlane-auth-right">
							{renderedForm}
							<div onClick={this.toggle} className="plantlane-auth-toggle-login-signup">{this.props.mode === 'signup' ? 'Already registered? Login here' : 'New User? Register here'}</div>
						</div>
					</div>
				</Modal>
			</React.Fragment>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		show:state.nav.authModal.show,
		mode:state.nav.authModal.mode,
		isLoggedIn:state.auth.isLoggedIn
	}
}

const mapDispatchToProps = {
	setLogin,
	setSignup,
	closeAuth,
	doLogin,
	doRegister
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);