import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import {addCouponCodeToCart, fetchCartTotalAmount, 
	removeCouponFromCart, addToUserCart, addToGuestCart, fetchUserQuoteId, fetchGuestQuoteId} from '../../api/cart';
import {fetchProduct} from '../../api/products';

import swal from 'sweetalert';

import config from '../../config/config';

import withCartOptions from '../../hoc/withCartOptions';

import OrderSummary from './OrderSummary';
import ManageDelivery from './ManageDelivery';
import ManagePayment from './ManagePayment';

import './Checkout.css';

class Checkout extends Component {

	constructor(){
		super();
	
		this.state = {
			step:1,
			couponCode:'',
			isCouponValid:false,
			isCouponChecked:false,
			totalSegments:[],
			grandTotal:0,
			paymentMethods:[],
			shippingAddress:{},
			availableFreeGiftOptions:[],
			totalAvailableFreeGiftOptions:[],
			isLoading:false,
			error:false
		}
	}

	componentDidMount(){
		if(this.props.isLoggedIn && this.props.cartItems.length > 0){
			this.checkCartTotal();
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.isLoggedIn !== this.props.isLoggedIn && this.props.isLoggedIn && this.props.cartItems.length > 0){
			this.checkCartTotal();
		}

		if(prevProps.isLoggedIn === this.props.isLoggedIn && this.props.isLoggedIn && this.props.cartItems.length !== prevProps.cartItems.length && this.props.cartItems.length > 0){
			this.checkCartTotal();
		}
	}

	handleFreeGifts = async () => {
		
		let totalAvailableFreeGiftOptions = await Promise.all(this.props.cartItems.map(async product => {
			if(product.metadata && product.metadata.custom_attributes){
				let isFreeGiftAvailable = product.metadata.custom_attributes.find(attr => attr.attribute_code === 'free_gift_option');
				if(isFreeGiftAvailable && parseInt(isFreeGiftAvailable.value) === 1){
					let freeGiftProducts = product.metadata.custom_attributes.find(attr => attr.attribute_code === 'free_gift_sku');
					freeGiftProducts = freeGiftProducts.value.split(',');

					let freeGiftMinPrice = product.metadata.custom_attributes.find(attr => attr.attribute_code === 'min_cart_price');
					freeGiftMinPrice = freeGiftMinPrice.value;

					let products = await Promise.all(freeGiftProducts.map(prodSKU => fetchProduct(prodSKU).catch(err => {})))
					.then(products => products.filter(prod => !!prod));

					if(this.state.grandTotal >= parseInt(freeGiftMinPrice)){
						return {freeGiftAvailable:true, products, freeGiftFor:product.sku, freeGiftForName:product.name, freeGiftMinPrice};
					}
					else {
						return false;
					}

				}
			}
		}))

		totalAvailableFreeGiftOptions = totalAvailableFreeGiftOptions.filter(fgOption => !!fgOption);

		
		let freeGiftAdded = [];

		this.props.cartItems.forEach(item => {
			let isFreeGift = item.metadata.custom_attributes.find(attr => attr.attribute_code === 'free_gift_product')
			if(isFreeGift && isFreeGift.value === "1"){
				freeGiftAdded.push(item);
			}
		});

		let freeGiftAddedSku = freeGiftAdded.map(item => item.sku);
		let availableFreeGiftOptions = totalAvailableFreeGiftOptions.filter(fgOption => fgOption.products.findIndex(product => freeGiftAddedSku.includes(product.sku)) === -1);

		this.adjustCartForFreeGift(freeGiftAdded, availableFreeGiftOptions, totalAvailableFreeGiftOptions);
	}

	adjustCartForFreeGift = async (freeGiftAdded, availableFreeGiftOptions, totalAvailableFreeGiftOptions) => {
		if(freeGiftAdded.length === 0){
			this.setState({availableFreeGiftOptions, totalAvailableFreeGiftOptions, isLoading:false});
			return;
		}
		else {
			if(totalAvailableFreeGiftOptions.length === 0 || freeGiftAdded.length > totalAvailableFreeGiftOptions.length){
				await Promise.all(freeGiftAdded.map(product => this.props.removeItemFromCart(product.id)));
				this.setState({availableFreeGiftOptions:totalAvailableFreeGiftOptions, totalAvailableFreeGiftOptions, isLoading:false});
				return;
			}
			else {
				let availableFreeGiftOptionsFor = availableFreeGiftOptions.map(item => item.freeGiftFor);
				let shouldBeAdded = totalAvailableFreeGiftOptions.filter(fgOption => !availableFreeGiftOptionsFor.includes(fgOption.freeGiftFor))
					.map(item => item.products)
					.reduce((arr, curr) => arr.concat(curr), [])
					.map(item => item.sku);
				
				let shouldBeRemoved = freeGiftAdded.filter(addedGift => !shouldBeAdded.includes(addedGift.sku));
				await Promise.all(shouldBeRemoved.map(product => this.props.removeItemFromCart(product.id)));
				this.setState({availableFreeGiftOptions, totalAvailableFreeGiftOptions, isLoading:false})
				return;
			}
		}
	}

	checkCartTotal = (updateCoupon) => {
		this.setState({isLoading:true});
		return fetchCartTotalAmount()
		.then(totals => {
			let newState = {totalSegments:totals.total_segments, grandTotal:totals.grand_total};

			if(totals.coupon_code){
				newState.isCouponChecked = true;
				newState.isCouponValid = true;
			}

			if(!updateCoupon){
				newState.couponCode = totals.coupon_code;
			}

			this.setState(newState);
		})
		.then(() => this.handleFreeGifts())
		.catch(error => {
			this.setState({isLoading:false, error:true})
		});
	}

	handleCouponCodeInput = (e) => {
		if(this.state.isCouponChecked){
			removeCouponFromCart().then(() => this.checkCartTotal(true));
		}

		this.setState({couponCode:e.target.value, isCouponChecked:false, isCouponValid:false});
	}

	handleClaimGift = (product, freeGiftFor) => {
		let promise = null;
		this.setState({isLoading:true});
		if(this.props.isLoggedIn){
			promise = fetchUserQuoteId()
			.then(quote_id => addToUserCart({
				cart_item:{
					sku:product.sku,
					qty:1,
					quote_id
				}
			}));
		}
		else {
			promise = fetchGuestQuoteId()
			.then(quote_id => addToGuestCart({
				cart_item:{
					sku:product.sku,
					qty:1,
					quote_id
				}
			}));
		}

		if(promise){
			let newPrice = product.custom_attributes.find(attr => attr.attribute_code === 'special_price');
			promise.then(item => {
				this.props.addToCart({
					item_id:item.item_id,
					id:product.id,
					sku:product.sku,
					name:product.name,
					qty:item.qty,
					newPrice: newPrice ? newPrice.value : null,
					oldPrice:product.price,
					image:config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value,
					metadata:product
				});

				let availableFreeGiftOptions = this.state.availableFreeGiftOptions.filter(freeGift => freeGift.freeGiftFor !== freeGiftFor)

				this.setState({isLoading:false, availableFreeGiftOptions});
				swal('Gift Claimed!', `${product.name} added to cart as free gift.`, 'success');
			});
		}
	}

	applyCouponCode = () => {
		if(!_.isEmpty(this.state.couponCode)){
			this.setState({isLoading:true});
			addCouponCodeToCart(this.state.couponCode)
			.then(isCouponValid => this.checkCartTotal())
			.catch(error => this.setState({isCouponValid:false, isCouponChecked:true, isLoading:false}));
		}
	}

	handleRemoveItemFromCart = (productId) => {
		this.setState({isLoading:true});
		this.props.removeItemFromCart(productId)
		.then(() => this.checkCartTotal());
	}

	handleChangeItemQty = (productId, ops) => {
		this.setState({isLoading:true});
		this.props.changeItemQty(productId, ops)
		.then(() => this.checkCartTotal());
	}

	handleProceedToPayment = (checkoutDetails, shippingAddress) => {
		this.setState({step:3, paymentMethods:checkoutDetails.payment_methods, shippingAddress, totalSegments:checkoutDetails.totals.total_segments, grandTotal:checkoutDetails.totals.grand_total});
	}

	render(){

		let loader = null;

		if(this.state.isLoading || this.props.cartLoading){
			loader = ReactDOM.createPortal(
				<div className="loader-wrapper">
				    <div className="loader"></div>
				</div>,
				document.getElementById('modal-root')
			);
		}
		
		return (
			<div className="plantlane-checkout-page container mb-4">
				{loader}
				<ul className="plantlane-checkout-page-breadcrumb p-2">
					<li onClick={() => this.setState({step:1})} className={"plantlane-checkout-page-breadcrumb-item" + (this.state.step >= 1 ? ' active' : '')}>Summary</li>
					<li className={"plantlane-checkout-page-breadcrumb-sep" + (this.state.step >= 2 ? ' active' : '')}>- - - - - - - - - -</li>
					<li onClick={() => this.setState({step:2})} className={"plantlane-checkout-page-breadcrumb-item" + (this.state.step >= 2 ? ' active' : '')}>Delivery & Billing Address</li>
					<li className={"plantlane-checkout-page-breadcrumb-sep" + (this.state.step >= 3 ? ' active' : '')}>- - - - - - - - - -</li>
					<li className={"plantlane-checkout-page-breadcrumb-item" + (this.state.step >= 3 ? ' active' : '')}>Payment</li>
				</ul>
				<div className="row mt-4">
					<div className="plantlane-checkout-page-items col-lg-7">
						
						<OrderSummary 
							show={this.state.step <= 1}
							cartItems={this.props.cartItems}
							changeItemQty={this.handleChangeItemQty}
							removeItemFromCart={this.handleRemoveItemFromCart}
							handleClaimGift={this.handleClaimGift}
							availableFreeGiftOptions={this.state.availableFreeGiftOptions}
							/>
						
						<ManageDelivery show={this.state.step === 2} proceedToPayments={this.handleProceedToPayment} />

						<ManagePayment show={this.state.step === 3} amount={this.state.grandTotal.toFixed(2)} user={this.props.user} paymentMethods={this.state.paymentMethods} billingAddress={this.state.shippingAddress} resetCart={this.props.resetCart} />
					</div>
					<div className="plantlane-checkout-page-order-summary col-lg-5">
						<div className="card border-top-0 border-left-0 border-right-0 border-bottom border-dark p-4">
							{
								this.state.step <= 1 &&
								<React.Fragment>	
									<div className="input-group">
									  <input type="text" className={"form-control" + (this.state.isCouponChecked ? this.state.isCouponValid ? ' is-valid' : ' is-invalid' : '')} onChange={this.handleCouponCodeInput} value={this.state.couponCode || ''} placeholder="Have a coupon code ?" />
									  <div className="input-group-append">
									    <button className="btn plantlane-btn-primary" onClick={this.applyCouponCode} disabled={this.state.isCouponChecked && this.state.isCouponValid} type="button">Apply</button>
									  </div>
									  <div className="invalid-feedback">Invalid Or Expired Coupon Code.</div>
									  <div className="valid-feedback">Successfully applied !</div>
									</div>
									<hr/>
								</React.Fragment>
							}
							<div className="plantlane-checkout-item">
							{
								this.state.totalSegments.map(segment => 
									<div key={segment.code} className={"plantlane-item-total row my-2" + (segment.code === 'discount' ? ' text-success' : '')}><span className="col-7">{segment.title}</span><span className={"col-5" + (segment.code === 'discount' ? ' text-success' : ' plantlane-text-secondry')}>&#8377; {segment.value}</span></div>
								)
							}
							</div>
							<hr/>
							<div className="plantlane-checkout-total row my-2">
								<span className="col-7">You Pay</span><span className="plantlane-text-secondry col-5">&#8377; {this.state.grandTotal}</span>
							</div>
							{
								this.state.step <= 1 &&
								<React.Fragment>
									<hr/>
									<div className="place-order">
										<button onClick={() => this.setState({step:2})} className="btn btn-lg plantlane-btn-primary btn-block">PLACE ORDER</button>
									</div>
								</React.Fragment>
							}
						</div>
					</div>
				</div>

			</div>
		);
	}
}


export default withCartOptions(Checkout);


