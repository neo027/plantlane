import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import './NavIconLinkMobile.css';

class NavLinkMobile extends Component {

	onClick = (e) => {
		if (this.props.hasSubMenu) this.props.toggleSubMenu(e);
	    else {
	      this.props.activateMe({
	        newLocation: this.props.to,
	        selectedMenuLabel: this.props.label,
	      });
	      this.props.history.push(this.props.to);
	    }
	}

	render(){
		return (
			<div className={"metismenu-link" + (this.props.active ? " " + this.props.classNameActive : "") + (this.props.hasActiveChild ? " " + this.props.classNameHasActiveChild : "")} onClick={this.onClick}>
        		{this.props.children}
        	</div>
		);
	}

}

export default withRouter(NavLinkMobile);