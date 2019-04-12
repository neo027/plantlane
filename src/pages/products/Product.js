import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import swal from 'sweetalert';
// import StarRatings from 'react-star-ratings';

import config from '../../config/config';

import {fetchProduct, fetchReviews, submitReview, fetchAttributes, fetchChildren} from '../../api/products';
import {addToUserCart, addToGuestCart, fetchUserQuoteId, fetchGuestQuoteId} from '../../api/cart';

import {addToCart} from '../../actions/cart';
import {addToWishList} from '../../actions/wishlist';

// import {stripHtml} from '../../utilities';

// import Button from '../../components/buttons/Button';
import BackDrop from '../../components/backdrop/BackDrop';
import Modal from '../../components/modal/Modal';

import ProductRating from '../../containers/products/ProductRating';
import ProductListGeneral from '../../containers/products/ProductListGeneral';
import WriteReviewForm from '../../containers/products/WriteReviewForm';

import $ from 'jquery';
import 'slick-carousel';


import './Product.css';

class Product extends Component {

	constructor(){
		super();
	
		this.state = {
			product:null,
			avg_rating_percent:0,
			children:[],
			colorsFilter:[],
			sizeFilter:[],
			related:[],
			crosssell:[],
			upsell:[],
			reviews:[],
			count:0,
			selectedColor:null,
			selectedSize:null,
			writeReview:false,
			isLoading:true,
			isAddingToCart:false,
			error:{},
		}
	}

	componentDidMount(){
		let query = new URLSearchParams(this.props.location.search),
			sku = query.get('sku');

		this.loadData(sku);
	}

	loadData = (sku) => {
		this.setState({isLoading:true, sizeFilter:[], colorsFilter:[]});
		fetchProduct(sku)
		.then(product => {

			if(product.type_id === 'configurable'){
		    	let confOptions = product.extension_attributes.configurable_product_options;
		    	
		    	let color = confOptions.find(option => option.label === 'Color'), size = confOptions.find(option => option.label === 'Size');

		    	if(color){
		    		fetchAttributes(color.attribute_id)
		    		.then(attr => {
		    			let colorVal = color.values.map(value => value.value_index)
		    			let colorsFilter = attr.filter(code => colorVal.includes(parseInt(code.value)));
		    			this.setState({colorsFilter});
		    		});
		    	}

		    	if(size){
		    		fetchAttributes(size.attribute_id)
		    		.then(attr => {
		    			let sizeVal = size.values.map(value => value.value_index);
		    			let sizeFilter = attr.filter(code => sizeVal.includes(parseInt(code.value)));
		    			this.setState({sizeFilter});
		    		})
		    	}

		    	fetchChildren(sku)
		    	.then(children => {
		    		let minPrice = 999999999999999999999999;
		    		children.forEach(child => {
		    			if(parseInt(child.price) < minPrice){
		    				minPrice = parseInt(child.price);
		    			}
		    		});

		    		this.setState({children, product:{...product, price:minPrice}});
		    	});
		    }

			return fetchReviews(product.id)
			.then(productReview => {
				this.setState({product, ...productReview[0], isLoading:false});
				$('.product-slick').slick({
			        slidesToShow: 1,
			        slidesToScroll: 1,
			        arrows: false,
			        dots:true,
			        fade: true,
			        asNavFor: '.slider-nav'
			    });

			    $('.slider-nav').slick({
			        vertical: false,
			        slidesToShow: 3,
			        slidesToScroll: 1,
			        asNavFor: '.product-slick',
			        arrows: false,
			        dots: false,
			        focusOnSelect: true
			    });

			    $('.product-right-slick').slick({
			        slidesToShow: 1,
			        slidesToScroll: 1,
			        arrows: false,
			        dots:true,
			        fade: true,
			        asNavFor: '.slider-right-nav'
			    });

			    return Promise.all([
			    	Promise.all(product.product_links.filter(p => p.link_type === "related").map(related => fetchProduct(related.linked_product_sku).catch(error => {})))
			    	.then(related => this.setState({related})),
			    	Promise.all(product.product_links.filter(p => p.link_type === "crosssell").map(crosssell => fetchProduct(crosssell.linked_product_sku).catch(error => {})))
			    	.then(crosssell => this.setState({crosssell})),
			    	Promise.all(product.product_links.filter(p => p.link_type === "upsell").map(upsell => fetchProduct(upsell.linked_product_sku).catch(error => {})))
			    	.then(upsell => this.setState({upsell})),
			    ])
			})
		});
	}

	componentDidUpdate(prevProps, prevState){
		let query = new URLSearchParams(this.props.location.search),
			sku = query.get('sku');
		let prevQuery = new URLSearchParams(prevProps.location.search),
			prevSku = prevQuery.get('sku');
		if(prevSku !== sku){
			this.loadData(sku);
		}
	}

	handleAddToCart = () => {
		let {product, selectedColor, selectedSize} = this.state;
		let promise = null, shouldAdd = true;

		if(product.type_id === 'configurable' ){
			shouldAdd = (selectedSize !== null && selectedColor !== null);
		}

		if(shouldAdd){
			this.setState({isAddingToCart:true});
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
				promise.then(item => {
					this.setState({isAddingToCart:false});
					let newPrice = product.custom_attributes.find(attr => attr.attribute_code === 'special_price');
					this.props.addToCart({
						item_id:item.item_id,
						id:product.id,
						sku:product.sku,
						qty:item.qty,
						name:product.name,
						newPrice:newPrice ? newPrice.value : null,
						oldPrice:product.price,
						image:config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value,
						metadata:product
					});
					swal('Added To Cart', `${product.name} added to cart successfully.`, 'success');
				})
			}
		}
		else {
			this.setState({isAddingToCart:false, error:{selectedColor:!selectedColor, selectedSize:!selectedSize}});
		}

	}

	handleAddToWishlist = () => {
		let {product} = this.state;
		if(product){
			let newPrice = product.custom_attributes.find(attr => attr.attribute_code === 'special_price');
			this.props.addToWishList({
				id:product.id,
				sku:product.sku,
				qty:1,
				name:product.name,
				newPrice:newPrice ? newPrice.value : null,
				oldPrice:product.price,
				image:config.mediaBaseURL + 'product/' + product.custom_attributes.find(attr => attr.attribute_code === 'image').value
			});
			swal('Added To Wishlist', `${product.name} added to wishlist successfully.`, 'success');
		}
	}

	closeModal = () => {
		this.setState({writeReview:false});
	}

	openModal = () => {
		this.setState({writeReview:true});
	}

	onReviewSubmit = (review) => {
		let nickname = this.props.isLoggedIn ? `${this.props.user.firstname} ${this.props.user.lastname}` : 'Anonymous';

		return submitReview({...review, nickname, productId:this.state.product.id});

	}

	handleSelectOption = (key, value) => {
		let {selectedColor, selectedSize, children, product, error} = this.state;
		let selectedProduct = null;

		if(key === 'selectedColor'){
			selectedColor = value;
		}
		if(key === 'selectedSize'){
			selectedSize = value;
		}

		if(children.length > 0 && selectedSize !== null && selectedColor !== null){
			selectedProduct = children.find(child => {
				return selectedColor === child.custom_attributes.find(attr => attr.attribute_code === 'color').value && selectedSize === child.custom_attributes.find(attr => attr.attribute_code === 'size').value;
			});
		}

		if (selectedProduct) {
			this.setState({isLoading:true});
			fetchProduct(selectedProduct.sku)
			.then(sFullProduct => {
				selectedProduct = {...sFullProduct};
				delete selectedProduct.type_id;
				this.setState({product:{...product, ...selectedProduct}, [key]:value, error:{...error, [key]:null}, isLoading:false});
				$('.product-slick').slick({
			        slidesToShow: 1,
			        slidesToScroll: 1,
			        arrows: false,
			        dots:true,
			        fade: true,
			        asNavFor: '.slider-nav'
			    });

			    $('.slider-nav').slick({
			        vertical: false,
			        slidesToShow: 3,
			        slidesToScroll: 1,
			        asNavFor: '.product-slick',
			        arrows: false,
			        dots: false,
			        focusOnSelect: true
			    });

			    $('.product-right-slick').slick({
			        slidesToShow: 1,
			        slidesToScroll: 1,
			        arrows: false,
			        dots:true,
			        fade: true,
			        asNavFor: '.slider-right-nav'
			    });
			})

		}
		else {
			this.setState({[key]:value, error:{...error, [key]:null}});
		}

	}

	render(){

		let newPrice = null, oldPrice = null, off = null, description = null, short_description = null, mediaGallery = [];
		let rating = this.state.avg_rating_percent / 20;

		// let loader = null;

		if(this.state.isLoading){
			return ReactDOM.createPortal(
				<div className="loader-wrapper">
				    <div className="loader"></div>
				</div>,
				document.getElementById('modal-root')
			);
		}

		if(this.state.product){
			oldPrice = this.state.product.price;
			newPrice = this.state.product.custom_attributes.find(attr => attr.attribute_code === 'special_price');

			if(newPrice){
				let op = parseInt(oldPrice), np = parseInt(newPrice.value);
				off = parseInt(((op - np) / op) * 100)
			}


			description = this.state.product.custom_attributes.find(attr => attr.attribute_code === 'description');
			description = description ? description.value : null;

			short_description = this.state.product.custom_attributes.find(attr => attr.attribute_code === 'short_description');
			short_description = short_description ? short_description.value : null;
			mediaGallery = this.state.product.media_gallery_entries;
		}

		return (
			<React.Fragment>
				<div className="tt-breadcrumb">
					<div className="container">
						<ul>
							<li><a href="/">Plantlane</a></li>
							<li>Product</li>
						</ul>
					</div>
				</div>
				<div className="plantlane-product-description-page">
					<section>
					    <div className="collection-wrapper">
					        <div className="container">
					            <div className="row">
					                <div className="col-lg-6">
					                    <div className="product-slick">
					                    	{
										  		mediaGallery.map((media, index) => 
										  			<div key={media.position + media.file}><img src={config.mediaBaseURL + 'product/' + media.file} alt={media.file} className="img-fluid image_zoom_cls-0" /></div>
										  	 		
										  		)
											}
					                    </div>
					                    <div className="row">
					                        <div className="col-12 p-0">
					                            <div className="slider-nav plantlane-product-img-list">
					                            	{
												  		mediaGallery.map((media, index) => 
												  			<div key={media.position + media.file}><img src={config.mediaBaseURL + 'product/' + media.file} alt={media.file} className="img-fluid" /></div>
												  	 		
												  		)
													}
					                            </div>
					                        </div>
					                    </div>
					                </div>
					                <div className="col-lg-6 rtl-text">
					                    <div className="product-right plantlane-mobile-product-right">
					                        {this.state.product && <h2>{this.state.product.name}</h2>}
					                        {newPrice && <h4><del>&#8377; {parseInt(oldPrice)}&nbsp;</del>{off && <span>{off}% off</span>}</h4>}
					                        <h3>{this.state.product && this.state.product.type_id === 'configurable' ? <small>As low as </small> : ''} &#8377; {parseInt(newPrice ? newPrice.value : oldPrice)}</h3>
					                        {this.state.colorsFilter && this.state.colorsFilter.length > 0 &&
					                        	<React.Fragment>
						                        	<ul className="color-variant">
						                        	{
						                        		this.state.colorsFilter.map((filter, index) => <li onClick={() => this.handleSelectOption('selectedColor', filter.value)} key={'Color_' + filter.label + filter.value} style={{backgroundColor:filter.label}}>{filter.value === this.state.selectedColor ? <div className="selected">&#x2713;</div> : ""}</li>)
						                        	}
							                        </ul>
							                        {this.state.error.selectedColor && <small className="form-text text-danger">Select a color.</small>}
						                        </React.Fragment>
						                    }
						                    {this.state.sizeFilter && this.state.sizeFilter.length > 0 &&
					                        <div className="product-description border-product">
					                            <h6 className="product-title size-text">select size <span><a href="/" data-toggle="modal" data-target="#sizemodal">size chart</a></span></h6>
					                            <div className="modal fade" id="sizemodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					                                <div className="modal-dialog modal-dialog-centered" role="document">
					                                    <div className="modal-content">
					                                        <div className="modal-header">
					                                            <h5 className="modal-title" id="exampleModalLabel">{this.state.product ? this.state.product.name : ''}</h5>
					                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					                                        </div>
					                                        <div className="modal-body"><img src="../assets/images/size-chart.jpg" alt="" className="img-fluid" /></div>
					                                    </div>
					                                </div>
					                            </div>
					                            
						                            <div className="size-box">
						                                <ul>
						                                {
						                                	this.state.sizeFilter.map((filter, index) => <li onClick={() => this.handleSelectOption('selectedSize', filter.value)} className={filter.value === this.state.selectedSize ? "selected" : ""} key={'Size' + filter.label + filter.value}><span>{filter.label.split(' ').map(ch => ch.charAt(0)).join('').replace('E', 'X').toLowerCase()}</span></li>)
						                                }
						                                </ul>
						                                {this.state.error.selectedSize && <small className="form-text text-danger">Select a size.</small>}
						                            </div>
					                        	
					                            {/*<h6 className="product-title">quantity</h6>
					                            <div className="qty-box">
					                            				                                <div className="input-group"><span className="input-group-prepend"><button type="button" className="btn quantity-left-minus" data-type="minus" data-field=""><i className="ti-angle-left"></i></button> </span>
					                            				                                    <input type="text" name="quantity" className="form-control input-number" value="1" /> <span className="input-group-prepend"><button type="button" className="btn quantity-right-plus" data-type="plus" data-field=""><i className="ti-angle-right"></i></button></span></div>
					                            				                            </div>*/}
					                        </div>}
					                        <div className="product-buttons">
					                        	<button onClick={this.handleAddToWishlist} className="btn plantlane-mobile-add-wishlist-btn plantlane-mobile-visible">add to wishlist</button>
					                        	<button onClick={this.handleAddToCart} className="btn btn-solid plantlane-mobile-add-cart-btn">{this.state.isAddingToCart ? 'Adding ...' : 'add to cart'}</button>
					                        </div>
					                        <div className="border-product">
					                            <h6 className="product-title">product details</h6>
					                            <p className="py-2 plantlane-short-description" dangerouslySetInnerHTML={{__html:short_description}}></p>
					                        </div>
					                        <div className="border-product">
					                            <h6 className="product-title">share it</h6>
					                            <div className="product-icon">
					                                <ul className="product-social">
					                                    <li><a href="/"><i className="fa fa-facebook"></i></a></li>
					                                    <li><a href="/"><i className="fa fa-google-plus"></i></a></li>
					                                    <li><a href="/"><i className="fa fa-twitter"></i></a></li>
					                                    <li><a href="/"><i className="fa fa-instagram"></i></a></li>
					                                    <li><a href="/"><i className="fa fa-rss"></i></a></li>
					                                </ul>
					                                <div className="d-inline-block">
					                                    <button onClick={this.handleAddToWishlist} className="wishlist-btn"><i className="fa fa-heart"></i><span className="title-font">Add To WishList</span></button>
					                                </div>
					                            </div>
					                        </div>
					                    </div>
					                </div>
					            </div>
					        </div>
					    </div>
					</section>

					<section className="deskTopViewOnly tab-product m-0">
					    <div className="container">
					        <div className="row">
					            <div className="col-sm-12 col-lg-12">
					                <ul className="nav nav-tabs nav-material plantlane-mobile-product-page-tabs" id="top-tab" role="tablist">
					                    <li className="nav-item"><a className="nav-link active" id="profile-top-tab" data-toggle="tab" href="#description" role="tab" aria-selected="false">Description</a>
					                        <div className="material-border"></div>
					                    </li>
					                    <li className="nav-item"><a className="nav-link" id="top-home-tab" data-toggle="tab" href="#terms" role="tab" aria-selected="true">Terms</a>
					                        <div className="material-border"></div>
					                    </li>
					                    <li className="nav-item"><a className="nav-link" id="profile-top-tab" data-toggle="tab" href="#merchant-details" role="tab" aria-selected="false">Merchant Details</a>
					                        <div className="material-border"></div>
					                    </li>
					                    <li className="nav-item"><a className="nav-link" id="profile-top-tab" data-toggle="tab" href="#manufacturer-details" role="tab" aria-selected="false">Manufacturer Details</a>
					                        <div className="material-border"></div>
					                    </li>
					                    <li className="nav-item"><a className="nav-link" id="profile-top-tab" data-toggle="tab" href="#package-details" role="tab" aria-selected="false">Package Details</a>
					                        <div className="material-border"></div>
					                    </li>
					                </ul>
					                <div className="tab-content nav-material" id="top-tabContent">
					                    <div className="tab-pane fade active show" id="description" role="tabpanel" aria-labelledby="description-tab">
					                        <p dangerouslySetInnerHTML={{__html:description}}></p>
					                    </div>
					                    <div className="tab-pane fade" id="terms" role="tabpanel" aria-labelledby="terms-tab">
					                        <p>Terms & Conditions</p>
					                    </div>
					                    <div className="tab-pane fade" id="merchant-details" role="tabpanel" aria-labelledby="merchant-details-tab">
					                        <p>Merchant Details</p>
					                    </div>
					                    <div className="tab-pane fade" id="manufacturer-details" role="tabpanel" aria-labelledby="manufacturer-details-tab">
					                        <p>Manufacturer Details</p>
					                    </div>
					                    <div className="tab-pane fade" id="package-details" role="tabpanel" aria-labelledby="package-details-tab">
					                        <p>Package Details</p>
					                    </div>
					                </div>
					            </div>
					        </div>
					    </div>
					</section>
					<div className="mobileViewOnly accordion" id="productDescriptionAccordian">
					  <div className="card">
					    <div className="card-header py-1" id="headingOne">
					      <h5 className="mb-0">
					        <button className="btn btn-link plantlane-text-primary" type="button" data-toggle="collapse" data-target="#accDescription" aria-expanded="true" aria-controls="accDescription">
					          DESCRIPTION
					        </button>
					      </h5>
					    </div>

					    <div id="accDescription" className="collapse show" aria-labelledby="headingOne" data-parent="#productDescriptionAccordian">
					      <div className="card-body">
					        <p dangerouslySetInnerHTML={{__html:description}}></p>
					      </div>
					    </div>
					  </div>
					  <div className="card">
					    <div className="card-header py-1" id="headingTwo">
					      <h5 className="mb-0">
					        <button className="btn btn-link plantlane-text-primary" type="button" data-toggle="collapse" data-target="#accTnC" aria-expanded="true" aria-controls="accTnC">
					          Terms & Conditions
					        </button>
					      </h5>
					    </div>

					    <div id="accTnC" className="collapse" aria-labelledby="headingTwo" data-parent="#productDescriptionAccordian">
					      <div className="card-body">
					        Terms & Conditions
					      </div>
					    </div>
					  </div>
					  <div className="card">
					    <div className="card-header py-1" id="headingThree">
					      <h5 className="mb-0">
					        <button className="btn btn-link plantlane-text-primary" type="button" data-toggle="collapse" data-target="#accMerchantDetails" aria-expanded="true" aria-controls="accMerchantDetails">
					          Merchant Details
					        </button>
					      </h5>
					    </div>

					    <div id="accMerchantDetails" className="collapse" aria-labelledby="headingThree" data-parent="#productDescriptionAccordian">
					      <div className="card-body">
					        Merchant Details
					      </div>
					    </div>
					  </div>
					  <div className="card">
					    <div className="card-header py-1" id="headingFour">
					      <h5 className="mb-0">
					        <button className="btn btn-link plantlane-text-primary" type="button" data-toggle="collapse" data-target="#accManufacturerDetails" aria-expanded="true" aria-controls="accManufacturerDetails">
					          Manufacturer Details
					        </button>
					      </h5>
					    </div>

					    <div id="accManufacturerDetails" className="collapse" aria-labelledby="headingFour" data-parent="#productDescriptionAccordian">
					      <div className="card-body">
					        Manufacturer Details
					      </div>
					    </div>
					  </div>
					  <div className="card">
					    <div className="card-header py-1" id="headingFive">
					      <h5 className="mb-0">
					        <button className="btn btn-link plantlane-text-primary" type="button" data-toggle="collapse" data-target="#accPackageDetails" aria-expanded="true" aria-controls="accPackageDetails">
					          Package Details
					        </button>
					      </h5>
					    </div>

					    <div id="accPackageDetails" className="collapse" aria-labelledby="headingFive" data-parent="#productDescriptionAccordian">
					      <div className="card-body">
					        Package Details
					      </div>
					    </div>
					  </div>
					</div>
					<section>
						<div className="container">
							<ProductRating 
									writeReview={this.openModal}
									avgRating={rating} 
									count={this.state.count} 
									reviews={this.state.reviews} />

							<div>
								<BackDrop show={this.state.writeReview}/>
								<Modal show={this.state.writeReview} close={this.closeModal}>
									<WriteReviewForm onReviewSubmit={this.onReviewSubmit} close={this.closeModal} />
								</Modal>
							</div>
						</div>
					</section>
							<section className="section-b-space">
							    <div className="container">
							        <div className="row">
							            <div className="col-12 product-related">
							                <h2>related products</h2></div>
							        </div>
								{
									this.state.related && this.state.related.length > 0 ?
								        <div className="plantlane-landing-card-container plantlane-scroll-card-container">
								        	<ProductListGeneral data={this.state.related} />
								        </div>
								    : <div><div className="plantlane-loader"></div></div>
								}
							    </div>
							</section>						
							<section className="section-b-space">
							    <div className="container">
							        <div className="row">
							            <div className="col-12 product-related">
							                <h2>What Customers Love</h2></div>
							        </div>
								{
									this.state.upsell && this.state.upsell.length > 0 ?
								        <div className="plantlane-landing-card-container plantlane-scroll-card-container">
								        	<ProductListGeneral data={this.state.upsell} />
								        </div>
								    : <div><div className="plantlane-loader"></div></div>
								}
							    </div>
							</section>

					<section className="section-b-space">
					    <div className="container">
					        <div className="row">
					            <div className="col-12 product-related">
					                <h2>You Might Also Like</h2></div>
					        </div>
						{
							this.state.crosssell && this.state.crosssell.length > 0 ? 
						        <div className="plantlane-landing-card-container plantlane-scroll-card-container">
						        	<ProductListGeneral data={this.state.crosssell} />
						        </div>
						    : <div><div className="plantlane-loader"></div></div>
						}
					    </div>
					</section>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn:state.auth.isLoggedIn,
		user:state.auth.user
	}
}

const mapDispatchToProps = {
	addToCart,
	addToWishList
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);