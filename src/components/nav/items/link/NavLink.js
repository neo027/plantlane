import React from 'react';
import {Link} from 'react-router-dom';

import IconWithText from '../../../icons/IconWithTextNav';

import freeShippingIcon from '../../../../assets/free-shipping.png';
import easyReturnIcon from '../../../../assets/easy-returns.png';
import emiIcon from '../../../../assets/emi.png';
import freeAssemblyIcon from '../../../../assets/free-assembly.png';

import './NavLink.css';

const navLink = (props) => {

	let navDropDown = null;

	if(props.subItems && props.subItems.length > 0){
		navDropDown = (
			<div className="plantlane-dropdown-nav-content text-secondary">
				<h4>{props.text}</h4>
				<hr className="plantlane-dropdown-nav-hr text-secondary" />
				<div className="plantlane-dropdown-nav-content-links row">
					{
						props.subItems &&
							props.subItems.map(sub => 
								<Link key={sub.id} className="plantlane-capitalize plantlane-dropdown-nav-link text-secondary col-6" to={'/products/category/' + sub.id}>{sub.name}</Link>
							)
					}
				</div>
				<div className="plantlane-dropdown-nav-icons">
					<IconWithText capitalize image textStyle={{fontSize:'12px'}} iconStyles={{width:'50px', height:'50px', margin:'auto'}} icon={freeShippingIcon} text="Free shipping above rs. 999" />
					<IconWithText capitalize image textStyle={{fontSize:'12px', width:'50px', margin:'auto'}} iconStyles={{width:'50px', height:'50px', margin:'auto'}} icon={easyReturnIcon} text="Easy returns" />
					<IconWithText capitalize image textStyle={{fontSize:'12px'}} iconStyles={{width:'50px', height:'50px', margin:'auto'}} icon={emiIcon} text="No cost emi available" />
					<IconWithText capitalize image textStyle={{fontSize:'12px', width:'50px', margin:'auto'}} iconStyles={{width:'50px', height:'50px', margin:'auto'}} icon={freeAssemblyIcon} text="Free Assembly" />
				</div>
		    </div>
		);
	}

	return (
		<div className={"plantlane-dropdown-nav"}>
			<li className={"nav-item plantlane-nav-link plantlane-capitalize" + (props.className ? " " + props.className : "") + (props.active ? " active" : "")}>
		        {
		        	props.atag ? <a onClick={props.onClick} className="nav-link" href={props.to}>{props.text}</a> 
		        		: <Link onClick={props.onClick} className="nav-link" to={props.to}>{props.text}</Link> }
		    </li>
			{navDropDown}
		</div>
	);
}

export default navLink;