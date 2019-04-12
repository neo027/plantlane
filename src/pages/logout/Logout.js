import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {userLoggedOut} from '../../actions/auth';
import {removeToken} from '../../utilities/auth';
import {removeDeliveryState} from '../../utilities/cart';


class Logout extends Component {

	componentDidMount(){
		removeToken();
		removeDeliveryState();
		this.props.userLoggedOut();
	}

	render(){
		if(!this.props.isLoggedIn){
			return <Redirect to="/" />;
		}

		return null;
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn:state.auth.isLoggedIn
	}
}

const mapDispatchToProps = {
	userLoggedOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);