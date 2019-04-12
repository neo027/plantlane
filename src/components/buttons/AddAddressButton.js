import React from 'react';


import './AddAddressButton.css';

const addAddressButton = (props) => {

	return (
		<div onClick={props.onClick} className="bg-white p-3 bg-white shadow-sm rounded plantlane-add-new-address-btn"><i className="fa fa-plus mr-2"></i>&nbsp;ADD NEW ADDRESS</div>
	);
}

export default addAddressButton;