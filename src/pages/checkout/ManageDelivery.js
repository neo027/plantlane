import React, {Component} from 'react';
import _ from 'lodash';

import {estimateShippingMethods, setShippingInformation} from '../../api/cart';
import {saveDeliveryState, getDeliveryState} from '../../utilities/cart';

import AddressForm from '../../containers/profile/addresses/AddressForm';
import AddressCard from '../../components/cards/address/profile/Card';

import AddAddressButton from '../../components/buttons/AddAddressButton';

import withAddressOptions from '../../hoc/withAddressOptions';

class ManageDelivery extends Component {

	constructor(props){
		super(props);

		let oldState = getDeliveryState();
		oldState = oldState ? oldState : {};
	
		this.state = {
			add:false,
			addressId:null,
			shippingAddress:null,
			selectedCarrierCode:null,
			shippingMethods:[],
			allowProceed:false,
			checkoutDetails:null,
			...oldState
		}
	}

	handleAddressSelect = (address) => {
		estimateShippingMethods(address.id)
		.then(shippingMethods => 
			this.setState({
				addressId:address.id, shippingMethods, 
				selectedCarrierCode:null, 
				allowProceed:false, 
				shippingAddress:{..._.cloneDeep(address), ...address.region}
			})
		);
	}

	handleShippingMethodSelect = (e) => {
		let selectedMethod = this.state.shippingMethods.find(method => method.carrier_code === e.target.value);

		if(selectedMethod){
			let address = {..._.cloneDeep(this.state.shippingAddress)};
			delete address.id;
			
			let shippingInfo = {
			  "addressInformation": {
			    "shipping_address": {
			    	...address,
			    },
			    "billing_address": {
			    	...address,
			    },
			    "shipping_carrier_code": selectedMethod.carrier_code,
				"shipping_method_code": selectedMethod.method_code
			  }
			}
			
			setShippingInformation(shippingInfo)
			.then(checkoutDetails => this.setState({checkoutDetails, allowProceed:true, selectedCarrierCode:selectedMethod.carrier_code}));
		}
		else {
			this.setState({allowProceed:false, selectedCarrierCode:null});
		}

	}

	handleProceedToPayment = () => {
		if(this.state.checkoutDetails){
			saveDeliveryState(this.state);
			this.props.proceedToPayments(this.state.checkoutDetails, this.state.shippingAddress);
		}
	}

	render(){
		if(!this.props.show){
			return null;
		}

		return (
			<div>
				<h6 className="text-secondary mb-4">DELIVERY & BILLING ADDRESS</h6>
				{
					(!this.state.add && (this.props.user.addresses && this.props.user.addresses.length > 0)) &&
						<React.Fragment>
							<div className="plantlane-address-card-container">
								{
									this.props.user.addresses &&
										this.props.user.addresses.map(address => 
											<AddressCard 
												selected={this.state.addressId === address.id} 
												onSelectAddress={() => this.handleAddressSelect(address)} 
												onClick={() => this.setState({addressId:address.id})}
												key={address.id} 
												telephone={address.telephone} 
												name={`${address.firstname} ${address.lastname}`} 
												address={address.street.join(' ')} 
												city={address.city} 
												state={address.region.region} 
												postcode={address.postcode} />
										)
								}
								<AddAddressButton onClick={() => this.setState({add:true})} />
							</div>
						</React.Fragment>
				}
				{
					(this.state.add || (this.props.user.addresses && this.props.user.addresses.length === 0)) &&
						<AddressForm cancel={() => this.setState({add:false})} submit={this.props.addAddress} />
				}
				{
					this.state.shippingMethods.length > 0 &&
						<div className="form-group mt-4">
						    <label htmlFor="selectShippingMethod">Choose Shipping Methods</label>
						    <select value={this.state.selectedCarrierCode || ''} onChange={this.handleShippingMethodSelect} className="form-control" id="selectShippingMethod">
						    <option>Select Shipping Method</option>
						     {
						     	this.state.shippingMethods.map(method => 
						     		<option key={method.carrier_code} value={method.carrier_code}>{method.method_title} ( &#8377; {method.price_incl_tax} )</option>
						     	)
						     }
						    </select>
						</div>
				}
				<button onClick={this.handleProceedToPayment} className="btn btn-lg btn-block plantlane-btn-primary my-4" disabled={!this.state.allowProceed}>PROCEED TO PAYMENTS</button>
			</div>
		);
	}
}

export default withAddressOptions(ManageDelivery);