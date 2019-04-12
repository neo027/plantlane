import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {updateUserData} from '../api/auth';


const withAddressOptions = (WrappedComponent) => {

	class Profile extends Component {

		addAddress = (address) => {
			let customer = _.cloneDeep(this.props.user);
			customer.addresses.push(address);

			return this.props.updateUserData({customer});
		}

		deleteAddress = (addressId) => {
			let customer = _.cloneDeep(this.props.user);

			let rmIdx = customer.addresses.findIndex(address => address.id === addressId);

			customer.addresses.splice(rmIdx, 1);

			return this.props.updateUserData({customer});
		}

		editAddress = (newData) => {
			let customer = _.cloneDeep(this.props.user);

			let rmIdx = customer.addresses.findIndex(address => address.id === newData.id);

			customer.addresses.splice(rmIdx, 1, newData);

			return this.props.updateUserData({customer});
		}

		editAccountInfo = (editedUserData) => {
			let customer = {..._.cloneDeep(this.props.user), ...editedUserData};
			return this.props.updateUserData({customer});
		}

		render(){
			const newProps = {
				editAddress:this.editAddress,
				deleteAddress:this.deleteAddress,
				addAddress:this.addAddress,
				editAccountInfo:this.editAccountInfo
			};

			return (
				<WrappedComponent {...this.props} {...newProps} />
			);
		}
	}

	const mapStateToProps = (state) => {
		return {
			isLoggedIn:state.auth.isLoggedIn,
			user:state.auth.user
		}
	}

	const mapDispatchToProps = {
		updateUserData
	};

	return connect(mapStateToProps, mapDispatchToProps)(Profile);
}

export default withAddressOptions;