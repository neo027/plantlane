import React, {Component} from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';
import swal from 'sweetalert';
import config from '../../config/config';

import {addToUserCart, addToGuestCart, fetchUserQuoteId, fetchGuestQuoteId} from '../../api/cart';

import {addToCart} from '../../actions/cart';
import {addToWishList} from '../../actions/wishlist';


import {searchFull} from '../../api/search';

// import ProductListContainer from '../../containers/products/ProductList';
import ProductCard from '../../components/cards/product/Card';
import ProductFilter from '../../containers/products/ProductFilter';


// import './ProductList.css';

class Search extends Component {

	constructor(){
		super();
	
		this.state = {
			products:[],
			filters:[],
			isLoading:true,
			error:false
		}
	}

	loadData = () => {
		this.setState({isLoading:true});
		searchFull(this.props.match.params.searchText)
		.then(data => this.setState({products:data.items, isLoading:false}))
		.catch(error => this.setState({isLoading:false, error:true}));
	}

	componentDidMount(){
		if (this.props.match.params.searchText){
			this.loadData();
		}

		$('.filter-btn').on('click', function(e) {
        	$('.collection-filter').css("left","-15px");
	    });

	    $('.filter-back').on('click', function(e) {
	        $('.collection-filter').css("left","-365px");
	    });
	    // sidebar popup
	    $('.sidebar-popup').on('click', function(e) {
	        $('.open-popup').toggleClass('open');
	        $('.collection-filter').css("left","-15px");
	    });
	    $('.filter-back').on('click', function(e) {
	        $('.collection-filter').css("left","-365px");
	        $('.sidebar-popup').trigger('click');
	    });
	}

	componentDidUpdate(prevProps){
		if (prevProps.match.params.searchText !== this.props.match.params.searchText){
			this.loadData();
		}
	}


	handleAddToCart = (product) => {
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
					image:config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value
				});
				this.setState({isLoading:false});
				swal('Added To Cart', `${product.name} added to cart successfully.`, 'success');
			})
		}
	}

	handleAddToWishList = (product) => {
		this.props.addToWishList({
			id:product.id,
			sku:product.sku,
			name:product.name,
			qty:1,
			newPrice:product.custom_attributes.find(attr => attr.attribute_code === 'special_price'),
			oldPrice:product.price,
			image:config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value
		});
		swal('Added To wishlist', `${product.name} added to wishlist successfully.`, 'success');
	}


	render(){
		let loader = null;

		if(this.state.isLoading){
			loader = ReactDOM.createPortal(
				<div className="loader-wrapper">
				    <div className="loader"></div>
				</div>,
				document.getElementById('modal-root')
			);
		}

		return (
			<React.Fragment>
				<div className="tt-breadcrumb">
					<div className="container">
						<ul>
							<li><a href="/">Plantlane</a></li>
							<li>Search Results</li>
						</ul>
					</div>
				</div>
				<div className="collection-wrapper mt-4">
					{loader}
					<div className="container">
						<div className="row">
							<ProductFilter />
							<div className="collection-content col" style={{paddingLeft:'0px', paddingRight:'0px'}}>
								<div className="page-main-content">
			                        <div className="container-fluid" style={{paddingLeft:'0px', paddingRight:'0px'}}>
			                            <div className="row">
			                                <div className="col-sm-12">
			                                	<div className="top-banner-wrapper">
			                                        <div className="top-banner-content py-2 px-4 px-sm-0">
			                                            <h3>Search results for {this.props.match.params.searchText}</h3>
			                                        </div>
			                                    </div>
			                                    <div className="collection-product-wrapper">
			                                        <div className="product-top-filter">
			                                            <div className="container-fluid p-0 px-sm-0">
			                                                <div className="row">
			                                                    <div className="col-xl-12">
			                                                        <div className="filter-main-btn"><span className="filter-btn btn btn-theme"><i className="fa fa-filter" aria-hidden="true"></i> Filter</span></div>
			                                                    </div>
			                                                </div>
			                                            </div>
			                                        </div>
			                                        <div className="product-wrapper-grid">
			                                            <div className="container-fluid plantlane-product-list-container py-4">
															{
																this.state.products.map(product => 
																	<ProductCard 
																		name={product.name} 
																		key={product.name + product.id}
																		className={this.props.productCardClass}
																		id={product.id} 
																		sku={product.sku} 
																		addToCart={() => this.handleAddToCart(product)}
																		addToWishList={() => this.handleAddToWishList(product)}
																		link={`/product/${product.custom_attributes.find(attr => attr.attribute_code === 'url_key').value}?sku=${product.sku}`}
																		text={product.custom_attributes.find(attr => attr.attribute_code === 'description')} 
																		newPrice={product.custom_attributes.find(attr => attr.attribute_code === 'special_price')} 
																		oldPrice={product.price} 
																		image={config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value} />
																)
															}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isLoggedIn:state.auth.isLoggedIn
	}
}

const mapDispatchToProps = {
	addToCart:addToCart,
	addToWishList:addToWishList
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);