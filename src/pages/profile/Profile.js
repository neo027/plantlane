import React, {Component} from 'react';

import withAddressOptions from '../../hoc/withAddressOptions';

import ManageAddress from '../../containers/profile/addresses/ManageAddress';
import AccountInfo from '../../containers/profile/AccountInfo';
import OrderHistory from '../../containers/profile/OrderHistory';


import './Profile.css';

class Profile extends Component {
	
	render(){
		return (
			<div className="plantlane-user-profile p-1 p-md-4">
				<h2 className="mb-4 text-center">Welcome {this.props.user.firstname}</h2>
				<div className="row plantlane-mobile-row">
				  <div className="col-md-4 plantlane-mobile-col">
				    <div className="list-group" id="list-tab" role="tablist">
				      <a className="list-group-item list-group-item-action active" id="list-account-list" data-toggle="list" href="#list-account" role="tab" aria-controls="account">Account Information</a>
				      <a className="list-group-item list-group-item-action" id="list-address-list" data-toggle="list" href="#list-address" role="tab" aria-controls="address">Address Book</a>
				      <a className="list-group-item list-group-item-action" id="list-orders-list" data-toggle="list" href="#list-orders" role="tab" aria-controls="address">Order History</a>
				    </div>
				  </div>
				  <div className="col-md-8 plantlane-mobile-col pt-4 pt-md-0">
				    <div className="tab-content" id="nav-tabContent">
				      <div className="tab-pane fade show active" id="list-account" role="tabpanel" aria-labelledby="list-account-list">
				      	<AccountInfo 
				      		save={this.props.editAccountInfo}
				      		account={
				      			{
				      				firstname:this.props.user.firstname, 
				      				lastname:this.props.user.lastname, 
				      				dob:this.props.user.dob, 
				      				gender:this.props.user.gender,
				      				email:this.props.user.email
				      			}
				      		} />
				      </div>
				      <div className="tab-pane fade" id="list-address" role="tabpanel" aria-labelledby="list-address-list">
				      	<ManageAddress 
				      		addresses={this.props.user.addresses} 
				      		addAddress={this.props.addAddress} 
				      		editAddress={this.props.editAddress}
				      		deleteAddress={this.props.deleteAddress}/>
				      </div>
				      <div className="tab-pane fade" id="list-orders" role="tabpanel" aria-labelledby="list-orders-list">
				      	<OrderHistory user={this.props.user} />
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		);
	}
}

export default withAddressOptions(Profile);