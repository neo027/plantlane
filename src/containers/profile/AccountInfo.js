import React, {Component} from 'react';
import _ from 'lodash';

import './AccountInfo.css';

class AccountInfo extends Component {

	constructor(props){
		super(props);
	
		this.state = {
			data:{
				firstname:'',
				lastname:'',
				gender:0,
				dob:'',
				email:'',
				...props.account
			},
			changed:false,
			error:{}
		}
	}

	componentDidUpdate(prevProps){
		let shouldUpdate = false;
		for(let key in prevProps.account){
			shouldUpdate = prevProps.account[key] !== this.props.account[key];
			if(shouldUpdate){
				this.setState({data:{..._.cloneDeep(this.state.data), ..._.cloneDeep(this.props.account)}});
				break;
			}
		}
	}

	handleChange = (e) => {
		this.setState({data:{..._.cloneDeep(this.state.data), [e.target.name]:e.target.value}, changed:true, error:{..._.cloneDeep(this.state.error), [e.target.name]:''}});
	}

	cancel = () => {
		this.setState({data:{..._.cloneDeep(this.state.data), ..._.cloneDeep(this.props.account)}, changed:false, error:{}});
	}

	validate = () => {
		let {firstname, lastname} = this.state.data;
		let error = {}, hasError = false;

		if(_.isEmpty(firstname)){
			error.firstname = "is-invalid";
			hasError = true;
		}
		if(_.isEmpty(lastname)){
			error.lastname = "is-invalid";
			hasError = true;
		}

		this.setState({error});

		return hasError;

	}

	handleSubmit = (e) => {
		e.preventDefault();
		let hasError = this.validate();

		if(!hasError){
			this.setState({changed:false});
			this.props.save(this.state.data);
		}
	}

	render(){
		return (
			<div className="plantlane-account-info card p-4">
				<h4>Account Information</h4>
				<form onSubmit={this.handleSubmit}>
					  <div className="form-row">
					    <div className="form-group col-md-6">
					      <label htmlFor="firstname">First Name</label>
					      <input type="text" onChange={this.handleChange} className={"form-control " + this.state.error.firstname} name="firstname" value={this.state.data.firstname || ''} placeholder="First Name" />
					    </div>
					    <div className="form-group col-md-6">
					      <label htmlFor="lastname">Last Name</label>
					      <input type="text" onChange={this.handleChange} className={"form-control " + this.state.error.lastname} name="lastname" value={this.state.data.lastname || ''} placeholder="Last Name" />
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="email">Email</label>
					    <input type="text" className="form-control" name="email" defaultValue={this.state.data.email} placeholder="john.doe@example.com" disabled/>
					  </div>
					  <button type="submit" className="btn plantlane-btn-primary" disabled={!this.state.changed}>Save</button>
					  <button type="button" onClick={this.cancel} className="btn plantlane-btn-primary ml-2" disabled={!this.state.changed}>Cancel</button>
				</form>
			</div>
		);
	}
}

export default AccountInfo;