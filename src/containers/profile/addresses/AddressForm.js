import React, {Component} from 'react';
import _ from 'lodash';

import {fetchRegionList} from '../../../api/categories';


class AddressForm extends Component {

	constructor(props){
		super(props);
	
		this.state = {
			data:{
				firstname:'',
				lastname:'',
				telephone:'',
				street:[],
				city:'',
				region:{
					region:''
				},
				postcode:'',
				country_id:'IN',
				...props.data
			},
			changed:false,
			error:{},
			regionList:[]
		}
	}

	componentDidMount(){
		fetchRegionList()
		.then(regionList => this.setState({regionList}));
	}

	handleChange = (e) => {
		this.setState({data:{..._.cloneDeep(this.state.data), [e.target.name]:e.target.value}, changed:true, error:{..._.cloneDeep(this.state.error), [e.target.name]:''}});
	}

	changeReqion = (e) => {
		let selectedRegion = this.state.regionList.find(region => region.id === e.target.value);

		if(selectedRegion){
			this.setState({data:{..._.cloneDeep(this.state.data), region:{region:selectedRegion.name, region_id:selectedRegion.id, region_code:selectedRegion.code}}, changed:true, error:{..._.cloneDeep(this.state.error), region:''}});
		}
	}

	changeAddress = (e) => {
		let street = _.cloneDeep(this.state.data.street);
		if(e.target.name === 'addressLine1'){
			street[0] = e.target.value;
		}
		else {
			street[1] = e.target.value;
		}

		this.setState({data:{..._.cloneDeep(this.state.data), street}, changed:true, error:{..._.cloneDeep(this.state.error), [e.target.name]:''}});
	}

	validate = () => {
		let {firstname, lastname, telephone, street, city, region, postcode} = this.state.data;
		let error = {};
		let hasError = false;

		if(_.isEmpty(firstname)){
			error.firstname = "is-invalid";
			hasError = true;
		}
		if(_.isEmpty(lastname)){
			error.lastname = "is-invalid";
			hasError = true;
		}
		if(_.isEmpty(telephone) || telephone.length !== 10){
			error.telephone = "is-invalid";
			hasError = true;
		}
		if(_.isEmpty(city)){
			error.city = "is-invalid";
			hasError = true;
		}
		if(_.isEmpty(region.region)){
			error.region = "is-invalid";
			hasError = true;
		}
		if(_.isEmpty(postcode) || postcode.length !== 6){
			error.postcode = "is-invalid";
			hasError = true;
		}
		if(_.isEmpty(street[0])){
			error.addressLine1 = "is-invalid";
			hasError = true;
		}
		if(_.isEmpty(street[1])){
			error.addressLine2 = "is-invalid";
			hasError = true;
		}

		this.setState({error});

		return hasError;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let hasError = this.validate();

		if(!hasError){
			this.props.submit(this.state.data)
			.then(userData => {
				this.props.cancel();
			});
		}
	}

	render(){
		let error = this.state.error;
		
		return (
			<div className="card p-md-4 p-2">
				<h4 className="mb-4">Add Address</h4>
				<form onSubmit={this.handleSubmit}>
				  <div className="form-row">
				    <div className="form-group col-md-6">
				      <label htmlFor="firstname">First Name</label>
				      <input type="text" onChange={this.handleChange} className={"form-control " + error.firstname} name="firstname" defaultValue={this.state.data.firstname} placeholder="First Name" />
				    </div>
				    <div className="form-group col-md-6">
				      <label htmlFor="lastname">Last Name</label>
				      <input type="text" onChange={this.handleChange} className={"form-control " + error.lastname} name="lastname" defaultValue={this.state.data.lastname} placeholder="Last Name" />
				    </div>
				  </div>
				  <div className="form-group">
				    <label htmlFor="telephone">Mobile Number</label>
				    <input type="text" onChange={this.handleChange} className={"form-control " + error.telephone} name="telephone" defaultValue={this.state.data.telephone} placeholder="Without country code. 10 digit" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="addressLine1">Address Line 1</label>
				    <input type="text" className={"form-control " + error.addressLine1} name="addressLine1" onChange={this.changeAddress} defaultValue={this.state.data.street[0]} placeholder="Plot No. / Flat No." />
				  </div>
				  <div className="form-group">
				    <label htmlFor="addressLine2">Address Line 2</label>
				    <input type="text" className={"form-control " + error.addressLine2} name="addressLine2" onChange={this.changeAddress} defaultValue={this.state.data.street[1]} placeholder="Area, Locality etc." />
				  </div>
				  <div className="form-row">
				    <div className="form-group col-md-4">
				      <label htmlFor="city">City</label>
				      <input type="text" onChange={this.handleChange} className={"form-control " + error.city} name="city" defaultValue={this.state.data.city} />
				    </div>
				    <div className="form-group col-md-6">
					    <label htmlFor="region">State</label>
					    <select onChange={this.changeReqion} value={this.state.data.region.region_id || ''} className={"form-control " + error.region} id="region">
					      <option>Select State</option>
					      {
					      	this.state.regionList.map(region => 
					      		<option key={region.code} value={region.id}>{region.name}</option>
					      	)
					      }
					    </select>
				    </div>
				    <div className="form-group col-md-2">
				      <label htmlFor="postcode">PinCode</label>
				      <input type="text" className={"form-control " + error.postcode} name="postcode" onChange={this.handleChange} defaultValue={this.state.data.postcode} />
				    </div>
				  </div>
				  <button type="submit" className="btn plantlane-btn-primary" disabled={!this.state.changed}>{this.props.data ? 'Save Address' : 'Add Address'}</button>
				  <button type="button" onClick={this.props.cancel} className="btn plantlane-btn-primary ml-2">Cancel</button>
				</form>
			</div>
		);
	}
}

export default AddressForm;