import React, {Component} from 'react';


import Address from '../../../components/cards/address/profile/Card';
import AddressForm from './AddressForm';

import './ManageAddress.css';

class ManageAddress extends Component {

	constructor(props){
		super(props);
	
		this.state = {
			mode:null,
			editData:null
		}
	}

	openAddressEditMode = (address) => {
		this.setState({mode:'edit', editData:{...address}});
	}

	render(){
		return (
			<div className="plantlane-address-book">
				{
					(this.state.mode === 'add' || (this.props.addresses && this.props.addresses.length <= 0)) ?
						<AddressForm cancel={() => this.setState({mode:null, editData:null})} submit={this.props.addAddress}/>
					:
					this.state.mode === 'edit' && this.state.editData !== null ?
						<AddressForm cancel={() => this.setState({mode:null, editData:null})} data={this.state.editData} submit={this.props.editAddress}/>
					:
						<React.Fragment>
							<h4 className="ml-1">Address Book</h4>
							<button onClick={() => this.setState({mode:'add'})} className="btn btn-sm plantlane-btn-primary ml-1">Add New Address</button>
							<div className="plantlane-address-card-container py-0 py-md-4 px-1">
								{
									this.props.addresses &&
									this.props.addresses.map(address => 
										<Address 
											key={address.id}
											deleteAddress={() => this.props.deleteAddress(address.id)}
											onEdit={() => this.openAddressEditMode(address)}
											telephone={address.telephone}
											name={`${address.firstname} ${address.lastname}`} 
											address={address.street.join(' ')} 
											city={address.city} 
											state={address.region.region} 
											postcode={address.postcode} />
									)
								}
							</div>
						</React.Fragment>
				}
			</div>
		);
	}
}

export default ManageAddress;