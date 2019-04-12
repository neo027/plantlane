import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CheeseburgerMenu from 'cheeseburger-menu';
import HamburgerMenu from 'react-hamburger-menu';
import MenuContent from 'react-metismenu';

import NavBrand from '../../components/nav/items/brand/NavBrand';
// import NavBrandMobile from '../../components/nav/items/brand/NavBrandMobile';
import NavLink from '../../components/nav/items/link/NavLink';
import NavUser from '../../components/nav/items/link/NavUser';
import NavLinkMobile from '../../components/nav/items/link/NavLinkMobile';
import NavIconLink from '../../components/nav/items/link/NavIconLink';
import NavSearch from '../../components/nav/forms/NavSearch';
import NavSearchMobile from '../../components/nav/forms/NavSearchMobile';
import NavLoginButton from '../../components/nav/forms/NavLoginButton';
import NavLogout from '../../components/nav/forms/NavLogout';
import NavLogoutMobile from '../../components/nav/forms/NavLogoutMobile';


// import actions
import {setNav, setLogin, setSignup, toggleCart} from '../../actions/nav';
import {search} from '../../api/search';
// image imports
import cartImage from '../../assets/cart.png';
import loginImg from '../../assets/user-icon.png';

import './Nav.css';


class Nav extends Component {

	state = {
		drawer: document.documentElement.clientWidth > 1199 ? false : true,
		isDrawerOpen:false,
		searchResult:null
	}

	componentDidMount() {
	    this.resize();
	    window.addEventListener('resize', this.resize);
	}

	componentWillUnmount() {
	    window.removeEventListener('resize', this.resize);
	}
	
	resize = () => {
		this.setState({drawer: document.documentElement.clientWidth > 1199 ? false : true});
	}

	toggleDrawer = () => {
		this.setState({isDrawerOpen:!this.state.isDrawerOpen});
	}

	handleNav = (nav) => {
		this.toggleDrawer();
		this.props.setNav(nav);
	}

	handleLoginNav = () => {
		this.toggleDrawer();
		this.props.setLogin(true);
	}

	handleCartNav = () => {
		this.toggleDrawer();
		this.props.toggleCart();
	}

	handleMenuStateChange = (state) => {
		this.setState({isDrawerOpen:state.isOpen});
	}

	handleSearch = (e) => {
		let q = e.target.value;
		if(q.length >= 3){
			search(q).then(data => {
				let searchResult = data.result.find(res => res.code === 'product');
				if(searchResult){
					searchResult = searchResult.data;
					this.setState({searchResult});
				}
			})
			.catch(error => {});
		}
		else {
			this.setState({searchResult:null});
		}
	}

	handleOpenLogin = () => {
		this.toggleDrawer();
		this.props.setLogin();
	}

	handleOpenSignup = () => {
		this.toggleDrawer();
		this.props.setSignup();
	}

	handleToggleCart = () => {
		if(this.props.active !== 'checkout'){
			this.props.toggleCart();	
		}
	}

 	render(){

 		if(!this.state.drawer){
	 		let navLinkList = this.props.navItemsList.map(item => 
	 			<NavLink 
	 				key={'nav ' + item.name} 
	 				onClick={() => this.props.setNav(item.name)} 
	 				active={this.props.active === item.name} 
	 				subItems={item.children_data}
	 				text={item.name} to={'/products/category/' + item.id} 
	 			/>
	 		);

	 		return (
				<nav className="navbar navbar-expand-xl navbar-light plantlane-bg-light sticky-top p-0">
				  <div className="plantlane-navbar">
					  <NavBrand onClick={() => this.props.setNav('home')} />
					  <div className="collapse navbar-collapse ml-xl-1" id="navbarSupportedContent">
					  	<ul className="navbar-nav">
					    	{navLinkList}
					    	<NavLink atag onClick={() => this.props.setNav('shop-the-look')} active={this.props.active === 'shop-the-look'} text="Shop the look" to={'/shop-the-look'} />
					    	<NavSearch result={this.state.searchResult} search={this.handleSearch} />
					    	{this.props.isLoggedIn ?
				    			<NavLink 
				    				className="mt-1"
				    				onClick={() => this.props.setNav('profile')} 
				    				active={this.props.active === 'profile'} 
				    				text={'Welcome ' + this.props.user.firstname} to={'/profile'} /> :
				    					<NavLoginButton onClick={() => this.props.setLogin(true)} /> }
					    	<NavIconLink count={this.props.cartCount > 0 ? this.props.cartCount : null} onClick={this.handleToggleCart} icon={cartImage} alt={'Cart'} />
					    	{this.props.isLoggedIn && <NavLogout />}
					    </ul>
					  </div>
				  </div>
				</nav>
			);
 		}
 		else {
 			let navContent = this.props.navItemsList.map(item => {
 				let content = item.children_data.map(sub => ({
 					id: sub.name,
			        label: sub.name,
			        to: '/products/category/' + sub.id
 				}));
	 			return {
			        id: item.name,
			        label: item.name,
			        content
			    }
	 		});

 			navContent.push(
 				{
 					id: 'shop-the-look',
 					label: 'Shop the look',
 					to: '/shop-the-look'
 				}
 			);

 			return (
 				<React.Fragment>
	 				<CheeseburgerMenu
				        isOpen={this.state.isDrawerOpen}
				        closeCallback={this.toggleDrawer}>
				        {!this.props.isLoggedIn && 
				        	<div className="plantlane-navbar-mobile-auth p-2">
				        		<div onClick={this.props.setLogin} className="plantlane-text-primary">Login</div>
				        		<div onClick={this.props.setSignup} className="plantlane-text-primary">Signup</div>
				        	</div>
				        }
				        {this.props.isLoggedIn && 
				        	<NavUser 
			    				onClick={() => this.props.setNav('profile')} 
			    				text={'Welcome ' + this.props.user.firstname} to={'/profile'} />}
				        <MenuContent 
				        	content={navContent} 
				        	LinkComponent={NavLinkMobile}
				        	iconNameStateVisible="angle-up"
	  						iconNameStateHidden="angle-down" />
	  						
					    	{this.props.isLoggedIn && <NavLogoutMobile />}
					    <ul className="metismenu-item plantlane-mobile-menu-extra-section">
					    	<li><Link to="/contact-us">Contact</Link></li>
					    	<li><Link to="/shipping-policy">Shipping Policy</Link></li>
					    	<li><Link to="/return-policy">Return Policy</Link></li>
					    	<li><Link to="/tnc">Terms and conditions</Link></li>
					    	<li><Link to="/privacy-policy">Privacy Policy</Link></li>
					    </ul>
				    </CheeseburgerMenu>
				    <nav className="plantlane-navbar-mobile sticky-top p-2">
		 				<HamburgerMenu
					        isOpen={this.state.isDrawerOpen}
					        menuClicked={this.toggleDrawer}
					        width={32}
					        height={16}
					        strokeWidth={4}
					        rotate={0}
					        color="#afafaf"
					        borderRadius={10}
					        animationDuration={1}
					      />

					      <ul className="plantlane-navbar-mobile-container p-0 m-0">
						  	   <NavBrand />
						  	   {this.props.isLoggedIn ? 
						  	   		<NavIconLink onClick={() => this.props.setNav('profile')} className="plantlane-mobile-login-nav py-0 pr-2" to={'/profile'} icon={loginImg} alt={'Login'} /> : 
						  	   		<NavIconLink className="plantlane-mobile-login-nav" onClick={() => this.props.setLogin(true)} icon={loginImg} alt={'Login'} />}
						  	   <NavIconLink count={this.props.cartCount > 0 ? this.props.cartCount : null} onClick={this.props.toggleCart} icon={cartImage} alt={'Cart'} />
						  </ul>
						  <ul className="p-0 mx-3 my-2">
						  	<NavSearchMobile result={this.state.searchResult} search={this.handleSearch} />
						  </ul>
				    	
				    </nav>
			    </React.Fragment>
 			);
 		}
 	}
}

const mapStateToProps = (state) => {
	return {
		active:state.nav.active,
		isLoggedIn:state.auth.isLoggedIn,
		user:state.auth.user,
		cartCount:state.cart.length
	}
}

const mapDispatchToProps = {
	setNav,
	setLogin,
	setSignup,
	toggleCart
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav);