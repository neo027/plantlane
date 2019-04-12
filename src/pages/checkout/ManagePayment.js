import React, {Component} from 'react';
// import crypto from 'crypto';
// import {Redirect} from 'react-router-dom';
// import swal from 'sweetalert';
// import axios from 'axios';

import {sendPaymentInformation} from '../../api/cart';

import {random} from '../../utilities/auth';
import {removeDeliveryState} from '../../utilities/cart';

class ManagePayment extends Component {

	constructor(){
		super();
	
		this.state = {
			placed:false
		}
	}

	handlePayment = (code) => {

		let paymentInfo = {
		  "paymentMethod": {
		    "po_number": random(),
		    "method": code
		  },
		  "billingAddress": this.props.billingAddress
		}

		sendPaymentInformation(paymentInfo)
		.then(data => {
			removeDeliveryState();
			this.props.resetCart();
			this.redirectToPaymentPage(data);
		});
	}

	redirectToPaymentPage = (orderId) => {
		let txnid = random().substring(0, 20), productinfo = orderId; 
		let params = {
			'txnid': txnid,
			'firstname': this.props.user.firstname,
			'email': this.props.user.email,
			'amount': this.props.amount,
			'productinfo': productinfo,
			'phone': this.props.billingAddress.telephone
		}

		let form = document.createElement("form");
	    form.setAttribute("method", "POST");
	    form.setAttribute("action", "http://majormod.xyz/Development/plantlane-ui/payuform.php");

		for(let key in params) {
	        if(params.hasOwnProperty(key)) {
	            let hiddenField = document.createElement("input");
	            hiddenField.setAttribute("type", "hidden");
	            hiddenField.setAttribute("name", key);
	            hiddenField.setAttribute("value", params[key]);

	            form.appendChild(hiddenField);
	        }
	    }

	    document.body.appendChild(form);
	    form.submit();
	}

	render(){
		if(!this.props.show) {
			return null;
		}

		return (
			<div className="plantlane-payment-method">
				<h6 className="text-secondary mb-3">CHOOSE A PAYMENT METHOD</h6>
				<div className="plantlane-payment-method-options">
				    <div className="list-group">
				    {
				    	this.props.paymentMethods && 
				    		this.props.paymentMethods.map(method => 
					  			<button 
					  				key={method.code} 
					  				type="button" 
					  				onClick={() => this.handlePayment(method.code)}
					  				className={"list-group-item list-group-item-action"}>
					  					{method.code === 'payu' ? 'Credit / Debit Card' : method.title}
					  			</button>
				    		)
				    }
					</div>
				</div>
			</div>
		);
	}
}

export default ManagePayment;