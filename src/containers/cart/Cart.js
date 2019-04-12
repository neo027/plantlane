import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import './Cart.css';

// imports
import CartItemList from '../../components/cart/CartItemList';
import WishList from '../../components/cart/WishList';
import Button from '../../components/buttons/Button';
import BackDrop from '../../components/backdrop/BackDrop';

import withCartOptions from '../../hoc/withCartOptions';


class Cart extends Component {

	render() {
		return (
			<React.Fragment>
				{this.props.show && <BackDrop onClick={this.props.hideCart} show/>}
				<div className={"plantlane-cart" + (this.props.show ? " show" : "")}>
					<div className="plantlane-cart-tab-header">
						<button onClick={this.props.hideCart} className="close px-2 plantlane-cart-close-btn" aria-label="Close">
				          <span aria-hidden="true">&times;</span> <span className="align-middle plantlane-cart-close-btn-span">CLOSE</span>
				        </button>
				        <div className="p-2">
							<span>Availability </span> <input type="text" className="form-control form-control-sm plantlane-pincode-check mx-2"/> <Button className="plantlane-pincode-check-btn">Check</Button>
				        </div>
					</div>
					<ul className="nav nav-tabs plantlane-cart-tab-controls" id="myTab" role="tablist">
					  <li className="nav-item ml-4">
					    <a className="nav-link plantlane-cart-tab active" id="my-cart-tab" data-toggle="tab" href="#my-cart" role="tab" aria-controls="my-cart" aria-selected="true">My Cart {this.props.cartItems.length > 0 && <span className="ml-1 plantlane-cart-tab-control-count">{this.props.cartItems.length}</span>}</a>
					  </li>
					  <li className="nav-item">
					    <a className="nav-link plantlane-cart-tab" id="wishlist-tab" data-toggle="tab" href="#wishlist" role="tab" aria-controls="wishlist" aria-selected="false">Wishlist {this.props.wishListItems.length > 0 && <span className="ml-1 plantlane-cart-tab-control-count">{this.props.wishListItems.length}</span>} </a>
					  </li>
					</ul>
					<div className="tab-content plantlane-cart-tab-data" id="myTabContent">
					  <CartItemList items={this.props.cartItems} addToWishList={this.props.addToWishList} removeItemFromCart={this.props.removeItemFromCart} changeItemQty={this.props.changeItemQty} />
					  <WishList items={this.props.wishListItems} removeFromWishList={this.props.removeFromWishList} changeQtyWishList={this.props.changeQtyWishList} />
					</div>
					<div className="plantlane-cart-tab-footer">
						<div className="plantlane-cart-tab-footer-container">
							<Button onClick={this.props.handleCheckout} animate capitalize className="plantlane-cart-checkout-btn">Proceed to pay securely</Button>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(withCartOptions(Cart));