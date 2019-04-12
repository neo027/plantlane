import React from 'react';


import './Card.css';

const card = (props) => {

	return (
	    <address onClick={props.onSelectAddress} className={"p-3 bg-white shadow-sm rounded plantlane-address-card" + (props.border ? ' border-top-0 border-left-0 border-right-0 border-bottom border-dark' : '') + (props.className ? ' ' + props.className : '')}>
			<strong>{props.name}</strong>
			{props.onSelectAddress && <input onChange={props.onSelectAddress} className="float-right" checked={props.selected} type="checkbox"/>}
			<div>{props.address}</div>
			<div>{props.city}, {props.state}, {props.postcode}</div>
			<div>Mobile: {props.telephone}</div>
			{
	      		props.onEdit && 
	        		<button onClick={props.onEdit} className="plantlane-address-card-btn">Edit</button>
	      	}
	      	{
	      		props.deleteAddress && 
	        		<button onClick={props.deleteAddress} className="plantlane-address-card-btn ml-2">Delete</button>
	      	}
		</address>
	);
}

export default card;