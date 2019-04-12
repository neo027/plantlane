import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import _ from 'lodash';

// bootstrap imports
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.css';

// api imports
import {fetchCategories} from './api/categories';

// containers import
import Nav from './containers/nav/Nav';
import Auth from './containers/auth/Auth';
import Cart from './containers/cart/Cart';

import Footer from './components/footer/Footer';

// components import

// pages import
import Landing from './pages/landing/Landing';
import ProductList from './pages/products/ProductList';
import Product from './pages/products/Product';
import Profile from './pages/profile/Profile';
import Checkout from './pages/checkout/Checkout';
import Search from './pages/search/Search';

import Success from './pages/payment/Success';
import Failed from './pages/payment/Failed';

import Logout from './pages/logout/Logout';
import NotFound from './pages/404';
import ShopTheLook from './pages/shopthelook/ShopTheLook';

import Protected from './routes/Protected';


class App extends Component {

	componentDidMount(){
		this.props.fetchCategories();
	}

	render(){
		let navMenuItem = this.props.categories.find((category) => category.name === 'nav');
		let navItemsList = navMenuItem ? navMenuItem.children_data : [];

		const {redirectToReferrer, isLoading} = this.props;
		const { from } = this.props.location.state || { from: { pathname: "/" } }

		if (isLoading) {
			return (
				<div className="loader-wrapper">
				    <div className="loader"></div>
				</div>
			);
		}

		if (redirectToReferrer && from.pathname !== "/") {  
	        return <Redirect to={from}/>;
	    }

		return (
			<React.Fragment>
				<Nav navItemsList={navItemsList} />
				<Cart />
				<Auth />
				<Switch>
					<Route path="/" exact component={Landing} />
					<Route path="/products/category/:categoryId" exact component={ProductList} />
					<Route path="/search/:searchText" exact component={Search} />
					<Route path="/product/:urlKey" exact component={Product} />
					<Protected path="/profile" exact isLoggedIn={this.props.isLoggedIn} component={Profile} />
					<Protected path="/checkout" exact isLoggedIn={this.props.isLoggedIn} component={Checkout} />
					<Protected path="/payment/success/:txnId" exact isLoggedIn={this.props.isLoggedIn} component={Success} />
					<Protected path="/payment/failed/:txnId" exact isLoggedIn={this.props.isLoggedIn} component={Failed} />
					<Route path="/shop-the-look" exact component={ShopTheLook} />
					<Protected path="/logout" exact isLoggedIn={this.props.isLoggedIn} component={Logout} />
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		categories:state.categories,
		user:state.auth.user,
		isLoggedIn:state.auth.isLoggedIn,
		redirectToReferrer:state.auth.redirectToReferrer,
		isLoading:state.loader.isLoading
	}
}

const mapDispatchToProps = {
	fetchCategories
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));